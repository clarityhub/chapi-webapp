import React, { createContext, useState } from 'react';
import GoogleAnalytics from '../services/GoogleAnalytics';

const Tracking = createContext();

const TrackingProvider = ({ history, ...props }) => {
	const createTracker = () => {
		const tracker = new GoogleAnalytics();

		tracker.init();
		tracker.listen(history);
    
		return tracker;
	};

	const [tracker] = useState(() => createTracker());

	return (
		<Tracking.Provider value={tracker}>{props.children}</Tracking.Provider>
	);
};

export default Tracking;
export { TrackingProvider };
