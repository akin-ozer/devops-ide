/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class DevOpsKubectlService {
	buildGetPodsCommand(namespace: string): string[] {
		return ['kubectl', 'get', 'pods', '-n', namespace];
	}
}
