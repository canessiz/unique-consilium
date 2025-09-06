/** No operation function. Useful as a default callback. */
export const noop = (): void => {};

/** Type guard for non-empty trimmed strings. */
export const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

/**
 * Clamp a number into the inclusive range [min, max].
 * Throws if min > max to surface configuration errors.
 */
export const clamp = (value: number, min: number, max: number): number => {
	if (min > max) throw new RangeError('clamp: min must be <= max');
	if (value < min) return min;
	if (value > max) return max;
	return value;
};

/** Exhaustiveness helper for switch statements. */
export const assertNever = (x: never, message = 'Unexpected object'): never => {
	// Throwing keeps this pure/deterministic (no I/O) and aids debugging
	throw new Error(message);
};

/**
 * Partition an array by a predicate into [truthy, falsy] buckets.
 */
export const partition = <T>(arr: readonly T[], predicate: (item: T, index: number, arr: readonly T[]) => boolean): [T[], T[]] => {
	const a: T[] = [];
	const b: T[] = [];
	for (let i = 0; i < arr.length; i++) {
		(predicate(arr[i], i, arr) ? a : b).push(arr[i]);
	}
	return [a, b];
};

/** Deduplicate by a key selector. Keeps first occurrence. */
export const uniqueBy = <T, K>(arr: readonly T[], key: (item: T) => K): T[] => {
	const seen = new Set<K>();
	const out: T[] = [];
	for (const item of arr) {
		const k = key(item);
		if (!seen.has(k)) {
			seen.add(k);
			out.push(item);
		}
	}
	return out;
};
