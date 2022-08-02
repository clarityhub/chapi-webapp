import React, { useContext, useCallback } from 'react';
// import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import AuthContext from '../../context/Auth';

const Confirmation = ({ user, history }) => {
	const auth = useContext(AuthContext);

	// TODO Set some state and stuff here in the future to
	// have the button loading/disabled and not clickable for like...
	// idk 30 seconds?
	const handleResendConfirmation = useCallback(async (e) => {
		e.preventDefault();

		try {
			await auth.resendCode(user.email);
		} catch (e) {
			// TODO handle failure
			alert(e.message);
		}
	}, [auth, user.email]);


	return (
		<Formik
			initialValues={{
				confirmationCode: '',
			}}
			onSubmit={async (values, actions) => {
				try {
					await auth.confirmSignup(user.email, values.confirmationCode);

					await auth.login(user.email, user.password);
					history.push('/');
				} catch (e) {
					// If a user is already confirmed, we should just try to log them in
					let errors = {};
					switch (e.code) {
					case 'NotAuthorizedException':
						history.replace('/auth/login', { err: e.message, user: { email: user.username } });
						break;
					default:
						errors.general = e.message;
					}

					actions.setErrors(errors);
					actions.setSubmitting(false);
				}
			}}
			render={({ handleSubmit, handleChange, values, isSubmitting }) => (
				<form onSubmit={handleSubmit}>
					<Typography>
						We've sent a confirmation code to your email. Please copy and paste that confirmation code here.
					</Typography>
					<InputGroup>
						<LabelledInput
							label="Confirmation Code"
							name="confirmationCode"
							autoFocus
							onChange={handleChange}
							value={values.confirmationCode}
						/>
					</InputGroup>

					<InputGroup>
						<ButtonSet>
							<Button outline type="primary" onClick={handleResendConfirmation}>
								Resend Code
							</Button>

							<Button
								disabled={isSubmitting}
								loading={isSubmitting}
								type="primary"
							>
								Activate ACcount
							</Button>
						</ButtonSet>
					</InputGroup>
				</form>
			)}
		/>
	);
};


Confirmation.propTypes = {
};

export default withRouter(Confirmation);