// given a length and a list of possible items, return a generator that yield each possible combinations of the items
// - at every yield it should return an array of the items of the given length
export function* getCombinationsGenerator<T>(
  length: number,
  items: T[],
): Generator<T[]> {
  function* helper(current: T[], remaining: number): Generator<T[]> {
    if (remaining === 0) {
      yield current;
    } else {
      for (const item of items) {
        yield* helper([...current, item], remaining - 1);
      }
    }
  }
  yield* helper([], length);
}
