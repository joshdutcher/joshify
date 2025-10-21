# Playwright MCP Documentation

Comprehensive guide for using Playwright MCP (Model Context Protocol) for browser automation in Claude Code sessions.

## Overview

Playwright MCP enables AI assistants to control web browsers for automation tasks including:
- Web page navigation and interaction
- Form filling and element clicking
- Screenshot and accessibility testing
- Tab management and file operations
- E2E test generation

**Current Status**: ✅ Chromium browser installed and functional in WSL2 environment
- Available for immediate use in all projects
- Tested with local development servers (localhost access verified)
- Full MCP server integration confirmed

## Core Browser Operations

### Navigation & Page Control

#### Navigate to URL
```bash
mcp__playwright__browser_navigate
- url (string): The URL to navigate to
```

#### Back/Forward Navigation
```bash
mcp__playwright__browser_navigate_back  # Go to previous page
mcp__playwright__browser_navigate_forward  # Go to next page
```

#### Browser Window Management
```bash
mcp__playwright__browser_resize
- width (number): Browser window width
- height (number): Browser window height

mcp__playwright__browser_close  # Close the browser page
```

### Page Interaction

#### Take Page Snapshot
```bash
mcp__playwright__browser_snapshot
# Captures accessibility snapshot - preferred over screenshots for actions
```

#### Click Elements
```bash
mcp__playwright__browser_click
- element (string): Human-readable element description
- ref (string): Exact element reference from page snapshot
- doubleClick (boolean, optional): Perform double-click
- button (enum, optional): left|right|middle (default: left)
```

#### Type Text
```bash
mcp__playwright__browser_type
- element (string): Element description
- ref (string): Element reference
- text (string): Text to type
- submit (boolean, optional): Press Enter after typing
- slowly (boolean, optional): Type character by character
```

#### Hover Over Elements
```bash
mcp__playwright__browser_hover
- element (string): Element description  
- ref (string): Element reference
```

#### Drag and Drop
```bash
mcp__playwright__browser_drag
- startElement (string): Source element description
- startRef (string): Source element reference
- endElement (string): Target element description
- endRef (string): Target element reference
```

### Form Interactions

#### Select Dropdown Options
```bash
mcp__playwright__browser_select_option
- element (string): Element description
- ref (string): Element reference
- values (array): Values to select (supports multi-select)
```

#### File Upload
```bash
mcp__playwright__browser_file_upload
- paths (array): Absolute paths to files for upload
```

### Keyboard Input

#### Press Keys
```bash
mcp__playwright__browser_press_key
- key (string): Key name (e.g., "ArrowLeft", "Enter", "Tab") or character
```

### Dialog Handling

#### Handle Browser Dialogs
```bash
mcp__playwright__browser_handle_dialog
- accept (boolean): Accept or dismiss dialog
- promptText (string, optional): Text for prompt dialogs
```

### Tab Management

#### List Tabs
```bash
mcp__playwright__browser_tab_list
# Returns list of all browser tabs
```

#### Create New Tab
```bash
mcp__playwright__browser_tab_new
- url (string, optional): URL for new tab (blank if not provided)
```

#### Switch Tabs
```bash
mcp__playwright__browser_tab_select
- index (number): Tab index to select
```

#### Close Tab
```bash
mcp__playwright__browser_tab_close
- index (number, optional): Tab index to close (current tab if not provided)
```

## Testing & Debugging

### Screenshots & Visual Testing
```bash
mcp__playwright__browser_take_screenshot
- filename (string, optional): Save filename (auto-generated if not provided)
- element (string, optional): Element description for partial screenshot
- ref (string, optional): Element reference for partial screenshot  
- fullPage (boolean, optional): Capture full scrollable page
- type (enum, optional): png|jpeg (default: png)
```

### Network & Console Monitoring
```bash
mcp__playwright__browser_network_requests
# Returns all network requests since page load

mcp__playwright__browser_console_messages  
# Returns all console messages
```

