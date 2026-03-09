# DevOps IDE V1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a macOS-first Code-OSS fork that stays editor-first while adding first-class `Agents`, `SSH`, `Kubernetes`, and `Web` workbench modules for DevOps engineers.

**Architecture:** Start from a fresh clone of your GitHub fork of `microsoft/vscode`, then add new workbench contributions under `src/vs/workbench/contrib/devops*` and shared services under `src/vs/workbench/services/devops*`. Keep provider-specific agent logic behind adapters, reuse Electron browser surfaces for embedded web tabs, and use a shared target registry to connect hosts, clusters, and web consoles.

**Tech Stack:** Code-OSS, TypeScript, Electron, existing VS Code workbench/service registries, Electron browser view support, local CLIs (`codex`, `claude`, `ssh`, `kubectl`, `aws`), Mocha/Playwright-based VS Code tests.

---

## Preconditions

- Execute this plan in a fresh clone of your GitHub fork of `microsoft/vscode`, not in the current placeholder workspace.
- Copy [2026-03-09-devops-ide-design.md](/Users/akinozer/GolandProjects/devops-ide/docs/plans/2026-03-09-devops-ide-design.md) and this plan into the fork before starting.
- Use a dedicated branch such as `codex/devops-ide-v1`.
- Target macOS only for v1.

### Task 1: Brand The Fork And Add A Baseline Verification Script

**Files:**
- Modify: `product.json`
- Modify: `package.json`
- Modify: `README.md`
- Create: `scripts/verify-devops-ide-baseline.sh`
- Test: `scripts/verify-devops-ide-baseline.sh`

**Step 1: Write the failing verification script**

```bash
#!/usr/bin/env bash
set -euo pipefail

grep -q '"nameShort": "DevOps IDE"' product.json
grep -q '"applicationName": "devops-ide"' product.json
grep -q '"displayName": "DevOps IDE"' package.json
grep -q 'Code-OSS fork for DevOps engineers' README.md
```

**Step 2: Run test to verify it fails**

Run: `bash scripts/verify-devops-ide-baseline.sh`
Expected: FAIL because the upstream fork is still branded as VS Code / Code - OSS.

**Step 3: Write minimal implementation**

```json
{
  "nameShort": "DevOps IDE",
  "nameLong": "DevOps IDE",
  "applicationName": "devops-ide",
  "dataFolderName": ".devops-ide"
}
```

```json
{
  "displayName": "DevOps IDE"
}
```

```md
# DevOps IDE

Code-OSS fork for DevOps engineers, SREs, and platform engineers.
```

**Step 4: Run test to verify it passes**

Run: `bash scripts/verify-devops-ide-baseline.sh && npm run compile`
Expected: verification script succeeds and the fork still compiles.

**Step 5: Commit**

```bash
git add product.json package.json README.md scripts/verify-devops-ide-baseline.sh
git commit -m "chore: brand the fork as devops ide"
```

### Task 2: Register DevOps Workbench Containers

**Files:**
- Modify: `src/vs/workbench/workbench.common.main.ts`
- Modify: `src/vs/workbench/workbench.desktop.main.ts`
- Create: `src/vs/workbench/contrib/devopsHome/browser/devopsHome.contribution.ts`
- Create: `src/vs/workbench/contrib/devopsHome/browser/devopsContainers.ts`
- Create: `src/vs/workbench/contrib/devopsHome/browser/devopsHomeViewPane.ts`
- Create: `src/vs/workbench/contrib/devopsHome/browser/media/devopsHome.css`
- Test: `src/vs/workbench/contrib/devopsHome/test/browser/devopsHome.contribution.test.ts`

**Step 1: Write the failing test**

```ts
suite('DevOpsWorkbenchShell', () => {
	test('registers the Agents, SSH, Kubernetes, and Web containers', () => {
		const ids = getRegisteredDevOpsContainerIds();
		assert.deepStrictEqual(ids, [
			'workbench.view.devopsHome',
			'workbench.view.devopsAgents',
			'workbench.view.devopsSsh',
			'workbench.view.devopsKubernetes',
			'workbench.view.devopsWeb'
		]);
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-browser-no-install -- --grep "DevOpsWorkbenchShell"`
Expected: FAIL because the containers and helper do not exist.

**Step 3: Write minimal implementation**

