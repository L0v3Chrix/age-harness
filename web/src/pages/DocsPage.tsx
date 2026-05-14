import {
  useCallback,
  useLayoutEffect,
  useState,
  type ComponentType,
} from "react";
import {
  BookOpen,
  Check,
  Clipboard,
  Cpu,
  Gauge,
  LayoutDashboard,
  Terminal,
  Wrench,
} from "lucide-react";
import { Button } from "@nous-research/ui/ui/components/button";
import { usePageHeader } from "@/contexts/usePageHeader";
import { PluginSlot } from "@/plugins";

const PREFLIGHT_COMMAND = `/bin/bash -lc '
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
'`;

const INSTALL_COMMAND = `caffeinate -dimsu /bin/bash -lc 'gh api -H "Accept: application/vnd.github.raw" repos/L0v3Chrix/age-harness/contents/scripts/install.sh | bash -s -- --skip-setup --no-hermes-alias --dir "$HOME/.age/age-harness" --hermes-home "$HOME/.age"'`;

const DEPENDENCY_CHECK_COMMAND = `export HERMES_HOME="$HOME/.age"
command -v age
age version
age doctor`;

const MODEL_COMMAND = `export HERMES_HOME="$HOME/.age"
age model`;

const DASHBOARD_COMMAND = `export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build`;

const DAILY_START_COMMAND = `export HERMES_HOME="$HOME/.age"
age dashboard --host 127.0.0.1 --port 9129 --skip-build`;

const SUPPORT_COMMAND = `export HERMES_HOME="$HOME/.age"
age version
age doctor
age dashboard --status`;

const FLOW_STEPS = [
  {
    icon: Terminal,
    title: "Open Terminal",
    body: "Press Command + Space, type Terminal, and press Return. Keep the Mac plugged into power before starting.",
  },
  {
    icon: Clipboard,
    title: "Run The Command Line",
    body: "Paste the preflight command first, then paste the install command exactly as provided by Genesis Labs.",
  },
  {
    icon: Wrench,
    title: "Check Dependencies",
    body: "Confirm Apple command line tools, GitHub CLI, GitHub authentication, the age command, and the AGE doctor report.",
  },
  {
    icon: LayoutDashboard,
    title: "Open The Agent Dashboard",
    body: "Start the local dashboard on 127.0.0.1 and use it as the control center for sessions, models, keys, logs, and Kanban.",
  },
] as const;

const LOW_POWER_TIPS = [
  "Use cloud-hosted models. Do not run large local models on a 2013 MacBook Air.",
  "Use Codex 5.5 when it is available in the customer's model/provider list.",
  "Keep one main AGE dashboard session open during onboarding.",
  "Close Chrome tab groups, video calls, design tools, and other heavy apps before install.",
  "Use --skip-build for normal dashboard launches after the first successful setup.",
  "Keep at least 10 GB of free disk space before installing or updating.",
];

const TROUBLESHOOTING = [
  {
    problem: "The age command is not found.",
    fix: "Close Terminal, open a new Terminal window, and run command -v age. If it still fails, run the install command again.",
  },
  {
    problem: "GitHub CLI says the customer is not authenticated.",
    fix: "Run gh auth login and sign in with the GitHub account that has access to L0v3Chrix/age-harness.",
  },
  {
    problem: "The dashboard does not open automatically.",
    fix: "Open a browser manually and go to http://127.0.0.1:9129 after the dashboard command starts.",
  },
  {
    problem: "The doctor report mentions missing provider keys.",
    fix: "That can be normal before model setup. Open Keys or Models and add the provider credentials assigned by Genesis Labs.",
  },
];

