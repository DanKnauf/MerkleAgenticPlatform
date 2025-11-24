@echo off
echo ========================================
echo Merkle AI Platform - Development Server
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from https://nodejs.org/
    echo Download the LTS version and restart your terminal
    echo.
    pause
    exit /b 1
)

echo [INFO] Node.js version:
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    echo This may take a few minutes on first run...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
    echo [SUCCESS] Dependencies installed successfully!
    echo.
)

echo [INFO] Starting development server...
echo.
echo The application will be available at: http://localhost:5173
echo Chrome will open automatically when ready
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the dev server
call npm run dev

pause
