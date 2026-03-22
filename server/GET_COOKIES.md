# How to Get YouTube Cookies (Required for 2026)

YouTube's bot detection in 2026 requires real browser cookies to work. Follow these steps:

## Method 1: Using Browser Console (Easiest)

1. **Open YouTube.com** in Chrome/Edge
2. **Make sure you're logged in** to YouTube
3. **Press F12** to open Developer Tools
4. **Go to Console tab**
5. **Paste this code** and press Enter:

```javascript
// Extract YouTube cookies
(function() {
    const cookies = document.cookie.split(';').map(c => {
        const [name, value] = c.trim().split('=');
        return { name, value };
    });
    
    console.log('YouTube Cookies:');
    console.log(JSON.stringify(cookies, null, 2));
    
    // Copy to clipboard
    navigator.clipboard.writeText(document.cookie);
    console.log('✅ Cookies copied to clipboard!');
})();
```

6. **Copy the output** (it's in your clipboard)
7. **Save it** - we'll use it in the next step

---

## Method 2: Using EditThisCookie Extension

1. Install **EditThisCookie** extension for Chrome
2. Go to **YouTube.com** (make sure you're logged in)
3. Click the **EditThisCookie** icon
4. Click **Export** button
5. Copy the JSON output
6. Save it for the next step

---

## Method 3: Manual Export from DevTools

1. Open YouTube.com
2. Press F12 → **Application** tab
3. Left sidebar → **Cookies** → **https://www.youtube.com**
4. Right-click on the cookie list → **Copy all as JSON** (if available)
5. Or manually note down important cookies like:
   - `__Secure-1PSID`
   - `__Secure-1PAPISID`
   - `__Secure-3PSID`
   - `__Secure-3PAPISID`
   - `VISITOR_INFO1_LIVE`
   - `CONSENT`

---

## Next Step: Update the Worker

Once you have the cookies, I'll help you add them to the worker code.
