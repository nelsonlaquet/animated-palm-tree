import { ThunkAction } from "redux-thunk";
import { State, Choice, ensureChoice, GameStatuses } from "./state";
import {
	actionAsyncBegan,
	actionAsyncSucceeded,
	actionAsyncFailed,
	AsyncAction,
} from "../lib/async";
import { wait } from "../lib/time";

export type Action = AsyncAction | ChoicesSetAction;

const RPSLS_ENDPOINT = process.env.RPSLS_ENDPOINT;

export interface ChoicesSetAction {
	type: "choices.set";
	choices: Choice[];
}

export function doInit(): ThunkAction<Promise<void>, State, void, Action> {
	return async dispatch => {
		dispatch(actionAsyncBegan("init", {}));
		try {
			const result = await fetch(`${RPSLS_ENDPOINT}choices`);
			const rawResult = await result.json();
			if (!Array.isArray(rawResult)) {
				throw new Error("invalid response");
			}

			const choices = rawResult.map(ensureChoice);
			dispatch({ type: "choices.set", choices });
			dispatch(actionAsyncSucceeded("init", {}));
		} catch (e) {
			dispatch(actionAsyncFailed("init", e.stack || e));
			console.error(e);
		}
	};
}

export function doPlay(
	choice: number,
): ThunkAction<Promise<void>, State, void, Action> {
	return async (dispatch, getState) => {
		dispatch(actionAsyncBegan("play", { choice }));
		try {
			const resultPromise = fetch(`${RPSLS_ENDPOINT}play`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ player: choice }),
			});

			// simulate up to two seconds to build suspsense
			const [result] = await Promise.all([
				resultPromise,
				wait(Math.random() * 2000),
			]);

			const { results, player, computer } = await result.json();
			if (!GameStatuses.has(results)) {
				throw new Error("invalid response");
			}

			const { choicesMap } = getState();
			const ourChoice = choicesMap.get(player);
			const theirChoice = choicesMap.get(computer);
			if (!ourChoice || !theirChoice) {
				throw new Error("invalid response");
			}

			dispatch(
				actionAsyncSucceeded("play", {
					status: results,
					ourChoice,
					theirChoice,
				}),
			);
		} catch (e) {
			dispatch(actionAsyncFailed("play", e.stack || e));
			console.error(e);
		}
	};
}
