#!/bin/bash

# Script to verify Railway deployment readiness
# Runs all the checks that Railway will perform

set -e

echo "🚀 Verifying Railway deployment readiness..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        exit 1
    fi
}

print_info() {
    echo -e "${YELLOW}📋 $1${NC}"
}

# 1. Check Node.js version
print_info "Checking Node.js version..."
node --version
NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    print_status 0 "Node.js version $NODE_VERSION is compatible (>=18)"
else
    print_status 1 "Node.js version $NODE_VERSION is too old (requires >=18)"
fi

echo ""

# 2. Install dependencies
print_info "Installing dependencies..."
npm ci
print_status $? "Dependencies installed successfully"

echo ""

# 3. Run linting
print_info "Running ESLint..."
npm run lint
print_status $? "Linting passed"

echo ""

# 4. Run TypeScript type checking
print_info "Running TypeScript type check..."
npm run type-check
print_status $? "TypeScript compilation passed"

echo ""

# 5. Run production build
print_info "Running production build..."
npm run build
print_status $? "Production build completed successfully"

echo ""

# 6. Verify build output
print_info "Verifying build output..."
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    print_status 0 "Build artifacts generated correctly"
else
    print_status 1 "Build artifacts missing"
fi

echo ""

# 7. Test preview server
print_info "Testing preview server..."
npm run preview &
PREVIEW_PID=$!

# Wait for server to start
sleep 3

# Check if server is responding
if curl -s http://localhost:4173 > /dev/null; then
    print_status 0 "Preview server started successfully"
else
    print_status 1 "Preview server failed to start"
fi

# Kill preview server
kill $PREVIEW_PID 2>/dev/null || true

echo ""

# 8. Check Railway configuration
print_info "Checking Railway configuration..."
if [ -f "railway.toml" ]; then
    print_status 0 "Railway configuration file exists"
else
    print_status 1 "Railway configuration file missing"
fi

echo ""

# 9. Verify package.json scripts
print_info "Verifying package.json scripts..."
if grep -q '"build":' package.json && grep -q '"preview":' package.json; then
    print_status 0 "Required scripts (build, preview) are configured"
else
    print_status 1 "Missing required scripts in package.json"
fi

echo ""

print_info "🎉 All deployment readiness checks passed!"
echo ""
echo "📊 Summary:"
echo "   ✅ Node.js version compatible"
echo "   ✅ Dependencies install successfully"
echo "   ✅ Linting passes"
echo "   ✅ TypeScript compilation succeeds"
echo "   ✅ Production build works"
echo "   ✅ Build artifacts generated"
echo "   ✅ Preview server starts"
echo "   ✅ Railway configuration exists"
echo "   ✅ Package.json scripts configured"
echo ""
echo "🚀 Ready for Railway deployment!"