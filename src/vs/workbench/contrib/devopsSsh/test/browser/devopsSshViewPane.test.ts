/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../../base/test/common/utils.js';
import { DevOpsSshViewPane } from '../../browser/devopsSshViewPane.js';

suite('DevOpsSshViewPane', () => {
	ensureNoDisposablesAreLeakedInTestSuite();

	test('lists saved SSH targets from the connection registry', async () => {
		const pane = new DevOpsSshViewPane([
			{ id: 'bastion-prod', kind: 'ssh', label: 'prod-bastion' }
		]);

		assert.strictEqual(pane.getRows()[0].label, 'prod-bastion');
	});
});
