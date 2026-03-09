/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ISecretStorageService } from '../../../../platform/secrets/common/secrets.js';

export const DEVOPS_SECRET_KEY_PREFIX = 'devops.target.';

export class DevOpsSecretStorageService {
	constructor(
		private readonly secretStorageService: ISecretStorageService
	) { }

	async storeConnectionSecret(targetId: string, secret: string): Promise<void> {
		await this.secretStorageService.set(this.toSecretKey(targetId), secret);
	}

	async getConnectionSecret(targetId: string): Promise<string | undefined> {
		return this.secretStorageService.get(this.toSecretKey(targetId));
	}

	async deleteConnectionSecret(targetId: string): Promise<void> {
		await this.secretStorageService.delete(this.toSecretKey(targetId));
	}

	private toSecretKey(targetId: string): string {
		return `${DEVOPS_SECRET_KEY_PREFIX}${targetId}`;
	}
}
