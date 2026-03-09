/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Application, Logger } from '../../../../automation';
import { installAllHandlers } from '../../utils';

const SIDEBAR_TITLE = '.monaco-workbench .part.sidebar > .title > .title-label > h2';

export function setup(logger: Logger) {
	describe('DevOps Workbench', () => {

		installAllHandlers(logger);

		it('opens agents, ssh, kubernetes, and web areas from the workbench', async function () {
			const app = this.app as Application;

			await openDevOpsView(app, 'workbench.action.devopsAgents.focus', 'Agents');
			await openDevOpsView(app, 'workbench.action.devopsSsh.focus', 'SSH');
			await openDevOpsView(app, 'workbench.action.devopsKubernetes.focus', 'Kubernetes');
			await openDevOpsView(app, 'workbench.action.devopsWeb.focus', 'Web');
		});
	});
}

async function openDevOpsView(app: Application, commandId: string, expectedTitle: string): Promise<void> {
	await app.workbench.quickaccess.runCommand(commandId);
	await app.code.waitForTextContent(SIDEBAR_TITLE, undefined, title => title === expectedTitle);
}
