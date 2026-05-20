# Video Creation Prompt

Use this prompt with Google NotebookLM or another video-generation assistant.

Clarification note: the customer said "Google Notebook LLM." The Google product
name commonly used for this workflow is NotebookLM. Keep the customer-facing
language simple and refer to it as "NotebookLM" unless a different internal name
is required.

## Prompt to Paste

```text
Create a concise customer training video titled "Getting Started with AGE by Genesis Labs on a MacBook Air."

Audience:
Non-technical customers using a 2013 MacBook Air or similarly low-power Mac.

Style:
Calm, professional, friendly, support-handoff style. Use clear pacing. Do not rush command-line steps. Show that the customer can copy and paste commands instead of typing them manually.

Required sequence:
1. open terminal
2. run the command line
3. check for dependencies
4. open the agent dashboard

Key message:
AGE stands for Agent Genesis Engine. AGE by Genesis Labs is the harness. The model is the AI brain. The harness runs the local command line, dashboard, tools, sessions, settings, and workflow layer. The model is selected separately and usually runs in the cloud. This is important for low-power hardware such as a 2013 MacBook Air.

Recommended model:
Mention Codex 5.5 as the recommended option when it is available in the customer's model/provider list. If Codex 5.5 is not visible, tell the customer to use the Genesis Labs recommended fallback model for their account.

Video structure:

Scene 1 - Preparation
Show a MacBook Air plugged into power. Explain that older hardware should be plugged in, connected to Wi-Fi, and running as few extra apps as possible.

Scene 2 - Open Terminal
Show Spotlight search. Press Command + Space. Type Terminal. Press Return.
Narration must include the exact phrase "open terminal."

Scene 3 - Run Preflight
Show the customer pasting the preflight command into Terminal. Explain that this checks macOS, disk space, Apple command line tools, GitHub CLI, and GitHub authentication.

Scene 4 - Run the Command Line
Show the customer pasting the install command into Terminal.
Narration must include the exact phrase "run the command line."
Explain that the install command uses GitHub CLI authentication, keeps the Mac awake, installs AGE into ~/.age/age-harness, and stores AGE data in ~/.age.

Scene 5 - Check for Dependencies
Show age version and age doctor.
Narration must include the exact phrase "check for dependencies."
Explain that missing API keys are normal before model setup.

Scene 6 - Select a Model
Show the command age model.
Explain that Codex 5.5 is recommended when available.
Explain model vs harness:
The model is the AI brain.
The harness is the operating layer that connects the model to files, tools, sessions, dashboard, and workflows.

Scene 7 - Open the Agent Dashboard
Show age dashboard --host 127.0.0.1 --port 9129.
Narration must include the exact phrase "open the agent dashboard."
Show the browser at http://127.0.0.1:9129.

Scene 8 - Daily Use
Show the daily start command:
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build

Scene 9 - Closing
Tell the customer that AGE is now installed, the dashboard is local, and the model can be selected based on the job.

Do not claim the MacBook Air runs the AI model locally. Emphasize cloud models and low-resource usage.

Use the following commands as on-screen text:

Preflight:
/bin/zsh -lc 'set -u; export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"; sw_vers; uname -m; df -h "$HOME" | tail -n 1; xcode-select -p >/dev/null 2>&1 && echo "OK: Apple command line tools are present." || xcode-select --install; command -v gh >/dev/null 2>&1 && echo "OK: GitHub CLI found." || echo "Install GitHub CLI from https://cli.github.com/"; gh auth status >/dev/null 2>&1 && echo "OK: GitHub CLI is authenticated." || echo "Run: gh auth login"'

Install:
caffeinate -dimsu /bin/zsh -lc 'set -e; export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"; command -v gh >/dev/null || { echo "GitHub CLI is missing. Install it from https://cli.github.com/"; exit 1; }; gh auth status >/dev/null || { echo "GitHub CLI is not authenticated. Run: gh auth login"; exit 1; }; gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.sh | bash -s -- --skip-setup --no-hermes-alias --dir "$HOME/.age/age-harness" --hermes-home "$HOME/.age"'

Dependency check:
export HERMES_HOME="$HOME/.age"
age version
age doctor

Model selection:
export HERMES_HOME="$HOME/.age"
age model

Dashboard:
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129

Daily dashboard:
export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build
```