```ts
export const DEVOPS_VIEW_IDS = {
	home: 'workbench.view.devopsHome',
	agents: 'workbench.view.devopsAgents',
	ssh: 'workbench.view.devopsSsh',
	kubernetes: 'workbench.view.devopsKubernetes',
	web: 'workbench.view.devopsWeb'
} as const;

export function getRegisteredDevOpsContainerIds(): string[] {
	return Object.values(DEVOPS_VIEW_IDS);
}
```

```ts
import './contrib/devopsHome/browser/devopsHome.contribution.js';
```

**Step 4: Run test to verify it passes**

Run: `npm run test-browser-no-install -- --grep "DevOpsWorkbenchShell" && npm run compile`
Expected: test passes and the new contribution is compiled into the workbench.

**Step 5: Commit**

```bash
git add src/vs/workbench/workbench.common.main.ts src/vs/workbench/workbench.desktop.main.ts src/vs/workbench/contrib/devopsHome
git commit -m "feat: add devops workbench containers"
```

### Task 3: Build The Shared Target Registry And Secret Bridge

**Files:**
- Create: `src/vs/workbench/services/devops/common/devopsTargets.ts`
- Create: `src/vs/workbench/services/devops/common/devopsConnectionRegistry.ts`
- Create: `src/vs/workbench/services/devops/browser/devopsConnectionRegistryService.ts`
- Create: `src/vs/workbench/services/devops/electron-browser/devopsSecretStorageService.ts`
- Test: `src/vs/workbench/services/devops/test/browser/devopsConnectionRegistryService.test.ts`

**Step 1: Write the failing test**

```ts
suite('DevOpsConnectionRegistryService', () => {
	test('stores linked kubernetes and web targets', async () => {
		const service = new DevOpsConnectionRegistryService();

		await service.saveTarget({
			id: 'cluster-prod',
			kind: 'kubernetes',
			label: 'prod-eks',
			links: { sshHostId: 'bastion-prod', webTargetIds: ['grafana-prod'] }
		});

		const stored = await service.getTarget('cluster-prod');
		assert.strictEqual(stored?.links?.webTargetIds?.[0], 'grafana-prod');
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-browser-no-install -- --grep "DevOpsConnectionRegistryService"`
Expected: FAIL because the service and target types do not exist.

**Step 3: Write minimal implementation**

```ts
export interface DevOpsTarget {
	id: string;
	kind: 'ssh' | 'kubernetes' | 'web';
	label: string;
	links?: { sshHostId?: string; webTargetIds?: string[] };
}

export class DevOpsConnectionRegistryService {
	private readonly targets = new Map<string, DevOpsTarget>();

	async saveTarget(target: DevOpsTarget): Promise<void> {
		this.targets.set(target.id, target);
	}

	async getTarget(id: string): Promise<DevOpsTarget | undefined> {
		return this.targets.get(id);
	}
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test-browser-no-install -- --grep "DevOpsConnectionRegistryService" && npm run compile`
Expected: test passes and the service compiles cleanly.

**Step 5: Commit**

```bash
git add src/vs/workbench/services/devops
git commit -m "feat: add devops target registry services"
```

### Task 4: Define Provider Adapters For Codex And Claude Code

**Files:**
- Create: `docs/provider-adapters/codex-cli.md`
- Create: `docs/provider-adapters/claude-code-cli.md`
- Create: `src/vs/workbench/services/devops/common/agentProvider.ts`
- Create: `src/vs/workbench/services/devops/common/agentProviderRegistry.ts`
- Test: `src/vs/workbench/services/devops/test/node/agentProviderRegistry.test.ts`

**Step 1: Write the failing test**

```ts
suite('AgentProviderRegistry', () => {
	test('returns codex and claude as supported providers', () => {
		const registry = new AgentProviderRegistry();
		assert.deepStrictEqual(registry.getProviderIds(), ['codex', 'claude']);
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-node -- --grep "AgentProviderRegistry"`
Expected: FAIL because the provider registry does not exist.

**Step 3: Write minimal implementation**

```ts
export interface AgentProviderDefinition {
	id: 'codex' | 'claude';
	displayName: string;
	binary: string;
}

export class AgentProviderRegistry {
	private readonly providers: AgentProviderDefinition[] = [
		{ id: 'codex', displayName: 'Codex CLI', binary: 'codex' },
		{ id: 'claude', displayName: 'Claude Code', binary: 'claude' }
	];

	getProviderIds(): string[] {
		return this.providers.map(provider => provider.id);
	}
}
```

