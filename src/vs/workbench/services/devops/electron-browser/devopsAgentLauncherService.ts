/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AgentProviderId } from '../common/agentProvider.js';
import { buildLaunchContext, DevOpsAgentLaunchContext } from '../common/devopsAgentLaunchContext.js';
import { DevOpsSkillCatalog } from '../common/devopsSkillsCatalog.js';

export class DevOpsAgentLauncherService {
	async buildLaunchContext(
		workspaceFolder: string,
		providerId: AgentProviderId,
		catalogs: DevOpsSkillCatalog[]
	): Promise<DevOpsAgentLaunchContext> {
		return buildLaunchContext(workspaceFolder, providerId, catalogs);
	}
}
