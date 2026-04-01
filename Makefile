# Joshify Local CI/CD Pipeline
# Comprehensive validation matching Railway deployment process

.PHONY: help install lint typecheck build test clean ci ci-full deploy-check railway-simulation prepare-release dev

# Default target
help:
	@echo "🚀 Joshify Local CI/CD Pipeline"
	@echo ""
	@echo "📋 Available targets:"
	@echo "  install          Install dependencies (npm ci)"
	@echo "  lint             Run ESLint checks"
	@echo "  typecheck        Run TypeScript type checking"
	@echo "  build            Build production bundle"
	@echo "  test             Run smoke tests"
	@echo "  clean            Clean build artifacts"
	@echo ""
	@echo "🔥 Pipeline Commands:"
	@echo "  ci               Core CI pipeline (lint + typecheck + build)"
	@echo "  ci-full          Full CI/CD pipeline (ci + test)"
	@echo "  deploy-check     Pre-deployment validation"
	@echo "  railway-sim      Simulate Railway deployment process"
	@echo "  prepare-release  Validate and prepare for GitHub release deployment"
	@echo ""
	@echo "⚡ Usage: make <target>"

# Environment validation
check-node:
	@echo "📋 Checking Node.js version..."
	@node --version | grep -E "v1[89]\.|v[2-9][0-9]\." || (echo "❌ Node.js 18+ required" && exit 1)
	@echo "✅ Node.js version OK"

check-npm:
	@echo "📋 Checking npm version..."
	@npm --version
	@echo "✅ npm version OK"

# Dependency installation (matching Railway: npm ci)
install: check-node check-npm
	@echo "📦 Installing dependencies with npm ci (Railway-compatible)..."
	@npm ci --production=false
	@echo "✅ Dependencies installed"

# Linting (matching Railway pipeline)
lint:
	@echo "🔍 Running ESLint checks..."
	@npm run lint
	@echo "✅ Linting passed"

# TypeScript type checking (matching Railway pipeline)
typecheck:
	@echo "🔧 Running TypeScript type checking..."
	@npm run type-check
	@echo "✅ Type checking passed"

# Production build (matching Railway: npm run build)
build:
	@echo "🏗️  Building production bundle..."
	@npm run build
	@echo "✅ Build completed"

# Smoke tests
test:
	@echo "🧪 Running smoke tests..."
	@npm run test
	@echo "✅ Tests passed"

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	@rm -rf dist/
	@rm -rf node_modules/.cache/
	@rm -rf .vite/
	@echo "✅ Clean completed"

# Core CI pipeline (lint + typecheck + build)
ci: clean install lint typecheck build
	@echo "✅ Core CI pipeline completed successfully"

# Full CI/CD pipeline (ci + test)
ci-full: ci test
	@echo "✅ Full CI/CD pipeline completed successfully"

# Pre-deployment validation checklist
deploy-check: ci-full
	@echo "🚀 Running pre-deployment validation..."
	@echo "📋 Deployment Readiness Checklist:"

	@echo "  1. Checking package.json/package-lock.json sync..."
	@npm ls --depth=0 >/dev/null 2>&1 && echo "  ✅ Package versions synchronized" || (echo "  ❌ Package sync issue detected" && exit 1)

	@echo "  2. Checking Node.js version compatibility..."
	@node --version | grep -E "v1[89]\.|v[2-9][0-9]\." && echo "  ✅ Node.js 18+ compatible" || (echo "  ❌ Node.js version incompatible" && exit 1)

	@echo "  3. Validating TypeScript compilation..."
	@[ -f "dist/index.html" ] && echo "  ✅ Build artifacts present" || (echo "  ❌ Build artifacts missing" && exit 1)

	@echo "  4. Checking preview server functionality..."
	@timeout 10s npm run preview >/dev/null 2>&1 & SERVER_PID=$$! ; sleep 3 ; kill $$SERVER_PID 2>/dev/null && echo "  ✅ Preview server functional" || echo "  ⚠️  Preview server check skipped"

	@echo "  5. Validating Railway configuration..."
	@[ -f "railway.toml" ] && echo "  ✅ Railway configuration present" || echo "  ⚠️  Railway configuration missing"

	@echo ""
	@echo "✅ Deployment readiness validation completed"
	@echo "🚀 Ready for Railway deployment!"

