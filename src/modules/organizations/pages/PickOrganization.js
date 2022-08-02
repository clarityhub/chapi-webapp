import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import FullFormLayout from '../../app/layouts/FullFormLayout';
import CurrentOrganizationContext from '../context/CurrentOrganization';
import GetOrganizations from '../containers/GetOrganizations';
import PickOrganizationForm from '../components/PickOrganizationForm';

const HeaderWrapper = styled.div`
	margin-bottom: 2rem;
`;

const PickOrganization = () => {
	const [redirect, setRedirect] = useState(null);
	const [, dispatch] = useContext(CurrentOrganizationContext);

	const onPick = (organization) => {
		// Reset the store to clear old data associated with the other organization
		dispatch({
			type: 'reset',
		});
		dispatch({
			type: 'set',
			currentOrganization: organization,
		});
		setRedirect('/');
	};
    
	if (redirect) {
		return <Redirect to={redirect} />;
	}

	return (
		<FullFormLayout>
			<HeaderWrapper>
				<Typography center type="h2" noMargin noPadding>
					Choose an Organization
				</Typography>
			</HeaderWrapper>

			<GetOrganizations>
				{({ loading, error, organizations, retry }) => {
					if (loading) {
						// TODO Loading page
						return <Loading flex size={2} />;
					}

					if (error) {
						// TODO Error page
						return (
							<Notification variant="thin" type="danger">
										There were problems with processing your request.

								<Button
									type="white"
									onClick={retry}
								>
											Retry
								</Button>
							</Notification>
						);
					}

					return (
						<PickOrganizationForm
							organizations={organizations}
							onPick={onPick}
						/>
					);
				}}
			</GetOrganizations>
		</FullFormLayout>
	);
};

export default PickOrganization;