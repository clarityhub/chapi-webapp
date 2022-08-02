import get from 'lodash.get';

import * as api from '../api'; 
import logger from '../../../services/logger';

export const createAccessKey = (data, { organizationId }) => (dispatch) => {
	return api.createAccessKey(data, { organizationId }).then((response) => {
		// XXX Log this with Google Analytics

		dispatch({
			scope: 'accessKeys',
			type: 'patch',
			dirty: false,
			callback: (data) => {
				return {
					...data,
					items: [...get(data, 'items', []), response.item],
				};
			},
		});

		return response;
	}).catch((error) => {
		logger.error(error);

		throw error;
	});
};

export const editAccessKey = (accessKeyId, data, { organizationId }) => (dispatch) => {
	return api.editAccessKey(accessKeyId, data, { organizationId }).then((response) => {
		dispatch({
			scope: 'accessKeys',
			type: 'patch',
			dirty: false,
			callback: (data) => {
				return {
					...data,
					items: data && data.items ? data.items.map((item) => {
						if (item.accessKeyId === accessKeyId) {
							return response.item;
						}

						return item;
					}) : undefined,
				};
			},
		});

		return response;
	}).catch((error) => {
		// XXX Report this error to Bugsnag
		console.error(error);

		throw error;
	});
};

export const deleteAccessKey = (accessKeyId, { organizationId }) => (dispatch) => {
	return api.deleteAccessKey(accessKeyId, { organizationId }).then((result) => {
		dispatch({
			scope: 'accessKeys',
			type: 'patch',
			dirty: false,
			callback: (data) => {
				return {
					...data,
					items: data.items.filter((item) => {
						return item.accessKeyId !== accessKeyId;
					}),
				};
			},
		}).catch((error) => {
			// XXX Report this error to Bugsnag
			console.error(error);

			throw error;
		});;

		return result;
	});
};
