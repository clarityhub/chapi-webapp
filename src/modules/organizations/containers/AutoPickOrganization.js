import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Button from '@clarityhub/unity-web/lib/components/Buttons';

import CurrentOrganizationContext from '../context/CurrentOrganization';
import FullFormLayout from '../../app/layouts/FullFormLayout';
import GetOrganizations from './GetOrganizations';

const AutoPickHelper = ({ organizations, children }) => {
	const [ready, setReady] = useState(false);
	const [{ currentOrganization }, dispatch] = useContext(CurrentOrganizationContext);

	useEffect(() => {
		if (currentOrganization && organizations) {
			// Check that the currentOrganization id still exists in organizations
			const item = organizations.find((org) => org.organizationId === currentOrganization.organizationId);

			if (!item) {
				dispatch({ type: 'clear' });
			}
		}

		if (!currentOrganization && organizations) {
			if (organizations.length === 1) {
				dispatch({
					type: 'set',
					currentOrganization: organizations[0],
				});
			}
		}

		setReady(true);
	}, [currentOrganization, dispatch, organizations, setReady]);

	if (!ready) {
		return null;
	}

	return children({ currentOrganization });
};

const AutoPickOrganization = ({ children }) => (
	<GetOrganizations>
		{({ loading, error, organizations, retry }) => {
			if (loading) {
				
				return (
					<FullFormLayout>
						<Loading flex size={2} />
					</FullFormLayout>
				);
			}

			if (error) {
				console.log(error);
				return (
					<FullFormLayout>
						<Notification variant="thin" type="danger">
							<div>
								There were problems with processing your request.
							</div>

							<Button
								type="white"
								onClick={retry}
							>
								Retry
							</Button>
						</Notification>
					</FullFormLayout>
				);
			}

			return (
				<AutoPickHelper
					organizations={organizations}
				>
					{({ currentOrganization }) => {
						if (!organizations || organizations.length === 0) {
							// Redirect to create an organization
							// TODO use a constant here
							return <Redirect to="/organizations/create" />;
						}
            
						if (!currentOrganization && organizations.length > 1) {
							return <Redirect to="/organizations/pick" />;
						}
            
						// Normal routes
						return children();
					}}
				</AutoPickHelper>
			);

		}}
	</GetOrganizations>
);

export default AutoPickOrganization;
