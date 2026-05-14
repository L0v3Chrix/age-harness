# Paste-Ready Command-Line Instructions

Customer target: 2013 MacBook Air or similarly low-power Mac.

Goal: open terminal, run the command line, check for dependencies, open the
agent dashboard.

Product note: AGE stands for Agent Genesis Engine. The customer-facing product
name is AGE by Genesis Labs.

## Before You Start

1. Plug the MacBook Air into power.
2. Connect to reliable Wi-Fi.
3. Quit heavy apps such as Zoom, Chrome tab groups, games, photo/video editors,
   and cloud sync tools if they are consuming resources.
4. Keep the lid open until the install completes.
5. Ask the customer to sign into GitHub CLI with an account that has access to
   the private repository `L0v3Chrix/age-harness`.

## Step 1: Open Terminal

Customer wording:

> Open Terminal. You can press Command + Space, type Terminal, and press Return.

## Step 2: Run This Preflight Check

Paste this whole block into Terminal and press Return:

```bash
/bin/bash -lc '
set -u
echo "AGE by Genesis Labs preflight check"
echo
echo "Mac information:"
sw_vers 2>/dev/null || true
echo
echo "Processor:"
uname -m
echo
echo "Free disk space:"
df -h "$HOME" | tail -n 1
echo
echo "Checking command line tools:"
if xcode-select -p >/dev/null 2>&1; then
  echo "OK: Apple command line tools are present."
else
  echo "ACTION NEEDED: Apple command line tools are missing."
  echo "A popup may appear. Install the tools, then rerun this preflight."
  xcode-select --install 2>/dev/null || true
fi
echo
echo "Checking GitHub CLI:"
if command -v gh >/dev/null 2>&1; then
  echo "OK: GitHub CLI found at $(command -v gh)"
else
  echo "ACTION NEEDED: GitHub CLI is not installed."
  echo "Install it from https://cli.github.com/ and then rerun this preflight."
  open "https://cli.github.com/" 2>/dev/null || true
  exit 1
fi
echo
echo "Checking GitHub authentication:"
if gh auth status >/dev/null 2>&1; then
  echo "OK: GitHub CLI is authenticated."
else
  echo "ACTION NEEDED: Sign in to GitHub CLI."
  echo "Run: gh auth login"
  exit 1
fi
echo
echo "Preflight complete. If every line above says OK, continue to installation."
'
```

If GitHub CLI is not installed, install it from:

```text
https://cli.github.com/
```

If GitHub CLI is installed but not authenticated, run:

```bash
gh auth login
```

Recommended choices during `gh auth login`:

```text
GitHub.com
HTTPS
Authenticate Git with GitHub credentials: Yes
Login with a web browser
```

## Step 3: Run the Command Line

Paste this whole command into Terminal and press Return:

```bash
caffeinate -dimsu /bin/bash -lc 'gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.sh | bash -s -- --skip-setup --no-hermes-alias --dir "$HOME/.age/age-harness" --hermes-home "$HOME/.age"'
```

What this does:

- Keeps the Mac awake during the install with `caffeinate`.
- Downloads the private AGE installer through authenticated GitHub CLI.
- Installs AGE into `~/.age/age-harness`.
- Stores AGE settings, logs, sessions, and local data in `~/.age`.
- Skips the setup wizard during install so the handoff remains predictable.
- Avoids creating a `hermes` command alias, which keeps AGE separate from any
  Nous Research Hermes installation.

Expected timing on a 2013 MacBook Air:

- Fast path: 10 to 20 minutes.
- Slower path: 20 to 45 minutes.
- First install is the slowest because Python packages and web assets may need
  to download and build.

Do not close Terminal while the command is running.

## Step 4: Check for Dependencies

After installation finishes, paste this block:

```bash
/bin/bash -lc '
set -u
export HERMES_HOME="$HOME/.age"
export PATH="$HOME/.local/bin:$PATH"
echo "Checking AGE command:"
command -v age || { echo "AGE command not found. Close and reopen Terminal, then try again."; exit 1; }
echo
echo "AGE version:"
age version
echo
echo "AGE doctor:"
age doctor
'
```

What to look for:

- `age version` should print `AGE by Genesis Labs`.
- `age doctor` should show Python, required packages, and directories.
- Missing API keys are normal until the customer signs into or configures a
  model provider.

Important:

`age doctor` may mention missing provider keys. That does not mean AGE failed.
It means the harness is installed but the AI model connection still needs to be
configured.

## Step 5: Select a Model

Run:

```bash
export HERMES_HOME="$HOME/.age"
age model
```

Recommended model option:

```text
Codex 5.5
```

Use Codex 5.5 when it appears in the model/provider selection flow and the
customer has access to it. If Codex 5.5 is not visible, choose the Genesis Labs
recommended fallback model for that customer account.

## Step 6: Open the Agent Dashboard

Run:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129
```

Then open this address in the browser if it does not open automatically:

```text
http://127.0.0.1:9129
```

If the dashboard is slow on the first launch, wait. The first launch may build
or prepare local web assets.

For later launches after the dashboard has already been built, this lower-load
command is usually enough:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build
```

## Stop the Dashboard

In the same Terminal window, press:

```text
Control + C
```

If the dashboard is running in the background and needs to be stopped:

```bash
age dashboard --stop
```

## Quick Daily Start

After the first successful install:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build
```

## Quick Health Check

```bash
export HERMES_HOME="$HOME/.age"
age version
age doctor
```
