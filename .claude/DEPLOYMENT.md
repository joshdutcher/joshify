# Deployment Guide - Railway

## Overview

This project is configured for deployment on Railway with automated CI/CD pipeline integration.

## Prerequisites

1. **GitHub Repository**: Connected to Railway with auto-deploy enabled
2. **Branch Protection**: Main branch protected with required CI/CD checks
3. **Build Requirements**: All TypeScript compilation errors resolved

## Railway Configuration

### Build Process
- **Builder**: Nixpacks (automatic detection)
- **Build Command**: `npm run build` (TypeScript + Vite)
- **Start Command**: `npm run preview`
- **Node Version**: 18+ (specified in package.json engines)

### Environment Variables
- `NODE_ENV=production`
- `PORT=3000` (Railway will override with $PORT)
- `VITE_USE_LOCAL_CANVAS=false` (use CDN for canvas videos)
- `VITE_CANVAS_CDN_URL=https://f000.backblazeb2.com/file/joshify-canvas` (Backblaze B2 CDN)

### Railway Configuration Files
- `railway.toml` - Railway-specific deployment configuration
- `package.json` - Build scripts and dependencies

## Deployment Workflow

### Automatic Deployment (Recommended)
1. Create feature branch from `main`
2. Make changes and commit
3. Push branch and create Pull Request
4. CI/CD pipeline runs automatically:
   - Lint and Type Check
   - Build and Test
   - End-to-End Tests
   - Quality Gate
5. Request code review (1 approving review required)
6. Merge PR to `main` after CI/CD passes
7. **Deployment workflow automatically triggers** and deploys to Railway
8. Canvas videos load from Backblaze B2 CDN

### Manual Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to existing project
railway link

# Deploy manually
railway up
```

## CI/CD Pipeline

### GitHub Actions Workflows

**CI Workflow** (`.github/workflows/ci.yml`):
- **Triggers**: Pull requests to main, pushes to main
- **Jobs**:
  1. Lint and Type Check
  2. Build and Test
  3. End-to-End Tests (Playwright)
  4. Quality Gate

**Deployment Workflow** (`.github/workflows/deploy.yml`):
- **Triggers**: Pushes to main branch
- **Jobs**:
  1. Pre-Deployment Validation (runs full CI/CD pipeline)
  2. Railway Deployment (using Railway CLI)
  3. Deployment Notification

### Required Status Checks
All these checks must pass before merging to main:
- Lint and Type Check
- Build and Test
- End-to-End Tests
- Quality Gate

### Local Testing Commands
```bash
# Run full CI pipeline locally
npm run ci:full

# Individual checks
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run build         # Production build
npm run test          # Playwright tests
```

## Build Verification

### TypeScript Compilation
- Strict TypeScript compilation enabled
- All type errors must be resolved
- Production build verifies TypeScript correctness

### Quality Checks
- ESLint with max 50 warnings
- TypeScript strict mode
- Build artifact validation
- Smoke tests via Playwright

## Troubleshooting

### Build Failures
1. **TypeScript Errors**: Run `npm run type-check` locally
2. **Lint Errors**: Run `npm run lint` locally
3. **Build Errors**: Run `npm run build` locally
4. **Test Failures**: Run `npm run test` locally

### Railway-Specific Issues
1. **Dependencies**: Ensure all dependencies in package.json
2. **Build Command**: Verify `npm run build` works locally
3. **Start Command**: Verify `npm run preview` works locally
4. **Environment**: Check Railway environment variables

### CI/CD Issues
1. **Branch Protection**: Ensure all required checks are configured
2. **Permissions**: Verify GitHub Actions permissions
3. **Secrets**: Check CLAUDE_CODE_OAUTH_TOKEN if using Claude integration

## Production Considerations

### Performance
- Vite optimizes bundle for production
- Static assets served efficiently
- TypeScript compiled to optimized JavaScript

### Monitoring
- Railway provides built-in monitoring
- Check deployment logs in Railway dashboard
- Monitor build times and success rates

### Security
- Environment variables managed through Railway
- No secrets committed to repository
- Branch protection prevents direct pushes to main

## Success Criteria

✅ **Build Pipeline**: All CI/CD checks pass
✅ **Branch Protection**: Direct pushes to main blocked
✅ **Code Quality**: TypeScript strict compilation + ESLint
✅ **Testing**: Automated smoke tests via Playwright
✅ **Deployment**: Automatic deployment from main branch
✅ **Monitoring**: Railway deployment dashboard available

## Next Steps

1. Connect Railway to GitHub repository
2. Enable auto-deploy from main branch
3. Test deployment with a sample PR
4. Monitor first deployment for any issues
5. Document any Railway-specific configurations needed