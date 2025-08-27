import { chromium } from 'playwright';

async function testAdaptiveCardLogic() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🎯 Testing AdaptiveCardGrid Logic');
  console.log('==================================\n');
  
  // Test at mobile width where horizontal scroll should definitely trigger
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait for the page to load and find the Recently Played section
  await page.waitForSelector('text=Good', { timeout: 5000 });
  
  // First, let's find the AdaptiveCardGrid specifically
  const adaptiveGridAnalysis = await page.evaluate(() => {
    // Look for the first AdaptiveCardGrid usage (recently played)
    const greetingElement = document.querySelector('h1');
    if (!greetingElement) return { error: 'No greeting found' };
    
    // Find the next sibling which should be the AdaptiveCardGrid
    let currentElement = greetingElement.nextElementSibling;
    let attempts = 0;
    
    while (currentElement && attempts < 5) {
      const childCount = currentElement.children ? currentElement.children.length : 0;
      
      // Look for the container with project cards
      if (childCount >= 4) {
        const style = window.getComputedStyle(currentElement);
        const hasCards = Array.from(currentElement.querySelectorAll('*')).some(el => 
          el.textContent && (
            el.textContent.includes('Sportsmans') ||
            el.textContent.includes('DeepBench') ||
            el.textContent.includes('did-kansas-win') ||
            el.textContent.includes('Matomo')
          )
        );
        
        if (hasCards) {
          return {
            found: true,
            display: style.display,
            containerWidth: currentElement.offsetWidth,
            childCount: childCount,
            className: currentElement.className,
            isGrid: style.display === 'grid' || currentElement.className.includes('grid'),
            isFlex: style.display === 'flex' || currentElement.className.includes('flex'),
            overflowX: style.overflowX,
            scrollWidth: currentElement.scrollWidth,
            clientWidth: currentElement.clientWidth,
            children: Array.from(currentElement.children).map((child, i) => ({
              index: i,
              className: child.className,
              width: child.offsetWidth,
              textContent: child.textContent ? child.textContent.substring(0, 50) + '...' : ''
            }))
          };
        }
      }
      
      currentElement = currentElement.nextElementSibling;
      attempts++;
    }
    
    return { error: 'AdaptiveCardGrid container not found' };
  });
  
  if (adaptiveGridAnalysis.error) {
    console.log(`❌ ${adaptiveGridAnalysis.error}`);
  } else {
    console.log('✅ Found AdaptiveCardGrid container:');
    console.log(`   📐 Display: ${adaptiveGridAnalysis.display}`);
    console.log(`   📏 Container Width: ${adaptiveGridAnalysis.containerWidth}px`);
    console.log(`   🃏 Child Count: ${adaptiveGridAnalysis.childCount}`);
    console.log(`   📱 Classes: ${adaptiveGridAnalysis.className}`);
    console.log(`   ↔️ Overflow X: ${adaptiveGridAnalysis.overflowX}`);
    console.log(`   📊 Scroll vs Client: ${adaptiveGridAnalysis.scrollWidth}px vs ${adaptiveGridAnalysis.clientWidth}px`);
    console.log(`   🏗️ Layout Type: ${adaptiveGridAnalysis.isGrid ? 'Grid' : adaptiveGridAnalysis.isFlex ? 'Flex' : 'Other'}`);
    
    console.log('\n🃏 Children Analysis:');
    adaptiveGridAnalysis.children.forEach(child => {
      console.log(`   Card ${child.index}: ${child.width}px wide - "${child.textContent}"`);
    });
    
    // Calculate if horizontal scroll should be active
    const cardWidth = 188;
    const gap = 16;
    const containerWidth = adaptiveGridAnalysis.containerWidth;
    const maxRows = 2;
    const itemCount = adaptiveGridAnalysis.childCount;
    
    const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap));
    const maxVisibleCards = cardsPerRow * maxRows;
    const shouldShowHorizontalScroll = itemCount > maxVisibleCards;
    
    console.log('\n🧮 Calculation Analysis:');
    console.log(`   📏 Container Width: ${containerWidth}px`);
    console.log(`   🃏 Card Width: ${cardWidth}px`);
    console.log(`   📐 Gap: ${gap}px`);
    console.log(`   🔢 Cards per Row: ${cardsPerRow}`);
    console.log(`   📊 Max Rows: ${maxRows}`);
    console.log(`   🎯 Max Visible Cards: ${maxVisibleCards}`);
    console.log(`   📦 Total Items: ${itemCount}`);
    console.log(`   🔄 Should Show Horizontal Scroll: ${shouldShowHorizontalScroll}`);
    console.log(`   ⚠️ Logic Issue: ${!shouldShowHorizontalScroll && adaptiveGridAnalysis.isGrid ? 'Cards fit in grid, no scroll needed' : 'Working as expected'}`);
  }
  
  // Test with different screen sizes
  console.log('\n📱 Testing Across Multiple Widths...');
  const widths = [320, 375, 414, 768, 1024];
  
  for (const width of widths) {
    await page.setViewportSize({ width, height: 568 });
    await page.waitForTimeout(300);
    
    const widthAnalysis = await page.evaluate(() => {
      const greetingElement = document.querySelector('h1');
      if (!greetingElement) return null;
      
      let currentElement = greetingElement.nextElementSibling;
      let attempts = 0;
      
      while (currentElement && attempts < 5) {
        const childCount = currentElement.children ? currentElement.children.length : 0;
        if (childCount >= 4) {
          const hasCards = Array.from(currentElement.querySelectorAll('*')).some(el => 
            el.textContent && (el.textContent.includes('Sportsmans') || el.textContent.includes('DeepBench'))
          );
          
          if (hasCards) {
            const style = window.getComputedStyle(currentElement);
            return {
              width: currentElement.offsetWidth,
              display: style.display,
              isFlex: style.display === 'flex',
              overflowX: style.overflowX
            };
          }
        }
        currentElement = currentElement.nextElementSibling;
        attempts++;
      }
      return null;
    });
    
    if (widthAnalysis) {
      const cardWidth = 188;
      const gap = 16;
      const cardsPerRow = Math.floor((widthAnalysis.width + gap) / (cardWidth + gap));
      const maxVisibleCards = cardsPerRow * 2; // maxRows = 2
      const shouldScroll = 5 > maxVisibleCards; // We have 5 cards
      
      console.log(`   ${width}px: ${cardsPerRow} cards/row, max ${maxVisibleCards} visible, should scroll: ${shouldScroll}, display: ${widthAnalysis.display}`);
    }
  }
  
  await browser.close();
  console.log('\n✅ Logic testing completed!');
}

testAdaptiveCardLogic().catch(console.error);
