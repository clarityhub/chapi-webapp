import React from 'react';

import { NavItem } from '@clarityhub/unity-web/lib/components/Navbar';
import UserProfile from '@clarityhub/unity-web/lib/components/UserProfile';
import { MenuItem, MenuItemDivider } from '@clarityhub/unity-web/lib/components/Menu';
// import Link from '@clarityhub/unity-web/lib/components/Link';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import placeholder from '../../../assets/avatar-placeholder.png';

export default ({ navigateTo, hasMultipleOrganizations, handleLogout }) => [
	// <NavItem>
	// 	<Link type="blockLink" href="#">
	// 		<NotificationsIcon />
	// 	</Link>
	// </NavItem>,
	<NavItem>
		<UserProfile
			avatarUrl={placeholder}
			avatarFallbackUrl={placeholder}
			menuItems={[
				// <MenuItem>Profile</MenuItem>,
				<MenuItem onClick={navigateTo('/organization')}>Organization</MenuItem>,
				hasMultipleOrganizations && <MenuItemDivider />,
				hasMultipleOrganizations && (
					<MenuItem onClick={navigateTo('/organizations/pick')}>Switch Organizations</MenuItem>
				),
				<MenuItemDivider />,
				<MenuItem onClick={handleLogout}>Logout</MenuItem>,
			].filter(Boolean)}
		/>
	</NavItem>,
];
