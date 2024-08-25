/* @flow */

interface CollidableType {
  x: number;
  y: number;
  width: number;
  height: number;
}

// AABB collision
export function collides (
  left: CollidableType,
  right: CollidableType,
  allowedOverlap?: number = 0
): boolean {
  if ( // horizontal
    left.x > right.x + right.width - allowedOverlap ||
    left.x + left.width < right.x + allowedOverlap
  ) return false

  if ( // vertical
    left.y > right.y + right.height - allowedOverlap ||
    left.y + left.height < right.y + allowedOverlap
  ) return false

  return true
}

export function emptyFunction () {}

export function forEachRight <T> (
  collection: $ReadOnlyArray<T>,
  iterator: (T, number, $ReadOnlyArray<T>) => void
) {
  for (let index = collection.length; index--;) {
    iterator(collection[index], index, collection)
  }
}

export function nullthrows <T> (value: ?T): T {
  if (value == null) {
    throw new Error('')
  }

  return value
}

// returns integers
export function random (lo: number, hi?: number): number {
  if (hi == null) {
    hi = lo
    lo = 0
  }

  return Math.floor(Math.random() * (hi - lo)) + lo
}
