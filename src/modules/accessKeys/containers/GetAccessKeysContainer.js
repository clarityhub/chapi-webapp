import { useCallback } from 'react';
import get from 'lodash.get';

import useLoader from '../../../utilities/useLoader';
import { getAccessKeys } from '../api';

const GetAccessKeysContainer = ({ children, organizationId }) => {
	const getAccessKeysByOrganization = useCallback(() => {
		return getAccessKeys({ organizationId });
	}, [organizationId]);

	const {
		loading,
		error,
		response,
		retry,
	} = useLoader(getAccessKeysByOrganization, {
		cacheKey: 'accessKeys',
		ttl: 1000 * 10, /* 10 SECONDS */
	});

	const accessKeys = get(response, 'items', null);

	return children({
		loading,
		error,
		accessKeys,
		retry,
	});
};

export default GetAccessKeysContainer;
