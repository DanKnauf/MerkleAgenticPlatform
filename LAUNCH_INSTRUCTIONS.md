# 🚀 Launch Instructions - Merkle AI Platform

## Quick Start (Easiest Method)

### Method 1: Double-click the Batch File

1. Navigate to the project folder in Windows Explorer
2. Double-click `start.bat`
3. The script will:
   - Check if Node.js is installed
   - Install dependencies (if needed)
   - Start the development server
   - Automatically open Chrome
4. Wait for "ready in XXXms" message
5. Chrome will open to http://localhost:5173

---

## Alternative Methods

### Method 2: Using VS Code Terminal

1. **Open VS Code**
   - Open the project folder in VS Code

2. **Open Terminal**
   - Press `` Ctrl + ` `` or go to `View > Terminal`

3. **Install Dependencies** (first time only)
   ```bash
   npm install
   ```
   Wait for installation to complete (may take 2-3 minutes)

4. **Start the Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Chrome should open automatically
   - Or manually open Chrome and go to: http://localhost:5173

### Method 3: Using VS Code Debug Launch

1. **Install Dependencies** (if not already done)
   - Open terminal in VS Code
   - Run: `npm install`

2. **Launch with Debugger**
   - Press `F5`
   - Or go to `Run > Start Debugging`
   - Select "Launch Chrome - Merkle AI Platform"
   - Chrome will open with debugging enabled

### Method 4: Using PowerShell

1. **Open PowerShell**
   - Press `Win + X`
   - Select "Windows PowerShell"

2. **Navigate to Project**
   ```powershell
   cd "c:\Users\dknauf01\OneDrive - dentsu\Documents\VS Code Projects\MerkleAgenticPlatform"
   ```

3. **Install Dependencies** (first time only)
   ```powershell
   npm install
   ```

4. **Start Server**
   ```powershell
   npm run dev
   ```

5. **Open Chrome**
   - Automatically opens, or
   - Visit: http://localhost:5173

---

## ⚠️ Prerequisites

Before running, ensure Node.js is installed:

### Check Installation
```bash
node --version
npm --version
```

Should return versions like:
- Node: v18.x.x or higher
- npm: v9.x.x or higher

### Install Node.js (if needed)

1. **Download**
   - Visit: https://nodejs.org/
   - Download the **LTS** version (Long Term Support)
   - Current recommended: v18.x or v20.x

2. **Install**
   - Run the installer
   - Use default settings
   - Restart your computer (or at minimum, restart VS Code)

3. **Verify**
   - Open a new terminal
   - Run: `node --version`
   - Should display the version number

---

## 📱 Using the Application

### Login Credentials

Once the browser opens, you'll see the login page. Use these credentials:

**Option 1: Project Manager**
- Email: `pm@merkle.com`
- Password: `demo123`

**Option 2: Developer**
- Email: `dev@merkle.com`
- Password: `demo123`

**Option 3: Business Analyst**
- Email: `ba@merkle.com`
- Password: `demo123`

**Quick Login:** Click any of the quick login buttons below the form for instant access.

### After Login

You'll see the main **Dashboard** with:
- Welcome message with your name
- 4 analytics cards showing project metrics
- Active project cards with progress bars
- Quick actions panel
- Recent activity feed

### Navigation

- **Dashboard** - Overview and active projects
- **Projects** - All projects (coming soon)
- **Toolbox** - Browse AI agents and tools (coming soon)

Click on any project card or "Enter Workspace" to explore project details.

---

## 🔧 Troubleshooting

### Issue: Node.js not found

**Error Message:**
```
'node' is not recognized as an internal or external command
```

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/VS Code
3. Verify with: `node --version`

### Issue: npm install fails

**Possible causes:**
- Network/firewall issues
- Insufficient permissions
- Corrupted npm cache

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Retry installation
npm install

# If behind corporate proxy, configure:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Issue: Port 5173 already in use

**Error Message:**
```
Port 5173 is in use
```

**Solution:**
1. Stop any other running Vite servers
2. Or kill the process:
   ```bash
   # Windows PowerShell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
   ```

### Issue: Module not found errors

**Error in browser console:**
```
Cannot find module '@/...'
```

**Solution:**
1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```
2. Restart the dev server:
   - Press `Ctrl + C` in terminal
   - Run `npm run dev` again

