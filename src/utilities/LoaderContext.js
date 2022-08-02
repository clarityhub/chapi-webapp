import React, { createContext, useReducer } from 'react';
import get from 'lodash.get';

const LoaderContext = createContext();

const initialState = {};

// TODO: Refactor as a reducer/actions like redux
/**
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state, action) => {
	console.log(action, state);
	switch (action.type) {
	case 'reset':
		return {};
	case 'set':
		return {
			...state,
			[action.scope]: {
				dirty: false,
				data: action.data,
			},
		};
	case 'patch':
		return {
			...state,
			[action.scope]: {
				dirty: typeof action.dirty !== 'undefined' ? action.dirty : true,
				data: action.callback(get(state, `${action.scope}.data`, null)),
			},
		};
	default:
		return state;
	}
};

const LoaderContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = [state, dispatch];

	return (
		<LoaderContext.Provider value={value}>{props.children}</LoaderContext.Provider>
	);
};

export default LoaderContext;
export { LoaderContextProvider };
