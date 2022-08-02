import React, { useCallback, useContext, useState } from 'react';
import styled from '@emotion/styled';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { Redirect } from 'react-router-dom';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';

import CreateOrganizationForm from '../components/CreateOrganizationForm';
import CurrentOrganizationContext from '../context/CurrentOrganization';
import { createOrganization } from '../actions';
import FullFormLayout from '../../app/layouts/FullFormLayout';
import LoaderContext from '../../../utilities/LoaderContext';

const HeaderWrapper = styled.div`
	margin-bottom: 2rem;
`;

const CardWrapper = styled.div`
	width: 500px;
	max-width: 100%;
`;

const CreateOrganization = () => {
	const [redirect, setRedirect] = useState(null);
	const [error, setError] = useState(null);
	const [, dispatch] = useContext(CurrentOrganizationContext);
	const [, loaderDispatch] = useContext(LoaderContext);

	const onSubmit = useCallback(async (values, actions) => {
		createOrganization(values)(dispatch, loaderDispatch).then(() => {
			actions.setSubmitting(false);

			// Redirect back to "/"
			setRedirect('/');
		}).catch((error) => {
			actions.setSubmitting(false);
			setError(error);
		});
	}, [dispatch, loaderDispatch]);
    
	if (redirect) {
		return <Redirect to={redirect} />;
	}

	return (
		<FullFormLayout>
			<HeaderWrapper>
				<Typography center type="h2" noMargin noPadding>
					Create an Organization
				</Typography>
			</HeaderWrapper>
			<CardWrapper>
				<Card>
					<CardBody>
						<CreateOrganizationForm
							onSubmit={onSubmit}
							error={error}
						/>
					</CardBody>
				</Card>
			</CardWrapper>
		</FullFormLayout>
	);
};

export default CreateOrganization;