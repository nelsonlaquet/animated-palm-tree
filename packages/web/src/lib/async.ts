import { AsyncActionType, State } from "../model/state";

export interface AsyncActionBegan<TAction extends AsyncActionType> {
	type: "async.begin";
	action: TAction;
	request: RequestFromAsyncActionType<State["actions"][TAction]>;
}

export function actionAsyncBegan<TAction extends AsyncActionType>(
	action: TAction,
	request: RequestFromAsyncActionType<State["actions"][TAction]>,
): AsyncActionBegan<TAction> {
	return { type: "async.begin", action, request };
}

export interface AsyncActionFailed<TAction extends AsyncActionType> {
	type: "async.failed";
	action: TAction;
	error: string;
}

export function actionAsyncFailed<TAction extends AsyncActionType>(
	action: TAction,
	error: string,
): AsyncActionFailed<TAction> {
	return { type: "async.failed", action, error };
}

export interface AsyncActionSucceeded<TAction extends AsyncActionType> {
	type: "async.suceeded";
	action: TAction;
	result: ResultFromAsyncActionType<State["actions"][TAction]>;
}

export function actionAsyncSucceeded<TAction extends AsyncActionType>(
	action: TAction,
	result: ResultFromAsyncActionType<State["actions"][TAction]>,
): AsyncActionSucceeded<TAction> {
	return { type: "async.suceeded", action, result };
}

export type ResultFromAsyncActionType<
	TActionType
> = TActionType extends AsyncActionState<any, infer TResult> ? TResult : never;

export type RequestFromAsyncActionType<
	TActionType
> = TActionType extends AsyncActionState<infer TRequest> ? TRequest : never;

export type AsyncActionState<TRequest = unknown, TResult = unknown> = {
	callCount: number;
	inProgress: boolean;
	isCalled: boolean;
	request?: TRequest;
	error?: string;
	result?: TResult;
};

export type AsyncAction =
	| AsyncActionBegan<any>
	| AsyncActionFailed<any>
	| AsyncActionSucceeded<any>;

export function makeAsyncAction<TRequest, TResponse>(): AsyncActionState<
	TRequest,
	TResponse
> {
	return {
		isCalled: false,
		inProgress: false,
		callCount: 0,
	};
}
