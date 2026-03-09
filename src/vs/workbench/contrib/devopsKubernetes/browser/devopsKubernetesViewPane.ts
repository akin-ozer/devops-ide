/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface DevOpsKubernetesResourceRow {
	readonly namespace: string;
	readonly kind?: string;
	readonly name?: string;
}

export class DevOpsKubernetesViewPane {
	private readonly resources: DevOpsKubernetesResourceRow[];

	constructor(resources: readonly DevOpsKubernetesResourceRow[]) {
		this.resources = resources.map(resource => ({ ...resource }));
	}

	getNamespaces(): string[] {
		return [...new Set(this.resources.map(resource => resource.namespace))];
	}
}
