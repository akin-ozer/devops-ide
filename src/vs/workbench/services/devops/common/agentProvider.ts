/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type AgentProviderId = 'codex' | 'claude';

export interface AgentProviderDefinition {
	readonly id: AgentProviderId;
	readonly displayName: string;
	readonly binary: string;
}
