# 🏗️ AWS Landing Zone Architecture Generator - Enhanced Edition

Generate professional AWS Landing Zone architecture diagrams from LZDW questionnaires with **embedded interactive visualization**.

## 🎯 What's New in v2.0

### ✨ Interactive Embedded Diagrams
- **No more downloading files!** View diagrams directly in your browser
- **Interactive controls** - Pan, zoom, drag nodes
- **High-quality exports** - Download as PNG or SVG
- **Professional AWS styling** - Matches official AWS architecture diagrams
- **Toggle views** - Switch between interactive diagram and account details

### 🔧 Technical Improvements
- Built with React Flow for smooth interactions
- Dynamic imports for optimal performance
- Responsive design for all screen sizes
- High-resolution exports (2x pixel ratio)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `reactflow` - Interactive diagram library
- `html-to-image` - High-quality exports
- All existing dependencies

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Use the App

1. **Upload** a LZDW questionnaire (.txt or .docx)
2. **Generate** architecture with AI
3. **View** the interactive diagram (new!)
4. **Toggle** between diagram and details view
5. **Export** as PNG, SVG, or Draw.io format

## 📦 What's Included

```
lzdw-agent-enhanced/
├── components/
│   └── DiagramViewer.js         ← NEW: Interactive diagram viewer
├── pages/
│   ├── index.js                  ← UPDATED: With diagram integration
│   ├── _app.js
│   └── api/
│       ├── generate.js           ← Existing: Architecture generation
│       ├── parse-docx.js         ← Existing: Document parsing
│       └── download-drawio.js    ← Existing: Draw.io export
├── package.json                  ← UPDATED: New dependencies
├── next.config.js
└── README.md                     ← This file
```

## 🎨 Features

### Interactive Diagram Viewer
- **Pan**: Click and drag the background
- **Zoom**: Scroll wheel or use +/- buttons
- **Move nodes**: Drag individual account nodes
- **Minimap**: Overview in bottom-right corner
- **Fit view**: Auto-center all nodes
- **Export**: High-quality PNG and SVG

### AWS-Styled Nodes
- **Master Account** - Pink with crown icon 👑
- **Security OU** - Green with lock icon 🔒
- **Workload OU** - Blue with briefcase icon 💼
- **Networking OU** - Purple with network icon 🔗

### Export Options
- **PNG** - High-resolution raster (2x pixel ratio)
- **SVG** - Scalable vector graphics
- **Draw.io** - Original format still supported
- **JSON** - Raw architecture data

## 🚀 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/lzdw-agent-enhanced)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 💻 Development

### Project Structure

- `components/DiagramViewer.js` - React Flow diagram component with custom nodes
- `pages/index.js` - Main page with form, processing, and results
- `pages/api/generate.js` - AI-powered architecture generation
- `pages/api/parse-docx.js` - DOCX file parsing
- `pages/api/download-drawio.js` - Draw.io XML generation

### Customization

#### Change Colors

Edit `DiagramViewer.js`:

```javascript
const getNodeStyle = (type) => {
  const styles = {
    master: {
      background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4EC 100%)',
      border: '3px solid #D6336C', // Change this
      shadow: '0 8px 24px rgba(214, 51, 108, 0.25)',
    },
    // ...
  };
};
```

#### Adjust Layout

Modify spacing in `DiagramViewer.js`:

```javascript
const VERTICAL_SPACING = 180;    // Space between rows
const HORIZONTAL_SPACING = 280;  // Space between columns
```

## 📚 Documentation

- **Original README**: See `QUICK_START.md` for the original setup
- **Deployment**: See `DEPLOYMENT.md` for deploy instructions
- **API Upgrade**: See `GROQ_UPGRADE.md` for AI model info

## 🔧 Troubleshooting

### Diagram not showing

```bash
# Reinstall dependencies
npm install reactflow html-to-image

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Build errors

Make sure you're using Node.js 16+ and have all dependencies installed:

```bash
node --version  # Should be 16+
npm install
```

### Export not working

The export feature requires `html-to-image`. If exports fail:

```bash
npm install html-to-image --save
```

## 🆚 Comparison: v1 vs v2

| Feature | v1 (Original) | v2 (Enhanced) |
|---------|---------------|---------------|
| Diagram viewing | Download .drawio file | **Embedded interactive** |
| User experience | Multi-step (download, open external site) | **Single page** |
| Interactivity | Static (once opened in Draw.io) | **Pan, zoom, drag** |
| Export formats | Draw.io, JSON | **PNG, SVG, Draw.io, JSON** |
| Quality | High (in Draw.io) | **High (embedded)** |
| Sharing | Share files | **Share URL** |

## 🎯 Use Cases

- **AWS Consultants** - Generate client architectures quickly
- **Solutions Architects** - Visualize designs interactively
- **Sales/Pre-sales** - Create proposals with professional diagrams
- **DevOps Teams** - Document infrastructure as code
- **Training** - Teach AWS architecture patterns

## 🤝 Contributing

Contributions are welcome! This is an enhanced version with:
1. Interactive diagram viewer (React Flow)
2. High-quality exports
3. Improved UX

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

Same as original project.

## 🙏 Credits

- **Original LZDW Agent** - Base questionnaire-to-architecture generator
- **React Flow** - Interactive diagram library
- **html-to-image** - Export functionality
- **AWS** - Architecture icons and styling guidelines

---

**Ready to deploy?** Just run `npm install && npm run dev` and you're good to go! 🚀

For questions or support, check the original documentation files included in this repo.
