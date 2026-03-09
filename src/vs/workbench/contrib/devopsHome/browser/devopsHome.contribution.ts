/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { registerIcon } from '../../../../platform/theme/common/iconRegistry.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import { Extensions as ViewExtensions, IViewContainersRegistry, IViewsRegistry, ViewContainerLocation } from '../../../common/views.js';
import { DEVOPS_CONTAINER_IDS, DEVOPS_CONTAINER_SEQUENCE } from './devopsContainers.js';
import { DevOpsHomeViewPane } from './devopsHomeViewPane.js';

const devopsHomeViewIcon = registerIcon('devops-home-view-icon', Codicon.home, nls.localize('devopsHomeViewIcon', 'View icon of the DevOps home container.'));
const devopsAgentsViewIcon = registerIcon('devops-agents-view-icon', Codicon.sparkle, nls.localize('devopsAgentsViewIcon', 'View icon of the DevOps agents container.'));
const devopsSshViewIcon = registerIcon('devops-ssh-view-icon', Codicon.remoteExplorer, nls.localize('devopsSshViewIcon', 'View icon of the DevOps SSH container.'));
const devopsKubernetesViewIcon = registerIcon('devops-kubernetes-view-icon', Codicon.server, nls.localize('devopsKubernetesViewIcon', 'View icon of the DevOps Kubernetes container.'));
const devopsWebViewIcon = registerIcon('devops-web-view-icon', Codicon.globe, nls.localize('devopsWebViewIcon', 'View icon of the DevOps web container.'));

const viewContainerRegistry = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry);
const viewsRegistry = Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry);

for (const container of DEVOPS_CONTAINER_SEQUENCE) {
	const registeredContainer = viewContainerRegistry.registerViewContainer({
		id: container.id,
		title: getContainerTitle(container.id),
		icon: getContainerIcon(container.id),
		order: container.order,
		ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [container.id, { mergeViewWithContainerWhenSingleView: true }]),
		storageId: container.id,
		hideIfEmpty: true
	}, ViewContainerLocation.Sidebar);

	viewsRegistry.registerViews([{
		id: container.viewId,
		name: getViewTitle(container.id),
		containerIcon: getContainerIcon(container.id),
		canMoveView: true,
		canToggleVisibility: false,
		ctorDescriptor: new SyncDescriptor(DevOpsHomeViewPane)
	}], registeredContainer);
}

function getContainerTitle(containerId: string) {
	switch (containerId) {
		case DEVOPS_CONTAINER_IDS.home:
			return nls.localize2('devopsHome', "DevOps");
		case DEVOPS_CONTAINER_IDS.agents:
			return nls.localize2('devopsAgents', "Agents");
		case DEVOPS_CONTAINER_IDS.ssh:
			return nls.localize2('devopsSsh', "SSH");
		case DEVOPS_CONTAINER_IDS.kubernetes:
			return nls.localize2('devopsKubernetes', "Kubernetes");
		case DEVOPS_CONTAINER_IDS.web:
			return nls.localize2('devopsWeb', "Web");
		default:
			return nls.localize2('devopsDefault', "DevOps");
	}
}

function getViewTitle(containerId: string) {
	switch (containerId) {
		case DEVOPS_CONTAINER_IDS.home:
			return nls.localize2('devopsHomeView', "Home");
		case DEVOPS_CONTAINER_IDS.agents:
			return nls.localize2('devopsAgentsView', "Agents");
		case DEVOPS_CONTAINER_IDS.ssh:
			return nls.localize2('devopsSshView', "SSH");
		case DEVOPS_CONTAINER_IDS.kubernetes:
			return nls.localize2('devopsKubernetesView', "Kubernetes");
		case DEVOPS_CONTAINER_IDS.web:
			return nls.localize2('devopsWebView', "Web");
		default:
			return nls.localize2('devopsFallbackView', "DevOps");
	}
}

function getContainerIcon(containerId: string) {
	switch (containerId) {
		case DEVOPS_CONTAINER_IDS.home:
			return devopsHomeViewIcon;
		case DEVOPS_CONTAINER_IDS.agents:
			return devopsAgentsViewIcon;
		case DEVOPS_CONTAINER_IDS.ssh:
			return devopsSshViewIcon;
		case DEVOPS_CONTAINER_IDS.kubernetes:
			return devopsKubernetesViewIcon;
		case DEVOPS_CONTAINER_IDS.web:
			return devopsWebViewIcon;
		default:
			return devopsHomeViewIcon;
	}
}
