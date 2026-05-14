# Explainer Video Script for Google NotebookLM

Working title:

```text
Getting Started with AGE by Genesis Labs on a MacBook Air
```

Audience:

```text
A non-technical customer using a 2013 MacBook Air or similarly low-power Mac.
```

Tone:

```text
Calm, practical, step-by-step, reassuring, and professional.
```

Required sequence:

```text
open terminal -> run the command line -> check for dependencies -> open the agent dashboard
```

## Narration Script

### Opening

Welcome to AGE by Genesis Labs. AGE stands for Agent Genesis Engine. In this
short walkthrough, we will install the AGE harness on a MacBook Air, confirm
the required dependencies, and open the local agent dashboard.

This process is designed to work on older hardware, including a 2013 MacBook
Air. The Mac does not need to run the AI model locally. AGE is the harness that
organizes the workflow, dashboard, tools, sessions, and local files. The model
is the AI brain that the harness connects to. For best results on low-power
hardware, use a cloud model such as Codex 5.5 when it is available to your
account.

Before beginning, plug the laptop into power, connect to Wi-Fi, and close any
apps you do not need.

### Scene 1: Open Terminal

On the Mac, open Terminal.

You can do this by pressing Command and Space, typing Terminal, and pressing
Return.

Terminal is the app where we will paste the setup commands. You do not need to
type the commands by hand. Copy and paste them exactly.

### Scene 2: Run the Preflight Check

First, run the preflight check. This checks the Mac version, disk space, Apple
command line tools, GitHub CLI, and GitHub login status.

Paste the preflight command into Terminal and press Return.

If the command says GitHub CLI is missing, install GitHub CLI from
cli.github.com. If it says GitHub authentication is missing, run `gh auth login`
and sign in with the GitHub account that has access to the private AGE
repository.

When the preflight check is complete, continue to the installation command.

### Scene 3: Run the Command Line

Now we will run the command line that installs AGE.

Paste the install command into Terminal and press Return.

The command keeps the Mac awake, downloads the private installer through GitHub
CLI, installs AGE into the `.age` folder in your home directory, and keeps AGE
separate from any existing Hermes installation.

On a 2013 MacBook Air, this can take several minutes. The first install is the
slowest because it may download Python packages and prepare local dashboard
files. Leave Terminal open and keep the laptop plugged in.

### Scene 4: Check for Dependencies

After the install completes, check for dependencies.

Paste the dependency check command into Terminal and press Return.

You should see the AGE version and the doctor report. If the doctor report says
some API keys are missing, that is normal before model setup. It means AGE is
installed, but the model connection still needs to be configured.

### Scene 5: Select a Model

Next, select a model.

Run `age model`.

If Codex 5.5 appears as an option and your account has access to it, select it.
Codex 5.5 is recommended for coding, technical work, and agentic workflows.

Remember the difference:

The model is the AI brain. The harness is the operating layer that connects the
model to your dashboard, files, tools, sessions, and workflows.

### Scene 6: Open the Agent Dashboard

Now open the agent dashboard.

Paste the dashboard command into Terminal and press Return.

If the browser does not open automatically, open your browser and go to:

`http://127.0.0.1:9129`

The dashboard runs locally on the Mac. It is used to view sessions, settings,
models, keys, logs, and the AGE Kanban workspace.

### Scene 7: First Use Tips

For a low-power MacBook Air, keep one dashboard window open, avoid running
multiple terminal sessions, and use cloud models instead of local models.

If the dashboard feels slow, close unused browser tabs and give the first launch
time to finish.

For daily use, the customer can open Terminal and run the dashboard command
again with `--skip-build`.

### Closing

You have now installed AGE by Genesis Labs, checked dependencies, selected a
model, and opened the agent dashboard.

Use the AGE dashboard as your control center, and use the model selection screen
to choose the right AI model for the work.
