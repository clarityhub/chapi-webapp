import { API, Auth } from 'aws-amplify';

export const getAccessKeys = ({ organizationId }) => {
	return API.get('accounts', '/accounts/access-keys', {
		headers: {
			'X-ClarityHub-Organization': organizationId,
		},
	});
};

export const getAccessKey = (accessKeyId, { organizationId }) => {
	return API.get('accounts', `/accounts/access-keys/${accessKeyId}`, {
		headers: {
			'X-ClarityHub-Organization': organizationId,
		},
	});
};

export const createAccessKey = (body, { organizationId }) => {
	return API.post('accounts', '/accounts/access-keys', {
		headers: {
			'X-ClarityHub-Organization': organizationId,
		},
		body,
	});
};

export const editAccessKey = (accessKeyId, body, { organizationId }) => {
	return API.put('accounts', `/accounts/access-keys/${accessKeyId}`, {
		headers: {
			'X-ClarityHub-Organization': organizationId,
		},
		body,
	});
};

export const deleteAccessKey = (accessKeyId, { organizationId }) => {
	return API.del('accounts', `/accounts/access-keys/${accessKeyId}`, {
		headers: {
			'X-ClarityHub-Organization': organizationId,
		},
	});
};

export const testAccessKeyCognito = async (organizationId) => {
	return API.get('accounts', '/accounts/web/access-keys/test', {
		headers: {
			Authorization: `Bearer ${(await Auth.currentSession()).accessToken.jwtToken}`,
			'X-ClarityHub-Organization': organizationId,
		},
	});
};

const encode = (str) => window.btoa(unescape(encodeURIComponent(str)));

export const testAccessKeyBasic = async (accessKeyId, accessKeySecret) => {
	return API.get('accounts', '/accounts/access-keys/test', {
		headers: {
			Authorization: `Basic ${encode(`${accessKeyId}:${accessKeySecret}`)}`,
		},
	});
};
