/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type DevOpsTargetKind = 'ssh' | 'kubernetes' | 'web';

export interface DevOpsTargetLinks {
	readonly sshHostId?: string;
	readonly webTargetIds?: readonly string[];
}

export interface DevOpsTarget {
	readonly id: string;
	readonly kind: DevOpsTargetKind;
	readonly label: string;
	readonly links?: DevOpsTargetLinks;
}

export function cloneDevOpsTarget(target: DevOpsTarget): DevOpsTarget {
	return {
		...target,
		links: target.links ? {
			...target.links,
			webTargetIds: target.links.webTargetIds ? [...target.links.webTargetIds] : undefined
		} : undefined
	};
}
