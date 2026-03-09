/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { getRegisteredDevOpsContainerIds } from '../../browser/devopsContainers.js';

suite('DevOpsWorkbenchShell', () => {
	test('registers the Agents, SSH, Kubernetes, and Web containers', () => {
		const ids = getRegisteredDevOpsContainerIds();

		assert.deepStrictEqual(ids, [
			'workbench.view.devopsHome',
			'workbench.view.devopsAgents',
			'workbench.view.devopsSsh',
			'workbench.view.devopsKubernetes',
			'workbench.view.devopsWeb'
		]);
	});
});
