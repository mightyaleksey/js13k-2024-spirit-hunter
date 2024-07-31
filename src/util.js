/* @flow */

export function emptyFunction () {}

export function nullthrows<T> (value: ?T, message?: string): T {
  if (value == null) {
    throw new Error(message ?? 'Got unexpected null')
  }

  return value
}

export function partial <A, R> (
  fn: (A, ...args: Array<empty>) => R,
  input: A
): (...args: Array<empty>) => R {
  return (...args) => fn(input, ...args)
}
