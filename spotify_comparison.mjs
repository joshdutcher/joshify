import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function compareJoshifyVsSpotify() {
    console.log('🎵 Starting Joshify vs Spotify visual comparison...');
    
    // Launch browser in visible mode (NOT headless)
    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000, // Add delay to see actions
        args: ['--start-maximized']
    });

    try {
        // Create screenshots directory
        const screenshotsDir = './comparison_screenshots';
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }

        // Test Joshify first
        console.log('📱 Opening Joshify (localhost:3001)...');
        const joshifyPage = await browser.newPage();
        
        // Set viewport to 1440px width for desktop comparison
        await joshifyPage.setViewportSize({ width: 1440, height: 900 });
        
        // Navigate to Joshify
        await joshifyPage.goto('http://localhost:3001', { waitUntil: 'networkidle' });
        await joshifyPage.waitForTimeout(3000); // Wait for content to load
        
        // Take full page screenshot of Joshify
        console.log('📸 Taking Joshify screenshots...');
        await joshifyPage.screenshot({ 
            path: `${screenshotsDir}/joshify_full_page.png`,
            fullPage: true 
        });
        
        // Screenshot of just the card sections
        const cardSections = await joshifyPage.locator('.grid, [class*="grid"], .flex, [class*="card"]').first();
        if (await cardSections.count() > 0) {
            await cardSections.screenshot({ 
                path: `${screenshotsDir}/joshify_cards_section.png` 
            });
        }

        // Get card dimensions from Joshify
        const joshifyCardInfo = await joshifyPage.evaluate(() => {
            const cards = document.querySelectorAll('[class*="card"], .bg-zinc-800, .bg-gray-900');
            const measurements = [];
            
            cards.forEach((card, index) => {
                if (index < 10) { // First 10 cards
                    const rect = card.getBoundingClientRect();
                    const styles = window.getComputedStyle(card);
                    measurements.push({
                        index,
                        width: rect.width,
                        height: rect.height,
                        ratio: (rect.width / rect.height).toFixed(2),
                        padding: styles.padding,
                        margin: styles.margin,
                        className: card.className
                    });
                }
            });
            
            return measurements;
        });

        console.log('🎯 Joshify card measurements:', joshifyCardInfo.slice(0, 5));

        // Now test Spotify
        console.log('🎵 Opening Spotify (open.spotify.com)...');
        const spotifyPage = await browser.newPage();
        await spotifyPage.setViewportSize({ width: 1440, height: 900 });
        
        // Navigate to Spotify
        await spotifyPage.goto('https://open.spotify.com', { waitUntil: 'networkidle' });
        await spotifyPage.waitForTimeout(5000); // Wait longer for Spotify to load
        
        // Check if login is needed
        const loginButton = spotifyPage.locator('button:has-text("Log in")').first();
        const browseButton = spotifyPage.locator('button:has-text("Browse")').first();
        
        if (await loginButton.isVisible()) {
            console.log('🔐 Login required - taking screenshot of login page');
            await spotifyPage.screenshot({ 
                path: `${screenshotsDir}/spotify_login_page.png`,
                fullPage: true 
            });
        }

        // Try to navigate to browse or search without login
        try {
            // Look for browse/search sections that show cards
            await spotifyPage.goto('https://open.spotify.com/search', { waitUntil: 'networkidle' });
            await spotifyPage.waitForTimeout(3000);
        } catch (error) {
            console.log('Could not access search, trying browse...');
            try {
                await spotifyPage.goto('https://open.spotify.com/browse', { waitUntil: 'networkidle' });
                await spotifyPage.waitForTimeout(3000);
            } catch (error) {
                console.log('Could not access browse either, staying on main page');
            }
        }

        // Take Spotify screenshots
        console.log('📸 Taking Spotify screenshots...');
        await spotifyPage.screenshot({ 
            path: `${screenshotsDir}/spotify_full_page.png`,
            fullPage: true 
        });

        // Try to get card measurements from Spotify
        const spotifyCardInfo = await spotifyPage.evaluate(() => {
            // Look for common Spotify card selectors
            const cardSelectors = [
                '[data-testid*="card"]',
                '[class*="Card"]',
                '[class*="card"]',
                '.ReactVirtualized__Grid__innerScrollContainer > div',
                '[class*="listRow"]'
            ];
            
            const measurements = [];
            
            cardSelectors.forEach(selector => {
                const cards = document.querySelectorAll(selector);
                cards.forEach((card, index) => {
                    if (measurements.length < 10) { // First 10 total
                        const rect = card.getBoundingClientRect();
                        if (rect.width > 50 && rect.height > 50) { // Filter out tiny elements
                            const styles = window.getComputedStyle(card);
                            measurements.push({
                                selector,
                                index,
                                width: rect.width,
                                height: rect.height,
                                ratio: (rect.width / rect.height).toFixed(2),
                                padding: styles.padding,
                                margin: styles.margin,
                                className: card.className
                            });
                        }
                    }
                });
            });
            
            return measurements;
        });

        console.log('🎵 Spotify card measurements:', spotifyCardInfo.slice(0, 5));

        // Keep browser open for manual inspection
        console.log('🔍 Browser windows are open for manual inspection');
        console.log('📊 Comparison Summary:');
        
        if (joshifyCardInfo.length > 0 && spotifyCardInfo.length > 0) {
            const avgJoshifyRatio = joshifyCardInfo.reduce((sum, card) => sum + parseFloat(card.ratio), 0) / joshifyCardInfo.length;
            const avgSpotifyRatio = spotifyCardInfo.reduce((sum, card) => sum + parseFloat(card.ratio), 0) / spotifyCardInfo.length;
            
            console.log(`Average Joshify card ratio: ${avgJoshifyRatio.toFixed(2)}`);
            console.log(`Average Spotify card ratio: ${avgSpotifyRatio.toFixed(2)}`);
            console.log(`Ratio difference: ${(avgJoshifyRatio - avgSpotifyRatio).toFixed(2)}`);
        }

        // Save detailed comparison data
        const comparisonData = {
            timestamp: new Date().toISOString(),
            viewport: { width: 1440, height: 900 },
            joshify: {
                url: 'http://localhost:3001',
                cards: joshifyCardInfo
            },
            spotify: {
                url: 'https://open.spotify.com',
                cards: spotifyCardInfo
            }
        };

        fs.writeFileSync(
            `${screenshotsDir}/comparison_data.json`,
            JSON.stringify(comparisonData, null, 2)
        );

        console.log('✅ Screenshots and data saved to:', screenshotsDir);
        console.log('🎯 Press any key in the terminal to close browsers...');
        
        // Wait for user input before closing
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', async () => {
            await browser.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Error during comparison:', error);
        await browser.close();
    }
}

compareJoshifyVsSpotify().catch(console.error);