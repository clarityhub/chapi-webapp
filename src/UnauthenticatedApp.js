import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AuthPage from './modules/auth/pages/Auth';
import SignUpPage from './modules/auth/pages/SignUp';
import LoginPage from './modules/auth/pages/Login';
import ResetPasswordPage from './modules/auth/pages/ResetPassword';

const UnauthenticatedApp = () => (
	<Switch>
		<Route
			exact
			path="/auth"
			component={AuthPage}
		/>
		<Route
			path="/auth/signup/:state*"
			component={SignUpPage}
		/>
		<Route
			path="/auth/login"
			component={LoginPage}
		/>
		<Route
			path="/auth/reset"
			component={ResetPasswordPage}
		/>
		<Route
			render={() => <Redirect to="/auth" />}
		/>
	</Switch>
);

export default UnauthenticatedApp;
