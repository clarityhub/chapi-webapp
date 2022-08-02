import React from 'react';
import ReactDOM from 'react-dom';
import '@clarityhub/unity-web/lib/init';

import App from './App';
import { initialize } from './modules/auth/services/Amplify';

initialize();

const rootEl = document.getElementById('root');

ReactDOM.render((
	<App />
), rootEl);

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default;
		ReactDOM.render(
			<NextApp />,
			rootEl
		);
	});
}
