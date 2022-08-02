import React from 'react';
import { Formik } from 'formik';

import Button from '@clarityhub/unity-web/lib/components/Buttons';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import Notification from '@clarityhub/unity-web/lib/components/Notification';

// TODO validate organization
// TODO use FormFromSchema
// TODO standardize how server errors are displayed

const CreateOrganizationForm = ({
	error,
	onSubmit,
	defaultOrganizationName = '',
}) => {
	return (
		<Formik
			initialValues={{
				organizationName: defaultOrganizationName,
			}}
			onSubmit={onSubmit}
			render={({ handleSubmit, handleChange, values, isSubmitting }) => (
				<form onSubmit={handleSubmit}>
					{
						error && (
							<Notification type="danger">
								Something bad happened
							</Notification>
						)
					}
					<InputGroup>
						<LabelledInput
							label="Organization Name"
							name="organizationName"
							autoFocus
							onChange={handleChange}
							value={values.organizationName}
						/>
					</InputGroup>

					<InputGroup>
						<Button
							disabled={isSubmitting}
							loading={isSubmitting}
							color="primary"
							type="primary"
							block
						>
                            Create Organization
						</Button>
					</InputGroup>
				</form>
			)}
		/>
	);
};

export default CreateOrganizationForm;