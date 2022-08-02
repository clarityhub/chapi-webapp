import React, { Fragment, useState, useContext } from 'react';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';

import CurrentOrganizationContext from '../../organizations/context/CurrentOrganization';
import DefaultLayout from '../../app/layouts/DefaultLayout';
import GetAccessKeyContainer from '../containers/GetAccessKeyContainer';
import EditAccessKeyContainer from '../containers/EditAccessKeyContainer';

// XXX pull schema from backend
const schema = {
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "http://example.com/root.json",
	"type": "object",
	"title": "Edit Access Key",
	"required": [
		"name",
	],
	"properties": {
		"name": {
			"$id": "#/properties/name",
			"type": "string",
			"title": "Access Key Name",
			"default": "",
			"examples": [
				"My Access Key",
			],
			"pattern": "^(.*)$",
		},
		"description": {
			"$id": "#/properties/description",
			"type": "string",
			"title": "Access Key Description",
			"default": "",
			"examples": [
				"Key used for my application",
			],
			"pattern": "^(.*)$",
		},
	},
};

const EditAccessKeyHelper = ({ accessKeyId, organizationId, data, history }) => {
	const [formData, setFormData] = useState(data);
	const [success, setSuccess] = useState(false);

	return (
		<EditAccessKeyContainer>
			{({ onEdit, submitting, error }) => (
				<Fragment>
					{error && (
						<Notification type="danger">
							{String(error)}
						</Notification>
					)}
					{success && (
						<Notification type="success">
							Your changes have been saved
						</Notification>
					)}
					<FormFromSchema
						hideTitle
						additionalButtons={() => (
							<LinkButton history={history} to="/access-keys">
								Cancel
							</LinkButton>
						)}
						onSubmit={(data) => {
							setFormData(data);
							onEdit({
								accessKeyId,
								organizationId,
								data,
							}).then(() => {
								setSuccess(true);
							});
						}}
						schema={schema}
						formData={formData}
						submitText="Save Changes"
						submitting={submitting}
					/>
				</Fragment>
			)}
		</EditAccessKeyContainer>
	);
};

const EditAccessKey = ({ match, history }) => {
	const { accessKeyId } = match.params;
	const [{ currentOrganization }] = useContext(CurrentOrganizationContext);
    
	const { organizationId } = currentOrganization;
    
	return (
		<DefaultLayout title="Edit Access Key">
			<Card>
				<CardBody>
					<GetAccessKeyContainer
						accessKeyId={accessKeyId}
						organizationId={organizationId}
					>
						{({ loading, error, accessKey, retry }) => {
							if (loading) {
								return <Loading flex size={2} />;
							}

							if (error) {
								// TODO Error page
								return (
									<Notification variant="thin" type="danger">
										There were problems with processing your request.

										<Button
											type="white"
											onClick={retry}
										>
											Retry
										</Button>
									</Notification>
								);
							}

							return (
								<EditAccessKeyHelper
									data={accessKey}
									accessKeyId={accessKeyId}
									organizationId={organizationId}
									history={history}
								/>
							);;
						}}
					</GetAccessKeyContainer>
				</CardBody>
			</Card>
		</DefaultLayout>
	);
};

export default EditAccessKey;
