/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from '../../../../nls.js';
import { IUntypedEditorInput } from '../../../common/editor.js';
import { EditorInput } from '../../../common/editor/editorInput.js';

export class DevOpsWebEditorInput extends EditorInput {
	static readonly ID = 'workbench.input.devopsWebTab';

	readonly resource = undefined;

	constructor(
		readonly targetId: string = 'grafana-prod'
	) {
		super();
	}

	override matches(other: EditorInput | IUntypedEditorInput): boolean {
		return super.matches(other) || other instanceof DevOpsWebEditorInput;
	}

	override get typeId(): string {
		return DevOpsWebEditorInput.ID;
	}

	override getName(): string {
		return nls.localize('devopsWebEditorInputName', "DevOps Web Tab");
	}

	override async resolve(): Promise<null> {
		return null;
	}
}
