import { API } from 'aws-amplify';

export const createOrganization = (body) => {
	return API.post('accounts', '/accounts/organizations', {
		body,
	});
};

export const getOrganizations = () => {
	return API.get('accounts', '/accounts/organizations');
};