```md
# Codex CLI Adapter Notes

- Verify install and login behavior against current OpenAI docs before wiring provider-specific flags.
- Use `codex --version` for binary detection.
- Let first-run login stay inside the CLI flow.
```

```md
# Claude Code Adapter Notes

- Verify install and login behavior against current Anthropic docs before wiring provider-specific flags.
- Use `claude --version` for binary detection.
- Let first-run login stay inside the CLI flow.
```

**Step 4: Run test to verify it passes**

Run: `npm run test-node -- --grep "AgentProviderRegistry" && npm run compile`
Expected: registry test passes and the adapter notes exist for the next task.

**Step 5: Commit**

```bash
git add docs/provider-adapters src/vs/workbench/services/devops/common/agentProvider*.ts src/vs/workbench/services/devops/test/node/agentProviderRegistry.test.ts
git commit -m "feat: add agent provider registry"
```

### Task 5: Implement Skill Catalog Staging And Agent Launch Contexts

**Files:**
- Create: `src/vs/workbench/services/devops/common/devopsSkillsCatalog.ts`
- Create: `src/vs/workbench/services/devops/electron-browser/devopsSkillsCatalogService.ts`
- Create: `src/vs/workbench/services/devops/electron-browser/devopsAgentLauncherService.ts`
- Create: `src/vs/workbench/services/devops/common/devopsAgentLaunchContext.ts`
- Test: `src/vs/workbench/services/devops/test/node/devopsAgentLauncherService.test.ts`

**Step 1: Write the failing test**

```ts
suite('DevOpsAgentLauncherService', () => {
	test('builds a launch context with workspace, provider, and enabled catalogs', async () => {
		const context = await buildLaunchContext('/workspace/app', 'codex', [
			{ id: 'devops-skills', source: 'https://github.com/akin-ozer/cc-devops-skills' }
		]);

		assert.strictEqual(context.providerId, 'codex');
		assert.strictEqual(context.workspaceFolder, '/workspace/app');
		assert.strictEqual(context.catalogs[0].id, 'devops-skills');
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-node -- --grep "DevOpsAgentLauncherService"`
Expected: FAIL because the launch context builder does not exist.

**Step 3: Write minimal implementation**

```ts
export interface DevOpsSkillCatalog {
	id: string;
	source: string;
}

export interface DevOpsAgentLaunchContext {
	providerId: 'codex' | 'claude';
	workspaceFolder: string;
	catalogs: DevOpsSkillCatalog[];
}

export async function buildLaunchContext(
	workspaceFolder: string,
	providerId: 'codex' | 'claude',
	catalogs: DevOpsSkillCatalog[]
): Promise<DevOpsAgentLaunchContext> {
	return { providerId, workspaceFolder, catalogs };
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test-node -- --grep "DevOpsAgentLauncherService" && npm run compile`
Expected: launch context test passes and the services compile.

**Step 5: Commit**

```bash
git add src/vs/workbench/services/devops/common src/vs/workbench/services/devops/electron-browser src/vs/workbench/services/devops/test/node/devopsAgentLauncherService.test.ts
git commit -m "feat: add skill catalog and agent launch context services"
```

### Task 6: Build The Agents Module And Session Editor

**Files:**
- Create: `src/vs/workbench/contrib/devopsAgents/browser/devopsAgents.contribution.ts`
- Create: `src/vs/workbench/contrib/devopsAgents/browser/devopsAgentsViewPane.ts`
- Create: `src/vs/workbench/contrib/devopsAgents/browser/devopsAgentSessionEditorInput.ts`
- Create: `src/vs/workbench/contrib/devopsAgents/browser/devopsAgentSessionEditor.ts`
- Create: `src/vs/workbench/contrib/devopsAgents/browser/media/devopsAgents.css`
- Test: `src/vs/workbench/contrib/devopsAgents/test/browser/devopsAgentsViewPane.test.ts`

**Step 1: Write the failing test**

```ts
suite('DevOpsAgentsViewPane', () => {
	test('shows Codex and Claude launch actions', () => {
		const pane = new DevOpsAgentsViewPane();
		assert.deepStrictEqual(pane.getVisibleProviderIds(), ['codex', 'claude']);
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-browser-no-install -- --grep "DevOpsAgentsViewPane"`
Expected: FAIL because the pane and editor do not exist.

**Step 3: Write minimal implementation**

