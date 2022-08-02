import React from 'react';
import Auth from './Auth';

const withAuth = (Comp) => {
	const withAuth = (props) => (
		<Auth.Consumer>
			{auth => <Comp {...props} auth={auth} />}
		</Auth.Consumer>
	);

	return withAuth;
};

export default withAuth;
