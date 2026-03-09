/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/devopsHome.css';
import * as nls from '../../../../nls.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IViewPaneOptions, ViewPane } from '../../../browser/parts/views/viewPane.js';
import { IViewDescriptorService } from '../../../common/views.js';
import { DEVOPS_VIEW_IDS } from './devopsContainers.js';

export class DevOpsHomeViewPane extends ViewPane {

	constructor(
		options: IViewPaneOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@IHoverService hoverService: IHoverService
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);

		const copy = getPaneCopy(this.id);
		container.classList.add('devops-view-pane');

		const content = document.createElement('div');
		content.className = 'devops-view-pane-content';

		const title = document.createElement('h3');
		title.className = 'devops-view-pane-title';
		title.textContent = copy.title;

		const description = document.createElement('p');
		description.className = 'devops-view-pane-description';
		description.textContent = copy.description;

		content.appendChild(title);
		content.appendChild(description);
		container.appendChild(content);
	}
}

function getPaneCopy(viewId: string): { title: string; description: string } {
	switch (viewId) {
		case DEVOPS_VIEW_IDS.home:
			return {
				title: nls.localize('devopsHomePaneTitle', "DevOps Home"),
				description: nls.localize('devopsHomePaneDescription', "Start here for an editor-first DevOps workspace that brings code, terminals, clusters, and consoles together.")
			};
		case DEVOPS_VIEW_IDS.agents:
			return {
				title: nls.localize('devopsAgentsPaneTitle', "Agents"),
				description: nls.localize('devopsAgentsPaneDescription', "Launch Codex or Claude Code sessions with your DevOps skills from the same workspace.")
			};
		case DEVOPS_VIEW_IDS.ssh:
			return {
				title: nls.localize('devopsSshPaneTitle', "SSH"),
				description: nls.localize('devopsSshPaneDescription', "Manage remote hosts, terminals, and tunnels without leaving the editor shell.")
			};
		case DEVOPS_VIEW_IDS.kubernetes:
			return {
				title: nls.localize('devopsKubernetesPaneTitle', "Kubernetes"),
				description: nls.localize('devopsKubernetesPaneDescription', "Inspect contexts, workloads, logs, and port-forwards from a dedicated Kubernetes workbench view.")
			};
		case DEVOPS_VIEW_IDS.web:
			return {
				title: nls.localize('devopsWebPaneTitle', "Web"),
				description: nls.localize('devopsWebPaneDescription', "Keep Grafana, Kibana, AWS Console, and internal tools close to the code you are operating.")
			};
		default:
			return {
				title: nls.localize('devopsDefaultPaneTitle', "DevOps"),
				description: nls.localize('devopsDefaultPaneDescription', "A placeholder DevOps workbench view.")
			};
	}
}