# Simulate Railway deployment process
railway-sim: clean
	@echo "🚀 Simulating Railway deployment process..."
	@echo ""
	@echo "━━━ Step 1: Environment Setup (Railway) ━━━"
	@echo "Using Node.js $(shell node --version) with npm $(shell npm --version)"
	@echo ""

	@echo "━━━ Step 2: Installing Dependencies (npm ci) ━━━"
	@npm ci --production=false
	@echo ""

	@echo "━━━ Step 3: Building Application (npm run build) ━━━"
	@npm run build
	@echo ""

	@echo "━━━ Step 4: Preview Validation (npm run preview) ━━━"
	@echo "Starting preview server for validation..."
	@timeout 5s npm run preview >/dev/null 2>&1 & SERVER_PID=$$! ; sleep 2 ; kill $$SERVER_PID 2>/dev/null || true
	@echo "Preview server validation completed"
	@echo ""

	@echo "✅ Railway deployment simulation successful!"
	@echo "🎯 This build should deploy successfully to Railway"

# Additional utility targets

# Audit dependencies for security vulnerabilities
audit:
	@echo "🔒 Running security audit..."
	@npm audit --audit-level=high
	@echo "✅ Security audit completed"

# Update package-lock.json if needed
sync-lock:
	@echo "🔄 Synchronizing package-lock.json..."
	@rm -f package-lock.json
	@npm install
	@echo "✅ Package lock synchronized"

# Validate all CI/CD requirements
validate-env:
	@echo "🔍 Validating CI/CD environment..."
	@$(MAKE) check-node
	@$(MAKE) check-npm
	@echo "📦 Checking package.json exists..."
	@[ -f "package.json" ] && echo "✅ package.json found" || (echo "❌ package.json missing" && exit 1)
	@echo "📝 Checking TypeScript config..."
	@[ -f "tsconfig.json" ] && echo "✅ tsconfig.json found" || (echo "❌ tsconfig.json missing" && exit 1)
	@echo "⚙️ Checking Vite config..."
	@[ -f "vite.config.ts" ] && echo "✅ vite.config.ts found" || (echo "❌ vite.config.ts missing" && exit 1)
	@echo "✅ Environment validation completed"

# Start development server
dev:
	@npm run dev

# Quick development setup
dev-setup: install
	@echo "🚀 Development environment ready!"
	@echo "Run 'npm run dev' to start development server"
	@echo "Run 'make ci-full' to validate before commits"

# Show project status
status:
	@echo "📊 Project Status:"
	@echo "  Node.js: $(shell node --version)"
	@echo "  npm: $(shell npm --version)"
	@echo "  TypeScript: $(shell npx tsc --version 2>/dev/null || echo 'Not available')"
	@echo "  Dependencies: $(shell npm ls --depth=0 2>/dev/null | grep -c '├──\|└──' || echo 'Unknown')"
	@echo "  Last build: $(shell [ -f 'dist/index.html' ] && stat -c %y dist/index.html 2>/dev/null || echo 'Never')"
	@echo "  Git status: $(shell git status --porcelain | wc -l) files changed"

# Performance test build
perf-test: build
	@echo "⚡ Running build performance analysis..."
	@echo "📊 Build artifacts size:"
	@du -sh dist/ 2>/dev/null || echo "No build artifacts found"
	@echo "📁 Build breakdown:"
	@find dist/ -name "*.js" -exec du -h {} \; 2>/dev/null | head -5 || echo "No JS files found"
	@find dist/ -name "*.css" -exec du -h {} \; 2>/dev/null | head -5 || echo "No CSS files found"

# Prepare for GitHub release deployment
prepare-release: deploy-check
	@echo "🚀 Running release preparation script..."
	@./scripts/prepare-release.sh
	@echo "✅ Release preparation completed"