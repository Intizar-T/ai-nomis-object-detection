import React, { createContext, useReducer, useEffect } from "react";
import Reducer from "./reducer";
import DEFAULT_STATE from "./state";
//console.log("-----------from context.js----------")
//console.log(INITIAL_STATE);

// Create context with name "Context" and pass the INITIAL_STATE
export const Context = createContext(DEFAULT_STATE);

// This function is used as a parent component for App.js, which means
// all the children components of App.js can access the state within the Context
// and change the state using the "dispatch" function
export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, DEFAULT_STATE);
	//console.log(state.boxDrawn);
	/* useEffect(() => {
		localStorage.setItem("state", JSON.stringify(state));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); */

	return (
		<Context.Provider
			value={{
				state,
				dispatch: dispatch,
			}}
		>
			{children}
		</Context.Provider>
	);
};
