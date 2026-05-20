# AGE Harness Customer Handoff Package

This folder contains the customer-facing handoff materials for installing and
using AGE (Agent Genesis Engine) by Genesis Labs on a low-power 2013 MacBook
Air.

The package is intentionally practical and conservative. It assumes the machine
may be slow, may not have developer tools installed, and should not run local AI
models. AGE stands for Agent Genesis Engine. It should use cloud models and
keep the MacBook Air responsible only for the command line, local dashboard,
files, and browser.

The dashboard also includes an in-app `AGE Guide` documentation tab. That tab
is the customer-facing manual surface during onboarding; these Markdown files
are the handoff package source material and printable companion docs.

## Files

1. `01-paste-ready-command-line.md`
   - Copy-and-paste terminal instructions.
   - Includes dependency checks, GitHub CLI authentication, installation, and
     dashboard launch.

2. `02-google-notebooklm-explainer-video-script.md`
   - Customer-facing narration and storyboard.
   - Built around the required sequence: open terminal, run the command line,
     check for dependencies, open the agent dashboard.

3. `03-video-creation-prompt.md`
   - A prompt/script to paste into Google NotebookLM or another video assistant
     to create the explainer video.

4. `04-slide-deck-content.md`
   - Slide-by-slide deck content for customer onboarding.
   - Can be pasted into Google Slides, PowerPoint, Canva, or NotebookLM.

5. `05-user-manual-playbook.md`
   - Detailed customer manual and usage playbook.
   - Includes model selection, Codex 5.5 recommendation, dashboard use, low-power
     tips, troubleshooting, and model vs harness explanation.

## Recommended Customer Install Command

Use this command after the customer has installed and authenticated GitHub CLI:

```bash
caffeinate -dimsu /bin/zsh -lc 'set -e; export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"; command -v gh >/dev/null || { echo "GitHub CLI is missing. Install it from https://cli.github.com/"; exit 1; }; gh auth status >/dev/null || { echo "GitHub CLI is not authenticated. Run: gh auth login"; exit 1; }; gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.sh | bash -s -- --skip-setup --no-hermes-alias --dir "$HOME/.age/age-harness" --hermes-home "$HOME/.age"'
```

This installs AGE into `~/.age/age-harness`, stores AGE data under `~/.age`,
and avoids creating a `hermes` command alias. That keeps AGE separated from any
existing Nous Research Hermes installation.
