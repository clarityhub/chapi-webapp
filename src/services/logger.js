import React from 'react';

import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

import { version } from '../../package.json';

let bugsnagClient = {
	use() {},
	getPlugin() {
		return (props) => <div {...props} />;
	},
	notify() {},
};

if (process.env.NODE_ENV !== 'test') {
	bugsnagClient = bugsnag({
		apiKey: process.env.REACT_APP_BUGSNAG,
		appVersion: version,
		notifyReleaseStages: ['production'],
		releaseStage: process.env.NODE_ENV,
	});
}

// configure
bugsnagClient.use(bugsnagReact, React);

/*
 * NOTE: we generally don't use this since we have our own ErrorBoundary component
 */
export const BugsnagErrorBoundary = bugsnagClient.getPlugin('react');

export default {
	info: (...args) => {
		// eslint-disable-next-line no-console
		console.info(...args);
	},
	log: (...args) => {
		// eslint-disable-next-line no-console
		console.log(...args);
	},
	error: (error) => {
		// eslint-disable-next-line no-console
		console.error(error);

		bugsnagClient.notify(error);
	},
};