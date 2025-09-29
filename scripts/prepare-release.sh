#!/bin/bash

# Script to prepare and validate a release for deployment
# This ensures all checks pass before creating the GitHub release

set -e

echo "🚀 Joshify Release Preparation Script"
echo "===================================="
echo ""

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: Not on main branch (currently on: $CURRENT_BRANCH)"
    echo "Consider switching to main branch first: git checkout main"
    echo ""
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Uncommitted changes detected:"
    git status --porcelain
    echo ""
    echo "Please commit or stash changes before creating a release."
    exit 1
fi

echo "✅ Repository is clean"

# Run full validation pipeline
echo ""
echo "🔍 Running pre-release validation..."
echo "------------------------------------"

# Run the full CI/CD pipeline
if command -v make > /dev/null 2>&1; then
    echo "📦 Running make deploy-check..."
    make deploy-check
else
    echo "📦 Running npm CI pipeline..."
    npm run ci:full
fi

echo ""
echo "🎨 Canvas Video Status Check..."
echo "------------------------------"

# Check for canvas videos in public directory
CANVAS_COUNT=$(find public/canvases/ -name "*.mp4" 2>/dev/null | wc -l)
echo "Local canvas videos: $CANVAS_COUNT"

if [ "$CANVAS_COUNT" -gt 0 ]; then
    echo "📹 Local canvas videos found:"
    find public/canvases/ -name "*.mp4" -exec basename {} \; | sort
    echo ""
    echo "⚠️  Remember to upload these to the GitHub release!"
fi

echo ""
echo "📋 Release Checklist"
echo "-------------------"
echo "Before creating the GitHub release, verify:"
echo ""
echo "  [ ] All PRs merged to main branch"
echo "  [ ] Full CI/CD pipeline passing (✅ completed above)"
echo "  [ ] Canvas videos ready for upload (if any changes)"
echo "  [ ] CHANGELOG or release notes prepared"
echo "  [ ] Railway token configured in GitHub secrets"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to: https://github.com/joshdutcher/joshify/releases/new"
echo "2. Create new release with semantic version (e.g., v1.2.3)"
echo "3. Upload canvas videos as release assets (if any)"
echo "4. Write descriptive release notes"
echo "5. Publish release → Automatic Railway deployment will start"
echo ""
echo "✅ Pre-release validation complete!"
echo "🚀 Ready to create GitHub release for deployment"