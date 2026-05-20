# AGE by Genesis Labs User Manual and Playbook

This manual is the customer-facing operating guide for AGE by Genesis Labs on a
low-power Mac, especially a 2013 MacBook Air. AGE stands for Agent Genesis
Engine.

It is intentionally granular. The goal is to make the customer successful even
if they are not technical, even if their Mac is slow, and even if they have
never used a terminal-based AI harness before.

## 1. Plain-English Overview

AGE by Genesis Labs, short for Agent Genesis Engine, is an AI harness.

A harness is the operating layer around an AI model. It gives the customer a
command line, a dashboard, sessions, settings, tools, logs, model selection,
and workflow structure.

The harness is not the same thing as the model.

The model is the AI brain. The model reads instructions and generates answers.
Examples of models include Codex 5.5 and other provider-hosted models.

AGE is the local workbench. The model is the intelligence AGE connects to.

This distinction matters because the 2013 MacBook Air is not powerful enough to
comfortably run large AI models locally. That is fine. AGE does not require the
MacBook Air to run the model locally. The recommended setup uses cloud models,
with AGE running the workflow and dashboard locally.

## 2. Recommended Hardware Posture

The 2013 MacBook Air is capable of running AGE if it is treated carefully.

Recommended posture:

1. Keep the Mac plugged into power.
2. Keep Wi-Fi connected.
3. Keep the lid open during install and first dashboard launch.
4. Close unnecessary apps.
5. Avoid running multiple agent sessions at the same time.
6. Avoid local AI models.
7. Use cloud models such as Codex 5.5 when available.
8. Restart the Mac before onboarding if it has been running for days.
9. Keep at least 10 GB of free disk space.
10. Use Safari or a lightweight browser when possible.

The first install may be slow. That is normal.

## 3. What Gets Installed

The recommended customer install uses these locations:

```text
AGE code:
~/.age/age-harness

AGE data:
~/.age

AGE command:
~/.local/bin/age
```

The handoff command deliberately avoids creating a `hermes` alias. This is
important because AGE should stay separate from any existing Nous Research
Hermes installation.

The customer should use:

```bash
age
```

The customer should not use:

```bash
hermes
```

unless Genesis Labs specifically tells them to.

## 4. The Core Sequence

The customer onboarding sequence is:

1. open terminal
2. run the command line
3. check for dependencies
4. open the agent dashboard

Do not change this order during onboarding. The dependency check is what tells
support whether the install is healthy.

## 5. Opening Terminal

Terminal is the Mac app used to run setup commands.

Steps:

1. Press Command + Space.
2. Type `Terminal`.
3. Press Return.
4. A white or dark command window opens.
5. The cursor waits for a command.

Customer reassurance:

The customer does not need to type commands by hand. They should copy and paste
the provided blocks exactly.

## 6. GitHub CLI Requirement

AGE is in a private GitHub repository. The installer is downloaded through
GitHub CLI.

GitHub CLI is called:

```bash
gh
```

The customer must have:

1. GitHub CLI installed.
2. GitHub CLI authenticated.
3. Access to `L0v3Chrix/age-harness`.

Check GitHub CLI:

```bash
command -v gh
```

Check GitHub authentication:

```bash
gh auth status
```

Sign in:

```bash
gh auth login
```

Recommended login choices:

```text
GitHub.com
HTTPS
Authenticate Git with GitHub credentials: Yes
Login with a web browser
```

## 7. Paste-Ready Install Command

Use this command after GitHub CLI is installed and authenticated:

```bash
caffeinate -dimsu /bin/zsh -lc 'set -e; export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"; command -v gh >/dev/null || { echo "GitHub CLI is missing. Install it from https://cli.github.com/"; exit 1; }; gh auth status >/dev/null || { echo "GitHub CLI is not authenticated. Run: gh auth login"; exit 1; }; gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.sh | bash -s -- --skip-setup --no-hermes-alias --dir "$HOME/.age/age-harness" --hermes-home "$HOME/.age"'
```

What each part means:

`caffeinate -dimsu`

Keeps the Mac awake during installation. This is useful for older laptops.

`/bin/zsh -lc`

Runs the install inside the Mac's default login shell and picks up the normal
zsh/Homebrew PATH used by modern macOS Terminal sessions.

`export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"`

Makes GitHub CLI easier to find whether Homebrew is installed in the Apple
Silicon location or the Intel Mac location.

`gh api`

