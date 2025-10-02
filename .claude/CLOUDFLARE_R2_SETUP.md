# Cloudflare R2 Setup Guide for Canvas Videos

**Problem**: Canvas videos fail in production due to CORS errors from GitHub Releases CDN.

**Solution**: Use Cloudflare R2 object storage with proper CORS configuration.

## Why Cloudflare R2?

- ✅ **Free tier**: 10GB storage/month (you only need 76MB)
- ✅ **Zero egress fees**: No bandwidth charges (unlike AWS S3)
- ✅ **Full CORS support**: Configurable CORS policies
- ✅ **Public buckets**: Make videos publicly accessible
- ✅ **CDN integration**: Fast global delivery

## Setup Steps

### 1. Create Cloudflare R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage** in the left sidebar
3. Click **Create bucket**
4. Bucket settings:
   - **Name**: `joshify-canvas-videos` (or your preferred name)
   - **Location**: Automatic (best performance)
5. Click **Create bucket**

### 2. Configure CORS Policy

1. In your bucket, go to **Settings** tab
2. Scroll to **CORS Policy** section
3. Click **Add CORS policy**
4. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://joshify-production.up.railway.app",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "Content-Length",
      "Content-Type",
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

5. Click **Save**

### 3. Make Bucket Public

**Option A: Public Bucket (Simplest)**
1. In bucket **Settings**, find **Public access** section
2. Click **Allow Access**
3. Confirm the action

This gives you URLs like: `https://pub-[bucket-id].r2.dev/filename.mp4`

**Option B: Custom Domain (Better for production)**
1. In bucket **Settings**, go to **Custom Domains**
2. Click **Connect Domain**
3. Enter your domain: `cdn.yourdomain.com`
4. Add the CNAME record to your DNS
5. Enable **Proxied** mode in Cloudflare DNS

This gives you URLs like: `https://cdn.yourdomain.com/filename.mp4`

### 4. Upload Canvas Videos

**Via Cloudflare Dashboard:**
1. In your bucket, click **Upload**
2. Select all 6 canvas videos from `public/canvases/`:
   - beer-fridge.mp4 (3MB)
   - did-kansas-win.mp4 (15MB)
   - law-firm-startup-operations.mp4 (21MB)
   - mobile-api-rebuild.mp4 (2.5MB)
   - startup-technology-infrastructure.mp4 (21MB)
   - wichitaradar.mp4 (18MB)
3. Click **Upload**

**Via Wrangler CLI (Alternative):**
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Upload all videos
wrangler r2 object put joshify-canvas-videos/beer-fridge.mp4 --file=public/canvases/beer-fridge.mp4
wrangler r2 object put joshify-canvas-videos/did-kansas-win.mp4 --file=public/canvases/did-kansas-win.mp4
wrangler r2 object put joshify-canvas-videos/law-firm-startup-operations.mp4 --file=public/canvases/law-firm-startup-operations.mp4
wrangler r2 object put joshify-canvas-videos/mobile-api-rebuild.mp4 --file=public/canvases/mobile-api-rebuild.mp4
wrangler r2 object put joshify-canvas-videos/startup-technology-infrastructure.mp4 --file=public/canvases/startup-technology-infrastructure.mp4
wrangler r2 object put joshify-canvas-videos/wichitaradar.mp4 --file=public/canvases/wichitaradar.mp4
```

### 5. Get Your R2 Public URLs

After making the bucket public, you'll get a public URL in the format:
```
https://pub-[bucket-id].r2.dev/
```

For example:
```
https://pub-abc123.r2.dev/beer-fridge.mp4
https://pub-abc123.r2.dev/did-kansas-win.mp4
```

**Copy this base URL** - you'll need it for the next step.

### 6. Update Code to Use R2 URLs

Edit `src/utils/canvas.ts`:

```typescript
// Map of canvas filenames to their Cloudflare R2 URLs
const R2_BASE_URL = 'https://pub-[YOUR-BUCKET-ID].r2.dev';

const CDN_URLS: Record<string, string> = {
    'mobile-api-rebuild.mp4': `${R2_BASE_URL}/mobile-api-rebuild.mp4`,
    'beer-fridge.mp4': `${R2_BASE_URL}/beer-fridge.mp4`,
    'did-kansas-win.mp4': `${R2_BASE_URL}/did-kansas-win.mp4`,
    'wichitaradar.mp4': `${R2_BASE_URL}/wichitaradar.mp4`,
    'law-firm-startup-operations.mp4': `${R2_BASE_URL}/law-firm-startup-operations.mp4`,
    'startup-technology-infrastructure.mp4': `${R2_BASE_URL}/startup-technology-infrastructure.mp4`,
};

export const getCanvasUrl = (filename: string | null): string | null => {
    if (!filename) return null;

    // Check if we should use local canvas videos (for development)
    const useLocal = import.meta.env.VITE_USE_LOCAL_CANVAS === 'true';

    if (useLocal) {
        return `/canvases/${filename}`;
    }

    // Production: use Cloudflare R2 CDN
    const cdnUrl = CDN_URLS[filename];
    return cdnUrl !== undefined ? cdnUrl : null;
};
```

### 7. Test in Production

1. Commit and push changes
2. Wait for Railway deployment
3. Open production site: https://joshify-production.up.railway.app
4. Navigate to a project with canvas video (e.g., "Did Kansas Win?")
5. Verify video loads without CORS errors in browser console

## Troubleshooting

### Videos not loading
- Check CORS policy includes your production domain
- Verify bucket is set to public access
- Check browser console for specific error messages

### CORS errors persisting
- Ensure `AllowedOrigins` includes your exact domain (with https://)
- Add `ExposeHeaders` for `Content-Length` and `Content-Type`
- Wait a few minutes for CORS changes to propagate

### Video URLs 404
- Verify videos were uploaded successfully in R2 dashboard
- Check that R2_BASE_URL matches your actual bucket URL
- Ensure bucket is public

## Cost Estimate

**Monthly costs (well within free tier):**
- Storage: 76MB = $0.00 (free tier covers 10GB)
- Requests: ~1000/month = $0.00 (free tier covers 10M Class B requests)
- Egress: Unlimited = $0.00 (R2 has zero egress fees)

**Total: $0.00/month** ✅

## Alternative: Custom Domain Setup

For a cleaner URL structure:

1. Add a CNAME record in Cloudflare DNS:
   ```
   cdn.joshify.com → pub-[bucket-id].r2.dev
   ```

2. Update `R2_BASE_URL` to:
   ```typescript
   const R2_BASE_URL = 'https://cdn.joshify.com';
   ```

3. Benefits:
   - Branded URLs
   - Better caching control
   - Future flexibility (can change backend without breaking URLs)

## Security Notes

- R2 bucket is public but only contains canvas videos (non-sensitive)
- CORS policy restricts which domains can embed videos
- Consider adding rate limiting if needed in the future
- Monitor R2 usage in Cloudflare dashboard

## Next Steps

After completing this setup:
1. Test all 6 projects with canvas videos
2. Update `.claude/TASKS.md` to document this solution
3. Consider adding a fallback for R2 downtime (use album art)
4. Monitor R2 usage in first month to confirm staying within free tier
