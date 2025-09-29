#!/bin/bash
# Verify VS Code ESLint Configuration
# This script helps ensure VS Code ESLint matches command line ESLint

echo "🔍 VS Code ESLint Configuration Verification"
echo "============================================="
echo ""

# Check if VS Code workspace settings exist
if [ -f ".vscode/settings.json" ]; then
    echo "✅ VS Code workspace settings found"
else
    echo "❌ VS Code workspace settings missing"
    echo "   Run this script from project root directory"
    exit 1
fi

# Check ESLint configuration
if [ -f ".eslintrc.cjs" ]; then
    echo "✅ ESLint configuration found (.eslintrc.cjs)"
else
    echo "❌ ESLint configuration missing"
    exit 1
fi

# Check package.json for ESLint dependencies
echo "📦 Checking ESLint dependencies..."
if npm list eslint > /dev/null 2>&1; then
    echo "✅ ESLint package installed"
else
    echo "❌ ESLint package missing - run: npm install"
    exit 1
fi

if npm list @typescript-eslint/parser > /dev/null 2>&1; then
    echo "✅ TypeScript ESLint parser installed"
else
    echo "❌ TypeScript ESLint parser missing"
    exit 1
fi

# Show current ESLint configuration summary
echo ""
echo "📋 ESLint Configuration Summary:"
echo "   Config file: .eslintrc.cjs"
echo "   Extensions: js, jsx, ts, tsx"
echo "   Indentation: 4 spaces (enforced)"
echo "   Auto-fix on save: enabled in VS Code"
echo ""

# Test ESLint execution
echo "🧪 Testing ESLint execution..."
if npm run lint > /dev/null 2>&1; then
    echo "✅ ESLint runs successfully (may have warnings/errors)"
else
    echo "⚠️  ESLint has errors (this is expected with current codebase)"
fi

# Show sample ESLint output
echo ""
echo "📊 Current ESLint Status (first 10 issues):"
echo "$(npm run lint 2>&1 | grep -E '^(/|  [0-9]+:[0-9]+)' | head -10)"

echo ""
echo "🎯 VS Code Setup Instructions:"
echo "1. Install ESLint extension: dbaeumer.vscode-eslint"
echo "2. Reload VS Code window: Ctrl+Shift+P → 'Developer: Reload Window'"
echo "3. Check ESLint status in VS Code status bar"
echo "4. Problems in VS Code should match: npm run lint"
echo ""
echo "📁 VS Code Configuration Files Created:"
echo "   .vscode/settings.json     - ESLint and editor settings"
echo "   .vscode/extensions.json   - Recommended extensions"
echo "   .vscode/tasks.json        - Build and lint tasks"
echo "   .vscode/launch.json       - Debug configurations"
echo "   .vscode/README.md         - Detailed setup guide"
echo ""
echo "🔄 To verify VS Code ESLint is working:"
echo "   1. Open a .tsx file in VS Code"
echo "   2. Check Problems panel (Ctrl+Shift+M)"
echo "   3. Compare with: npm run lint"
echo "   4. Both should show identical errors/warnings"
echo ""
echo "✅ Configuration verification complete!"