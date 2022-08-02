import ReactGA from 'react-ga';

export default class GoogleAnalytics {
	init() {
		ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
	}
    
	listen(history) {
		history.listen(location => this.trackView(location.pathname));
	}
    
	trackUser(userId) {
		ReactGA.set({ userId });
	}

	trackView(path) {
		ReactGA.pageview(path);
	}
    
	trackEvent(category, action, label) {
		ReactGA.event({
			category,
			action,
			label,
		});
	}
}