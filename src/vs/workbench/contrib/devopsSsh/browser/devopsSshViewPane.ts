/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface DevOpsSshRow {
	readonly id: string;
	readonly label: string;
	readonly kind?: string;
}

export class DevOpsSshViewPane {
	private readonly rows: DevOpsSshRow[];

	constructor(rows: readonly DevOpsSshRow[]) {
		this.rows = rows.map(row => ({ ...row }));
	}

	getRows(): DevOpsSshRow[] {
		return this.rows.map(row => ({ ...row }));
	}
}
