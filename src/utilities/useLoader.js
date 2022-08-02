import { useContext, useState, useEffect, useCallback } from 'react';
import get from 'lodash.get';

import LoaderContext from './LoaderContext';

const isExpired = (storedAt, ttl) => {
	const now = Date.now();

	return now > storedAt + ttl;
};

const loadCache = (cacheKey) => {
	const data = sessionStorage.getItem(`loader-cache:${cacheKey}`);

	try {
		if (data) {
			console.log(`cache hit on ${cacheKey}`);
			return JSON.parse(data);
		}

		return null;
	} catch (e) {
		return null;
	}
};

const setCache = (cacheKey, ttl, data) => {
	sessionStorage.setItem(`loader-cache:${cacheKey}`, JSON.stringify({
		storedAt: Date.now(),
		ttl,
		data,
	}));
};

const useLoader = (action, options = {}) => {
	const { cacheKey, ttl } = options;
	const [state, dispatch] = useContext(LoaderContext);
	const inStore = get(state, `${cacheKey}.data`, false);
	const dirty = get(state, `${cacheKey}.dirty`, false);

	/// GET FROM STATE FIRST, IF NO, THEN GET FROM CACHE
	/// MODIFY? MARK CACHE AS DIRTY

	const [requestState, setRequestState] = useState({
		loading: true,
		error: false,
	});

	const load = useCallback((cache) => {
		let canceled = false;

		if (inStore && !dirty) {
			setRequestState({
				loading: false,
				error: false,
			});
			return;
		}

		if (cache && !isExpired(cache.storedAt, ttl)) {
			// if the data is dirty, do not ready it from the cache
			if (!dirty) {
				setRequestState({
					loading: false,
					error: false,
				});
				dispatch({
					type: 'set',
					scope: cacheKey,
					data: cache.data,
				});

				return;
			}
		}

		// otherwise, load the data from the server
		setRequestState({
			loading: true,
			error: false,
		});
	
		action().then((response) => {
			if (canceled) {
				return;
			}

			if (cacheKey) {
				setCache(cacheKey, ttl, response);
			}

			dispatch({
				type: 'set',
				scope: cacheKey,
				data: response,
			});
			setRequestState({
				loading: false,
				error: false,
			});
		}).catch((error) => {
			if (canceled) {
				return;
			}

			dispatch({
				type: 'set',
				scope: cacheKey,
				data: null,
			});
			setRequestState({
				loading: false,
				error,
			});
		});

		return () => {
			canceled = true;
		};
	}, [action, cacheKey, dirty, dispatch, inStore, ttl]);

	useEffect(() => {
		const cache = cacheKey && loadCache(cacheKey);

		load(cache);
	}, [cacheKey, load]);

	const retry = () => {
		load();
	};

	return {
		loading: requestState.loading,
		error: requestState.error,
		response: inStore,
		retry,
	};
};

export default useLoader;
