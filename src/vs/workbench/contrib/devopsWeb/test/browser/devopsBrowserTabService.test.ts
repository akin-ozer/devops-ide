/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../../base/test/common/utils.js';
import { DevOpsBrowserTabService } from '../../../../services/devops/browser/devopsBrowserTabService.js';

suite('DevOpsBrowserTabService', () => {
	ensureNoDisposablesAreLeakedInTestSuite();

	test('prefers in-app browser tabs but exposes a fallback flag', async () => {
		const service = new DevOpsBrowserTabService();
		const tab = await service.openTarget({ id: 'grafana-prod', url: 'https://grafana.example.com' });

		assert.strictEqual(tab.mode, 'embedded');
		assert.strictEqual(tab.allowExternalFallback, true);
	});
});
