/* @flow */

import { emptyFunction, nullthrows, partial } from './util'

type DrawMode = 'fill' | 'line'

type Engine = {
  context: CanvasRenderingContext2D
}

/**
 * Global rendering helpers:
 * - circle()
 * - rect()
 */

function circle (E: Engine, mode: DrawMode, x: number, y: number, radius: number) {
  E.context.arc(x, y, radius, 0, 2 * Math.PI)
  mode === 'fill' ? E.context.fill() : E.context.stroke()
}

function draw (E: Engine) {}

function rect (E: Engine, mode: DrawMode, x: number, y: number, width: number, height: number) {
  E.context.rect(x, y, width, height)
  mode === 'fill' ? E.context.fill() : E.context.stroke()
}

function setColor (E: Engine, color: string) {
  E.context.fillStyle = color
  E.context.strokeStyle = color
}

/**
 * Module local variables:
 * - keeps a reference to DOM elements
 * - constants
 */

const engine: Engine = {
  // $FlowIgnore[incompatible-type]
  context: null
}

/**
 * Expose helpers globally
 */

window.circle = partial(circle, engine)
window.draw = partial(draw, engine)
window.rect = partial(rect, engine)
window.setColor = partial(setColor, engine)

/**
 * Engine + Game Loop
 */

function animate (fn: number => mixed, lastFrame?: number) {
  const currentFrame = Date.now()
  const elapsedTime = currentFrame - (lastFrame ?? Date.now())
  // check frame rate
  fn(elapsedTime > 1000 ? 0 : elapsedTime)

  window.requestAnimationFrame(() => {
    animate(fn, currentFrame)
  })
}

export function createEngine (
  initGame?: () => void,
  updateGame?: () => void,
  renderGame?: () => void
) {
  // $FlowIgnore[incompatible-type]
  const canvas: HTMLCanvasElement = nullthrows(document.querySelector('#main'))
  normaliseCanvas()

  engine.context = canvas.getContext('2d')
  animate(gameLoop)

  function gameLoop (time) {
    console.log(time)
  }

  function normaliseCanvas () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
}
