/* @flow */

import { Dimentions, Touch, circle, setColor } from '../engine'

import { clamp } from '../util'
import { outCubic } from '../shared/easing'

const innerRadius = 7
const outerRadius = 20

const moveMaxDelta = 1.3 * (outerRadius - innerRadius)
const moveThreshold = 1
const maxLeverPower = 3

export class Joystick {
  x: number
  y: number

  isVisible: boolean
  touchID: ?string

  offsetX: number
  offsetY: number
  direction: number

  constructor () {
    this.reset()
  }

  render () {
    if (this.isVisible) {
      setColor('rgba(255, 255, 255, 0.4)')
      circle('line', this.x, this.y, outerRadius)
      circle('fill', this.x + this.offsetX, this.y + this.offsetY, innerRadius)
    }
  }

  update (dt: number) {
    this.x = Dimentions.width - 1.5 * outerRadius
    this.y = Dimentions.height - 1.5 * outerRadius

    if (this.touchID) {
      // update joystick position
      const coords = Touch.getPosition(this.touchID)
      if (coords == null) {
        this.reset()
        return
      }

      this.offsetX = updateOffset(coords[0], this.x)
      this.offsetY = updateOffset(coords[1], this.y)
      this.direction = getDirection(this.offsetX, this.offsetY)
      return
    }

    // check if touching joystick
    const touchIDs = Touch.getTouches()
    if (touchIDs.length > 0) this.isVisible = true

    // find nearest touch position
    touchIDs.some(id => {
      const coords = Touch.getPosition(id)

      if (
        coords != null &&
        Math.abs(coords[0] - this.x) < outerRadius &&
        Math.abs(coords[1] - this.y) < outerRadius
      ) {
        this.touchID = id
        return true
      }

      return false
    })
  }

  /* helpers */

  reset () {
    this.offsetX = 0
    this.offsetY = 0
    this.direction = -1
    this.touchID = null
  }
}

function getDirection (dx: number, dy: number): number {
  if (Math.abs(dx) < moveThreshold) dx = 0
  if (Math.abs(dy) < moveThreshold) dy = 0
  if (dx === 0 && dy === 0) return -1

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx > 0 ? 1 : 3
  } else {
    return dy > 0 ? 2 : 0
  }
}

function updateOffset (target: number, origin: number): number {
  const c = clamp(target - origin, -moveMaxDelta, moveMaxDelta)
  const t = Math.min(maxLeverPower, Math.abs(c / moveMaxDelta))
  return outCubic(t, 0, c, maxLeverPower)
}
