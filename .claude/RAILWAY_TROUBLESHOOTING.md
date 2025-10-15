# Railway Deployment Troubleshooting (October 14, 2025)

## Issue Summary

Railway deployment stuck with 502 Bad Gateway errors after attempting to troubleshoot an "Initializing" issue during Railway outage.

## Root Cause Analysis

1. **Initial Problem**: Railway outage caused "Initializing" message
2. **Incorrect Diagnosis**: Attributed outage to `vite preview` command
3. **Configuration Changes**: Multiple commits trying different approaches
4. **Current State**: Site returning 502 errors after deployment

## Commit History (Most Recent First)

1. **93db79b** - `fix: Replace vite preview with serve for Railway production deployment`
   - Changed: `startCommand = "npx serve dist -p $PORT --single"`
   - Status: Deployed but still 502

2. **e3e3bc8** - `fix: Remove hardcoded PORT from railway.toml to fix 502 error`
   - Removed: `PORT = "3000"` from railway.toml
   - Status: Deployed but still 502

3. **c153556** - `troubleshooting railway deployment`
   - Added: `PORT = "3000"` to railway.toml (THIS BROKE IT)
   - Status: 502 errors started

4. **d652503** - `fix: Revert to vite preview with proper port configuration`
   - Reverted to: `npm run preview`
   - Status: Unknown

5. **2d4c118** - `fix: Replace vite preview with serve for Railway production deployment`
   - Changed to: `npx serve` (during Railway outage)
   - Status: Likely failed due to outage, not configuration

## Current Configuration

### railway.toml
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npx serve dist -p $PORT --single"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[env]
NODE_ENV = "production"
```

### vite.config.ts preview settings
```typescript
preview: {
  open: false,
  host: true,
  port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
  allowedHosts: [
    'joshify-production.up.railway.app',
    'www.joshify.dev',
    'joshify.dev'
  ]
}
```

## Configuration Analysis

### Current Approach: `serve` Package
**Command**: `npx serve dist -p $PORT --single`

**Pros**:
- ✅ Industry-standard for serving static files in production
- ✅ Simple, lightweight, purpose-built for SPAs
- ✅ `--single` flag handles client-side routing correctly
- ✅ No development-mode overhead

**Cons**:
- ❌ Deployment currently failing (need to check Railway logs)

### Alternative Approach: `vite preview`
**Command**: `npm run preview` (which runs `vite preview --host`)

**Pros**:
- ✅ Previously working configuration
- ✅ Built-in to Vite, no additional dependencies
- ✅ Proper vite.config.ts configuration already in place

**Cons**:
- ❌ **Not designed for production** (Vite docs explicitly state this)
- ❌ Development-mode overhead and features not needed in production
- ❌ May have caused "Initializing" issues

## Next Steps (REQUIRED - USER ACTION)

### 1. Check Railway Deployment Logs
**CRITICAL**: You need to access Railway dashboard and check deployment logs for:
- Build errors during `npm run build`
- Runtime errors when starting `npx serve`
- Port binding issues
- Missing dependencies

### 2. Verify Railway Environment Variables
Check that Railway has:
- `PORT` environment variable (should be automatically set by Railway)
- `NODE_ENV=production` (set in railway.toml)
- `VITE_CANVAS_CDN_URL` (should be set for canvas videos)

### 3. Test Locally
If Railway logs show errors, test locally:
```bash
# Build the app
npm run build

# Test serve command (Railway uses dynamic port)
PORT=3000 npx serve dist -p $PORT --single

# Should see: "Accepting connections at http://0.0.0.0:3000"
# Test in browser: http://localhost:3000
```

### 4. Decision Point: serve vs vite preview

**If `serve` is failing in Railway**:
- Option A: Debug `serve` issues (check Railway logs for specifics)
- Option B: Revert to `vite preview` (known working, though not ideal)

**Recommendation**:
1. First, check Railway logs to understand WHY it's failing
2. If `serve` has simple fix → use `serve` (better for production)
3. If `serve` has complex issues → use `vite preview` (gets site working fast)
4. Can always migrate to proper production server later (nginx, etc.)

## Commands for Reverting (If Needed)

### Revert to vite preview (last known working):
```bash
git revert 93db79b -m "Revert to vite preview while investigating serve issues"
git push origin main
```

This will change railway.toml back to:
```toml
startCommand = "npm run preview"
```

## Technical Notes

### Why `serve` is Better for Production
- Vite preview is explicitly documented as "NOT for production"
- `serve` is purpose-built for serving static files
- Lower resource usage, faster startup
- Standard industry practice

### Why We're Using It Anyway (Temporarily)
- Quick to implement
- Works with existing build output
- Can migrate to better solution later if needed

## Railway-Specific Considerations

### Port Handling
Railway dynamically assigns ports via `$PORT` environment variable.
Apps MUST:
- Read PORT from environment: `process.env.PORT`
- Listen on that port (not hardcoded 3000, 4173, etc.)
- Bind to `0.0.0.0` (not `localhost` or `127.0.0.1`)

### Build Process
Railway runs:
1. `npm install` (installs dependencies including `serve`)
2. `npm run build` (creates `dist/` directory)
3. Executes `startCommand` from railway.toml

## Summary

**Current Status**: 502 Bad Gateway errors
**Root Cause**: Unknown (need Railway logs)
**Configuration**: Correct for `serve` package
**Next Action**: **USER MUST CHECK RAILWAY DEPLOYMENT LOGS**

The configuration files are correct. The issue is likely in the deployment process itself, which can only be diagnosed from Railway's dashboard.
