# 🚀 START HERE - Quick Deploy Guide

## ⚡ Super Quick Start (3 commands)

```bash
# 1. Install dependencies
npm install

# 2. Run development server  
npm run dev

# 3. Open browser
# Go to http://localhost:3000
```

**That's it!** Your enhanced LZDW app with interactive diagrams is running! 🎉

---

## 🎯 What You Got

This is your original AWS Landing Zone app **PLUS**:

✅ **Interactive embedded diagrams** (no more downloading .drawio files!)  
✅ **Pan, zoom, drag nodes** with your mouse  
✅ **Export to PNG/SVG** at high quality  
✅ **Professional AWS styling** with your pink branding  
✅ **Toggle views** between diagram and account details  

---

## 📦 What Changed

**Added:**
- `components/DiagramViewer.js` - The interactive diagram viewer
- Updated `pages/index.js` - Integrated the viewer
- Updated `package.json` - Added reactflow & html-to-image

**Everything else is exactly the same!** All your original files, APIs, and configs are untouched.

---

## 🚀 Deploy to Vercel (2 minutes)

### Option 1: Via GitHub

```bash
# Push to GitHub
git init
git add .
git commit -m "Enhanced with interactive diagrams"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# Then go to vercel.com:
# 1. Import your GitHub repo
# 2. Click Deploy
# Done! ✅
```

### Option 2: Direct Deploy

```bash
npm i -g vercel
vercel
# Follow the prompts
```

---

## 🎨 How to Use

1. **Upload** your LZDW questionnaire (.txt or .docx)
2. **Click** "Generate AWS Architecture"  
3. **Toggle** between "📊 Interactive Diagram" and "📋 Account Details"
4. **Play** with the diagram:
   - Drag nodes around
   - Scroll to zoom
   - Use minimap for navigation
5. **Export** as PNG, SVG, Draw.io, or JSON

---

## 📚 Documentation

- **README.md** - Complete feature overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **QUICK_START.md** - Original app documentation
- **DEPLOYMENT.md** - Deployment options
- **GROQ_UPGRADE.md** - AI model configuration

---

## 🆘 Common Issues

### "Module not found"
```bash
npm install
```

### Diagram not showing
- Make sure you ran `npm install`
- Check that `DiagramViewer.js` is in the `components/` folder
- Open browser console (F12) to check for errors

### Export button doesn't work
```bash
npm install html-to-image --save
```

---

## ✨ Next Steps

1. ✅ Test locally with `npm run dev`
2. ✅ Upload a questionnaire and generate a diagram
3. ✅ Try the interactive features
4. ✅ Deploy to Vercel
5. ✅ Share with your team!

---

**Questions?** Check the README.md or SETUP_GUIDE.md

**Ready to deploy?** Just `npm install && npm run dev`

You're going to love the interactive diagrams! 🎉
