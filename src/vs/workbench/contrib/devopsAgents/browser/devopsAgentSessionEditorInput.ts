/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from '../../../../nls.js';
import { IUntypedEditorInput } from '../../../common/editor.js';
import { EditorInput } from '../../../common/editor/editorInput.js';

export class DevOpsAgentSessionEditorInput extends EditorInput {
	static readonly ID = 'workbench.input.devopsAgentSession';

	readonly resource = undefined;

	constructor(
		readonly providerId: string = 'codex'
	) {
		super();
	}

	override matches(other: EditorInput | IUntypedEditorInput): boolean {
		return super.matches(other) || other instanceof DevOpsAgentSessionEditorInput;
	}

	override get typeId(): string {
		return DevOpsAgentSessionEditorInput.ID;
	}

	override getName(): string {
		return nls.localize('devopsAgentSessionInputName', "DevOps Agent Session");
	}

	override async resolve(): Promise<null> {
		return null;
	}
}
