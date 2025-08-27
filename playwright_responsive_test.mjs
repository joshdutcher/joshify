import { chromium } from 'playwright';

async function testResponsiveCardGrid() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Array of viewport sizes to test
  const viewports = [
    { width: 320, height: 568, label: 'Mobile Portrait (iPhone SE)' },
    { width: 768, height: 1024, label: 'Tablet Portrait (iPad)' },
    { width: 1024, height: 768, label: 'Tablet Landscape' },
    { width: 1440, height: 900, label: 'Desktop Standard' },
    { width: 1920, height: 1080, label: 'Desktop Large' }
  ];
  
  console.log('🎯 Starting Responsive Card Grid Tests for Joshify');
  console.log('================================================\n');
  
  for (const viewport of viewports) {
    console.log(`📱 Testing ${viewport.label} (${viewport.width}x${viewport.height})`);
    
    // Set viewport
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    
    // Navigate to localhost:3000
    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      console.log('   ✅ Page loaded successfully');
      
      // Wait for content to load
      await page.waitForSelector('[data-testid="recently-played"], .grid, [class*="grid"]', { timeout: 10000 });
      
      // Look for Recently Played section
      const recentlyPlayedExists = await page.locator('text=Recently Played').first().isVisible().catch(() => false);
      console.log(`   📊 Recently Played section: ${recentlyPlayedExists ? 'Found' : 'Not found'}`);
      
      // Check for grid containers
      const gridContainers = await page.locator('.grid, [class*="grid"]').count();
      console.log(`   🗂️ Grid containers found: ${gridContainers}`);
      
      // Check for card elements
      const cardElements = await page.locator('[class*="card"], [class*="p-2"], [class*="p-4"]').count();
      console.log(`   🃏 Card-like elements found: ${cardElements}`);
      
      // Check for overflow or scroll containers
      const scrollContainers = await page.locator('[class*="overflow-x"], [class*="scroll"]').count();
      console.log(`   🔄 Scroll containers found: ${scrollContainers}`);
      
      // Take screenshot
      const screenshotPath = `screenshot_${viewport.width}x${viewport.height}.png`;
      await page.screenshot({ 
        path: screenshotPath, 
        fullPage: false,
        clip: { x: 0, y: 0, width: viewport.width, height: Math.min(viewport.height, 1200) }
      });
      console.log(`   📸 Screenshot saved: ${screenshotPath}`);
      
      // Test scroll functionality if narrow viewport
      if (viewport.width <= 768) {
        console.log('   🔍 Testing narrow viewport behavior...');
        
        // Look for horizontal scroll elements
        const horizontalScrollElements = await page.locator('[class*="overflow-x-auto"], [class*="overflow-x-scroll"]').count();
        console.log(`     📜 Horizontal scroll elements: ${horizontalScrollElements}`);
        
        // Check if we can scroll horizontally in any container
        const scrollableContainers = await page.$$eval(
          '[class*="overflow-x"], .grid',
          elements => {
            return elements.filter(el => {
              const style = window.getComputedStyle(el);
              return style.overflowX === 'auto' || style.overflowX === 'scroll' || el.scrollWidth > el.clientWidth;
            }).length;
          }
        ).catch(() => 0);
        
        console.log(`     ↔️ Actually scrollable containers: ${scrollableContainers}`);
      }
      
      // Analyze card grid layout
      const cardAnalysis = await page.evaluate(() => {
        const grids = document.querySelectorAll('.grid, [class*="grid"]');
        const analysis = [];
        
        grids.forEach((grid, index) => {
          const computedStyle = window.getComputedStyle(grid);
          const children = grid.children.length;
          
          analysis.push({
            index,
            children,
            display: computedStyle.display,
            gridTemplateColumns: computedStyle.gridTemplateColumns,
            gap: computedStyle.gap,
            overflowX: computedStyle.overflowX,
            width: grid.clientWidth,
            scrollWidth: grid.scrollWidth
          });
        });
        
        return analysis;
      });
      
      if (cardAnalysis.length > 0) {
        console.log('   🏗️ Grid Layout Analysis:');
        cardAnalysis.forEach((grid, i) => {
          console.log(`     Grid ${i}: ${grid.children} items, columns: ${grid.gridTemplateColumns || 'auto'}`);
          if (grid.scrollWidth > grid.width) {
            console.log(`     ⚠️  Grid ${i} is scrollable (${grid.scrollWidth}px > ${grid.width}px)`);
          }
        });
      }
      
    } catch (error) {
      console.log(`   ❌ Error testing ${viewport.label}: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Additional test: Check for scroll buttons
  console.log('🔘 Testing for scroll navigation buttons...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const scrollButtons = await page.locator('button[class*="scroll"], [role="button"][class*="arrow"], button:has(svg)').count();
  console.log(`   🔘 Potential scroll buttons found: ${scrollButtons}`);
  
  // Test button functionality if found
  if (scrollButtons > 0) {
    console.log('   🧪 Testing button interactions...');
    const buttons = await page.locator('button[class*="scroll"], [role="button"][class*="arrow"], button:has(svg)').all();
    
    for (let i = 0; i < Math.min(buttons.length, 4); i++) {
      try {
        const button = buttons[i];
        const isVisible = await button.isVisible();
        const isEnabled = await button.isEnabled();
        console.log(`     Button ${i+1}: visible=${isVisible}, enabled=${isEnabled}`);
        
        if (isVisible && isEnabled) {
          await button.click();
          await page.waitForTimeout(500); // Wait for scroll animation
          console.log(`     ✅ Button ${i+1} clicked successfully`);
        }
      } catch (error) {
        console.log(`     ⚠️ Button ${i+1} interaction failed: ${error.message}`);
      }
    }
  }
  
  await browser.close();
  console.log('\n🎉 Responsive testing completed!');
}

testResponsiveCardGrid().catch(console.error);
