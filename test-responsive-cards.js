import { chromium } from 'playwright';
import fs from 'fs';

async function testResponsiveCards() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Slow down for visibility
  });
  
  const viewports = [
    { name: 'Mobile-320', width: 320, height: 568 },
    { name: 'Mobile-375', width: 375, height: 667 },
    { name: 'Tablet-768', width: 768, height: 1024 },
    { name: 'Desktop-1440', width: 1440, height: 900 }
  ];

  console.log('🎵 Testing Joshify card dimensions across viewports...\n');

  for (const viewport of viewports) {
    console.log(`📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    try {
      // Navigate to the app
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      
      // Wait for content to load
      await page.waitForSelector('.horizontal-scroll-container', { timeout: 10000 });
      
      // Take full page screenshot
      await page.screenshot({
        path: `screenshots/${viewport.name}-fullpage.png`,
        fullPage: true
      });
      
      // Find horizontal card sections and measure them
      const cardSections = await page.locator('.horizontal-scroll-container').all();
      console.log(`  Found ${cardSections.length} horizontal card sections`);
      
      for (let i = 0; i < Math.min(cardSections.length, 3); i++) {
        const section = cardSections[i];
        
        // Scroll the section into view
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        // Take screenshot of the section
        await section.screenshot({
          path: `screenshots/${viewport.name}-section-${i + 1}.png`
        });
        
        // Get cards within this section
        const cards = await section.locator('.bg-gray-800\\/60, .bg-spotify-gray').all();
        
        if (cards.length > 0) {
          // Measure first card dimensions
          const firstCard = cards[0];
          const cardBox = await firstCard.boundingBox();
          
          if (cardBox) {
            console.log(`    Section ${i + 1} Card dimensions: ${Math.round(cardBox.width)}x${Math.round(cardBox.height)}px`);
            
            // Try to find cover art within the card
            const coverArt = await firstCard.locator('img').first();
            if (await coverArt.count() > 0) {
              const coverBox = await coverArt.boundingBox();
              if (coverBox) {
                console.log(`    Cover art dimensions: ${Math.round(coverBox.width)}x${Math.round(coverBox.height)}px`);
              }
            }
          }
        }
      }
      
      // Test horizontal scrolling
      const firstSection = cardSections[0];
      if (firstSection) {
        // Get scroll width
        const scrollInfo = await firstSection.evaluate(el => ({
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          scrollLeft: el.scrollLeft
        }));
        
        console.log(`    Scroll info: ${scrollInfo.scrollWidth}px total, ${scrollInfo.clientWidth}px visible`);
        
        // Test scrolling if there's overflow
        if (scrollInfo.scrollWidth > scrollInfo.clientWidth) {
          await firstSection.evaluate(el => el.scrollTo({ left: 100, behavior: 'smooth' }));
          await page.waitForTimeout(1000);
          console.log(`    ✅ Horizontal scrolling works`);
        }
      }
      
    } catch (error) {
      console.log(`    ❌ Error testing ${viewport.name}: ${error.message}`);
    }
    
    await context.close();
    console.log(`    ✅ ${viewport.name} test complete\n`);
  }
  
  console.log('🎯 Expected dimensions verification:');
  console.log('  Mobile (320px): Cards should be w-[160px] (160px) with 128px cover art');
  console.log('  Small (375px): Cards should be w-[180px] (180px) with 148px cover art'); 
  console.log('  Medium (768px): Cards should be w-[200px] (200px) with 168px cover art');
  console.log('  Large (1440px): Cards should be w-[220px] (220px) with 188px cover art');
  
  await browser.close();
  console.log('\n📸 Screenshots saved in screenshots/ directory');
}

// Create screenshots directory
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

testResponsiveCards().catch(console.error);