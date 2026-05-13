@echo off
REM ============================================================================
REM AGE by Genesis Labs Installer for Windows (CMD wrapper)
REM ============================================================================
REM This batch file launches the PowerShell installer for users running CMD.
REM
REM Usage:
REM   gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.cmd > install.cmd && install.cmd && del install.cmd
REM
REM Or if you're already in PowerShell, use the direct command instead:
REM   gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.ps1 | iex
REM ============================================================================

echo.
echo  AGE by Genesis Labs Installer
echo  Launching PowerShell installer...
echo.

powershell -ExecutionPolicy ByPass -NoProfile -Command "gh api -H 'Accept: application/vnd.github.raw' repos/L0v3Chrix/age-harness/contents/scripts/install.ps1 | iex"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  Installation failed. Please try running PowerShell directly:
    echo    powershell -ExecutionPolicy ByPass -c "gh api -H 'Accept: application/vnd.github.raw' repos/L0v3Chrix/age-harness/contents/scripts/install.ps1 | iex"
    echo.
    pause
    exit /b 1
)
