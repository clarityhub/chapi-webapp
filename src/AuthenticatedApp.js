import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './modules/dashboards/pages/Dashboard';
import CreateOrganizationPage from './modules/organizations/pages/CreateOrganization';
import PickOrganizationPage from './modules/organizations/pages/PickOrganization';
import AutoPickOrganization from './modules/organizations/containers/AutoPickOrganization';
import ViewOrganization from './modules/organizations/pages/ViewOrganization';
import DeveloperTools from './modules/dashboards/pages/DeveloperTools';
import ListAccessKeys from './modules/accessKeys/pages/ListAccessKeys';
import CreateAccessKey from './modules/accessKeys/pages/CreateAccessKey';
import EditAccessKey from './modules/accessKeys/pages/EditAccessKey';
import ProfilePage from './modules/user/pages/Profile';

const AuthenticatedApp = () => (
	<Switch>
		{/* these routes must come first so that they match before AutoPickOrganization gets run */}
		<Route exact path="/organizations/create" component={CreateOrganizationPage} />
		<Route exact path="/organizations/pick" component={PickOrganizationPage} />
		{/*
			Don't add routes here unless you know what you are doing.
			Add them to the AutoPickOrganization Section
		*/}

		{/* put any routes that require an organizationId be set in here */}
		<AutoPickOrganization>
			{() => (
				<Switch>
					<Route exact path="/profile" component={ProfilePage} />
					<Route exact path="/organization" component={ViewOrganization} />
					<Route exact path="/developers" component={DeveloperTools} />
					<Route exact path="/access-keys" component={ListAccessKeys} />
					<Route exact path="/access-keys/create" component={CreateAccessKey} />
					<Route exact path="/access-keys/:accessKeyId" component={EditAccessKey} />
					<Route path="/" exact component={Dashboard} />
				</Switch>
			)}
		</AutoPickOrganization>

		<Route render={() => <Redirect to="/" />} />
	</Switch>
);

export default AuthenticatedApp;
