/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AgentProviderId } from './agentProvider.js';
import { DevOpsSkillCatalog } from './devopsSkillsCatalog.js';

export interface DevOpsAgentLaunchContext {
	readonly providerId: AgentProviderId;
	readonly workspaceFolder: string;
	readonly catalogs: readonly DevOpsSkillCatalog[];
}

export async function buildLaunchContext(
	workspaceFolder: string,
	providerId: AgentProviderId,
	catalogs: DevOpsSkillCatalog[]
): Promise<DevOpsAgentLaunchContext> {
	return {
		providerId,
		workspaceFolder,
		catalogs
	};
}
