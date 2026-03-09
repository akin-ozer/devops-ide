/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize2 } from '../../../../nls.js';
import { Categories } from '../../../../platform/action/common/actionCommonCategories.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { DevOpsBrowserTabService } from '../../../services/devops/browser/devopsBrowserTabService.js';
import { IViewsService } from '../../../services/views/common/viewsService.js';
import { DEVOPS_CONTAINER_IDS } from '../../devopsHome/browser/devopsContainers.js';

export const OPEN_DEVOPS_WEB_TARGET_ACTION_ID = 'workbench.action.devopsWeb.openTarget';
export const FOCUS_DEVOPS_WEB_ACTION_ID = 'workbench.action.devopsWeb.focus';
export const OPEN_LINKED_GRAFANA_ACTION_ID = 'workbench.action.devopsWeb.openLinkedGrafana';

registerAction2(class FocusDevOpsWebAction extends Action2 {
	constructor() {
		super({
			id: FOCUS_DEVOPS_WEB_ACTION_ID,
			title: localize2('focusDevOpsWeb', 'DevOps: Focus Web'),
			category: Categories.View,
			f1: true
		});
	}

	override run(accessor: ServicesAccessor): Promise<unknown> {
		return accessor.get(IViewsService).openViewContainer(DEVOPS_CONTAINER_IDS.web, true);
	}
});

registerAction2(class OpenLinkedGrafanaAction extends Action2 {
	constructor() {
		super({
			id: OPEN_LINKED_GRAFANA_ACTION_ID,
			title: localize2('openLinkedGrafana', 'DevOps: Open Linked Grafana'),
			category: Categories.View,
			f1: true
		});
	}

	override run(): Promise<unknown> {
		return new DevOpsBrowserTabService().openTarget({
			id: 'grafana',
			url: 'https://grafana.example.com'
		});
	}
});
