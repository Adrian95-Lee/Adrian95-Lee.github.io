@echo off
rem Double-click to start the portfolio live dev server.
cd /d "%~dp0"

rem 1) Portable Node in C:\Users\<you>\Tools  2) a normal Node.js install on PATH
set "NODE_EXE=%USERPROFILE%\Tools\node-v22.23.4-win-x64\node.exe"
if not exist "%NODE_EXE%" (
  for /f "delims=" %%N in ('where node 2^>nul') do if not defined FOUND set "FOUND=%%N"
)
if not exist "%NODE_EXE%" if defined FOUND set "NODE_EXE=%FOUND%"

if not exist "%NODE_EXE%" (
  echo.
  echo Could not find Node.js.
  echo Expected: %USERPROFILE%\Tools\node-v22.23.4-win-x64\node.exe
  echo Or install Node.js LTS via Sandvik Software Center / IT.
  echo.
  pause
  exit /b 1
)

echo Using Node: %NODE_EXE%
echo Starting dev server... open the "Local:" link shown below.
echo Press Ctrl+C or close this window to stop.
echo.
"%NODE_EXE%" node_modules\vite\bin\vite.js
pause
