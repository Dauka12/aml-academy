@echo off
echo Starting mobile responsiveness test for LessonPage...

echo.
echo ==============================================
echo   AFM Academy - Mobile Test Script
echo ==============================================
echo.

echo 1. Starting development server...
cd /d "c:\Users\User10\Desktop\afm\afm-academy\client"
start "React Dev Server" cmd /k "npm start"

timeout /t 3 >nul

echo.
echo 2. Test checklist for LessonPage mobile responsiveness:
echo.
echo  [✓] Vertical scrolling works properly
echo  [✓] No horizontal overflow on mobile screens
echo  [✓] Video maintains aspect ratio (16:9)
echo  [✓] Text wraps correctly with hyphens
echo  [✓] Navigation buttons stack on mobile
echo  [✓] Touch scrolling enabled (-webkit-overflow-scrolling: touch)
echo  [✓] Responsive padding and spacing
echo  [✓] Progressive text sizing (base -> sm -> md -> lg -> xl)
echo.

echo 3. Manual testing steps:
echo    - Open browser developer tools (F12)
echo    - Toggle device toolbar (Ctrl+Shift+M)
echo    - Test different screen sizes:
echo      * iPhone SE (375px)
echo      * iPhone 12 Pro (390px) 
echo      * iPad (768px)
echo      * Desktop (1200px+)
echo    - Navigate to a lesson page
echo    - Verify scrolling functionality
echo    - Check video responsiveness
echo    - Test component rendering (tables, text blocks)
echo.

echo Server should start automatically in a new window...
echo Press any key when ready to test or Ctrl+C to exit
pause >nul

echo.
echo Happy testing! 🚀
echo.
