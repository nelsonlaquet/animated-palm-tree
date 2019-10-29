import { makeAsyncAction } from "../lib/async";
import { inferStringUnion, SetElement } from "../lib/types";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;

export const DEFAULT_STATE = {
	actions: {
		init: makeAsyncAction(),
		play: makeAsyncAction<{ choice: number }, GameResult>(),
	},
	choices: [] as Choice[],
	choicesMap: new Map<number, Choice>(),
};

export const GameStatuses = inferStringUnion("win", "lose", "tie");

export type State = typeof DEFAULT_STATE;

export type AsyncActionType = keyof State["actions"];

export interface Choice {
	id: number;
	name: string;
}

export interface GameResult {
	status: SetElement<typeof GameStatuses>;
	ourChoice: Choice;
	theirChoice: Choice;
}

export function ensureChoice(val: any): Choice {
	if (typeof val !== "object" || val === null) {
		throw new Error("invalid response");
	}

	const processed = {
		id: val.id,
		name: val.name,
	};

	if (
		typeof processed.id !== "number" ||
		typeof processed.name !== "string"
	) {
		throw new Error("invalid response");
	}

	return processed;
}