### Wait Conditions
```bash
mcp__playwright__browser_wait_for
- time (number, optional): Wait time in seconds
- text (string, optional): Text to wait for
- textGone (string, optional): Text to wait for disappearance
```

### JavaScript Evaluation
```bash
mcp__playwright__browser_evaluate
- function (string): JavaScript function to execute
- element (string, optional): Element description for element-scoped execution
- ref (string, optional): Element reference for element-scoped execution
```

## Setup & Configuration

### Claude Desktop Configuration

Add to your Claude Desktop configuration:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "mcp-playwright"
      ]
    }
  }
}
```

### ⚡ Headless Mode Configuration (PREFERRED FOR CLAUDE AI TESTING)

**IMPORTANT**: For Claude AI automated testing, always use headless mode to avoid spawning browser windows:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--headless",
        "--isolated"
      ]
    }
  }
}
```

**Headless Mode Benefits**:
- ✅ No visible browser window during testing
- ✅ Better performance and resource usage
- ✅ Non-intrusive UI testing and automation
- ✅ All functionality preserved (screenshots, snapshots, interactions)
- ✅ Perfect for Claude AI development workflows

### VS Code Integration

```bash
# For VS Code
code --add-mcp '{"name":"playwright","type":"stdio","command":"npx","args":["mcp-playwright"]}'

# For VS Code Insiders  
code-insiders --add-mcp '{"name":"playwright","type":"stdio","command":"npx","args":["mcp-playwright"]}'
```

### Cloudflare Workers Remote Setup

For remote MCP server deployment:
```json
{
  "mcpServers": {
    "cloudflare-playwright": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://[your-mcp-url].workers.dev/sse"
      ]
    }
  }
}
```

## Best Practices

### Element Interaction Workflow
1. **Take snapshot first**: Always use `browser_snapshot` to see page structure
2. **Use descriptive element names**: Provide clear, human-readable element descriptions
3. **Reference by snapshot**: Use exact `ref` values from snapshot results
4. **Wait for conditions**: Use `browser_wait_for` for dynamic content

### Common Patterns

#### Basic Page Automation
```
1. browser_navigate → Navigate to target URL
2. browser_snapshot → Capture current page state  
3. browser_type → Fill form fields
4. browser_click → Submit or trigger actions
5. browser_wait_for → Wait for results
```

#### Testing Workflow
```
1. browser_navigate → Go to test target
2. browser_take_screenshot → Capture initial state
3. [Perform test actions]
4. browser_take_screenshot → Capture final state
5. browser_console_messages → Check for errors
```

### Performance Tips
- Use `browser_snapshot` instead of screenshots for element interaction
- Batch related operations when possible
- Use `browser_wait_for` to handle timing issues
- Leverage tab management for parallel operations

## Troubleshooting

### Common Issues

**Browser Not Installed**
```bash
mcp__playwright__browser_install
# Installs required browser if missing
```

**Element Not Found**
- Take fresh `browser_snapshot` to get current page state
- Use more specific element descriptions
- Wait for dynamic content with `browser_wait_for`

**Timing Issues**  
- Add explicit waits with `browser_wait_for`
- Use `slowly: true` for typing in reactive forms
- Check console messages for JavaScript errors

**Network Issues**
- Monitor requests with `browser_network_requests`
- Check for failed API calls or timeouts
- Verify localhost accessibility in WSL2

### Error Recovery
- Use `browser_navigate_back` to return to known state
- Create new tabs with `browser_tab_new` for fresh context
- Check `browser_console_messages` for JavaScript errors
- Take screenshots to debug visual state

## Use Cases for This Project

### Local Development Testing
- Test localhost:3000 hot reload functionality  
- Verify responsive design across viewport sizes
- Automate form testing and user workflows
- Capture visual regression screenshots

### UI Component Validation
- Test interactive components (buttons, forms, navigation)
- Verify accessibility features and keyboard navigation
- Automate user journey testing
- Generate test cases for complex workflows

