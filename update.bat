```bat
@echo off
title HITOP - Update GitHub
cd /d "%~dp0"

echo.
echo ==============================
echo     HITOP GitHub Update
echo ==============================
echo.

git status
echo.

set /p msg=Commit message likhein (Enter = Update documentation): 
if "%msg%"=="" set "msg=Update documentation"

git add .
git commit -m "%msg%"

if errorlevel 1 (
    echo.
    echo Commit nahi hua. Status check karein.
    pause
    exit /b 1
)

git push origin main

if errorlevel 1 (
    echo.
    echo Push fail hua. Error check karein.
    pause
    exit /b 1
)

echo.
echo Successfully GitHub par push ho gaya!
echo GitHub Actions website ko automatically deploy karega.
pause
```