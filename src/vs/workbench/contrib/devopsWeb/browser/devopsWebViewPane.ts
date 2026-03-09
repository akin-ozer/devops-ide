/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface DevOpsWebTargetRow {
	readonly id: string;
	readonly url: string;
	readonly label?: string;
}

export class DevOpsWebViewPane {
	private readonly targets: DevOpsWebTargetRow[];

	constructor(targets: readonly DevOpsWebTargetRow[]) {
		this.targets = targets.map(target => ({ ...target }));
	}

	getTargets(): DevOpsWebTargetRow[] {
		return this.targets.map(target => ({ ...target }));
	}
}
