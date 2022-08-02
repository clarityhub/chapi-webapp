import React, { Fragment, useState } from 'react';
import AuthTemplate from '@clarityhub/unity-web/lib/templates/AuthTemplate';
import { Link, Redirect } from 'react-router-dom';

const MOCK_NEWS_FEED = [
	{
		title: "Natural Language Processing",
		content: (
			<Fragment>
				Add NLP and AI capabilities to your applications.
				<br />
				<Link to="https://docs.clarityhub.io/" target="_blank">Check out our API Docs</Link>
			</Fragment>
		),
	},
	{
		title: 'Looking for Clarity Hub?',
		content: (
			<Fragment>
				If you are looking for the Clarity Hub login portal, click the following link:
				<br />
				<Link to="https://dashboard.clarityhub.io/">Clarity Hub →</Link>
			</Fragment>
		),
	},
];

const AuthPage = () => {
	const [redirectTo, setRedirectTo] = useState(false);

	if (redirectTo) {
		return (
			<Redirect to={redirectTo} />
		);
	}

	return (
		<AuthTemplate
			title="Clarity Hub API Login"
			onSignUp={() => { setRedirectTo('/auth/signup'); }}
			onLogin={() => { setRedirectTo('/auth/login'); }}
			newsFeed={MOCK_NEWS_FEED}
		/>
	);
};

export default AuthPage;