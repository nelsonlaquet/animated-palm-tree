import { State } from "./state";
import { Action } from "./actions";

export function rpslsReducer(action: Action, draft: State) {
	switch (action.type) {
		case "choices.set":
			draft.choices = action.choices;
			draft.choicesMap = new Map(action.choices.map(c => [c.id, c]));
			break;

		case "async.begin":
			draft.actions[action.action] = {
				callCount: draft.actions[action.action].callCount + 1,
				isCalled: true,
				inProgress: true,
				request: action.request,
			};
			break;

		case "async.failed":
			draft.actions[action.action] = {
				callCount: draft.actions[action.action].callCount,
				isCalled: true,
				inProgress: false,
				request: draft.actions[action.action].request,
				error: action.error,
			};
			break;

		case "async.suceeded":
			draft.actions[action.action] = {
				callCount: draft.actions[action.action].callCount,
				isCalled: true,
				inProgress: false,
				request: draft.actions[action.action].request,
				result: action.result,
			};
			break;
	}
}
