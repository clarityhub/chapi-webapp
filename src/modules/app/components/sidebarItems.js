import React from 'react';
import { SideNavItem, SideNavGroup } from '@clarityhub/unity-web/lib/components/SideNav';
import Link from '@clarityhub/unity-web/lib/components/Link';
import { Link as ReactRouterLink } from 'react-router-dom';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

const sidenavLinks = [
	{
		label: 'Dashboard',
		to: '/',

		// items: [{
		// 	label: 'Create Dashboard',
		// 	to: '/dashboards/create',
		// }],
	},
	// {
	// 	label: 'Insights',
	// 	to: '/insights',

	// 	items: [{
	// 		label: 'Converations',
	// 		to: '/insights/conversations',
	// 	}, {
	// 		label: 'Messages',
	// 		to: '/insights/messages',
	// 	}],
	// },
	// {
	// 	label: 'Integrations',
	// 	to: '/integrations',

	// 	items: [{
	// 		label: 'Setup Integration',
	// 		to: '/integrations/enable',
	// 	}],
	// },
	{
		label: 'Access Keys',
		to: '/access-keys',
	},
	// {
	// 	label: 'Developer Tools',
	// 	to: '/developers',

	// 	items: [{
	// 		label: 'Access Keys',
	// 		to: '/access-keys',
	// 	}],
	// },
	{
		label: 'Organization',
		to: '/organization',

		// items: [{
		// 	label: 'Billing',
		// 	to: '/organizations/billing',
		// }, {
		// 	label: 'Usage',
		// 	to: '/organizations/usage',
		// }],
	},
	{
		render: <Link href="https://docs.clarityhub.io/" target="_blank">API Documentation</Link>,
	},
	process.env.NODE_ENV === 'development' && ({
		render: <Link href="https://unity.clarityhub.io/" target="_blank">Design Docs</Link>,
	}),
].filter(Boolean);

const anyChildIsSelected = (items = [], { currentRoute }) => {
	return items.reduce((acc, link) => {
		acc |= link.to === currentRoute;
	
		if (link.items) {
			acc |= anyChildIsSelected(link.items, { currentRoute });
		}

		return acc;
	}, false);
};

const createItems = (items, { currentRoute }) => {
	return items.map((link, i) => {
		return (
			<SideNavItem selected={link.to === currentRoute || anyChildIsSelected(link.items, { currentRoute })} key={i}>
				{
					link.render || (
						<Link component={ReactRouterLink} to={link.to}>{link.label}</Link>
					)
				}

				{
					link.items && (
						<SideNavGroup>
							{createItems(link.items, { currentRoute })}
						</SideNavGroup>
					)
				}
			</SideNavItem >
		);
	});
};

export default ({ currentRoute, organizationName }) => [
	<Typography type="h4">
		{organizationName}
	</Typography>,
	...createItems(sidenavLinks, { currentRoute }),
];