export default function DocsPage() {
  const { setEnd, setTitle } = usePageHeader();
  const [copied, setCopied] = useState<string | null>(null);

  const copyCommand = useCallback((label: string, command: string) => {
    if (!navigator.clipboard) return;
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    });
  }, []);

  useLayoutEffect(() => {
    setTitle("Agent Genesis Engine Guide");
    setEnd(
      <Button
        onClick={() => copyCommand("Install", INSTALL_COMMAND)}
        className="normal-case"
      >
        <Clipboard className="size-3.5" />
        {copied === "Install" ? "Copied" : "Copy install"}
      </Button>,
    );
    return () => {
      setEnd(null);
      setTitle(null);
    };
  }, [copied, copyCommand, setEnd, setTitle]);

  return (
    <div className="normal-case flex min-h-0 w-full min-w-0 flex-1 flex-col text-foreground">
      <PluginSlot name="docs:top" />

      <section className="border-b border-current/10 bg-background-base/35 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div className="space-y-3">
            <p className="font-mondwest text-[0.7rem] uppercase tracking-[0.18em] text-midground/75">
              AGE by Genesis Labs
            </p>
            <h2 className="max-w-3xl text-2xl font-bold leading-tight text-midground sm:text-3xl">
              Agent Genesis Engine customer documentation
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              AGE is the harness. The model is the AI brain. This guide keeps
              the onboarding path simple for low-power Macs: open terminal, run
              the command line, check for dependencies, and open the agent
              dashboard.
            </p>
          </div>
          <div className="grid gap-2 border border-current/15 bg-black/15 p-3 text-xs text-muted-foreground">
            <StatusLine label="Recommended model" value="Codex 5.5 when available" />
            <StatusLine label="Install path" value="~/.age/age-harness" />
            <StatusLine label="Data path" value="~/.age" />
            <StatusLine label="Dashboard" value="http://127.0.0.1:9129" />
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-7 px-4 py-6 sm:px-6 lg:px-8">
        <section aria-labelledby="age-flow" className="space-y-3">
          <SectionHeading
            icon={BookOpen}
            eyebrow="Customer handoff"
            title="The onboarding sequence"
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {FLOW_STEPS.map((step) => (
              <FlowStep key={step.title} {...step} />
            ))}
          </div>
        </section>

        <section aria-labelledby="age-commands" className="space-y-4">
          <SectionHeading
            icon={Terminal}
            eyebrow="Paste-ready commands"
            title="Terminal commands"
          />
          <CommandBlock
            command={PREFLIGHT_COMMAND}
            copied={copied}
            label="Preflight"
            onCopy={copyCommand}
            title="1. Check dependencies before installing"
          />
          <CommandBlock
            command={INSTALL_COMMAND}
            copied={copied}
            label="Install"
            onCopy={copyCommand}
            title="2. Install AGE without touching the Hermes command"
          />
          <CommandBlock
            command={DEPENDENCY_CHECK_COMMAND}
            copied={copied}
            label="Verify"
            onCopy={copyCommand}
            title="3. Verify the command, version, and doctor report"
          />
          <CommandBlock
            command={DASHBOARD_COMMAND}
            copied={copied}
            label="Dashboard"
            onCopy={copyCommand}
            title="4. Open the agent dashboard"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-2" aria-labelledby="age-model-harness">
          <DefinitionPanel
            icon={Gauge}
            title="Harness"
            items={[
              "AGE stands for Agent Genesis Engine.",
              "The harness is the local command, dashboard, settings, sessions, tools, logs, and workflow layer.",
              "AGE should stay under ~/.age for this customer handoff so it remains separate from Nous Research Hermes installs.",
            ]}
          />
          <DefinitionPanel
            icon={Cpu}
            title="Model"
            items={[
              "The model is the AI system AGE connects to for reasoning and responses.",
              "Codex 5.5 is the recommended option when it is visible in the customer's provider list.",
              "On a 2013 MacBook Air, prefer cloud models over local models to protect performance.",
            ]}
          />
        </section>

        <section className="space-y-4" aria-labelledby="age-model-setup">
          <SectionHeading
            icon={Cpu}
            eyebrow="Model selection"
            title="Choose a model after install"
          />
          <CommandBlock
            command={MODEL_COMMAND}
            copied={copied}
            label="Model"
            onCopy={copyCommand}
            title="Open model selection"
          />
          <p className="text-sm leading-6 text-muted-foreground">
            Select Codex 5.5 when it is available. If Codex 5.5 is not shown,
            use the Genesis Labs recommended fallback model for the customer's
            account. The model can be changed later without reinstalling AGE.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]" aria-labelledby="age-low-power">
          <div className="space-y-3">
            <SectionHeading
              icon={Gauge}
              eyebrow="Low-power MacBook Air"
              title="Operating tips"
            />
            <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
              {LOW_POWER_TIPS.map((tip) => (
                <li className="flex gap-2" key={tip}>
                  <Check className="mt-1 size-3.5 shrink-0 text-midground" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <CommandBlock
            command={DAILY_START_COMMAND}
            copied={copied}
            label="Daily"
            onCopy={copyCommand}
            title="Daily dashboard start"
          />
        </section>

        <section className="space-y-4" aria-labelledby="age-troubleshooting">
          <SectionHeading
            icon={Wrench}
            eyebrow="Support"
            title="Common fixes"
          />
          <div className="grid gap-3 md:grid-cols-2">
            {TROUBLESHOOTING.map((item) => (
              <div
                className="border border-current/15 bg-background/40 p-4"
                key={item.problem}
              >
                <h3 className="text-sm font-semibold text-midground">
                  {item.problem}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.fix}
                </p>
              </div>
            ))}
          </div>
          <CommandBlock
            command={SUPPORT_COMMAND}
            copied={copied}
            label="Support"
            onCopy={copyCommand}
            title="Support snapshot"
          />
        </section>
      </div>

      <PluginSlot name="docs:bottom" />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
}: {
  eyebrow: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center border border-current/20 bg-midground/[0.04] text-midground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="font-mondwest text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="truncate text-lg font-bold text-midground">{title}</h2>
      </div>
    </div>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-3">
      <span className="text-muted-foreground/70">{label}</span>
      <span className="font-medium text-midground">{value}</span>
    </div>
  );
}

function FlowStep({
  body,
  icon: Icon,
  title,
}: {
  body: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <article className="min-h-[10rem] border border-current/15 bg-background/35 p-4">
      <Icon className="size-5 text-midground" />
      <h3 className="mt-4 text-sm font-semibold text-midground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </article>
  );
}

function CommandBlock({
  command,
  copied,
  label,
  onCopy,
  title,
}: {
  command: string;
  copied: string | null;
  label: string;
  onCopy: (label: string, command: string) => void;
  title: string;
}) {
  return (
    <div className="overflow-hidden border border-current/15 bg-black/20">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-current/10 px-3 py-2">
        <h3 className="min-w-0 truncate text-sm font-semibold text-midground">
          {title}
        </h3>
        <Button
          ghost
          size="sm"
          onClick={() => onCopy(label, command)}
          className="shrink-0 normal-case"
        >
          <Clipboard className="size-3.5" />
          {copied === label ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="max-h-[24rem] overflow-auto px-4 py-3 text-xs leading-6 text-midground">
        <code>{command}</code>
      </pre>
    </div>
  );
}

function DefinitionPanel({
  icon: Icon,
  items,
  title,
}: {
  icon: ComponentType<{ className?: string }>;
  items: string[];
  title: string;
}) {
  return (
    <section className="border border-current/15 bg-background/35 p-4">
      <div className="flex items-center gap-3">
        <Icon className="size-5 text-midground" />
        <h2 className="text-base font-bold text-midground">{title}</h2>
      </div>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <Check className="mt-1 size-3.5 shrink-0 text-midground" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
