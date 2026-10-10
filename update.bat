```bat
@echo off
title HITOP - Update GitHub
cd /d "%~dp0"

echo.
echo ==============================
echo     HITOP GitHub Update
echo ==============================
echo.

echo [1/4] MkDocs clean build chal raha hai...
mkdocs build --clean

if errorlevel 1 (
    echo.
    echo MkDocs build fail hua. Error check karein.
    pause
    exit /b 1
)

echo.
echo MkDocs build successfully complete hua.
echo.

git status
echo.

set /p msg=Commit message likhein (Enter = Update documentation): 
if "%msg%"=="" set "msg=Update documentation"

echo.
echo [2/4] Git add chal raha hai...
git add .

if errorlevel 1 (
    echo.
    echo Git add fail hua.
    pause
    exit /b 1
)

echo.
echo [3/4] Git commit chal raha hai...
git commit -m "%msg%"

if errorlevel 1 (
    echo.
    echo Commit nahi hua. Changes ya Git status check karein.
    pause
    exit /b 1
)

echo.
echo [4/4] GitHub par push ho raha hai...
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