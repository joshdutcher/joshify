// Color extraction utility for dynamic backgrounds
interface ColorResult {
    background: string;
    '--primary-color'?: string;
}

interface RGBColor {
    r: number;
    g: number;
    b: number;
}

class ColorExtractor {
    static extractColors(imageUrl: string | null, callback: (colors: ColorResult) => void) {
        if (!imageUrl) {
            callback(this.getDefaultColors());
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
    
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d')!;
        
                // Use smaller canvas for performance
                canvas.width = 100;
                canvas.height = 100;
        
                ctx.drawImage(img, 0, 0, 100, 100);
                const imageData = ctx.getImageData(0, 0, 100, 100);
                const colors = this.analyzeImageData(imageData);
        
                callback(colors);
            } catch (error) {
                console.warn('Color extraction failed:', error);
                callback(this.getDefaultColors());
            }
        };
    
        img.onerror = () => {
            callback(this.getDefaultColors());
        };
    
        img.src = imageUrl;
    }

    static analyzeImageData(imageData: ImageData): ColorResult {
        const data = imageData.data;
        const pixels: RGBColor[] = [];

        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // Skip transparent/very dark/very light pixels or undefined values
            if (a === undefined || r === undefined || g === undefined || b === undefined ||
                a < 200 || (r + g + b) < 50 || (r + g + b) > 650) continue;

            pixels.push({ r, g, b });
        }
    
        if (pixels.length === 0) {
            return this.getDefaultColors();
        }
    
        // Find dominant colors using simple clustering
        const dominantColor = this.findDominantColor(pixels);
        // const complementaryColor = this.generateComplementary(dominantColor);
    
        return {
            background: `linear-gradient(to bottom, ${dominantColor} 0%, rgb(40, 40, 40) 50%)`,
            '--primary-color': dominantColor
        };
    }

    static findDominantColor(pixels: RGBColor[]): string {
        const colorBuckets: Record<string, { count: number; r: number; g: number; b: number }> = {};

        // Group similar colors into buckets
        pixels.forEach((pixel: RGBColor) => {
            const bucket = this.getColorBucket(pixel);
            if (!colorBuckets[bucket]) {
                colorBuckets[bucket] = { count: 0, r: 0, g: 0, b: 0 };
            }
            colorBuckets[bucket].count++;
            colorBuckets[bucket].r += pixel.r;
            colorBuckets[bucket].g += pixel.g;
            colorBuckets[bucket].b += pixel.b;
        });

        // Find most common bucket
        let maxCount = 0;
        let dominantBucket: string | null = null;

        Object.keys(colorBuckets).forEach(bucket => {
            if (colorBuckets[bucket] && colorBuckets[bucket].count > maxCount) {
                maxCount = colorBuckets[bucket].count;
                dominantBucket = bucket;
            }
        });

        if (!dominantBucket || !colorBuckets[dominantBucket]) {
            return 'rgb(29, 185, 84)'; // Spotify green fallback
        }

        const bucket = colorBuckets[dominantBucket];
        if (!bucket) return 'rgb(29, 185, 84)'; // Fallback

        const avgR = Math.round(bucket.r / bucket.count);
        const avgG = Math.round(bucket.g / bucket.count);
        const avgB = Math.round(bucket.b / bucket.count);
    
        // Ensure minimum saturation and adjust brightness
        const adjusted = this.adjustColor({ r: avgR, g: avgG, b: avgB });
    
        return `rgb(${adjusted.r}, ${adjusted.g}, ${adjusted.b})`;
    }

    static getColorBucket(pixel: RGBColor): string {
    // Group colors into 16x16x16 buckets for clustering
        const bucketR = Math.floor(pixel.r / 16) * 16;
        const bucketG = Math.floor(pixel.g / 16) * 16;
        const bucketB = Math.floor(pixel.b / 16) * 16;
        return `${bucketR}-${bucketG}-${bucketB}`;
    }

    static adjustColor(color: RGBColor): RGBColor {
    // Ensure the color works well as a dark background for white text
        const { r, g, b } = color;
    
        // Calculate luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
        // ALWAYS ensure the color is dark enough for white text
        // Target luminance should be between 27-70 (halfway between original and too dark)
    
        if (luminance > 70) {
            // Too bright - darken significantly
            const factor = 27 / luminance; // Target luminance of 27 (compromise)
            return {
                r: Math.max(13, Math.floor(r * factor)),
                g: Math.max(13, Math.floor(g * factor)),
                b: Math.max(13, Math.floor(b * factor))
            };
        }
    
        if (luminance < 17) {
            // Too dark - lighten slightly but keep dark
            return {
                r: Math.min(55, r + 17),
                g: Math.min(55, g + 17),
                b: Math.min(55, b + 17)
            };
        }
    
        // Color is in acceptable range, but ensure it's not too saturated
        const maxComponent = Math.max(r, g, b);
        if (maxComponent > 110) {
            // Desaturate bright colors to make them more background-appropriate
            const factor = 75 / maxComponent; // Moderate desaturation
            return {
                r: Math.floor(r * factor),
                g: Math.floor(g * factor),
                b: Math.floor(b * factor)
            };
        }
    
        return color;
    }

    static generateComplementary(primaryColor: string): string {
        // Extract RGB values from the primary color
        const match = primaryColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
        if (!match || !match[1] || !match[2] || !match[3]) return primaryColor;
    
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
    
        // Generate a complementary color that's also dark enough for backgrounds
        // const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
        // Always create a darker gradient endpoint
        const secondaryR = Math.max(10, Math.floor(r * 0.3));
        const secondaryG = Math.max(10, Math.floor(g * 0.3));
        const secondaryB = Math.max(10, Math.floor(b * 0.3));
    
        // Ensure the secondary is always darker than primary for gradient effect
        return `rgb(${secondaryR}, ${secondaryG}, ${secondaryB})`;
    }

    static getDefaultColors(): ColorResult {
        // Spotify-like default colors - return first default matching ColorResult interface
        return {
            background: 'linear-gradient(to bottom, rgb(40, 40, 40) 0%, rgb(40, 40, 40) 50%)',
            '--primary-color': 'rgb(29, 185, 84)' // Spotify green
        };
    }
}

export default ColorExtractor;