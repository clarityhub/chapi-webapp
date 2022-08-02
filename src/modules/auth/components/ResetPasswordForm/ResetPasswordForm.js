import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Dismissable from '@clarityhub/unity-web/lib/interactions/Dismissable';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import AuthContext from '../../context/Auth';

const ResetPasswordForm = ({ history }) => {
	const auth = useContext(AuthContext);
	const [step, setStep] = useState('request');

	let initialValues = {
		email: '',
		password: '',
		confirmationCode: '',
	};
	let notification = null;

	if (history.location.state && history.location.state.user) {
		initialValues.email = history.location.state.user.email;
		notification= history.location.state.err;
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, actions) => {
				try {
					switch(step) {
					case 'confirm': {
						await auth.confirmResetPassword(values.email, values.confirmationCode, values.password);
						
						// if successful, login user
						await auth.login(values.email, values.password);
						history.push('/');
						break;
					}
					case 'request':
					default: {
						await auth.requestResetPassword(values.email);
						setStep('confirm');
						actions.setSubmitting(false);
						break;
					}
					}

				} catch (e) {
					let errors = {};
					switch(e.code) {
					case 'UserNotConfirmedException': {
						history.push('/auth/signup/authed', { email: values.email, password: values.password });
						break;
					}
					case 'NotAuthorizedException': {
						errors.password ='Incorrect password';
						break;
					}
					default: 
						errors.general = e.message;
					}
				
					actions.setErrors(errors);
					actions.setSubmitting(false);
				}
			}}
			render={({ handleSubmit, handleChange, values, isSubmitting, errors }) => (
				<form onSubmit={handleSubmit}>
					{
						notification && (
							<Box withGutterBottom>
								<Dismissable>
									{({ Dismiss }) => (
										<Notification type="danger">
											<Dismiss />
											{notification}
										</Notification>
									)}
								</Dismissable> 
							</Box>
						)
					}
					{
						errors.general && (
							<Box withGutterBottom>
								<Notification variant="thin" type="danger">
									{errors.general}
								</Notification>
							</Box>
						)
					}
					<InputGroup>
						<LabelledInput
							label="Email"
							name="email"
							autoFocus
							onChange={handleChange}
							value={values.email}
							disabled={step !=="request"}
						/>
					</InputGroup>
					<InputGroup>
						<LabelledInput
							label="Password"
							name="password"
							type="password"
							error={errors.password}
							onChange={handleChange}
							value={values.password}
							disabled={step !== 'confirm'}
						/>
					</InputGroup>
					<InputGroup>
						<LabelledInput
							label="Confirmation Code"
							name="confirmationCode"
							type="text"
							error={errors.password}
							onChange={handleChange}
							value={values.confirmationCode}
							disabled={step !== 'confirm'}
						/>
					</InputGroup>
					<InputGroup>
						<Button
							disabled={isSubmitting}
							loading={isSubmitting}
							type="primary"
							block
						>
							{
								step === 'request' ? 'Request Reset Code' : 'Reset Password'
							}
						</Button>
					</InputGroup>
				</form>
			)}
		/>
	);
};

export default withRouter(ResetPasswordForm);
