import React, { useContext } from 'react';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Dismissable from '@clarityhub/unity-web/lib/interactions/Dismissable';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import ClarityHubAuth from '../../services/Auth';
import AuthContext from '../../context/Auth';
import AuthUpdateContext from '../../context/AuthUpdate';

const LoginForm = ({ history }) => {
	const auth = useContext(AuthContext);
	const setAuth = useContext(AuthUpdateContext);

	let initialValues = {
		email: '',
		password: '',
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
					await auth.login(values.email, values.password);
					setAuth(new ClarityHubAuth());

					history.push('/');
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
							<Box margin={{ bottom: "small" }}>
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
							<Box margin={{ bottom: "small" }}>
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
						/>
					</InputGroup>
					<InputGroup>
						<Button
							disabled={isSubmitting}
							loading={isSubmitting}
							type="primary"
							block
						>
                            Login
						</Button>
					</InputGroup>
				</form>
			)}
		/>
	);
};

export default withRouter(LoginForm);
