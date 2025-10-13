#!/bin/bash

# Canvas Video Optimization Script
# Optimizes videos for web delivery: reduces file size while maintaining quality
# Target: <2MB per video, H.264 codec, 720x1280 resolution

# Note: Don't use 'set -e' because FFmpeg may return non-zero on warnings
# We handle errors explicitly instead

CANVAS_DIR="../public/canvases"
OUTPUT_DIR="../public/canvases-optimized"
BACKUP_DIR="../public/canvases-backup"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Canvas Video Optimization Script${NC}"
echo "=================================="
echo ""

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed${NC}"
    echo "Install with: sudo apt-get install ffmpeg (Ubuntu/Debian)"
    exit 1
fi

# Create directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$BACKUP_DIR"

# Optimization settings
RESOLUTION="720:1280"  # 9:16 aspect ratio
BITRATE="1200k"        # 1.2 Mbps - good quality for vertical video
FPS="30"               # 30 fps
CODEC="libx264"
PROFILE="high"
PRESET="slow"          # Slower = better compression

echo "Settings:"
echo "  Resolution: ${RESOLUTION}"
echo "  Bitrate: ${BITRATE}"
echo "  FPS: ${FPS}"
echo "  Target Size: <2MB per video"
echo ""

# Function to optimize a single video
optimize_video() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local output_file="$OUTPUT_DIR/$filename"
    local backup_file="$BACKUP_DIR/$filename"

    # Get input file size
    local input_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
    local input_size_mb=$(echo "scale=2; $input_size / 1048576" | bc)

    echo -e "${YELLOW}Processing: $filename${NC}"
    echo "  Input size: ${input_size_mb}MB"

    # Backup original if not already backed up
    if [ ! -f "$backup_file" ]; then
        echo "  Creating backup..."
        cp "$input_file" "$backup_file"
    fi

    # Optimize video
    echo "  Optimizing (this may take a minute)..."
    if ffmpeg -i "$input_file" \
        -vf "scale=$RESOLUTION:force_original_aspect_ratio=decrease,pad=$RESOLUTION:(ow-iw)/2:(oh-ih)/2" \
        -c:v "$CODEC" \
        -profile:v "$PROFILE" \
        -preset "$PRESET" \
        -b:v "$BITRATE" \
        -maxrate "$BITRATE" \
        -bufsize "2400k" \
        -r "$FPS" \
        -movflags +faststart \
        -an \
        -y \
        "$output_file" 2>&1 | grep -v "frame=" | grep -v "time=" > /dev/null; then

        # Check if output file was created
        if [ -f "$output_file" ]; then
            # Get output file size
            local output_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
            local output_size_mb=$(echo "scale=2; $output_size / 1048576" | bc)
            local reduction=$(echo "scale=1; 100 - ($output_size * 100 / $input_size)" | bc)

            echo -e "  ${GREEN}✓ Complete${NC}"
            echo "  Output size: ${output_size_mb}MB (${reduction}% reduction)"
            echo ""
        else
            echo -e "  ${RED}✗ Failed - output file not created${NC}"
            echo ""
        fi
    else
        echo -e "  ${RED}✗ Failed - ffmpeg error${NC}"
        echo ""
    fi
}

# Process all MP4 files in canvas directory
echo "Scanning for videos..."
video_count=0

for video in "$CANVAS_DIR"/*.mp4; do
    if [ -f "$video" ]; then
        optimize_video "$video"
        ((video_count++))
    fi
done

echo -e "${GREEN}=================================="
echo "Optimization Complete!"
echo "=================================="
echo "Processed: $video_count videos"
echo "Output: $OUTPUT_DIR"
echo "Backups: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Review optimized videos in: $OUTPUT_DIR"
echo "2. Replace originals with optimized versions if satisfied"
echo "3. Upload optimized videos to Backblaze B2 CDN"
echo -e "${NC}"
