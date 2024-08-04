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

export function random (lo: number, hi?: number): number {
  if (hi == null) {
    hi = lo
    lo = 0
  }

  return Math.floor(Math.random() * (hi - lo)) + lo
}
