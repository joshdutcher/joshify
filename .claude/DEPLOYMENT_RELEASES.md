# Release-Triggered Railway Deployment Guide

## 🎯 Deployment Strategy Overview

**New Workflow**: Deployments are triggered by GitHub releases, not main branch pushes.

**Benefits**:
- ✅ Canvas videos are uploaded to releases before deployment
- ✅ Controlled releases with proper versioning
- ✅ No broken deployments due to missing assets
- ✅ Clear separation between CI/CD validation and production deployment

## 🚀 How to Deploy

### Step 1: Prepare Release Assets
1. **Upload canvas videos** to GitHub releases (if any new ones)
2. **Ensure all assets** are properly referenced in code
3. **Verify local build** works with `make deploy-check`

### Step 2: Create GitHub Release
1. Go to [GitHub Releases](https://github.com/joshdutcher/joshify/releases)
2. Click **"Create a new release"**
3. **Tag version**: Use semantic versioning (e.g., `v1.2.3`)
4. **Release title**: Brief description (e.g., "Portfolio Update v1.2.3")
5. **Description**: List changes and improvements
6. **Upload canvas videos** (if any) as release assets
7. **Publish release** - This triggers automatic Railway deployment

### Step 3: Monitor Deployment
1. **GitHub Actions**: Watch the deployment workflow progress
2. **Railway Dashboard**: Verify deployment completes successfully
3. **Live Site**: Test the deployed version

## 🔧 Setup Requirements

### Railway Token Configuration
Add your Railway token to GitHub repository secrets:

1. **Get Railway Token**:
   ```bash
   # Install Railway CLI
   curl -fsSL https://railway.app/install.sh | sh

   # Login and get token
   railway login
   railway whoami  # Verify login
   ```

2. **Add to GitHub Secrets**:
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Click **"New repository secret"**
   - Name: `RAILWAY_TOKEN`
   - Value: Your Railway authentication token

### Railway Project Configuration
Disable automatic deployments from main branch:

1. **Railway Dashboard** → Your project → **Settings**
2. **Deploy Triggers** → Disable "Deploy on push to main"
3. **Keep webhook** for GitHub releases (if available)

## 🔄 Deployment Workflow

### Automatic Process (on release creation)
```
1. GitHub Release Published
   ↓
2. Deploy Validation Job
   - Run full CI/CD pipeline
   - Validate release assets
   - Generate deployment report
   ↓
3. Railway Deployment Job
   - Install Railway CLI
   - Deploy using railway up
   - Post-deployment validation
   ↓
4. Notification Job
   - Success/failure notification
   - Deployment status summary
```

### Manual Process (if needed)
```bash
# Emergency deployment (from local)
railway up --detach

# Check deployment status
railway status

# View logs
railway logs
```

## 📋 Release Checklist

### Pre-Release
- [ ] All PRs merged to main
- [ ] Local build passes: `make deploy-check`
- [ ] Canvas videos prepared (if any changes)
- [ ] CHANGELOG updated with release notes

### Release Creation
- [ ] Semantic version tag (v1.2.3)
- [ ] Descriptive release title and notes
- [ ] Canvas videos uploaded as release assets
- [ ] Release published (triggers deployment)

### Post-Release
- [ ] GitHub Actions deployment workflow completed
- [ ] Railway deployment successful
- [ ] Live site verified working
- [ ] Canvas videos loading correctly

## 🎨 Canvas Video Management

### Upload Process
1. **Create release** (don't publish yet)
2. **Upload canvas videos** as release assets
3. **Update code references** if needed (usually not required)
4. **Publish release** - triggers deployment

### Video Requirements
- **Format**: MP4, H.264 codec
- **Aspect Ratio**: 9:16 (vertical)
- **Duration**: 3-8 seconds, seamless loop
- **File Size**: <2MB target
- **Naming**: Match project ID (e.g., `project-id.mp4`)

### Code References
Canvas videos are referenced via GitHub Releases CDN:
```
https://github.com/joshdutcher/joshify/releases/download/v1.2.3/project-id.mp4
```

## 🚨 Troubleshooting

### Deployment Fails
1. **Check GitHub Actions logs** for specific error
2. **Verify Railway token** is valid in repository secrets
3. **Test local deployment**: `railway up`
4. **Check Railway quota** and service status

### Canvas Videos Not Loading
1. **Verify upload**: Check release assets on GitHub
2. **Check file names**: Must match project IDs exactly
3. **Test direct URL**: Visit canvas video URL directly
4. **Fallback working**: Should show album art if video fails

### Railway CLI Issues
```bash
# Reinstall Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# Re-authenticate
railway login
railway link  # Link to your project
```

## 📊 Monitoring & Analytics

### GitHub Actions
- **Workflow runs**: Track deployment success/failure rates
- **Build artifacts**: Deployment reports stored for 30 days
- **Execution time**: Monitor deployment performance

### Railway
- **Deployment logs**: View real-time deployment progress
- **Performance metrics**: Monitor app performance post-deployment
- **Resource usage**: Track CPU, memory, and bandwidth

## 🔄 Migration Notes

### What Changed
- **Old**: Railway auto-deploys on main branch pushes
- **New**: Railway deploys only on GitHub releases
- **CI/CD**: Still runs on all PRs, but no longer includes deployment
- **Assets**: Canvas videos synchronized with releases

### Benefits
- **Asset Synchronization**: Videos available before deployment
- **Version Control**: Clear release versioning
- **Controlled Releases**: Deploy only when ready
- **Rollback Capability**: Easy rollback to previous releases

### Backward Compatibility
- **Local development**: Unchanged (`npm run dev`)
- **Testing**: Unchanged (`npm run test`, `make ci-full`)
- **Branch protection**: Unchanged (still requires PR + CI/CD)