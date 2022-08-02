import React, { useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import PageTemplate from '@clarityhub/unity-web/lib/templates/PageTemplate';

import GetOrganizations from '../../organizations/containers/GetOrganizations';
import CurrentOrganizationContext from '../../organizations/context/CurrentOrganization';
import AuthContext from '../../auth/context/Auth';
import AuthUpdateContext from '../../auth/context/AuthUpdate';
import ClarityHubAuth from '../../auth/services/Auth';
import headerItems from '../components/headerItems';
import sidebarItems from '../components/sidebarItems';

const DefaultLayout = withRouter(({ history, title, children, location }) => {
	const auth = useContext(AuthContext);
	const setAuth = useContext(AuthUpdateContext);
	const [{ currentOrganization }, dispatch] = useContext(CurrentOrganizationContext);

	const handleLogout = useCallback(() => {
		auth.logout();
		setAuth(new ClarityHubAuth());
		dispatch({ type: 'clear' });
	}, [auth, dispatch, setAuth]);

	const navigateTo = useCallback((navigateTo) => () => {
		history.push(navigateTo);
	}, [history]);

	return (
		<GetOrganizations>
			{({ organizations }) => {
				const hasMultipleOrganizations = organizations && organizations.length > 1;
				return (
					<PageTemplate
						title={title}

						navItems={headerItems({
							navigateTo,
							hasMultipleOrganizations,
							handleLogout,
						})}
						sideNavItems={sidebarItems({
							currentRoute: location.pathname,
							organizationName: currentOrganization.organizationName,
						})}
					>
						{children}
					</PageTemplate>
				);
			}}
		</GetOrganizations>
	);
});

export default DefaultLayout;
