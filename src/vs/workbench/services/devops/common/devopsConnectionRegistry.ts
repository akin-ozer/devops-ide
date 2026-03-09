/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { DevOpsTarget } from './devopsTargets.js';

export const IDevOpsConnectionRegistryService = createDecorator<IDevOpsConnectionRegistryService>('devopsConnectionRegistryService');

export interface IDevOpsConnectionRegistryService {
	readonly _serviceBrand: undefined;

	saveTarget(target: DevOpsTarget): Promise<void>;
	getTarget(id: string): Promise<DevOpsTarget | undefined>;
	getTargets(): Promise<DevOpsTarget[]>;
}
