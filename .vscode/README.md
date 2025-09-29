# VS Code ESLint Configuration Guide

This directory contains VS Code workspace configuration to ensure consistent ESLint rules matching the project's CI/CD pipeline.

## 🚀 Quick Setup

1. **Install Required Extensions** (VS Code will prompt automatically):
   - ESLint (`dbaeumer.vscode-eslint`) - **REQUIRED**
   - TypeScript and JavaScript Nightly (`ms-vscode.vscode-typescript-next`)
   - Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
   - Playwright Test for VS Code (`ms-playwright.playwright`)

2. **Reload VS Code** after installing extensions:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Developer: Reload Window" and press Enter

3. **Verify ESLint Status**:
   - Check status bar (bottom right) for "ESLint" indicator
   - Should show "ESLint ✓" when working properly

## ⚙️ Configuration Details

### ESLint Settings Applied:
- **Auto-fix on save**: Automatically fixes ESLint issues when saving files
- **4-space indentation**: Matches project `.eslintrc.cjs` settings
- **TypeScript support**: Full TypeScript + React linting
- **File extensions**: `.js`, `.jsx`, `.ts`, `.tsx`

### Key Rules from `.eslintrc.cjs`:
```javascript
{
  "indent": ["error", 4],                    // 4-space indentation
  "no-unused-vars": ["warn", {              // Unused variable warnings
    "varsIgnorePattern": "^_|^React$",
    "argsIgnorePattern": "^_"
  }],
  "react/react-in-jsx-scope": "off",        // React 17+ JSX transform
  "react/prop-types": "off"                 // Use TypeScript instead
}
```

## 🔧 Manual Verification Steps

### 1. Check ESLint Extension Status:
- Open Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
- Type "ESLint: Show Output Channel"
- Should see: "ESLint server is running"

### 2. Test Auto-Fix:
- Open any `.tsx` file (e.g., `src/App.tsx`)
- Add some incorrect indentation (2 spaces instead of 4)
- Save file (`Ctrl+S` / `Cmd+S`)
- Indentation should auto-correct to 4 spaces

### 3. Verify Problem Detection:
- Open Problems panel: `Ctrl+Shift+M` / `Cmd+Shift+M`
- Should see ESLint warnings/errors for project files
- Match exactly with `npm run lint` output

## 🎯 Available VS Code Tasks

Press `Ctrl+Shift+P` / `Cmd+Shift+P` and type "Tasks: Run Task":

- **npm: dev** - Start development server
- **npm: build** - Build production bundle
- **npm: lint** - Run ESLint checks
- **npm: type-check** - Run TypeScript checking
- **make: ci-full** - Full CI/CD pipeline
- **make: railway-sim** - Railway deployment simulation

## 🐛 Troubleshooting

### ESLint Not Working:
1. **Check Extension**: Ensure ESLint extension is enabled
2. **Check Working Directory**: ESLint should use project root
3. **Reload Window**: `Ctrl+Shift+P` → "Developer: Reload Window"
4. **Check Output**: Command Palette → "ESLint: Show Output Channel"

### Different Rules than Command Line:
1. **Verify Config**: Ensure `.eslintrc.cjs` exists in project root
2. **Check Settings**: Verify `.vscode/settings.json` is applied
3. **Restart ESLint**: Command Palette → "ESLint: Restart ESLint Server"

### Auto-Fix Not Working:
1. **Check Language**: Ensure file is recognized as TypeScript/React
2. **Check Settings**: Verify `editor.codeActionsOnSave` is configured
3. **Manual Fix**: Right-click → "Fix all ESLint Problems"

## 📋 Command Line Equivalence

Your VS Code ESLint should match exactly:

```bash
# VS Code ESLint === Command line ESLint
npm run lint
# Both should show identical warnings/errors

# Build check (TypeScript)
npm run type-check
# VS Code TypeScript problems should match

# Full pipeline
make ci-full
# Should match VS Code's combined problems view
```

## 🔄 Keeping in Sync

When project ESLint rules change:
1. **Reload ESLint**: Command Palette → "ESLint: Restart ESLint Server"
2. **Reload Window**: `Ctrl+Shift+P` → "Developer: Reload Window"
3. **Verify Sync**: Compare VS Code problems with `npm run lint`

This configuration ensures your VS Code environment matches the exact same ESLint rules used by the CI/CD pipeline and Railway deployment process.