```ts
export class DevOpsAgentsViewPane {
	getVisibleProviderIds(): string[] {
		return ['codex', 'claude'];
	}
}
```

```ts
export class DevOpsAgentSessionEditorInput extends EditorInput {
	static readonly ID = 'workbench.input.devopsAgentSession';
	override get typeId(): string {
		return DevOpsAgentSessionEditorInput.ID;
	}
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test-browser-no-install -- --grep "DevOpsAgentsViewPane" && npm run compile`
Expected: test passes and the basic session editor is registered.

**Step 5: Commit**

```bash
git add src/vs/workbench/contrib/devopsAgents
git commit -m "feat: add agents module and session editor"
```

### Task 7: Build The SSH Module

**Files:**
- Create: `src/vs/workbench/contrib/devopsSsh/browser/devopsSsh.contribution.ts`
- Create: `src/vs/workbench/contrib/devopsSsh/browser/devopsSshViewPane.ts`
- Create: `src/vs/workbench/contrib/devopsSsh/browser/devopsSshActions.ts`
- Create: `src/vs/workbench/services/devops/electron-browser/devopsSshService.ts`
- Test: `src/vs/workbench/contrib/devopsSsh/test/browser/devopsSshViewPane.test.ts`

**Step 1: Write the failing test**

```ts
suite('DevOpsSshViewPane', () => {
	test('lists saved SSH targets from the connection registry', async () => {
		const pane = new DevOpsSshViewPane([
			{ id: 'bastion-prod', kind: 'ssh', label: 'prod-bastion' }
		]);

		assert.strictEqual(pane.getRows()[0].label, 'prod-bastion');
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-browser-no-install -- --grep "DevOpsSshViewPane"`
Expected: FAIL because the SSH pane and service do not exist.

**Step 3: Write minimal implementation**

```ts
export class DevOpsSshViewPane {
	constructor(private readonly rows: { id: string; label: string }[]) {}

	getRows(): { id: string; label: string }[] {
		return this.rows;
	}
}
```

```ts
export class DevOpsSshService {
	buildSshCommand(host: string): string[] {
		return ['ssh', host];
	}
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test-browser-no-install -- --grep "DevOpsSshViewPane" && npm run compile`
Expected: test passes and the SSH contribution compiles.

**Step 5: Commit**

```bash
git add src/vs/workbench/contrib/devopsSsh src/vs/workbench/services/devops/electron-browser/devopsSshService.ts
git commit -m "feat: add ssh management module"
```

### Task 8: Build The Kubernetes Module

**Files:**
- Create: `src/vs/workbench/contrib/devopsKubernetes/browser/devopsKubernetes.contribution.ts`
- Create: `src/vs/workbench/contrib/devopsKubernetes/browser/devopsKubernetesViewPane.ts`
- Create: `src/vs/workbench/contrib/devopsKubernetes/browser/devopsKubernetesActions.ts`
- Create: `src/vs/workbench/services/devops/electron-browser/devopsKubectlService.ts`
- Test: `src/vs/workbench/contrib/devopsKubernetes/test/browser/devopsKubernetesViewPane.test.ts`

**Step 1: Write the failing test**

```ts
suite('DevOpsKubernetesViewPane', () => {
	test('groups resources by namespace', () => {
		const pane = new DevOpsKubernetesViewPane([
			{ kind: 'Pod', name: 'api-0', namespace: 'payments' }
		]);

		assert.deepStrictEqual(pane.getNamespaces(), ['payments']);
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-browser-no-install -- --grep "DevOpsKubernetesViewPane"`
Expected: FAIL because the Kubernetes pane and service do not exist.

**Step 3: Write minimal implementation**

```ts
export class DevOpsKubernetesViewPane {
	constructor(private readonly resources: { namespace: string }[]) {}

	getNamespaces(): string[] {
		return [...new Set(this.resources.map(resource => resource.namespace))];
	}
}
```

```ts
export class DevOpsKubectlService {
	buildGetPodsCommand(namespace: string): string[] {
		return ['kubectl', 'get', 'pods', '-n', namespace];
	}
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test-browser-no-install -- --grep "DevOpsKubernetesViewPane" && npm run compile`
Expected: test passes and the Kubernetes module compiles.

**Step 5: Commit**

```bash
git add src/vs/workbench/contrib/devopsKubernetes src/vs/workbench/services/devops/electron-browser/devopsKubectlService.ts
git commit -m "feat: add kubernetes operations module"
```

