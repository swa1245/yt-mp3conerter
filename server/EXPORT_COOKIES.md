# How to Export YouTube Cookies for Production

YouTube requires authentication to prevent bot access. Follow these steps to export your cookies:

## Method 1: Using Browser Extension (Easiest)

### Step 1: Install Extension
- Chrome: Install "Get cookies.txt LOCALLY" extension
- Firefox: Install "cookies.txt" extension

### Step 2: Export Cookies
1. Go to https://www.youtube.com
2. Make sure you're logged in
3. Click the extension icon
4. Click "Export" or "Get cookies.txt"
5. Save the file as `youtube-cookies.txt`

### Step 3: Upload to Render
1. Go to your Render dashboard
2. Click on your web service
3. Go to "Shell" tab
4. Upload the `youtube-cookies.txt` file to the root directory
5. Or use Render's file upload feature in the dashboard

## Method 2: Manual Export (Advanced)

### For Chrome:
1. Open Chrome DevTools (F12)
2. Go to Application tab
3. Click "Cookies" → "https://www.youtube.com"
4. Copy all cookies
5. Format them in Netscape cookie format

## Cookie File Format

The file should be in Netscape cookie format:
```
# Netscape HTTP Cookie File
.youtube.com	TRUE	/	TRUE	0	PREF	value
.youtube.com	TRUE	/	TRUE	0	VISITOR_INFO1_LIVE	value
```

## Important Notes

- Cookies expire after some time (usually 1-2 months)
- You'll need to re-export and re-upload when they expire
- Keep your cookies file secure - don't commit it to GitHub
- The cookies file is already in .gitignore

## Troubleshooting

If you still get bot detection errors:
1. Make sure you're logged into YouTube in your browser
2. Re-export fresh cookies
3. Verify the cookies file is in the correct format
4. Check that the file is named exactly `youtube-cookies.txt`
