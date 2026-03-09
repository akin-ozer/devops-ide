/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/devopsAgents.css';
import { Dimension } from '../../../../base/browser/dom.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IEditorOptions } from '../../../../platform/editor/common/editor.js';
import { EditorPane } from '../../../browser/parts/editor/editorPane.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { IEditorOpenContext } from '../../../common/editor.js';
import { IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { DevOpsAgentSessionEditorInput } from './devopsAgentSessionEditorInput.js';

export class DevOpsAgentSessionEditor extends EditorPane {
	static readonly ID = 'workbench.editor.devopsAgentSession';

	private container: HTMLElement | undefined;

	constructor(
		group: IEditorGroup,
		@ITelemetryService telemetryService: ITelemetryService,
		@IThemeService themeService: IThemeService,
		@IStorageService storageService: IStorageService,
		@IInstantiationService _instantiationService: IInstantiationService
	) {
		super(DevOpsAgentSessionEditor.ID, group, telemetryService, themeService, storageService);
	}

	protected override createEditor(parent: HTMLElement): void {
		this.container = document.createElement('div');
		this.container.className = 'devops-agent-session-editor';
		this.container.tabIndex = 0;
		this.container.textContent = 'DevOps agent session';
		parent.appendChild(this.container);
	}

	override async setInput(input: EditorInput, options: IEditorOptions | undefined, context: IEditorOpenContext, token: CancellationToken): Promise<void> {
		await super.setInput(input, options, context, token);

		if (this.container && input instanceof DevOpsAgentSessionEditorInput) {
			this.container.textContent = `DevOps agent session: ${input.providerId}`;
		}
	}

	override focus(): void {
		this.container?.focus();
	}

	override layout(dimension: Dimension): void {
		if (this.container) {
			this.container.style.height = `${dimension.height}px`;
			this.container.style.width = `${dimension.width}px`;
		}
	}
}
