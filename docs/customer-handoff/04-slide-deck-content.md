# Slide Deck Content

Deck title:

```text
AGE by Genesis Labs Customer Onboarding
```

Audience:

```text
Customer handoff for a 2013 MacBook Air or similarly low-power Mac.
```

## Slide 1: Title

Title:

```text
AGE by Genesis Labs
```

Subtitle:

```text
Customer onboarding for a low-power MacBook Air
```

Speaker notes:

AGE stands for Agent Genesis Engine. Today we will install AGE, check the
system, choose a model, and open the local agent dashboard.

## Slide 2: What AGE Is

Headline:

```text
AGE is the harness, not the model
```

Bullets:

- AGE is the command-line and dashboard layer.
- AGE stands for Agent Genesis Engine.
- AGE organizes tools, sessions, settings, logs, and workflows.
- AGE connects to AI models.
- The model is the AI brain.
- On a 2013 MacBook Air, use cloud models instead of local models.

Speaker notes:

This distinction matters. The MacBook Air does not need to do the heavy AI
thinking locally. AGE runs the workflow. The selected model provides the AI
reasoning.

## Slide 3: Recommended Model

Headline:

```text
Recommended model: Codex 5.5
```

Bullets:

- Select Codex 5.5 when it is available to the customer account.
- Use it for coding, technical workflows, and agent tasks.
- If Codex 5.5 is not visible, use the Genesis Labs recommended fallback.
- Model availability depends on account access and provider setup.

Speaker notes:

Codex 5.5 is the recommended option for this handoff when available. The model
is selected after the harness is installed.

## Slide 4: Low-Power MacBook Air Rules

Headline:

```text
Keep the Mac light
```

Bullets:

- Plug into power.
- Use reliable Wi-Fi.
- Close unnecessary apps.
- Do not run local AI models.
- Use one dashboard window.
- Avoid running many agent sessions at once.
- Let the first install take its time.

Speaker notes:

The 2013 MacBook Air can run the harness, dashboard, and browser. It should not
be treated like a modern workstation.

## Slide 5: The Required Flow

Headline:

```text
Install flow
```

Steps:

1. open terminal
2. run the command line
3. check for dependencies
4. open the agent dashboard

Speaker notes:

This is the core sequence. Do not skip the dependency check.

## Slide 6: Open Terminal

Headline:

```text
Step 1: open terminal
```

Bullets:

- Press Command + Space.
- Type Terminal.
- Press Return.
- Paste commands exactly.

Speaker notes:

The customer should copy and paste commands. They do not need to type them by
hand.

## Slide 7: Preflight Check

Headline:

```text
Check the Mac before installing
```

Bullets:

- macOS version
- processor type
- disk space
- Apple command line tools
- GitHub CLI
- GitHub authentication

Speaker notes:

The private AGE installer is downloaded through GitHub CLI. The customer must be
authenticated before running the install command.

## Slide 8: Run the Command Line

Headline:

```text
Step 2: run the command line
```

Command:

```bash
caffeinate -dimsu /bin/zsh -lc 'set -e; export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"; command -v gh >/dev/null || { echo "GitHub CLI is missing. Install it from https://cli.github.com/"; exit 1; }; gh auth status >/dev/null || { echo "GitHub CLI is not authenticated. Run: gh auth login"; exit 1; }; gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.sh | bash -s -- --skip-setup --no-hermes-alias --dir "$HOME/.age/age-harness" --hermes-home "$HOME/.age"'
```

Speaker notes:

This command keeps the Mac awake, downloads the private installer, installs AGE,
and keeps it separate under the `.age` folder.

## Slide 9: Check for Dependencies

Headline:

```text
Step 3: check for dependencies
```

Commands:

```bash
export HERMES_HOME="$HOME/.age"
age version
age doctor
```

Speaker notes:

Missing API keys are normal before the model is configured.

## Slide 10: Choose the Model

Headline:

```text
Select the AI brain
```

Command:

```bash
export HERMES_HOME="$HOME/.age"
age model
```

Bullets:

- Choose Codex 5.5 when available.
- Choose the provider/model assigned to the customer if Codex 5.5 is not
  available.
- Use cloud models on low-power hardware.

## Slide 11: Open the Dashboard

Headline:

```text
Step 4: open the agent dashboard
```

Command:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129
```

URL:

```text
http://127.0.0.1:9129
```

Speaker notes:

The dashboard runs locally on the Mac.

## Slide 12: Daily Use

Headline:

```text
Daily start command
```

Command:

```bash
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build
```

Speaker notes:

After the first build, `--skip-build` reduces startup work.

## Slide 13: Dashboard Tour

Headline:

```text
What the dashboard is for
```

Bullets:

- Sessions
- Models
- Keys
- Logs
- Settings
- AGE Kanban
- Status and diagnostics

## Slide 14: Troubleshooting

Headline:

```text
Common issues
```

Bullets:

- GitHub CLI missing: install from cli.github.com.
- GitHub auth missing: run `gh auth login`.
- AGE command missing: reopen Terminal.
- Dashboard slow: wait, then use `--skip-build` later.
- Missing API keys: configure model/provider access.

## Slide 15: Close

Headline:

```text
AGE is ready
```

Bullets:

- AGE installed locally.
- Dashboard opens locally.
- Model selected separately.
- Codex 5.5 recommended when available.
- Low-power hardware should use cloud models.
