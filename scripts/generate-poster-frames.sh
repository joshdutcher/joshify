#!/bin/bash

# Canvas Video Poster Frame Generator
# Extracts first frame from each video and converts to optimized WebP poster image

# Note: Don't use 'set -e' because FFmpeg may return non-zero on warnings
# We handle errors explicitly instead

CANVAS_DIR="../public/canvases"
POSTER_DIR="../public/canvases/posters"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Canvas Poster Frame Generator${NC}"
echo "=============================="
echo ""

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed${NC}"
    echo "Install with: sudo apt-get install ffmpeg (Ubuntu/Debian)"
    exit 1
fi

# Create poster directory
mkdir -p "$POSTER_DIR"

echo "Settings:"
echo "  Output format: WebP"
echo "  Quality: 85"
echo "  Target size: 10-30KB per poster"
echo ""

# Function to generate poster from video
generate_poster() {
    local input_file="$1"
    local filename=$(basename "$input_file" .mp4)
    local output_file="$POSTER_DIR/${filename}-poster.webp"

    echo -e "${YELLOW}Processing: $filename${NC}"

    # Extract first frame and convert to WebP
    if ffmpeg -i "$input_file" \
        -vf "select=eq(n\,0)" \
        -frames:v 1 \
        -c:v libwebp \
        -quality 85 \
        -y \
        "$output_file" 2>&1 | grep -v "frame=" | grep -v "time=" > /dev/null; then

        # Check if output file was created
        if [ -f "$output_file" ]; then
            local size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
            local size_kb=$(echo "scale=1; $size / 1024" | bc)
            echo -e "  ${GREEN}✓ Created poster: ${size_kb}KB${NC}"
        else
            echo -e "  ${RED}✗ Failed - output file not created${NC}"
        fi
    else
        echo -e "  ${RED}✗ Failed - ffmpeg error${NC}"
    fi
    echo ""
}

# Process all MP4 files
echo "Scanning for videos..."
poster_count=0

for video in "$CANVAS_DIR"/*.mp4; do
    if [ -f "$video" ]; then
        generate_poster "$video"
        ((poster_count++))
    fi
done

echo -e "${GREEN}=============================="
echo "Poster Generation Complete!"
echo "=============================="
echo "Generated: $poster_count posters"
echo "Output: $POSTER_DIR"
echo ""
echo "Poster images saved as: {video-name}-poster.webp"
echo "File sizes: Typically 10-30KB each"
echo -e "${NC}"
