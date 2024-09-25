/* @flow */

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

export function createRandom (lo: number = 2, hi?: number): () => number {
  if (hi == null) {
    hi = lo
    lo = 0
  }

  const sequence: Array<number> = []
  return genRandom

  function genRandom () {
    if (sequence.length === 0) {
      // $FlowExpectedError[unsafe-arithmetic]
      sequence.push(...Array(hi - lo).keys())
      shuffle(sequence)
    }

    // $FlowExpectedError[unsafe-addition]
    return sequence.pop() + lo
  }
}

// get pseudo-random integer within [lo, hi)
export function random (lo: number = 2, hi?: number): number {
  if (hi == null) {
    hi = lo
    lo = 0
  }

  return Math.floor(Math.random() * (hi - lo)) + lo
}

// Fisher–Yates shuffle
export function shuffle <T> (collection: Array<T>): Array<T> {
  let i = collection.length

  while (--i > 0) {
    const j = random(i + 1)
    // $FlowExpectedError[unsupported-syntax]: wut?
    ;[collection[i], collection[j]] = [collection[j], collection[i]]
  }

  return collection
}
