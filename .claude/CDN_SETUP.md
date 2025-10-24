# CDN Configuration for Canvas Videos

**Current Setup**: Cloudflare R2 Storage

## Architecture Overview

Canvas videos are hosted on **Cloudflare R2** and delivered through **Cloudflare's global CDN** for fast loading worldwide.

### Why This Setup?

- ✅ **Cloudflare R2**: Zero-cost storage and egress for this project's needs.
- ✅ **Cloudflare CDN**: Free global edge caching and delivery.
- ✅ **Custom Domain**: Professional URLs via `cdn.joshify.dev`.
- ✅ **No Rate Limits**: Production-ready unlimited bandwidth.
- ✅ **Fast Loading**: Videos cached at edge locations near users.

## Current Configuration

### DNS Setup (Cloudflare)

**Domain**: `joshify.dev`
**DNS Management**: Cloudflare (nameservers transferred from Namecheap)
**Domain Registration**: Remains at Namecheap (only DNS transferred)

**CDN Subdomain**:
- **Record Type**: CNAME
- **Name**: `cdn`
- **Target**: `joshify-canvas.r2.dev`
- **Proxy Status**: ✅ **Proxied** (orange cloud) - **CRITICAL FOR CDN**
- **Full URL**: `https://cdn.joshify.dev/`

### Cloudflare R2 Bucket

**Bucket Name**: `joshify-canvas`
**Bucket Type**: `allPublic`
**Region**: Automatic

**CORS Configuration**:
```json
[
  {
    "corsRuleName": "allowProductionAndDev",
    "allowedOrigins": [
      "https://joshify-production.up.railway.app",
      "https://joshify.dev",
      "https://www.joshify.dev",
      "https://cdn.joshify.dev",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173"
    ],
    "allowedOperations": [
      "GET",
      "HEAD"
    ],
    "allowedHeaders": ["*"],
    "exposeHeaders": ["content-length", "content-type"],
    "maxAgeSeconds": 3600
  }
]
```

### Environment Variables

**Development** (`.env.development`):
```bash
VITE_USE_LOCAL_ASSETS=true
```
- All assets load from `public/assets/` folder
- No CORS issues
- Fast local development

**Production** (`.env.production`):
```bash
VITE_USE_LOCAL_ASSETS=false
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```

**Railway** (Environment Variables):
```bash
VITE_USE_LOCAL_ASSETS=false
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```

### Current R2 Structure

**Bucket**: `joshify-canvas`
**CDN Domain**: `https://cdn.joshify.dev`

**Folder Organization**:
```
cdn.joshify.dev/
└── assets/
    ├── canvases/          # 13 videos (17MB total)
    │   ├── api-engine-optimization.mp4
    │   ├── beer-fridge.mp4
    │   ├── democracy-engine.mp4
    │   ├── did-kansas-win.mp4
    │   ├── election-data-pipeline.mp4
    │   ├── healthcare-api-extensions.mp4
    │   ├── healthcare-etl.mp4
    │   ├── joshify.mp4
    │   ├── law-firm-startup-operations.mp4
    │   ├── medigap-integration.mp4
    │   ├── mobile-api-rebuild.mp4
    │   ├── startup-technology-infrastructure.mp4
    │   └── wichitaradar.mp4
    └── music/             # Ready for future music files
        └── .gitkeep
```

**Access Pattern**: `https://cdn.joshify.dev/assets/canvases/{filename}`

## Tools & CLI

### Wrangler (Cloudflare CLI)

**Installation**: Globally installed via npm
**Version**: 4.42.0
**Location**: `~/.nvm/versions/node/v23.8.0/bin/wrangler`

**Common Commands**:
```bash
# Login to Cloudflare
wrangler login

# List R2 buckets (if using R2 in future)
wrangler r2 bucket list

# Upload files to R2 (if using R2 in future)
wrangler r2 object put <bucket>/<filename> --file=<local-path>
```

**Note**: Wrangler was installed for potential Cloudflare R2 migration but currently using B2 + Cloudflare CDN proxy instead.

## How It Works

### Request Flow

1. **User visits**: `https://joshify-production.up.railway.app`
2. **Browser requests**: `https://cdn.joshify.dev/video.mp4`
3. **Cloudflare checks**: Edge cache for video
   - **Cache HIT**: Serves from nearest edge location (< 100ms)
   - **Cache MISS**: Fetches from R2, caches at edge, serves to user
4. **Subsequent requests**: Served from Cloudflare cache (instant)

### Cache Behavior

- **First Load**: ~1-2 seconds (from R2)
- **Cached Loads**: < 100ms (from Cloudflare edge)
- **Cache Duration**: Determined by Cloudflare's edge caching rules
- **Global Distribution**: Videos cached in 200+ cities worldwide

## Nameserver Configuration

**Domain Registrar**: Namecheap
**DNS Provider**: Cloudflare

**Cloudflare Nameservers** (set at Namecheap):
- `ava.ns.cloudflare.com` (example - actual values may vary)
- `nash.ns.cloudflare.com` (example - actual values may vary)

