import { chromium } from 'playwright';

async function analyzeCardGridImplementation() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🔍 Detailed AdaptiveCardGrid Analysis');
  console.log('=====================================\n');
  
  // Test at mobile width where 2-row constraint should be most evident
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Focus on Recently Played section
  console.log('📊 Analyzing Recently Played Section...');
  
  const recentlyPlayedAnalysis = await page.evaluate(() => {
    // Find Recently Played section
    const recentlyPlayedHeader = Array.from(document.querySelectorAll('*')).find(
      el => el.textContent && el.textContent.includes('Recently Played')
    );
    
    if (!recentlyPlayedHeader) {
      return { error: 'Recently Played section not found' };
    }
    
    // Find the associated grid container
    let gridContainer = recentlyPlayedHeader.parentElement;
    let attempts = 0;
    while (gridContainer && attempts < 10) {
      const nextSibling = gridContainer.nextElementSibling;
      if (nextSibling && (nextSibling.classList.contains('grid') || nextSibling.querySelector('.grid'))) {
        gridContainer = nextSibling.classList.contains('grid') ? nextSibling : nextSibling.querySelector('.grid');
        break;
      }
      gridContainer = gridContainer.parentElement;
      attempts++;
    }
    
    if (!gridContainer || !gridContainer.classList.contains('grid')) {
      // Try to find any grid near the Recently Played text
      gridContainer = recentlyPlayedHeader.closest('section, div')?.querySelector('.grid');
    }
    
    if (!gridContainer) {
      return { error: 'Could not find grid container for Recently Played' };
    }
    
    const style = window.getComputedStyle(gridContainer);
    const cards = Array.from(gridContainer.children);
    
    // Analyze card properties
    const cardAnalysis = cards.slice(0, 6).map((card, index) => {
      const cardStyle = window.getComputedStyle(card);
      const rect = card.getBoundingClientRect();
      
      return {
        index,
        width: rect.width,
        height: rect.height,
        padding: cardStyle.padding,
        margin: cardStyle.margin,
        hasP2Class: card.className.includes('p-2'),
        hasP4Class: card.className.includes('p-4'),
        className: card.className
      };
    });
    
    // Calculate approximate rows based on card positions
    const rows = new Map();
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const rowKey = Math.floor(rect.top / 10) * 10; // Group by approximate Y position
      if (!rows.has(rowKey)) rows.set(rowKey, []);
      rows.get(rowKey).push({ index, top: rect.top, left: rect.left });
    });
    
    return {
      gridColumns: style.gridTemplateColumns,
      gridRows: style.gridTemplateRows,
      gap: style.gap,
      overflowX: style.overflowX,
      overflowY: style.overflowY,
      width: gridContainer.clientWidth,
      scrollWidth: gridContainer.scrollWidth,
      height: gridContainer.clientHeight,
      scrollHeight: gridContainer.scrollHeight,
      cardCount: cards.length,
      detectedRows: rows.size,
      cardAnalysis,
      isScrollable: gridContainer.scrollWidth > gridContainer.clientWidth,
      containerClasses: gridContainer.className
    };
  });
  
  if (recentlyPlayedAnalysis.error) {
    console.log(`❌ ${recentlyPlayedAnalysis.error}`);
  } else {
    console.log('✅ Recently Played Grid Analysis:');
    console.log(`   📐 Grid Columns: ${recentlyPlayedAnalysis.gridColumns}`);
    console.log(`   📐 Grid Rows: ${recentlyPlayedAnalysis.gridRows || 'auto'}`);
    console.log(`   📏 Gap: ${recentlyPlayedAnalysis.gap}`);
    console.log(`   🃏 Card Count: ${recentlyPlayedAnalysis.cardCount}`);
    console.log(`   📊 Detected Rows: ${recentlyPlayedAnalysis.detectedRows}`);
    console.log(`   ↔️ Is Scrollable: ${recentlyPlayedAnalysis.isScrollable}`);
    console.log(`   📱 Container Classes: ${recentlyPlayedAnalysis.containerClasses}`);
    
    if (recentlyPlayedAnalysis.cardAnalysis.length > 0) {
      console.log('\n🃏 Card Analysis:');
      recentlyPlayedAnalysis.cardAnalysis.forEach(card => {
        console.log(`   Card ${card.index}: ${Math.round(card.width)}x${Math.round(card.height)}px, padding: ${card.padding}`);
        if (card.hasP2Class) console.log(`     ✅ Uses p-2 padding`);
        if (card.hasP4Class) console.log(`     ⚠️ Still uses p-4 padding`);
      });
    }
  }
  
  // Test scroll behavior at different widths
  console.log('\n🔄 Testing Scroll Behavior...');
  
  const scrollTests = [320, 375, 414, 768];
  
  for (const width of scrollTests) {
    await page.setViewportSize({ width, height: 812 });
    await page.waitForTimeout(500);
    
    const scrollInfo = await page.evaluate(() => {
      const grids = document.querySelectorAll('.grid');
      const scrollableGrids = [];
      
      grids.forEach((grid, index) => {
        if (grid.scrollWidth > grid.clientWidth) {
          const style = window.getComputedStyle(grid);
          scrollableGrids.push({
            index,
            clientWidth: grid.clientWidth,
            scrollWidth: grid.scrollWidth,
            overflowX: style.overflowX,
            canScroll: grid.scrollWidth > grid.clientWidth
          });
        }
      });
      
      return scrollableGrids;
    });
    
    console.log(`   📱 ${width}px width: ${scrollInfo.length} scrollable grids`);
    scrollInfo.forEach(grid => {
      console.log(`     Grid ${grid.index}: ${grid.clientWidth}px → ${grid.scrollWidth}px (overflow: ${grid.overflowX})`);
    });
  }
  
  // Test maximum 2-row constraint
  console.log('\n📏 Testing 2-Row Constraint...');
  
  await page.setViewportSize({ width: 375, height: 812 });
  
  const rowConstraintTest = await page.evaluate(() => {
    const grids = document.querySelectorAll('.grid');
    const rowAnalysis = [];
    
    grids.forEach((grid, gridIndex) => {
      if (grid.children.length === 0) return;
      
      // Group cards by their vertical position to count rows
      const cardPositions = Array.from(grid.children).map(card => {
        const rect = card.getBoundingClientRect();
        return { top: rect.top, height: rect.height };
      });
      
      // Group by similar Y positions (within 20px tolerance)
      const rows = [];
      cardPositions.forEach(pos => {
        const existingRow = rows.find(row => 
          Math.abs(row.averageTop - pos.top) <= 20
        );
        
        if (existingRow) {
          existingRow.cards.push(pos);
          existingRow.averageTop = existingRow.cards.reduce((sum, card) => sum + card.top, 0) / existingRow.cards.length;
        } else {
          rows.push({ cards: [pos], averageTop: pos.top });
        }
      });
      
      if (rows.length > 0) {
        rowAnalysis.push({
          gridIndex,
          cardCount: grid.children.length,
          rowCount: rows.length,
          exceedsMaxRows: rows.length > 2,
          gridClasses: grid.className
        });
      }
    });
    
    return rowAnalysis;
  });
  
  rowConstraintTest.forEach(analysis => {
    console.log(`   Grid ${analysis.gridIndex}: ${analysis.rowCount} rows (${analysis.cardCount} cards)`);
    if (analysis.exceedsMaxRows) {
      console.log(`     ⚠️ Exceeds 2-row maximum!`);
    } else {
      console.log(`     ✅ Within 2-row constraint`);
    }
  });
  
  await browser.close();
  console.log('\n✅ Detailed analysis completed!');
}

analyzeCardGridImplementation().catch(console.error);
