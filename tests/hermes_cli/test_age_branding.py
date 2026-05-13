"""Regression checks for the AGE by Genesis Labs branded fork."""

from pathlib import Path
import sys
import tomllib


REPO_ROOT = Path(__file__).resolve().parents[2]
PRIVATE_REPO = "L0v3Chrix/age-harness"
PRIVATE_REPO_URL = f"https://github.com/{PRIVATE_REPO}.git"


def test_project_scripts_expose_age_and_compatibility_aliases():
    with (REPO_ROOT / "pyproject.toml").open("rb") as fh:
        scripts = tomllib.load(fh)["project"]["scripts"]

    assert scripts["age"] == "hermes_cli.main:main"
    assert scripts["hermes"] == "hermes_cli.main:main"
    assert scripts["hermes-agent"] == "run_agent:main"
    assert scripts["hermes-acp"] == "acp_adapter.entry:main"


def test_parser_uses_age_examples_when_invoked_as_age(monkeypatch):
    monkeypatch.setattr(sys, "argv", ["/usr/local/bin/age"])

    from hermes_cli._parser import build_top_level_parser

    parser, _, _ = build_top_level_parser()
    help_text = parser.format_help()

    assert parser.prog == "age"
    assert "AGE by Genesis Labs" in help_text
    assert "age setup" in help_text
    assert "age dashboard" in help_text
    assert "hermes setup" not in help_text


def test_default_cli_skin_is_age_branded():
    from hermes_cli.skin_engine import get_active_skin, set_active_skin

    set_active_skin("default")
    skin = get_active_skin()

    assert skin.get_branding("agent_name") == "AGE by Genesis Labs"
    assert skin.get_branding("response_label") == " AGE "
    assert skin.get_branding("help_header") == "AGE Commands"


def test_installers_target_private_age_repo_and_launchers():
    install_sh = (REPO_ROOT / "scripts" / "install.sh").read_text()
    install_ps1 = (REPO_ROOT / "scripts" / "install.ps1").read_text()

    for installer in (install_sh, install_ps1):
        assert PRIVATE_REPO in installer
        assert "gh repo clone" in installer

    assert "$command_link_dir/age" in install_sh
    assert "$command_link_dir/hermes" in install_sh
    assert "age setup" in install_sh
    assert "`age setup`" in install_ps1 or "age setup" in install_ps1


def test_update_targets_private_age_fork():
    import hermes_cli.banner as banner
    import hermes_cli.main as main

    assert banner._UPSTREAM_REPO_URL == PRIVATE_REPO_URL
    assert main.OFFICIAL_REPO_URL == PRIVATE_REPO_URL
    assert PRIVATE_REPO_URL in main.OFFICIAL_REPO_URLS


def test_dashboard_and_kanban_static_brand_surfaces():
    assert "AGE by Genesis Labs - Dashboard" in (REPO_ROOT / "web" / "index.html").read_text()

    app_tsx = (REPO_ROOT / "web" / "src" / "App.tsx").read_text()
    assert "AGE" in app_tsx
    assert "Genesis Labs" in app_tsx

    en_i18n = (REPO_ROOT / "web" / "src" / "i18n" / "en.ts").read_text()
    assert 'brand: "AGE by Genesis Labs"' in en_i18n
    assert 'brandShort: "AGE"' in en_i18n
    assert 'org: "Genesis Labs"' in en_i18n

    presets = (REPO_ROOT / "web" / "src" / "themes" / "presets.ts").read_text()
    assert "AGE Teal" in presets
    assert "Hermes Teal" not in presets

    manifest = (REPO_ROOT / "plugins" / "kanban" / "dashboard" / "manifest.json").read_text()
    assert "AGE Kanban" in manifest

    kanban_bundle = (REPO_ROOT / "plugins" / "kanban" / "dashboard" / "dist" / "index.js").read_text()
    assert "AGE profile" in kanban_bundle
    assert "Hermes profile" not in kanban_bundle
