import { chromium } from 'playwright';
import fs from 'fs';

async function measureCardDimensions() {
    console.log('🔍 Enhanced Card Dimension Analysis');
    
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500,
        args: ['--start-maximized']
    });

    try {
        const screenshotsDir = './enhanced_comparison';
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }

        // Analyze Joshify
        console.log('📱 Analyzing Joshify cards...');
        const joshifyPage = await browser.newPage();
        await joshifyPage.setViewportSize({ width: 1440, height: 900 });
        await joshifyPage.goto('http://localhost:3001', { waitUntil: 'networkidle' });
        await joshifyPage.waitForTimeout(2000);

        // Get precise measurements of Joshify cards
        const joshifyMeasurements = await joshifyPage.evaluate(() => {
            const measurements = {
                mainSections: [],
                cardContainers: [],
                individualCards: []
            };

            // Measure main card sections
            const sections = document.querySelectorAll('[class*="grid"], section, .space-y-6 > div');
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.width > 100 && rect.height > 50) { // Filter meaningful sections
                    measurements.mainSections.push({
                        index,
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        className: section.className,
                        tagName: section.tagName
                    });
                }
            });

            // Measure card containers (the individual card items)
            const cardSelectors = [
                '.grid > div', // Grid items
                '[class*="card"]', // Card classes
                '.bg-zinc-800', // Dark card backgrounds
                '.bg-gray-900', // Alternative dark backgrounds
                '.rounded-md', // Rounded card elements
                '.aspect-square' // Square aspect elements
            ];

            cardSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((element, index) => {
                    const rect = element.getBoundingClientRect();
                    const styles = window.getComputedStyle(element);
                    
                    if (rect.width > 50 && rect.height > 50) {
                        measurements.cardContainers.push({
                            selector,
                            index,
                            width: Math.round(rect.width),
                            height: Math.round(rect.height),
                            ratio: (rect.width / rect.height).toFixed(2),
                            aspectRatio: styles.aspectRatio,
                            padding: styles.padding,
                            margin: styles.margin,
                            className: element.className,
                            textContent: element.textContent?.slice(0, 50) + '...'
                        });
                    }
                });
            });

            return measurements;
        });

        // Take annotated screenshot of Joshify
        await joshifyPage.addStyleTag({
            content: `
                .debug-outline {
                    outline: 2px solid red !important;
                    outline-offset: 2px;
                }
                .debug-label {
                    position: absolute;
                    background: red;
                    color: white;
                    padding: 2px 4px;
                    font-size: 10px;
                    z-index: 9999;
                }
            `
        });

        await joshifyPage.evaluate(() => {
            // Add debug outlines to cards
            const cards = document.querySelectorAll('.grid > div, .bg-zinc-800, .bg-gray-900');
            cards.forEach((card, index) => {
                if (index < 10) {
                    card.classList.add('debug-outline');
                    const rect = card.getBoundingClientRect();
                    const label = document.createElement('div');
                    label.className = 'debug-label';
                    label.textContent = `${Math.round(rect.width)}x${Math.round(rect.height)}`;
                    label.style.left = rect.left + 'px';
                    label.style.top = rect.top + 'px';
                    document.body.appendChild(label);
                }
            });
        });

        await joshifyPage.screenshot({ 
            path: `${screenshotsDir}/joshify_annotated.png`,
            fullPage: true 
        });

        // Analyze Spotify
        console.log('🎵 Analyzing Spotify cards...');
        const spotifyPage = await browser.newPage();
        await spotifyPage.setViewportSize({ width: 1440, height: 900 });
        await spotifyPage.goto('https://open.spotify.com', { waitUntil: 'networkidle' });
        await spotifyPage.waitForTimeout(3000);

        const spotifyMeasurements = await spotifyPage.evaluate(() => {
            const measurements = {
                mainSections: [],
                cardContainers: []
            };

            // Measure Spotify's main grid sections
            const gridSections = document.querySelectorAll('[data-testid*="grid"], .main-view-container__scroll-node > div > section');
            gridSections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.width > 100 && rect.height > 50) {
                    measurements.mainSections.push({
                        index,
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        className: section.className,
                        testId: section.getAttribute('data-testid')
                    });
                }
            });

            // Measure individual cards in the browse grid
            const browseCards = document.querySelectorAll('div[style*="background"], a[href*="/genre/"], a[href*="/playlist/"]');
            browseCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const styles = window.getComputedStyle(card);
                
                if (rect.width > 100 && rect.height > 100 && index < 20) { // Focus on larger cards
                    measurements.cardContainers.push({
                        index,
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        ratio: (rect.width / rect.height).toFixed(2),
                        className: card.className,
                        href: card.href || 'N/A',
                        textContent: card.textContent?.slice(0, 30) + '...'
                    });
                }
            });

            return measurements;
        });

        // Create detailed comparison report
        const comparisonReport = {
            timestamp: new Date().toISOString(),
            viewport: { width: 1440, height: 900 },
            analysis: {
                joshify: {
                    url: 'http://localhost:3001',
                    measurements: joshifyMeasurements
                },
                spotify: {
                    url: 'https://open.spotify.com',
                    measurements: spotifyMeasurements
                }
            },
            summary: {
                joshifyCardCount: joshifyMeasurements.cardContainers.length,
                spotifyCardCount: spotifyMeasurements.cardContainers.length,
                analysis: []
            }
        };

        // Calculate averages and differences
        if (joshifyMeasurements.cardContainers.length > 0) {
            const joshifyCards = joshifyMeasurements.cardContainers;
            const avgJoshifyWidth = joshifyCards.reduce((sum, card) => sum + card.width, 0) / joshifyCards.length;
            const avgJoshifyHeight = joshifyCards.reduce((sum, card) => sum + card.height, 0) / joshifyCards.length;
            const avgJoshifyRatio = joshifyCards.reduce((sum, card) => sum + parseFloat(card.ratio), 0) / joshifyCards.length;

            comparisonReport.summary.joshify = {
                avgWidth: Math.round(avgJoshifyWidth),
                avgHeight: Math.round(avgJoshifyHeight),
                avgRatio: avgJoshifyRatio.toFixed(2),
                cardCount: joshifyCards.length
            };
        }

        if (spotifyMeasurements.cardContainers.length > 0) {
            const spotifyCards = spotifyMeasurements.cardContainers;
            const avgSpotifyWidth = spotifyCards.reduce((sum, card) => sum + card.width, 0) / spotifyCards.length;
            const avgSpotifyHeight = spotifyCards.reduce((sum, card) => sum + card.height, 0) / spotifyCards.length;
            const avgSpotifyRatio = spotifyCards.reduce((sum, card) => sum + parseFloat(card.ratio), 0) / spotifyCards.length;

            comparisonReport.summary.spotify = {
                avgWidth: Math.round(avgSpotifyWidth),
                avgHeight: Math.round(avgSpotifyHeight),
                avgRatio: avgSpotifyRatio.toFixed(2),
                cardCount: spotifyCards.length
            };

            // Compare if we have both sets of data
            if (comparisonReport.summary.joshify) {
                const widthDiff = comparisonReport.summary.joshify.avgWidth - comparisonReport.summary.spotify.avgWidth;
                const heightDiff = comparisonReport.summary.joshify.avgHeight - comparisonReport.summary.spotify.avgHeight;
                const ratioDiff = parseFloat(comparisonReport.summary.joshify.avgRatio) - parseFloat(comparisonReport.summary.spotify.avgRatio);

                comparisonReport.summary.differences = {
                    widthDifference: widthDiff,
                    heightDifference: heightDiff,
                    ratioDifference: ratioDiff.toFixed(2),
                    analysis: widthDiff > 0 ? 'Joshify cards are wider' : 'Spotify cards are wider'
                };
            }
        }

        // Save detailed report
        fs.writeFileSync(
            `${screenshotsDir}/detailed_comparison.json`,
            JSON.stringify(comparisonReport, null, 2)
        );

        // Print summary
        console.log('\n📊 CARD DIMENSION COMPARISON RESULTS:');
        console.log('=' .repeat(50));
        
        if (comparisonReport.summary.joshify) {
            console.log(`\n🎯 JOSHIFY CARDS:`);
            console.log(`   Average Width: ${comparisonReport.summary.joshify.avgWidth}px`);
            console.log(`   Average Height: ${comparisonReport.summary.joshify.avgHeight}px`);
            console.log(`   Average Ratio: ${comparisonReport.summary.joshify.avgRatio}`);
            console.log(`   Cards Measured: ${comparisonReport.summary.joshify.cardCount}`);
        }

        if (comparisonReport.summary.spotify) {
            console.log(`\n🎵 SPOTIFY CARDS:`);
            console.log(`   Average Width: ${comparisonReport.summary.spotify.avgWidth}px`);
            console.log(`   Average Height: ${comparisonReport.summary.spotify.avgHeight}px`);
            console.log(`   Average Ratio: ${comparisonReport.summary.spotify.avgRatio}`);
            console.log(`   Cards Measured: ${comparisonReport.summary.spotify.cardCount}`);
        }

        if (comparisonReport.summary.differences) {
            console.log(`\n🔍 DIFFERENCES:`);
            console.log(`   Width Difference: ${comparisonReport.summary.differences.widthDifference}px`);
            console.log(`   Height Difference: ${comparisonReport.summary.differences.heightDifference}px`);
            console.log(`   Ratio Difference: ${comparisonReport.summary.differences.ratioDifference}`);
            console.log(`   ${comparisonReport.summary.differences.analysis}`);
        }

        console.log(`\n✅ Detailed analysis saved to: ${screenshotsDir}/`);
        console.log('📸 Screenshots with annotations created');
        
        // Keep browsers open for 10 seconds for manual inspection
        console.log('\n🔍 Browsers will remain open for 10 seconds for inspection...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
    } catch (error) {
        console.error('❌ Error during enhanced analysis:', error);
    } finally {
        await browser.close();
    }
}

measureCardDimensions().catch(console.error);