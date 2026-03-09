/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDevOpsConnectionRegistryService } from '../common/devopsConnectionRegistry.js';
import { cloneDevOpsTarget, DevOpsTarget } from '../common/devopsTargets.js';

export class DevOpsConnectionRegistryService implements IDevOpsConnectionRegistryService {
	declare readonly _serviceBrand: undefined;

	private readonly targets = new Map<string, DevOpsTarget>();

	async saveTarget(target: DevOpsTarget): Promise<void> {
		this.targets.set(target.id, cloneDevOpsTarget(target));
	}

	async getTarget(id: string): Promise<DevOpsTarget | undefined> {
		const target = this.targets.get(id);
		return target ? cloneDevOpsTarget(target) : undefined;
	}

	async getTargets(): Promise<DevOpsTarget[]> {
		return Array.from(this.targets.values(), target => cloneDevOpsTarget(target));
	}
}
