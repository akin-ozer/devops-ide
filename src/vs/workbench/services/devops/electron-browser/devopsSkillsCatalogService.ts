/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DevOpsSkillCatalog } from '../common/devopsSkillsCatalog.js';

export class DevOpsSkillsCatalogService {
	private readonly catalogs = new Map<string, DevOpsSkillCatalog>();

	async registerCatalog(catalog: DevOpsSkillCatalog): Promise<void> {
		this.catalogs.set(catalog.id, catalog);
	}

	async getCatalogs(): Promise<DevOpsSkillCatalog[]> {
		return Array.from(this.catalogs.values());
	}
}