### Performance Monitoring  
- Monitor network requests during development
- Capture console errors and warnings
- Test load performance on different connection speeds
- Automate performance regression testing

## Integration with SuperClaude Framework

### Auto-Activation
- **QA Persona**: Automatically enables Playwright for testing workflows
- **Performance Persona**: Uses for performance monitoring and benchmarking
- **Frontend Persona**: Leverages for UI testing and validation

### MCP Server Coordination
- **Primary**: Use for E2E testing and user interaction validation
- **Secondary**: Coordinate with Magic MCP for UI validation
- **Sequential**: Use with Sequential MCP for complex test planning

### Quality Gates Integration
- Step 5: Test validation with Playwright E2E testing
- Step 8: Integration testing and deployment validation
- Evidence generation through screenshots and performance metrics

## Practical Examples for This Project

### Example 1: Test Portfolio Loading
```
Goal: Verify main portfolio page loads correctly

1. browser_navigate → http://localhost:3000
2. browser_wait_for → text: "Collections" (left sidebar loaded)
3. browser_snapshot → Capture page structure
4. browser_take_screenshot → filename: "portfolio-home.png"
5. browser_console_messages → Check for errors
```

### Example 2: Test Search Functionality  
```
Goal: Verify search works in both locations

1. browser_navigate → http://localhost:3000
2. browser_snapshot → Get page structure
3. browser_type → element: "search bar", text: "mobile"
4. browser_wait_for → text: "Mobile API Rebuild"
5. browser_click → element: "top search clear button"
6. browser_type → element: "left sidebar search", text: "law"
7. browser_take_screenshot → filename: "search-results.png"
```

### Example 3: Test Column Resizing
```
Goal: Verify left column resizing behavior

1. browser_navigate → http://localhost:3000
2. browser_snapshot → Get resize handle reference
3. browser_drag → startElement: "left resize handle", endX: 200
4. browser_wait_for → time: 1 (allow animation)
5. browser_take_screenshot → filename: "column-resized.png"
6. browser_drag → startElement: "left resize handle", endX: 72
7. browser_take_screenshot → filename: "column-minimized.png"
```

### Example 4: Test Project Detail Navigation
```
Goal: Verify project detail views work

1. browser_navigate → http://localhost:3000
2. browser_snapshot → Get project cards
3. browser_click → element: "Mobile API Rebuild project card"
4. browser_wait_for → text: "Full-stack API development"
5. browser_take_screenshot → filename: "project-detail.png"
6. browser_click → element: "back to collections"
7. browser_snapshot → Verify back to home
```

### Example 5: Responsive Design Testing
```
Goal: Test mobile layout

1. browser_resize → width: 375, height: 667 (iPhone SE)
2. browser_navigate → http://localhost:3000
3. browser_take_screenshot → filename: "mobile-layout.png"
4. browser_resize → width: 768, height: 1024 (iPad)
5. browser_take_screenshot → filename: "tablet-layout.png"
6. browser_resize → width: 1920, height: 1080 (Desktop)
```

### Example 6: Performance Monitoring
```
Goal: Monitor network requests and console

1. browser_navigate → http://localhost:3000
2. browser_wait_for → time: 3 (allow full load)
3. browser_network_requests → Review asset loading
4. browser_console_messages → Check for errors/warnings
5. browser_take_screenshot → filename: "performance-test.png"
```

## Command Combinations for Complex Workflows

### Full UI Test Suite
```
/test --playwright → Run comprehensive UI tests
  - Homepage loading and navigation
  - Search functionality in multiple locations  
  - Column resizing behavior
  - Project detail views
  - Responsive design validation
  - Performance monitoring
```

### Visual Regression Testing
```
/improve --focus accessibility → Test accessibility features
  - Keyboard navigation testing
  - Screen reader compatibility
  - Color contrast validation
  - Focus management testing
```

### Integration with Other Tools
```
/analyze --focus performance --play → Performance analysis with Playwright
  - Load time measurements
  - Network waterfall analysis
  - Console error detection
  - Visual stability metrics
```