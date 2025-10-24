#!/usr/bin/env node

/**
 * Automated WebP Generation Script
 *
 * Scans public/assets/images/album-art/ for PNG files and generates WebP versions
 * if they don't already exist or if the source PNG is newer.
 *
 * Usage: node scripts/generate-webp.js
 * Run automatically as part of: npm run build
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALBUM_ART_DIR = path.join(__dirname, '../public/assets/images/album-art');
const WEBP_QUALITY = 90;

/**
 * Check if a WebP file needs to be generated
 * @param {string} pngPath - Path to PNG file
 * @param {string} webpPath - Path to WebP file
 * @returns {boolean} - True if WebP needs generation
 */
function needsGeneration(pngPath, webpPath) {
    // Generate if WebP doesn't exist
    if (!fs.existsSync(webpPath)) {
        return true;
    }

    // Generate if PNG is newer than WebP (modified time)
    const pngStats = fs.statSync(pngPath);
    const webpStats = fs.statSync(webpPath);
    return pngStats.mtime > webpStats.mtime;
}

/**
 * Generate WebP file from PNG
 * @param {string} pngPath - Path to PNG file
 * @param {string} webpPath - Path to WebP file
 * @returns {Promise<Object>} - Sharp output info
 */
async function generateWebP(pngPath, webpPath) {
    return sharp(pngPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted size string
 */
function formatSize(bytes) {
    return (bytes / 1024).toFixed(2) + ' KB';
}

/**
 * Main execution function
 */
async function main() {
    console.log('🖼️  WebP Generation Script');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Verify album art directory exists
    if (!fs.existsSync(ALBUM_ART_DIR)) {
        console.error('❌ Error: Album art directory not found:', ALBUM_ART_DIR);
        process.exit(1);
    }

    // Get all PNG files
    const files = fs.readdirSync(ALBUM_ART_DIR)
        .filter(file => file.toLowerCase().endsWith('.png'));

    if (files.length === 0) {
        console.log('⚠️  No PNG files found in', ALBUM_ART_DIR);
        return;
    }

    console.log(`📁 Found ${files.length} PNG file(s)\n`);

    let generatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Process each PNG file
    for (const file of files) {
        const pngPath = path.join(ALBUM_ART_DIR, file);
        const webpFile = file.replace(/\.png$/i, '.webp');
        const webpPath = path.join(ALBUM_ART_DIR, webpFile);

        // Check if generation is needed
        if (!needsGeneration(pngPath, webpPath)) {
            console.log(`⏭️  ${file} → ${webpFile} (already exists, skipping)`);
            skippedCount++;
            continue;
        }

        try {
            // Generate WebP
            const info = await generateWebP(pngPath, webpPath);

            // Get original PNG size for comparison
            const pngStats = fs.statSync(pngPath);
            const savings = ((pngStats.size - info.size) / pngStats.size * 100).toFixed(1);

            console.log(`✅ ${file} → ${webpFile}`);
            console.log(`   ${formatSize(pngStats.size)} → ${formatSize(info.size)} (${savings}% smaller)\n`);

            generatedCount++;
        } catch (error) {
            console.error(`❌ Error generating ${webpFile}:`, error.message);
            errorCount++;
        }
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Summary:');
    console.log(`   ✅ Generated: ${generatedCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    if (errorCount > 0) {
        console.log(`   ❌ Errors: ${errorCount}`);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Exit with error code if any errors occurred
    if (errorCount > 0) {
        process.exit(1);
    }
}

// Run the script
main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
