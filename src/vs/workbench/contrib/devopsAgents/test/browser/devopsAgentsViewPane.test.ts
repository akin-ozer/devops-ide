/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../../base/test/common/utils.js';
import { DevOpsAgentsViewPane } from '../../browser/devopsAgentsViewPane.js';

suite('DevOpsAgentsViewPane', () => {
	ensureNoDisposablesAreLeakedInTestSuite();

	test('shows Codex and Claude launch actions', () => {
		const pane = new DevOpsAgentsViewPane();

		assert.deepStrictEqual(pane.getVisibleProviderIds(), ['codex', 'claude']);
	});
});
