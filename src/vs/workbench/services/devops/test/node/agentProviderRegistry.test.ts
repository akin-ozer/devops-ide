/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { AgentProviderRegistry } from '../../common/agentProviderRegistry.js';

suite('AgentProviderRegistry', () => {
	test('returns codex and claude as supported providers', () => {
		const registry = new AgentProviderRegistry();

		assert.deepStrictEqual(registry.getProviderIds(), ['codex', 'claude']);
	});
});
