import { useCallback } from 'react';
import get from 'lodash.get';

import useLoader from '../../../utilities/useLoader';
import { getAccessKey } from '../api';

const GetAccessKeyContainer = ({ children, accessKeyId, organizationId }) => {
	const getAccessKeyByOrganization = useCallback(() => {
		return getAccessKey(accessKeyId, { organizationId });
	}, [accessKeyId, organizationId]);

	const {
		loading,
		error,
		response,
		retry,
	} = useLoader(getAccessKeyByOrganization, {
		cacheKey: `accessKey-${accessKeyId}`,
		ttl: 0,
	});

	const accessKey = get(response, 'item', null);

	return children({
		loading,
		error,
		accessKey,
		retry,
	});
};

export default GetAccessKeyContainer;
