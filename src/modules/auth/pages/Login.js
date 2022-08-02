import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import styled from '@emotion/styled';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import FullFormLayout from '../../app/layouts/FullFormLayout';
import LoginForm from '../components/LoginForm';

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

const Login = () => {
	return (
		<FullFormLayout>
			<HeaderWrapper>
				<Typography center type="h2" noMargin noPadding>
					Login
				</Typography>
			</HeaderWrapper>
			<CardWrapper>
				<Card>
					<CardBody>
						<LoginForm />
					</CardBody>
				</Card>
			</CardWrapper>

			<FooterWrapper>
				<Typography center noMargin noPadding>
					Forgot Password? <Link to="/auth/reset">Reset Password</Link>
				</Typography>
				<Typography center noMargin noPadding>
					Don't have an account? <Link to="/auth/signup">Sign up</Link>
				</Typography>
			</FooterWrapper>
		</FullFormLayout>
	);
};


export default Login;
