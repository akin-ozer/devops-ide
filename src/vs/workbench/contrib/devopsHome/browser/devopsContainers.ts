/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const DEVOPS_CONTAINER_IDS = {
	home: 'workbench.view.devopsHome',
	agents: 'workbench.view.devopsAgents',
	ssh: 'workbench.view.devopsSsh',
	kubernetes: 'workbench.view.devopsKubernetes',
	web: 'workbench.view.devopsWeb'
} as const;

export const DEVOPS_VIEW_IDS = {
	home: 'workbench.views.devopsHome.default',
	agents: 'workbench.views.devopsAgents.default',
	ssh: 'workbench.views.devopsSsh.default',
	kubernetes: 'workbench.views.devopsKubernetes.default',
	web: 'workbench.views.devopsWeb.default'
} as const;

export const DEVOPS_CONTAINER_SEQUENCE = [
	{ key: 'home', id: DEVOPS_CONTAINER_IDS.home, viewId: DEVOPS_VIEW_IDS.home, order: 7 },
	{ key: 'agents', id: DEVOPS_CONTAINER_IDS.agents, viewId: DEVOPS_VIEW_IDS.agents, order: 8 },
	{ key: 'ssh', id: DEVOPS_CONTAINER_IDS.ssh, viewId: DEVOPS_VIEW_IDS.ssh, order: 9 },
	{ key: 'kubernetes', id: DEVOPS_CONTAINER_IDS.kubernetes, viewId: DEVOPS_VIEW_IDS.kubernetes, order: 10 },
	{ key: 'web', id: DEVOPS_CONTAINER_IDS.web, viewId: DEVOPS_VIEW_IDS.web, order: 11 }
] as const;

export function getRegisteredDevOpsContainerIds(): string[] {
	return DEVOPS_CONTAINER_SEQUENCE.map(container => container.id);
}
