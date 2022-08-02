import React, { useState, useCallback, useContext } from 'react';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';

import CurrentOrganizationContext from '../../organizations/context/CurrentOrganization';
import DefaultLayout from '../../app/layouts/DefaultLayout';
import AccessKeySingleTimeView from '../components/AccessKeySingleTimeView';
import { createAccessKey } from '../actions';
import LoaderContext from '../../../utilities/LoaderContext';

// XXX pull schema from backend
const schema = {
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "http://example.com/root.json",
	"type": "object",
	"title": "Create an Access Key",
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

const CreateAccessKey = ({ history }) => {
	const [submitting, setSubmitting] = useState(false);
	const [accessKey, setAccessKey] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState(null);
	const [{ currentOrganization }] = useContext(CurrentOrganizationContext);
	const [, dispatch] = useContext(LoaderContext);

	const { organizationId } = currentOrganization;

	const handleSubmit = useCallback((data) => {
		setSubmitting(true);
		setFormData(data);

		createAccessKey(data, { organizationId })(dispatch).then((response) => {
			setSubmitting(false);
			setAccessKey(response.item);
		}).catch((error) => {
			setSubmitting(false);
			setError(error);
			setFormData(data);
		});
	}, [organizationId, dispatch]);
    
	if (accessKey) {
		return (
			<DefaultLayout title="Your Access Key">
				<Card>
					<CardBody>
						<AccessKeySingleTimeView
							organizationId={organizationId}
							{...accessKey}
						/>
					</CardBody>
				</Card>
			</DefaultLayout>
		);
	}

	return (
		<DefaultLayout title="Access Keys">
			<Card>
				<CardBody>
					{/* TODO use a common error handler */}
					{error && (
						<Notification type="danger">
							{String(error)}
						</Notification>
					)}
					<FormFromSchema
						hideTitle
						additionalButtons={() => (
							<LinkButton history={history} to="/access-keys">
								Cancel
							</LinkButton>
						)}
						onSubmit={handleSubmit}
						schema={schema}
						formData={formData}
						submitText="Create Access Key"
						submitting={submitting}
					/>
				</CardBody>
			</Card>
		</DefaultLayout>
	);
};

export default CreateAccessKey;