**Note**: DNS changes can take 5 minutes to 48 hours to propagate globally.

## Testing & Verification

### Test CDN is Working

```bash
# Check DNS resolution
dig +short cdn.joshify.dev

# Test video endpoint with cache headers
curl -I https://cdn.joshify.dev/beer-fridge.mp4

# Look for these headers indicating Cloudflare CDN:
# - cf-cache-status: HIT (cached) or MISS (not cached yet)
# - cf-ray: Cloudflare request ID
# - server: cloudflare
```

### Test in Browser

1. Open production site: `https://joshify-production.up.railway.app`
2. Navigate to project with canvas video (e.g., "Did Kansas Win?")
3. Open DevTools → Network tab
4. Check video request:
   - Should load from `cdn.joshify.dev`
   - First load may take 1-2 seconds
   - Refresh should be instant (cached)

### Troubleshooting

### Videos Loading Slowly

**Check 1: Cloudflare Proxy Enabled**
- Go to Cloudflare DNS settings
- Verify `cdn.joshify.dev` CNAME has **orange cloud** (Proxied)
- Gray cloud = no CDN, orange cloud = CDN enabled

**Check 2: Cache Status**
```bash
curl -I https://cdn.joshify.dev/beer-fridge.mp4 | grep cf-cache-status
```
- `HIT` = cached (good)
- `MISS` = not cached yet (first request)
- `BYPASS` = not being cached (problem - check proxy status)

**Check 3: DNS Propagation**
```bash
dig cdn.joshify.dev
```
- Should show CNAME to `joshify-canvas.r2.dev`
- If no result, DNS hasn't propagated yet (wait up to 48 hours)

### CORS Errors

If you see CORS errors in browser console:

1. **Verify R2 CORS includes your domain**:
   - Check `allowedOrigins` in R2 bucket CORS settings
   - Must include exact production URL

2. **Check Cloudflare Proxy**:
   - Cloudflare proxy can sometimes interfere with CORS
   - Verify CORS headers are being forwarded

3. **Test Direct R2 URL**:
```bash
curl -I https://joshify-canvas.r2.dev/beer-fridge.mp4
```
   - Should return 200 OK
   - If 403 Forbidden, check R2 bucket is public

### DNS Not Resolving

**Possible Causes**:
1. **Nameservers not updated**: Check Namecheap shows Cloudflare nameservers
2. **Propagation delay**: Wait up to 48 hours
3. **Typo in CNAME**: Verify `cdn.joshify.dev` CNAME target is correct

**Check Nameserver Propagation**:
```bash
dig NS joshify.dev
```
Should show Cloudflare nameservers.

## Cost Analysis

### Current Costs

**Monthly Costs** (based on typical portfolio traffic):
- **Cloudflare R2 Storage**: $0.00 (78MB well within 10GB free tier)
- **R2 Downloads**: $0.00 (Cloudflare caches videos, minimal R2 bandwidth)
- **Cloudflare CDN**: $0.00 (Free tier)

**Total**: $0.00/month ✅

### Cost at Scale

**Scenario**: 10,000 monthly visitors, 3 videos viewed per visit

- **Cloudflare Cache Hit Rate**: ~95% (typical)
- **R2 Bandwidth**: ~1.5GB/month (only cache misses)
- **R2 Cost**: $0.0225/month ($0.015/GB)
- **Cloudflare Cost**: $0.00 (still free)

**Total at 10,000 visitors**: ~$0.02/month

## Alternative Considered: Backblaze B2

**Why Not B2?**
- ✅ **R2 + CDN works great**: Now set up and optimized
- ✅ **Zero cost**: Within free tiers
- ⚠️ **B2 Custom Domains**: More complex to set up than R2 custom domains.

## Maintenance

### Adding New Canvas Videos

1. **Upload to R2 Bucket**:
   - Use Wrangler CLI or Cloudflare dashboard
   - Upload to `joshify-canvas` bucket

2. **Update Project Data**:
   - Add video filename to project in `src/data/projects.ts`
   - Use `getCanvasUrl('filename.mp4')` helper

3. **Test**:
   - Local: Place video in `public/canvases/`
   - Production: Video auto-loads from CDN

### Updating CORS

If adding new production domains:

1. **Update R2 CORS** to include new domain
2. **Update `.env.production`** if changing CDN URL
3. **Update Railway environment variables**

## Documentation References

- **Cloudflare R2 Setup**: `.claude/CLOUDFLARE_R2_SETUP.md` (alternative approach)
- **Canvas Video Setup**: `.claude/CANVAS_VIDEO_SETUP.md` (video requirements)

## Summary

✅ **Storage**: Cloudflare R2 (`joshify-canvas` bucket)
✅ **CDN**: Cloudflare global edge network
✅ **Domain**: `cdn.joshify.dev` (proxied through Cloudflare)
✅ **DNS**: Managed by Cloudflare, domain registered at Namecheap
✅ **Cost**: $0.00/month (within free tiers)
✅ **Performance**: < 100ms for cached videos
✅ **Production Ready**: No rate limits, unlimited bandwidth
