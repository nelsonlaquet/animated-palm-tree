export type SetElement<T> = T extends Set<infer U> ? U : never;

export function inferStringUnion<T extends string>(...values: T[]): Set<T> {
	return new Set(values);
}
