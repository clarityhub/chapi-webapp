import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import styled from '@emotion/styled';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import FullFormLayout from '../../app/layouts/FullFormLayout';
import ResetPasswordForm from '../components/ResetPasswordForm';

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

const ResetPassword = ({ match }) => {
	return (
		<FullFormLayout>
			<HeaderWrapper>
				<Typography center type="h2" noMargin noPadding>
                    Reset Password
				</Typography>
			</HeaderWrapper>
			<CardWrapper>
				<Card>
					<CardBody>
						<ResetPasswordForm />
					</CardBody>
				</Card>
			</CardWrapper>

			<FooterWrapper>
				<Typography center noMargin noPadding>
                    Don't have an account? <Link to="/auth/signup">Sign up</Link>
				</Typography>
			</FooterWrapper>
		</FullFormLayout>
	);
};


export default ResetPassword;
