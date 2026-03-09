# DevOps IDE Design

## Summary

DevOps IDE is a macOS-first, open-source Code-OSS fork for DevOps engineers, SREs, and platform engineers. The product stays editor-first, but adds first-class operational surfaces for AI agents, SSH, Kubernetes, and embedded web consoles in the same workbench.

The current workspace is still a planning stub, not a `microsoft/vscode` fork. This document records the approved design so the implementation can start from a real Code-OSS fork without re-deciding the product shape.

## Product Goals

- Keep the product recognizably "a code editor" instead of turning it into a separate ops dashboard.
- Make `Agents`, `SSH`, `Kubernetes`, and `Web` first-class left-rail modules alongside normal code editing.
- Launch local `codex` and `claude code` CLIs from the editor rather than building a custom LLM runtime.
- Use installable skill catalogs, with your [`cc-devops-skills`](https://github.com/akin-ozer/cc-devops-skills) repo as the default curated catalog.
- Let users move between code, terminals, clusters, tunnels, and web consoles without leaving the app.

## Target Users

- Primary audience: solo DevOps engineers, SREs, and platform engineers.
- Distribution model: open source, public, external-user friendly.
- v1 platform: macOS only.

## Non-Goals For V1

- Windows or Linux parity.
- Exact reuse of existing Safari or Chrome authenticated sessions.
- Full remote-development parity with every VS Code remote capability.
- A provider-owned agent runtime inside the app.

## Product Positioning

The product is a curated Code-OSS fork, not a fully compatibility-preserving downstream build. Standard editor workflows should remain strong, but deep DevOps and AI customization is allowed even where that creates compatibility gaps relative to vanilla VS Code.

The home state is `Workspace + Agents`, not an operations dashboard. Users should still feel that they opened a code editor first.

## Shell And Navigation

The left activity rail is the main product switcher. V1 should expose:

- `Explorer`
- `Agents`
- `SSH`
- `Kubernetes`
- `Web`
- `Terminal`

The center area remains tab-oriented. Code editors, agent sessions, pod logs, browser tabs, and connection details should all behave like normal workbench tabs instead of separate windows.

The bottom panel remains the place for terminal output, command logs, port-forwards, and long-running operational tasks. The right side can be used as a contextual inspector for selected resources.

## Core Experience

The intended workflow is:

1. Open a repo and edit infrastructure or application code.
2. Launch an agent session from the `Agents` module using `codex` or `claude code`.
3. Apply DevOps skills from the curated catalog or local skill folders.
4. Move directly into SSH terminals, Kubernetes resources, or embedded web consoles from the same workspace.
5. Inspect logs, run commands, port-forward, and validate changes without changing apps.

## Agent Architecture

The app should not implement its own LLM execution engine. Instead, it should provide an `Agent Orchestrator` that:

- discovers installed `codex` and `claude` executables
- tracks provider availability and login state
- stages workspace context and enabled skill catalogs
- launches local CLI sessions
- streams output and status back into IDE tabs and panels

Each agent session should be a first-class workbench object, similar to a terminal or custom editor input.

## Agent Authentication

OAuth and provider auth stay owned by the CLI tools, not by the IDE.

Based on current official docs checked on March 9, 2026:

- Codex CLI is installed with `npm i -g @openai/codex` and prompts for sign-in on first run via `codex`.
- Claude Code recommends the native install on macOS via `curl -fsSL https://claude.ai/install.sh | bash`, and login happens from `claude` or `/login`.

The IDE should detect whether a provider is usable, prompt the user to authenticate if needed, and then hand control back to the CLI.

## Skills Model

Skills are modeled as catalogs, not hardcoded prompt snippets.

V1 should support:

- a built-in curated DevOps catalog sourced from `akin-ozer/cc-devops-skills`
- local skill folders on disk
- per-workspace enable/disable controls
- provider-specific staging, so Codex and Claude Code can consume the same conceptual catalog through provider adapters

This keeps the product opinionated without locking users into one fixed skill pack.

## Operational Surfaces

### SSH

The SSH module is a connection manager plus remote operations surface. It should support:

- saved hosts
- identity and key selection
- tunnels
- integrated terminal launch
- reusable connection snippets

Remote file editing should be secondary in v1. The main use case is command execution, tunneling, and access to operational environments from a local code workspace.

### Kubernetes

The Kubernetes module should focus on the highest-value operational loop:

- contexts
- namespaces
- workloads
- pod details
- logs
- events
- exec shell
- describe output
- port-forward management

Actions from a selected resource should bridge directly into the rest of the IDE, such as opening YAML in the editor or launching the related Grafana view.

### Web

The web module should use embedded browser tabs backed by Electron browser surfaces, not an iframe-first architecture. Some targets will block embedding or have authentication rules that fail in-app. The product promise for v1 is:

- prefer in-app persistent web tabs when supported
- fall back cleanly to the system browser when provider security models require it

This especially applies to Grafana, Kibana, AWS Console, and internal tools.

## Shared Connection Model

SSH hosts, Kubernetes contexts, and web destinations should share a common `target` model. That allows relationships such as:

- a cluster context linked to its preferred Grafana and Kibana URLs
- a web console linked to an SSH bastion or tunnel rule
- a host linked to one or more cluster contexts

This shared model is what makes the workbench feel integrated instead of assembled from separate tools.

## Internal Services

The fork should revolve around a small set of services:

- `Workbench Shell Service`
- `Connection Registry`
- `Agent Launcher`
- `Skill Catalog Manager`
- `Credential Bridge`
- `Execution Bridge`
- `Browser Tab Manager`

These services should expose typed commands and events so UI modules do not talk directly to child processes or browser instances.

## Failure Model

Failure states must be explicit UI states, not terminal-only surprises.

Examples:

- missing `kubectl`: Kubernetes module offers setup guidance
- missing CLI auth: Agents module offers sign-in and retry
- browser embedding blocked: Web tab explains why and offers external open
- failed tunnel or port-forward: visible status with restart and logs

## Testing Strategy

V1 should use layered verification:

- service-level tests for target resolution, launcher assembly, and command routing
- browser/workbench integration tests for tab and module behavior
- macOS smoke tests for `ssh`, `kubectl`, `codex`, `claude`, and browser tab persistence
- manual verification for the hardest auth and embedded-browser flows

## Main Risks

### Embedded web auth

Some destinations will reject in-app browsing or require device-trust flows that do not survive an embedded surface. The mitigation is a first-class system-browser fallback.

### Upstream drift

Forking Code-OSS means the workbench integration points can move. The mitigation is to keep custom modules localized under new `src/vs/workbench/contrib/devops*` and `src/vs/workbench/services/devops*` trees.

### Provider integration drift

`codex` and `claude code` are evolving tools. The mitigation is to isolate provider-specific command wiring behind adapters and validate against official docs before wiring flags or auth assumptions into code.

## Approved V1 Shape

DevOps IDE v1 is a curated, macOS-first Code-OSS fork with:

- editor-first workbench
- first-class `Agents`, `SSH`, `Kubernetes`, and `Web` modules
- local CLI-based Codex and Claude Code orchestration
- built-in DevOps skill catalogs with local extension points
- integrated operational flows across code, clusters, hosts, terminals, and dashboards
