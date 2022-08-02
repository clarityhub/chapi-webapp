import { Auth as Cognito } from 'aws-amplify';
import history from '../../../history';

export default class Auth {
	routes = {
		home: '/',
	}

	signup = async (user) => {
		const newUser = await Cognito.signUp(user);

		return newUser;
	}

	confirmSignup = async (email, code) => {
		return await Cognito.confirmSignUp(email, code);
	}

	resendCode = async (email) => {
		return await Cognito.resendSignUp(email);
	}

	requestResetPassword = async (username) => {
		return await Cognito.forgotPassword(username);
	}

	confirmResetPassword = async (username, code, new_password) => {
		return await Cognito.forgotPasswordSubmit(username, code, new_password);
	}

	login = async (email, password) => {
		try {
			const someToken = await Cognito.signIn(email, password);
			this.setSession(JSON.stringify(someToken));
		} catch (err) {
			throw err;
		}
	}

	updatePassword = async (oldPassword, newPassword) => {
		try {
			const user = await Cognito.currentAuthenticatedUser();
			await Cognito.changePassword(user, oldPassword, newPassword);
		} catch (err) {
			throw err;
		}
	}
	
	updateProfile = async (attributes) => {		
		try {
			const user = await Cognito.currentAuthenticatedUser();
			await Cognito.updateUserAttributes(user, attributes);
		} catch (err) {
			throw err;
		}
	}

	setSession = (jwt) => {
		localStorage.setItem('access_token', jwt);
		localStorage.setItem('expires_at', new Date().getTime() + 3 * 24 * 60 * 60 * 1000 /* 3 days */);
	}

	logout = () => {
		this.clear();

		// navigate to the home route
		history.replace(this.routes.home);
	}

	clear = () => {
		// Clear Access Token and ID Token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('expires_at');
		
		// XXX kinda weird, but we can refactor later
		localStorage.removeItem('currentOrganization');
	}

	getToken = (decode = false) => {
		return JSON.parse(localStorage.getItem('access_token'));
	}

	isAuthenticated = () => {
		// Check whether the current time is past the
		// Access Token's expiry time
		const jwt = JSON.parse(localStorage.getItem('access_token'));
		const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

		return jwt && (new Date().getTime() < expiresAt);
	}
}