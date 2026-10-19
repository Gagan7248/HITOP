```bat
@echo off
title HITOP - Update GitHub
cd /d "%~dp0"

echo.
echo ==============================
echo     HITOP GitHub Update
echo ==============================
echo.

echo [1/4] Building Mkdocs...
mkdocs build --clean

if errorlevel 1 (
    echo.
    echo MKdocs building Failed. Please check the error.
    pause
    exit /b 1
)

echo.
echo MkDocs builded successfully.
echo.

git status
echo.

set /p msg=Commit message likhein (Enter = Update documentation): 
if "%msg%"=="" set "msg=Update documentation"

echo.
echo [2/4] Running Github add...
git add .

if errorlevel 1 (
    echo.
    echo Git add failed.
    pause
    exit /b 1
)

echo.
echo [3/4] Running Git commit...
git commit -m "%msg%"

if errorlevel 1 (
    echo.
    echo Commit not success, please check Git status.
    pause
    exit /b 1
)

echo.
echo [4/4] Pushing on Github...
git push origin main

if errorlevel 1 (
    echo.
    echo Pushing failed, please check error...
    pause
    exit /b 1
)

echo.
echo Pushed Successfully
echo GitHub actions will deploy website automatically.
pause
```