import "core-js/stable";
import "regenerator-runtime/runtime";

import { createStore, applyMiddleware, compose } from "redux";
import { css } from "linaria";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import produce from "immer";
import thunk from "redux-thunk";

import { App } from "./components/App";

import { rpslsReducer, Action, State, DEFAULT_STATE } from "./model";

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
	<Provider store={makeRpslsStore()}>
		<App />
	</Provider>,
	document.getElementById("app"),
);

document.body.classList.add(
	css`
		font: Arial, x-locale-body, sans-serif;
		line-height: 1.6;
		margin: 0;
		padding: 0;
	`,
);

export function makeRpslsStore() {
	return createStore(
		(state: State, action: Action) =>
			produce(state, draft => {
				rpslsReducer(action, draft);
			}),
		DEFAULT_STATE,
		composeEnhancers(applyMiddleware(thunk)),
	);
}
