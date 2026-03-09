/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { DevOpsConnectionRegistryService } from '../../browser/devopsConnectionRegistryService.js';

suite('DevOpsConnectionRegistryService', () => {
	test('stores linked kubernetes and web targets', async () => {
		const service = new DevOpsConnectionRegistryService();

		await service.saveTarget({
			id: 'cluster-prod',
			kind: 'kubernetes',
			label: 'prod-eks',
			links: { sshHostId: 'bastion-prod', webTargetIds: ['grafana-prod'] }
		});

		const stored = await service.getTarget('cluster-prod');
		assert.strictEqual(stored?.links?.webTargetIds?.[0], 'grafana-prod');
	});
});
