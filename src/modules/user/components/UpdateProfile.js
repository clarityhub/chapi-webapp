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


	const initialState = {
		fullName: '',
		picture: '',
		// website: '',
	};
	return (
		<Card>
			<Formik
				initialState={initialState}
				onSubmit={async (values, actions) => {
					try {
						await auth.updateProfile(values);
						actions.resetForm(initialState);
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
				render={({ handleSubmit, handleChange, values, isSubmitting, errors }) => (
					<Box margin="small">
						<form onSubmit={handleSubmit}>
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
									label="Full Name"
									name="fullName"
									autoFocus
									onChange={handleChange}
									value={values.fullName}
								/>
							</InputGroup>
							<InputGroup>
								<LabelledInput
									label="Avatar"
									name="picture"
									type="file"
									onChange={handleChange}
									value={values.picture}
								/>
							</InputGroup>
							{/* <InputGroup>
								<LabelledInput
									label="Website"
									name="website"
									onChange={handleChange}
									value={values.website}
								/>
							</InputGroup> */}

							<InputGroup>
								<Button
									disabled={isSubmitting}
									loading={isSubmitting}
									type="primary"
									block
								>
                                    Update Profile
								</Button>
							</InputGroup>
						</form>
					</Box>
				)}
			/>
		</Card>
	);
};