Downloads the private installer through the customer's GitHub login.

`repos/L0v3Chrix/age-harness/contents/scripts/install.sh`

Points to the AGE private repository installer.

`bash -s --`

Runs the downloaded installer and passes options into it.

`--skip-setup`

Skips the interactive setup wizard during install. This keeps the handoff
predictable. Model setup can happen afterward.

`--no-hermes-alias`

Installs the `age` command only. This avoids overwriting or shadowing any
existing `hermes` command.

`--dir "$HOME/.age/age-harness"`

Installs the AGE code under the customer's `.age` folder.

`--hermes-home "$HOME/.age"`

Stores AGE runtime data under `.age`. The internal environment variable is
still called `HERMES_HOME` because the harness keeps Hermes internals for
compatibility, but the customer-facing product is AGE by Genesis Labs.

## 8. Checking the Install

After install, run:

```bash
export HERMES_HOME="$HOME/.age"
export PATH="$HOME/.local/bin:$PATH"
age version
age doctor
```

Healthy signs:

- `age version` prints `AGE by Genesis Labs`.
- `age doctor` can find Python.
- `age doctor` can find required packages.
- `age doctor` can find the AGE directories.

Normal warnings:

- Missing API keys.
- Provider not configured.
- Optional messaging tools missing.
- Optional browser or media tools missing.

These are not always install failures. They usually mean the customer has not
finished provider setup.

## 9. Model vs Harness

This is the most important concept in the manual.

The harness:

- Runs locally.
- Provides the `age` command.
- Provides the dashboard.
- Manages sessions.
- Manages tools.
- Manages logs.
- Manages configuration.
- Connects to model providers.
- Stores local workflow state.

The model:

- Usually runs in the cloud.
- Generates responses.
- Reads prompts.
- Uses reasoning.
- Writes code or text when asked.
- May have different speed, cost, and quality levels.
- Must be selected or configured.

Simple analogy:

```text
The harness is the cockpit.
The model is the engine.
```

Another analogy:

```text
The harness is the workstation.
The model is the specialist you call through the workstation.
```

Why this matters:

A 2013 MacBook Air can run the cockpit. It should not be expected to run the
largest engine locally.

## 10. Recommended Model: Codex 5.5

Use Codex 5.5 when it is available to the customer's account.

Recommended for:

- Coding tasks.
- Technical planning.
- Tool-heavy workflows.
- Debugging.
- Refactoring.
- Agentic workflows.
- Long implementation sessions.

How to select a model:

```bash
export HERMES_HOME="$HOME/.age"
age model
```

In the model picker:

1. Choose the provider assigned by Genesis Labs.
2. Select Codex 5.5 if available.
3. Confirm the selection.
4. Run a small test request.

If Codex 5.5 is not visible:

1. Do not panic.
2. Confirm the customer is signed into the correct provider.
3. Confirm the customer account has access.
4. Use the Genesis Labs recommended fallback model.
5. Escalate to support if the assigned model does not appear.

## 11. Opening the Dashboard

Start the dashboard:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129
```

Open this address if the browser does not open:

```text
http://127.0.0.1:9129
```

The dashboard is local. `127.0.0.1` means the customer's own computer.

Dashboard areas may include:

- Sessions
- Models
- Logs
- Keys
- Plugins
- Profiles
- Config
- AGE Kanban
- Status actions

## 12. Daily Startup

After the first successful launch, use:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build
```

Why `--skip-build` helps:

The dashboard files are already built. Skipping the build avoids extra work on
an older MacBook Air.

## 13. Stopping AGE

If the dashboard is running in Terminal:

```text
Press Control + C
```

If dashboard processes need to be stopped:

```bash
age dashboard --stop
```

If support asks for running AGE processes:

```bash
ps aux | grep age
```

## 14. First Useful Test

After selecting a model, run:

```bash
export HERMES_HOME="$HOME/.age"
age chat -q "Reply with one sentence confirming AGE is ready."
```

Expected result:

AGE should return a short confirmation.

If it fails:

- The harness may still be installed correctly.
- The model/provider may not be configured.
- Run `age doctor`.
- Confirm model access.

## 15. Tips for Low-Power Hardware

Use one session at a time.

Avoid running multiple dashboards.

Avoid local model servers such as Ollama for this customer setup unless Genesis
Labs explicitly approves it.

Prefer cloud models.

Use `--skip-build` after the first dashboard launch.

