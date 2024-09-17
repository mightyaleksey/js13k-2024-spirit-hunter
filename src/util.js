/* @flow */

export interface CollidableType {
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

// get pseudo-random integer within [lo, hi)
export function random (lo?: number, hi?: number): number {
  if (hi == null) {
    hi = lo ?? 2
    lo = 0
  }

  lo = lo ?? 0

  return Math.floor(Math.random() * (hi - lo)) + lo
}

export function clamp (v: number, lo: number, hi: number): number {
  if (hi < lo) {
    const t = hi
    hi = lo
    lo = t
  }

  return Math.min(hi, Math.max(lo, v))
}

export function unit (value: number): number {
  return value > 0 ? 1 : -1
}
