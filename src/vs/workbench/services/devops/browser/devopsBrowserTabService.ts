/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface DevOpsBrowserTarget {
	readonly id: string;
	readonly url: string;
}

export interface DevOpsBrowserTab {
	readonly targetId: string;
	readonly url: string;
	readonly mode: 'embedded';
	readonly allowExternalFallback: true;
}

export class DevOpsBrowserTabService {
	async openTarget(target: DevOpsBrowserTarget): Promise<DevOpsBrowserTab> {
		return {
			targetId: target.id,
			url: target.url,
			mode: 'embedded',
			allowExternalFallback: true
		};
	}
}