Close extra browser tabs.

Keep Terminal open during long-running commands.

Do not close the laptop lid while commands are running.

Restart the Mac if the dashboard feels stuck after many hours.

Keep at least 10 GB of free disk space.

Do not run heavy video editing, screen sharing, and dashboard installation at
the same time.

## 16. Tips for Good Prompts

Be specific.

Good:

```text
Review this file for errors and summarize the top three fixes.
```

Weak:

```text
Fix this.
```

Give context.

Good:

```text
This is for a customer handoff. Keep the tone professional and avoid jargon.
```

Tell AGE the desired output format.

Good:

```text
Return a numbered checklist and include commands in code blocks.
```

Use small batches on older hardware.

Good:

```text
Analyze these three files first. Do not edit anything yet.
```

Then:

```text
Now make the smallest safe change and explain what changed.
```

## 17. Tips for Working With Files

Ask AGE to inspect before editing.

Ask AGE to summarize planned changes.

Ask AGE to make focused changes.

Ask AGE to run a verification command.

Ask AGE to tell you what it could not verify.

Avoid asking AGE to rewrite an entire project unless support approves it.

## 18. Tips for Dashboard Use

Use Sessions to review prior work.

Use Logs when something fails.

Use Models when changing the AI brain.

Use Keys or setup commands when provider access is missing.

Use AGE Kanban for task coordination.

Use Config only when support instructs you or when you understand the setting.

## 19. Common Problems and Fixes

Problem:

```text
gh: command not found
```

Meaning:

GitHub CLI is not installed.

Fix:

Install GitHub CLI from:

```text
https://cli.github.com/
```

Problem:

```text
gh auth status fails
```

Meaning:

GitHub CLI is not signed in.

Fix:

```bash
gh auth login
```

Problem:

```text
age: command not found
```

Meaning:

Terminal does not see `~/.local/bin`.

Fix:

```bash
export PATH="$HOME/.local/bin:$PATH"
command -v age
```

Then close and reopen Terminal.

Problem:

```text
age doctor says API keys are missing
```

Meaning:

AGE is installed, but model/provider credentials are not configured.

Fix:

```bash
age model
```

or follow the provider setup instructions from Genesis Labs.

Problem:

```text
Dashboard does not open automatically
```

Fix:

Open the browser manually:

```text
http://127.0.0.1:9129
```

Problem:

```text
Dashboard is slow
```

Fix:

Wait for the first build. Later, start with:

```bash
age dashboard --host 127.0.0.1 --port 9129 --skip-build
```

Problem:

```text
The Mac feels hot or slow
```

Fix:

1. Plug into power.
2. Close unused apps.
3. Stop extra AGE sessions.
4. Restart the dashboard.
5. Restart the Mac if needed.

## 20. Support Checklist

When asking Genesis Labs for help, provide:

```bash
export HERMES_HOME="$HOME/.age"
age version
age doctor
```

Also provide:

- What command was run.
- What error appeared.
- Whether GitHub CLI is authenticated.
- Whether the dashboard opens.
- What model was selected.
- Whether the Mac is plugged in.
- Approximate macOS version.

## 21. Do and Do Not

Do:

- Use `age`.
- Keep AGE under `~/.age`.
- Use cloud models.
- Select Codex 5.5 when available.
- Run `age doctor` before requesting support.
- Keep prompts specific.

Do not:

- Expect a 2013 MacBook Air to run large local models.
- Open many simultaneous AGE sessions.
- Close Terminal during install.
- Use random install commands from the internet.
- Change config files unless instructed.
- Confuse the model with the harness.

## 22. Quick Reference

Install:

```bash
caffeinate -dimsu /bin/zsh -lc 'set -e; export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"; command -v gh >/dev/null || { echo "GitHub CLI is missing. Install it from https://cli.github.com/"; exit 1; }; gh auth status >/dev/null || { echo "GitHub CLI is not authenticated. Run: gh auth login"; exit 1; }; gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.sh | bash -s -- --skip-setup --no-hermes-alias --dir "$HOME/.age/age-harness" --hermes-home "$HOME/.age"'
```

Check:

```bash
export HERMES_HOME="$HOME/.age"
age version
age doctor
```

Select model:

```bash
export HERMES_HOME="$HOME/.age"
age model
```

Open dashboard:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129
```

Daily dashboard:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build
```

Stop dashboard:

```bash
age dashboard --stop
```
