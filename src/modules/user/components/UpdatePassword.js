import React, { useContext } from 'react';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Card from '@clarityhub/unity-web/lib/components/Card/Card';
import { Formik } from 'formik';

import AuthContext from '../../auth/context/Auth';

export default () => {
	const auth = useContext(AuthContext);

	return (
		<Card>
			<Formik
				initialState={{
					oldPassword: '',
					newPassword: '',
				}}
				onSubmit={async (values, actions) => {
					try {
						await auth.updatePassword(values.oldPassword, values.newPassword);
						actions.resetForm({ oldPassword: '', newPassword: ''});
						actions.setStatus('success');
					} catch (e) {
						let errors = {};

						console.log(e);

						switch (e.code) {
						case 'NotAuthorizedException':
							errors.password = 'Incorrect password';
							break;
						default:
							errors.general = e.message;
						}

						actions.setErrors(errors);
						actions.setSubmitting(false);
					}
				}}
				render={({ handleSubmit, handleChange, values, isSubmitting, errors, status }) => (
					<Box margin="small">
						<form onSubmit={handleSubmit}>
							{
								status && status === 'success' && (
									<Box margin={{ bottom: "small" }}>
										<Notification variant="thin" type="success">
											Password was updated successfully
										</Notification>
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
									label="Old Password"
									name="oldPassword"
									autoFocus
									type="password"
									onChange={handleChange}
									value={values.oldPassword}
								/>
							</InputGroup>
							<InputGroup>
								<LabelledInput
									label="New Password"
									name="newPassword"
									type="password"
									onChange={handleChange}
									value={values.newPassword}
								/>
							</InputGroup>

							<InputGroup>
								<Button
									disabled={isSubmitting}
									loading={isSubmitting}
									type="primary"
									block
								>
                                    Update Password
								</Button>
							</InputGroup>
						</form>
					</Box>
				)}
			/>
		</Card>);
};