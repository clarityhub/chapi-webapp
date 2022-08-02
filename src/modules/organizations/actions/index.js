import * as api from '../api';

export const createOrganization = (data) => (dispatch, loaderDispatch) => {
	return api.createOrganization(data).then((organization) => {
		// XXX report to Google Analytics
		// Log into this organization
		dispatch({
			type: 'set',
			currentOrganization: organization.item.organization,
		});
		// TODO refactor as an action
		loaderDispatch({
			scope: 'organizations',
			type: 'patch',
			dirty: true,
			callback: () => {
				return {
					items: [organization.item.organization],
				};
			},
		});
		return organization;
	}).catch((error) => {
		// XXX report to bugsnag
		console.log(error);
        
		throw error;
	});
};