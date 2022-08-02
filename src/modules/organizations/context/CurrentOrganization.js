import React, { createContext, useReducer } from 'react';

const CurrentOrganization = createContext();

let cacheOrganization = null;
try {
	cacheOrganization = JSON.parse(localStorage.getItem('currentOrganization'));
} catch (err) {
	cacheOrganization = null;
}

const initialState = {
	currentOrganization: cacheOrganization,
};

const reducer = (state, action) => {
	switch (action.type) {
	case 'clear':
		localStorage.removeItem('currentOrganization');
		return {
			currentOrganization: null,
		};
	case 'set':
		localStorage.setItem('currentOrganization', JSON.stringify(action.currentOrganization));
		return {
			currentOrganization: action.currentOrganization,
		};
	default:
		return state;
	}
};

const CurrentOrganizationProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = [state, dispatch];

	return (
		<CurrentOrganization.Provider value={value}>{props.children}</CurrentOrganization.Provider>
	);
};

export default CurrentOrganization;
export { CurrentOrganizationProvider };
