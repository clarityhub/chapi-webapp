import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import styled from '@emotion/styled';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

import FullFormLayout from '../../app/layouts/FullFormLayout';
import withAuth from '../context/withAuth';
import { InitialSignup, Confirmation } from '../components/SignUpForm';

const HeaderWrapper = styled.div`
	margin-bottom: 2rem;
`;

const FooterWrapper = styled.div`
	margin-top: 2rem;
`;

const CardWrapper = styled.div`
	width: 500px;
	max-width: 100%;
`;

const SignUpPage = ({ auth, match, location, ...props }) => {
	const { params: { state }} = match;
	const [stage, setStage] = useState(state || 'initial');
	const [tempUser, setTempUser] = useState(location.state || null);

	const handleSubmit = useCallback((newUser) => {
		setTempUser(newUser);
		setStage('authed');
	}, []);

	return (
		<FullFormLayout>
			<HeaderWrapper>
				<Typography center type="h2" noMargin noPadding>
					Welcome to Clarity Hub
				</Typography>
			</HeaderWrapper>
			<CardWrapper>
				<Card>
					<CardBody>
						<Box margin={{ top: "small" }}>
							{stage === 'initial' && (
								<InitialSignup onSubmit={handleSubmit} />
							)}
							{stage === 'authed' && (
								<Confirmation user={tempUser} />
							)}
						</Box>
					</CardBody>
				</Card>
			</CardWrapper>
			<FooterWrapper>
				<Typography center noMargin noPadding>
					Have an account? <Link to="/auth/login">Login</Link>
				</Typography>
			</FooterWrapper>
		</FullFormLayout>
	);
};

export default withAuth(SignUpPage);
