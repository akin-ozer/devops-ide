/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AgentProviderDefinition } from './agentProvider.js';

export class AgentProviderRegistry {
	private readonly providers: readonly AgentProviderDefinition[] = [
		{ id: 'codex', displayName: 'Codex CLI', binary: 'codex' },
		{ id: 'claude', displayName: 'Claude Code', binary: 'claude' }
	];

	getProviderIds(): string[] {
		return this.providers.map(provider => provider.id);
	}

	getProviders(): readonly AgentProviderDefinition[] {
		return this.providers;
	}
}
