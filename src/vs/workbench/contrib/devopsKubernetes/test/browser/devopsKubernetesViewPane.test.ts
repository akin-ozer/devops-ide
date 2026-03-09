/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../../base/test/common/utils.js';
import { DevOpsKubernetesViewPane } from '../../browser/devopsKubernetesViewPane.js';

suite('DevOpsKubernetesViewPane', () => {
	ensureNoDisposablesAreLeakedInTestSuite();

	test('groups resources by namespace', () => {
		const pane = new DevOpsKubernetesViewPane([
			{ kind: 'Pod', name: 'api-0', namespace: 'payments' }
		]);

		assert.deepStrictEqual(pane.getNamespaces(), ['payments']);
	});
});
