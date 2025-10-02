# Backblaze B2 Setup Guide for Canvas Videos

**Solution**: Use Backblaze B2 object storage for canvas video hosting with environment-based local/production switching.

## Why Backblaze B2?

- ✅ **Simple setup**: Easier than Cloudflare R2
- ✅ **Free tier**: 10GB storage/month (you only need 76MB)
- ✅ **Low cost**: ~$0.00-0.08/month for this project
- ✅ **Full CORS support**: Easy CORS configuration
- ✅ **Public buckets**: Simple public URL access
- ✅ **Excellent documentation**: Clear, straightforward guides
- ✅ **Better support**: Responsive customer service

## Current Implementation

### Environment-Based URL Resolution

**Development** (`.env.development`):
```bash
VITE_USE_LOCAL_CANVAS=true
```
- Videos load from `public/canvases/` folder
- No CORS issues
- Fast local development

**Production** (`.env.production`):
```bash
VITE_USE_LOCAL_CANVAS=false
VITE_CANVAS_CDN_URL=https://f002.backblazeb2.com/file/joshify-canvas
```
- Videos load from Backblaze B2 CDN
- Proper CORS headers
- Fast global delivery

## Setup Steps

### 1. Create Backblaze Account

1. Go to [backblaze.com](https://www.backblaze.com/b2/sign-up.html)
2. Sign up for free account
3. Verify email address
4. Log in to B2 Cloud Storage dashboard

### 2. Create B2 Bucket

1. Click **Buckets** in left sidebar
2. Click **Create a Bucket**
3. Bucket settings:
   - **Bucket Unique Name**: `joshify-canvas` (or your preferred name)
   - **Files in Bucket**: **Public**
   - **Encryption**: None (videos are public)
   - **Object Lock**: Disabled
4. Click **Create a Bucket**

### 3. Configure CORS

1. In your bucket, click **Bucket Settings**
2. Scroll to **CORS Rules** section
3. Click **Add CORS Rule**
4. Add this configuration:

```json
[
  {
    "corsRuleName": "allowProductionAndDev",
    "allowedOrigins": [
      "https://joshify-production.up.railway.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173"
    ],
    "allowedOperations": [
      "b2_download_file_by_name",
      "b2_download_file_by_id"
    ],
    "allowedHeaders": ["*"],
    "exposeHeaders": ["Content-Length", "Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

5. Click **Save Changes**

### 4. Upload Canvas Videos

**Option A: Web Interface (Easiest)**

1. In your bucket, click **Upload/Download**
2. Click **Upload Files**
3. Select all 6 canvas videos from `public/canvases/`:
   - `beer-fridge.mp4` (3MB)
   - `did-kansas-win.mp4` (15MB)
   - `law-firm-startup-operations.mp4` (21MB)
   - `mobile-api-rebuild.mp4` (2.5MB)
   - `startup-technology-infrastructure.mp4` (21MB)
   - `wichitaradar.mp4` (18MB)
4. Click **Upload**
5. Wait for upload to complete

**Option B: Backblaze CLI (Advanced)**

```bash
# Install B2 CLI
pip install b2

# Authenticate
b2 authorize-account <applicationKeyId> <applicationKey>

# Upload all videos
cd public/canvases
b2 upload-file joshify-canvas beer-fridge.mp4 beer-fridge.mp4
b2 upload-file joshify-canvas did-kansas-win.mp4 did-kansas-win.mp4
b2 upload-file joshify-canvas law-firm-startup-operations.mp4 law-firm-startup-operations.mp4
b2 upload-file joshify-canvas mobile-api-rebuild.mp4 mobile-api-rebuild.mp4
b2 upload-file joshify-canvas startup-technology-infrastructure.mp4 startup-technology-infrastructure.mp4
b2 upload-file joshify-canvas wichitaradar.mp4 wichitaradar.mp4
```

### 5. Get Your B2 Public URL

1. In your bucket, click on any uploaded video
2. Look for **Friendly URL** or **Public URL**
3. It will be in the format: `https://f002.backblazeb2.com/file/joshify-canvas/filename.mp4`
4. Copy the base URL: `https://f002.backblazeb2.com/file/joshify-canvas`

**Note**: The number `f002` may vary. Use your actual bucket's URL.

### 6. Update Production Environment Variable

Edit `.env.production`:

```bash
# Production environment
VITE_USE_LOCAL_CANVAS=false

# Replace with your actual B2 bucket URL
VITE_CANVAS_CDN_URL=https://f002.backblazeb2.com/file/joshify-canvas
```

**Important**: Remove any trailing slash from the URL.

### 7. Add Environment Variable to Railway

1. Go to [Railway dashboard](https://railway.app/)
2. Open your `joshify-production` project
3. Click **Variables** tab
4. Add new variable:
   - **Key**: `VITE_CANVAS_CDN_URL`
   - **Value**: `https://f002.backblazeb2.com/file/joshify-canvas` (your actual B2 URL)
5. Click **Deploy** to redeploy with new variable

### 8. Test in Production

1. Wait for Railway deployment to complete
2. Open production site: https://joshify-production.up.railway.app
3. Navigate to a project with canvas video (e.g., "Did Kansas Win?")
4. Open browser DevTools → Console
5. Verify:
   - ✅ Video loads without errors
   - ✅ No CORS errors in console
   - ✅ Video plays smoothly

## Troubleshooting

### Videos Not Loading

**Check 1: Bucket is Public**
- In B2 dashboard, verify bucket **Files in Bucket** is set to **Public**

**Check 2: CORS Configuration**
- Ensure CORS rule includes your production domain
- Verify `allowedOrigins` has `https://` prefix

**Check 3: Environment Variable**
- Check Railway variables include `VITE_CANVAS_CDN_URL`
- Verify URL has no trailing slash
- Ensure URL format matches: `https://f00X.backblazeb2.com/file/bucket-name`

**Check 4: Video Upload**
- Verify all 6 videos appear in B2 bucket dashboard
- Check file sizes match originals

### CORS Errors Persisting

1. **Wait 5 minutes**: CORS changes take time to propagate
2. **Hard refresh**: Clear browser cache (Ctrl+Shift+R)
3. **Check domain**: Ensure Railway domain exactly matches CORS rule
4. **Verify headers**: In DevTools → Network, check response headers include `Access-Control-Allow-Origin`

### Railway Deployment Issues

1. **Missing env var**: Ensure `VITE_CANVAS_CDN_URL` is set in Railway
2. **Build failed**: Check Railway logs for build errors
3. **Old build cached**: Trigger manual redeploy in Railway

### Videos Load Locally but Not Production

- **Environment variable**: Ensure Railway has `VITE_CANVAS_CDN_URL` set
- **Build process**: Vite must bundle env vars during build
- **Check logs**: Review Railway build logs for env var issues

## Local Development Setup

### Download Videos Locally (One-time Setup)

If you don't have local canvas videos in `public/canvases/`:

**Option 1: Download from B2**
1. Go to B2 bucket dashboard
2. Select each video
3. Click **Download**
4. Save to `public/canvases/` folder

**Option 2: Copy from Backup**
If you have videos in another location, copy them to `public/canvases/`.

**Verify Local Setup**:
```bash
ls -lh public/canvases/
# Should show all 6 .mp4 files
```

### Start Development Server

```bash
npm run dev
```

Videos will load from `public/canvases/` automatically (no CORS issues).

## Cost Estimate

**Monthly costs (well within free tier):**
- Storage: 76MB = $0.00 (free tier covers 10GB)
- Download: ~500 downloads/month = $0.00 (free tier covers 1GB/day egress)
- API Calls: ~500/month = $0.00 (free tier covers 2,500/day)

**Total: $0.00/month** ✅

Even with 10,000 video views/month:
- Egress: 760GB = $0.76 (at $0.01/GB)
- **Total: ~$0.76/month** (still very cheap)

## File Structure

```
joshify/
├── .env.development          # VITE_USE_LOCAL_CANVAS=true
├── .env.production           # VITE_USE_LOCAL_CANVAS=false, VITE_CANVAS_CDN_URL=...
├── src/
│   └── utils/
│       └── canvas.ts         # Environment-aware URL resolver
└── public/
    └── canvases/             # Local videos (gitignored)
        ├── beer-fridge.mp4
        ├── did-kansas-win.mp4
        ├── law-firm-startup-operations.mp4
        ├── mobile-api-rebuild.mp4
        ├── startup-technology-infrastructure.mp4
        └── wichitaradar.mp4
```

## Security Notes

- B2 bucket is public but only contains canvas videos (non-sensitive)
- CORS policy restricts which domains can embed videos
- No authentication required for public bucket access
- Monitor B2 usage in Backblaze dashboard
- Set up B2 alerts if usage exceeds free tier

## Backup Strategy

**Recommended**: Keep local copies of canvas videos in a safe location

1. Create backup folder outside git repo:
   ```bash
   mkdir ~/joshify-canvas-backup
   cp public/canvases/*.mp4 ~/joshify-canvas-backup/
   ```

2. Or use cloud backup (Dropbox, Google Drive, etc.)

This ensures you can re-upload videos if B2 bucket is accidentally deleted.

## Next Steps

After completing this setup:

1. ✅ Test all 6 projects with canvas videos in production
2. ✅ Verify local development works with local videos
3. ✅ Monitor B2 usage for first month
4. ✅ Set up B2 usage alerts (optional)
5. ✅ Document any customizations in this file
