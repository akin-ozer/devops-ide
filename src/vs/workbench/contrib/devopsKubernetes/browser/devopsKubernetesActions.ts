/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize2 } from '../../../../nls.js';
import { Categories } from '../../../../platform/action/common/actionCommonCategories.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { IViewsService } from '../../../services/views/common/viewsService.js';
import { DEVOPS_CONTAINER_IDS } from '../../devopsHome/browser/devopsContainers.js';

export const OPEN_DEVOPS_KUBERNETES_NAMESPACE_ACTION_ID = 'workbench.action.devopsKubernetes.openNamespace';
export const FOCUS_DEVOPS_KUBERNETES_ACTION_ID = 'workbench.action.devopsKubernetes.focus';

registerAction2(class FocusDevOpsKubernetesAction extends Action2 {
	constructor() {
		super({
			id: FOCUS_DEVOPS_KUBERNETES_ACTION_ID,
			title: localize2('focusDevOpsKubernetes', 'DevOps: Focus Kubernetes'),
			category: Categories.View,
			f1: true
		});
	}

	override run(accessor: ServicesAccessor): Promise<unknown> {
		return accessor.get(IViewsService).openViewContainer(DEVOPS_CONTAINER_IDS.kubernetes, true);
	}
});