### Task 9: Build The Web Consoles Module On Top Of Browser Views

**Files:**
- Create: `src/vs/workbench/contrib/devopsWeb/browser/devopsWeb.contribution.ts`
- Create: `src/vs/workbench/contrib/devopsWeb/browser/devopsWebViewPane.ts`
- Create: `src/vs/workbench/contrib/devopsWeb/browser/devopsWebEditorInput.ts`
- Create: `src/vs/workbench/contrib/devopsWeb/browser/devopsWebActions.ts`
- Create: `src/vs/workbench/services/devops/electron-browser/devopsBrowserTabService.ts`
- Test: `src/vs/workbench/contrib/devopsWeb/test/browser/devopsBrowserTabService.test.ts`

**Step 1: Write the failing test**

```ts
suite('DevOpsBrowserTabService', () => {
	test('prefers in-app browser tabs but exposes a fallback flag', async () => {
		const service = new DevOpsBrowserTabService();
		const tab = await service.openTarget({ id: 'grafana-prod', url: 'https://grafana.example.com' });

		assert.strictEqual(tab.mode, 'embedded');
		assert.strictEqual(tab.allowExternalFallback, true);
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test-browser-no-install -- --grep "DevOpsBrowserTabService"`
Expected: FAIL because the web module and tab service do not exist.

**Step 3: Write minimal implementation**

```ts
export class DevOpsBrowserTabService {
	async openTarget(target: { id: string; url: string }): Promise<{ mode: 'embedded'; allowExternalFallback: true }> {
		return { mode: 'embedded', allowExternalFallback: true };
	}
}
```

```ts
export class DevOpsWebEditorInput extends EditorInput {
	static readonly ID = 'workbench.input.devopsWebTab';
	override get typeId(): string {
		return DevOpsWebEditorInput.ID;
	}
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test-browser-no-install -- --grep "DevOpsBrowserTabService" && npm run compile`
Expected: test passes and the web tab editor compiles against the browser view infrastructure.

**Step 5: Commit**

```bash
git add src/vs/workbench/contrib/devopsWeb src/vs/workbench/services/devops/electron-browser/devopsBrowserTabService.ts
git commit -m "feat: add embedded web consoles module"
```

### Task 10: Wire Cross-Module Actions And Smoke Coverage

**Files:**
- Modify: `src/vs/workbench/contrib/devopsAgents/browser/devopsAgents.contribution.ts`
- Modify: `src/vs/workbench/contrib/devopsSsh/browser/devopsSshActions.ts`
- Modify: `src/vs/workbench/contrib/devopsKubernetes/browser/devopsKubernetesActions.ts`
- Modify: `src/vs/workbench/contrib/devopsWeb/browser/devopsWebActions.ts`
- Create: `test/smoke/src/areas/devops/devopsWorkbench.test.ts`
- Modify: `README.md`

**Step 1: Write the failing smoke test**

```ts
test('opens agents, ssh, kubernetes, and web areas from the workbench', async () => {
	await app.workbench.activityBar.select('Agents');
	await app.workbench.activityBar.select('SSH');
	await app.workbench.activityBar.select('Kubernetes');
	await app.workbench.activityBar.select('Web');
});
```

**Step 2: Run test to verify it fails**

Run: `npm run smoketest-no-compile -- --grep "opens agents, ssh, kubernetes, and web areas"`
Expected: FAIL because the new areas are not yet wired into smoke coverage.

**Step 3: Write minimal implementation**

```ts
registerAction2(class OpenLinkedGrafanaAction extends Action2 {
	run(): Promise<void> {
		return openDevOpsWebTarget('grafana');
	}
});
```

```md
## DevOps Modules

- Agents
- SSH
- Kubernetes
- Web Consoles
```

**Step 4: Run test to verify it passes**

Run: `npm run compile && npm run test-browser-no-install -- --grep "DevOps" && npm run smoketest-no-compile -- --grep "opens agents, ssh, kubernetes, and web areas"`
Expected: compile succeeds, focused browser tests pass, and the new smoke path succeeds.

**Step 5: Commit**

```bash
git add src/vs/workbench/contrib/devopsAgents src/vs/workbench/contrib/devopsSsh src/vs/workbench/contrib/devopsKubernetes src/vs/workbench/contrib/devopsWeb test/smoke/src/areas/devops/devopsWorkbench.test.ts README.md
git commit -m "feat: connect devops modules across the workbench"
```
