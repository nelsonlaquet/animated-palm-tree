export function wait(timeoutInMilliseconds: number) {
	return new Promise(resolve =>
		window.setTimeout(resolve, timeoutInMilliseconds),
	);
}
