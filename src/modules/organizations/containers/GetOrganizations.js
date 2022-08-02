import get from 'lodash.get';

import useLoader from '../../../utilities/useLoader';
import { getOrganizations } from '../api';

let firstRun = true;

/**
 * Always load organizations the first time the app loads. After that, cache
 * for 5 minutes
 */
const GetOrganizations = ({ children }) => {
	const {
		loading,
		error,
		response,
		retry,
	} = useLoader(getOrganizations, {
		cacheKey: 'organizations',
		ttl: firstRun ? 0 : 1000 * 60 * 5, /* 5 MINUTES */
	});

	firstRun = true;

	const organizations = get(response, 'items', null);

	return children({
		loading,
		error,
		organizations,
		retry,
	});
};

export default GetOrganizations;
