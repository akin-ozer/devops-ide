/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../../base/test/common/utils.js';
import { buildLaunchContext } from '../../common/devopsAgentLaunchContext.js';

suite('DevOpsAgentLauncherService', () => {
	ensureNoDisposablesAreLeakedInTestSuite();

	test('builds a launch context with workspace, provider, and enabled catalogs', async () => {
		const context = await buildLaunchContext('/workspace/app', 'codex', [
			{ id: 'devops-skills', source: 'https://github.com/akin-ozer/cc-devops-skills' }
		]);

		assert.strictEqual(context.providerId, 'codex');
		assert.strictEqual(context.workspaceFolder, '/workspace/app');
		assert.strictEqual(context.catalogs[0].id, 'devops-skills');
	});
});