### Issue: Page won't load / blank screen

**Solutions:**
1. Check browser console (F12) for errors
2. Clear browser cache (Ctrl + Shift + Delete)
3. Try incognito mode
4. Check that dev server is running (look for "ready in XXXms" message)
5. Manually navigate to: http://localhost:5173

### Issue: Styles not loading

**If the page loads but looks unstyled:**

**Solution:**
1. Hard refresh: `Ctrl + Shift + R`
2. Check that Tailwind CSS compiled correctly
3. Restart dev server
4. Clear browser cache

---

## 🎯 Expected Behavior

### Successful Launch

When everything works correctly, you should see:

1. **Terminal Output:**
   ```
   VITE v5.0.x  ready in XXX ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```

2. **Browser:**
   - Chrome opens automatically
   - Beautiful gradient login page appears
   - Merkle logo and branding visible
   - Quick login buttons functional

3. **After Login:**
   - Smooth animation to dashboard
   - All project cards load with avatars
   - Progress bars animate
   - No console errors

### Performance

- **Cold start** (first time): 2-3 minutes for npm install
- **Warm start**: Dev server ready in 200-500ms
- **Hot reload**: Changes reflect in <1 second

---

## 🎨 Features to Explore

### Login Page
- Animated gradient background
- SSO button mockups (informational only)
- Quick login shortcuts
- Remember me checkbox
- Smooth transitions

### Dashboard
- **Stats Cards**: Hover for scale effect
- **Project Cards**: Click to "enter workspace" (placeholder)
- **Progress Bars**: Animated on load
- **Team Avatars**: Hover for member names
- **Navigation**: Top header with search, notifications, profile
- **Quick Actions**: Sidebar shortcuts
- **Activity Feed**: Recent team activities

### Interactive Elements
- All buttons have hover effects
- Smooth page transitions
- Loading states
- Dropdown menus (notifications, user profile)
- Search bar (UI only)
- Responsive design (try resizing window)

---

## 📊 Development Info

### Tech Stack
- React 18.2
- TypeScript 5.2
- Vite 5.0
- Tailwind CSS 3.3
- Framer Motion 10.16
- React Router 6.20

### File Structure
```
MerkleAgenticPlatform/
├── src/
│   ├── components/    # Reusable components
│   ├── contexts/      # State management
│   ├── data/          # Mock data
│   ├── pages/         # Page components
│   ├── types/         # TypeScript types
│   └── App.tsx        # Main app
├── public/            # Static assets
├── .vscode/           # VS Code configuration
├── start.bat          # Windows launcher
└── package.json       # Dependencies
```

### Available Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production
npm run lint     # Run linter
```

---

## ✅ Checklist

Before presenting:

- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Dev server starts without errors
- [ ] Chrome opens automatically
- [ ] Login page displays correctly
- [ ] Can login with demo credentials
- [ ] Dashboard loads with all projects
- [ ] No console errors
- [ ] Animations are smooth
- [ ] All interactive elements work

---

## 🆘 Need Help?

1. **Check SETUP.md** for detailed setup instructions
2. **Check README.md** for project overview
3. **Review browser console** (F12) for errors
4. **Check terminal output** for error messages
5. **Ensure latest Node.js LTS** is installed

---

## 🎬 Ready to Launch?

**Fastest way:**
```bash
# In the project directory
npm install && npm run dev
```

Then open http://localhost:5173 and login with `pm@merkle.com` / `demo123`

**Or just double-click `start.bat`!**

---

*Built with ❤️ by the Merkle Innovation Team*
