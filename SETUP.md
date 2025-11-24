# Quick Setup Guide - Merkle AI Platform

## Prerequisites

Before running the application, ensure you have Node.js installed:

1. **Check if Node.js is installed:**
   ```bash
   node --version
   npm --version
   ```

2. **If not installed, download Node.js:**
   - Visit: https://nodejs.org/
   - Download LTS version (v18 or higher)
   - Install and restart your terminal/VS Code

## Installation Steps

### Option 1: Using VS Code Terminal

1. Open VS Code
2. Open the integrated terminal (`Ctrl + `` ` or View > Terminal)
3. Navigate to the project directory (if not already there):
   ```bash
   cd "c:\Users\dknauf01\OneDrive - dentsu\Documents\VS Code Projects\MerkleAgenticPlatform"
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The application will start and display a URL (usually `http://localhost:5173`)
7. Chrome will automatically open, or open it manually and visit the URL

### Option 2: Using VS Code Launch Configuration

Once dependencies are installed:

1. Press `F5` or go to Run > Start Debugging
2. Select "Launch Chrome - Merkle AI Platform" from the dropdown
3. Chrome will automatically launch with the application

### Option 3: Using PowerShell

1. Open PowerShell
2. Navigate to the project:
   ```powershell
   cd "c:\Users\dknauf01\OneDrive - dentsu\Documents\VS Code Projects\MerkleAgenticPlatform"
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

4. Start the server:
   ```powershell
   npm run dev
   ```

5. Open Chrome and visit `http://localhost:5173`

## Troubleshooting

### Issue: "npm: command not found"
**Solution**: Node.js is not installed or not in PATH. Install Node.js from https://nodejs.org/

### Issue: "Cannot find module"
**Solution**: Run `npm install` to install all dependencies

### Issue: Port 5173 already in use
**Solution**:
- Stop any other Vite dev servers
- Or change the port in `vite.config.ts`:
  ```typescript
  export default defineConfig({
    server: {
      port: 3000  // Change to any available port
    },
    // ... rest of config
  })
  ```

### Issue: Browser doesn't open automatically
**Solution**: Manually open Chrome and navigate to `http://localhost:5173`

## Default Login Credentials

Once the application loads:

**Project Manager**
- Email: `pm@merkle.com`
- Password: `demo123`

**Developer**
- Email: `dev@merkle.com`
- Password: `demo123`

**Business Analyst**
- Email: `ba@merkle.com`
- Password: `demo123`

Or use the quick login buttons on the login page.

## Next Steps

After successful login, you'll see:
- Dashboard with active projects
- Analytics widgets
- Quick actions panel
- Recent activity feed

Explore the navigation:
- **Dashboard**: Overview and project cards
- **Projects**: All projects (coming soon)
- **Toolbox**: AI agents and tools (coming soon)

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Support

For issues or questions:
- Check the main [README.md](README.md)
- Review the console for error messages
- Ensure all dependencies are installed
- Check that Node.js version is 18+

---

**Ready to go?** Run `npm install && npm run dev` and visit http://localhost:5173
