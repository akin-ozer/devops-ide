/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Categories } from '../../../../platform/action/common/actionCommonCategories.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { EditorPaneDescriptor, IEditorPaneRegistry } from '../../../browser/editor.js';
import { EditorExtensions } from '../../../common/editor.js';
import { IViewsService } from '../../../services/views/common/viewsService.js';
import { DEVOPS_CONTAINER_IDS } from '../../devopsHome/browser/devopsContainers.js';
import { DevOpsAgentSessionEditor } from './devopsAgentSessionEditor.js';
import { DevOpsAgentSessionEditorInput } from './devopsAgentSessionEditorInput.js';

export const FOCUS_DEVOPS_AGENTS_ACTION_ID = 'workbench.action.devopsAgents.focus';

Registry.as<IEditorPaneRegistry>(EditorExtensions.EditorPane).registerEditorPane(
	EditorPaneDescriptor.create(
		DevOpsAgentSessionEditor,
		DevOpsAgentSessionEditor.ID,
		localize('devopsAgentSessionEditorLabel', "Agent Session")
	),
	[
		new SyncDescriptor(DevOpsAgentSessionEditorInput)
	]
);

registerAction2(class FocusDevOpsAgentsAction extends Action2 {
	constructor() {
		super({
			id: FOCUS_DEVOPS_AGENTS_ACTION_ID,
			title: localize2('focusDevOpsAgents', 'DevOps: Focus Agents'),
			category: Categories.View,
			f1: true
		});
	}

	override run(accessor: ServicesAccessor): Promise<unknown> {
		return accessor.get(IViewsService).openViewContainer(DEVOPS_CONTAINER_IDS.agents, true);
	}
});
