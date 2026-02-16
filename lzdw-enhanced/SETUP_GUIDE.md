# 📖 Setup Guide - AWS Landing Zone Enhanced

## Quick 3-Step Setup

### Step 1: Install Dependencies (1 minute)

```bash
npm install
```

This installs:
- React Flow (interactive diagrams)
- html-to-image (exports)
- Next.js and React
- All other dependencies

### Step 2: Run Development Server (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Step 3: Test It! (2 minutes)

1. Upload a LZDW questionnaire file
2. Click "Generate AWS Architecture"
3. Toggle between "Interactive Diagram" and "Account Details"
4. Try dragging nodes, zooming, exporting

**That's it!** 🎉

---

## 🚀 Deploy to Vercel (5 minutes)

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/lzdw-agent.git
git push -u origin main
```

2. **Import to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo
- Click "Deploy"

Done! Your app is live. ✅

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

---

## 🎨 What Changed from Original

### Files Added
- `components/DiagramViewer.js` - Interactive diagram viewer

### Files Modified
- `pages/index.js` - Added diagram viewer integration
- `package.json` - Added reactflow and html-to-image

### Files Unchanged
- `pages/api/*` - All API routes work as before
- `next.config.js` - No changes
- Original documentation files

---

## 🔧 Environment Setup (Optional)

If you're using GROQ for AI generation, create a `.env.local` file:

```bash
GROQ_API_KEY=your_key_here
```

Check `GROQ_UPGRADE.md` for details.

---

## 📱 Using the App

### Upload Questionnaire
- Drag & drop or click to upload
- Supports .txt and .docx files
- Can also paste content directly

### Generate Architecture
- Click "Generate AWS Architecture"
- Wait ~5-10 seconds for AI processing
- View results with interactive diagram!

### Interact with Diagram
- **Pan**: Click and drag background
- **Zoom**: Scroll wheel or use controls
- **Move**: Drag individual nodes
- **Reset**: Click "Fit View" button

### Export Options
- **PNG**: High-res image (presentations)
- **SVG**: Vector graphic (scalable)
- **Draw.io**: Edit in diagrams.net
- **JSON**: Raw data

---

## 🎯 Customization

### Change AWS Pink Color

Edit `DiagramViewer.js`, line ~20:

```javascript
border: '3px solid #D6336C',  // Change #D6336C to your color
```

### Adjust Node Spacing

Edit `DiagramViewer.js`, line ~140:

```javascript
const VERTICAL_SPACING = 180;     // Increase for more vertical space
const HORIZONTAL_SPACING = 280;   // Increase for more horizontal space
```

### Add More Node Info

Edit `DiagramViewer.js`, around line ~50:

```javascript
data: {
  label: acc.name,
  email: acc.email,
  purpose: acc.purpose,
  // Add custom fields:
  region: 'us-east-1',
  owner: 'DevOps Team',
  // etc.
}
```

---

## 🐛 Troubleshooting

### "Module not found: reactflow"

```bash
npm install reactflow html-to-image
```

### Diagram is blank

Check browser console (F12) for errors. Make sure:
- DiagramViewer.js is in `components/` folder
- index.js properly imports it
- Architecture data exists

### Can't export diagrams

```bash
npm install html-to-image --save
npm run dev
```

### Build fails

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Next Steps

1. ✅ **Test locally** - Make sure everything works
2. ✅ **Customize** - Change colors, adjust layout
3. ✅ **Deploy** - Push to Vercel or your hosting
4. ✅ **Use it** - Generate client architectures!

---

## 🆘 Need Help?

- Check the main `README.md`
- Review original docs: `QUICK_START.md`, `DEPLOYMENT.md`
- The code is well-commented - dive in!

---

**You're all set!** Run `npm run dev` and start generating beautiful AWS architectures! 🚀
