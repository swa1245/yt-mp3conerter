# How to Get YouTube PO Token (2026)

## Method 1: Using Browser Console (Recommended)

1. **Open YouTube** in your browser (Chrome/Edge recommended)
2. **Open Developer Tools** (F12 or Right-click → Inspect)
3. **Go to Console tab**
4. **Paste this code** and press Enter:

```javascript
// Extract PO Token from YouTube
(function() {
    try {
        const ytcfg = window.ytcfg?.data_ || window.ytcfg;
        const poToken = ytcfg?.PO_TOKEN || ytcfg?.INNERTUBE_CONTEXT?.client?.poToken;
        
        if (poToken) {
            console.log('✅ PO Token found:');
            console.log(poToken);
            navigator.clipboard.writeText(poToken);
            console.log('✅ Token copied to clipboard!');
        } else {
            console.log('❌ PO Token not found. Try refreshing the page.');
        }
    } catch (e) {
        console.error('Error:', e);
    }
})();
```

5. **Copy the token** (it's automatically copied to clipboard)
6. **Paste it** in your `.env` file as `PO_TOKEN=your_actual_token_here`

---

## Method 2: Using Network Tab

1. Open YouTube and go to Developer Tools (F12)
2. Go to **Network** tab
3. Filter by **Fetch/XHR**
4. Play any video
5. Look for requests to `youtubei/v1/player`
6. Click on the request → **Payload** tab
7. Look for `poToken` in the request body
8. Copy the token value

---

## Method 3: Using Browser Extension

Install **YouTube.js Token Extractor** extension (if available) or use a cookie/token extractor.

---

## Important Notes

- PO Tokens expire after some time (usually 24-48 hours)
- You may need to refresh the token periodically
- Keep your token private (don't commit to Git)
- The token is tied to your IP/session

---

## After Getting Token

1. Update `.env` file:
   ```
   PO_TOKEN=your_very_long_token_here
   ```

2. Restart your server:
   ```bash
   npm run dev2
   ```

3. Test with a YouTube URL
