import React, { Fragment, useState } from 'react';
import { Router } from 'react-router-dom';
import { ToastManagerProvider } from '@clarityhub/unity-web/lib/contexts/ToastManager';
import { IsAuthenticated, IsNotAuthenticated } from './modules/auth/components';

import history from './history';
import Auth from './modules/auth/services/Auth';
import AuthContext from './modules/auth/context/Auth';
import AuthUpdateContext from './modules/auth/context/AuthUpdate';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
import ErrorBoundary from './utilities/ErrorBoundary';
import { CurrentOrganizationProvider } from './modules/organizations/context/CurrentOrganization';
import { TrackingProvider } from './modules/tracking/context/Tracking';
import { LoaderContextProvider } from './utilities/LoaderContext';


/**
 * Authenticated Routes are in the Clarity Hub Component
 * Non-authenticated routes are handled by the Authenticate component
 */
const App = () => {
	const [auth, setAuth] = useState(new Auth());

	return (
		<ErrorBoundary fullPage>
			<LoaderContextProvider>
				<ToastManagerProvider>
					<TrackingProvider history={history}>
						<AuthContext.Provider value={auth}>
							<AuthUpdateContext.Provider value={setAuth}>
								<CurrentOrganizationProvider>
									<Router history={history}>
										<Fragment>
											<IsAuthenticated>
												<AuthenticatedApp />
											</IsAuthenticated>
											<IsNotAuthenticated>
												<UnauthenticatedApp />
											</IsNotAuthenticated>
										</Fragment>
									</Router>
								</CurrentOrganizationProvider>
							</AuthUpdateContext.Provider>
						</AuthContext.Provider>
					</TrackingProvider>
				</ToastManagerProvider>
			</LoaderContextProvider>
		</ErrorBoundary>
	);
};

export default App;
