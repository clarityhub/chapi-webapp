import Amplify, { API } from 'aws-amplify';

import config from '../config';

export function initialize() {
	Amplify.configure({
		Auth: {
			mandatorySignIn: true,
			region: config.cognito.REGION,
			userPoolId: config.cognito.USER_POOL_ID,
			identityPoolId: config.cognito.IDENTITY_POOL_ID,
			userPoolWebClientId: config.cognito.APP_CLIENT_ID,
		},
		API: {
			/**
			 * Heads up! If you are adding an API that is an API that
			 * can be access via our custom authorizor (i.e. the lambda
			 * does NOT use AWS_IAM), then you need to add the following
			 * to EACH endpoint that needs it:
			 * 
			 * ```js
			 * custom_header: async () => {
			 *	 return { Authorization: `Bearer ${(await Auth.currentSession()).accessToken.jwtToken}` };
			 * }
			 * ```
			 * 
			 * See:
			 * - https://aws-amplify.github.io/docs/js/api#custom-request-headers
			 * - https://stackoverflow.com/questions/50645158/aws-amplify-including-the-cognito-authorization-header-in-the-request
			 */
		    endpoints: [
		        {
		            name: 'accounts',
		            endpoint: config.apiGateway.URL,
		            region: config.apiGateway.REGION,
		        },
		    ],
		},
	});


	API.configure({
		endpoints: [
			{
				name: 'accounts',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION,
			},
		],
	});

}