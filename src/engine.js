/* @flow */

import { emptyFunction } from './util'

type AlignMode = 'center' | 'left' | 'right'

type DrawMode = 'fill' | 'line'

// Local engine state
type EngineState = {
  context: CanvasRenderingContext2D,
  checked: {[string]: boolean},
  holding: {[string]: boolean},
  pressed: {[string]: boolean},
}

// Time since the last update in seconds.
type dt = number

export interface GameEntity {
  render(): void;
  update(dt): void;
}

const frameRate = 60
const frameTime = 1 / frameRate
const maxFrameTime = 1
const scale = 4

const localState: EngineState = {
  // $FlowFixMe[incompatible-type]
  context: null,

  // keeps information about keys that were checked for the "pressed" state so
  // we can update its state on the next tick
  checked: {},
  // keeps keyboard state
  holding: {},
  pressed: {}
}

function clear (E: EngineState) {
  E.context.clearRect(0, 0, E.context.canvas.width, E.context.canvas.height)
}

function draw (
  E: EngineState,
  drawable: HTMLImageElement,
  x: number,
  y: number
) {
  E.context.drawImage(drawable, Math.floor(x), Math.floor(y))
}

function printf (
  E: EngineState,
  text: string,
  x: number,
  y: number,
  limit?: number,
  align?: AlignMode
) {
  // E.context.textAlign = align ?? 'left'
  // E.context.textBaseline = 'top'
  // E.context.fillText(text, x, y, limit)
}

function rect (
  E: EngineState,
  mode: DrawMode,
  x: number,
  y: number,
  width: number,
  height: number
) {
  E.context.beginPath()
  E.context.rect(
    Math.floor(x),
    Math.floor(y),
    Math.floor(width),
    Math.floor(height)
  )
  mode === 'fill' ? E.context.fill() : E.context.stroke()
}

function createCanvas (
  width: number,
  height: number,
  scale: number = 1
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas')
  const canvasContext = canvas.getContext('2d')
  normalizeCanvas(canvas, canvasContext, width, height, scale)
  return [canvas, canvasContext]
}

function normalizeCanvas (
  canvas: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  width: number,
  height: number,
  scale: number = 1
) {
  if (
    canvas.width === width &&
    canvas.height === height
  ) return

  canvas.width = width
  canvas.height = height
  canvasContext.imageSmoothingEnabled = false
  canvasContext.scale(scale, scale)
}

/**
 * Provides canvas virtual resolution
 */
export const Dimentions = {
  width: 0,
  height: 0
}

/**
 * Handles I/O
 */
export const Keys = {
  wasHolding (key: string): boolean {
    return localState.holding[key] === true
  },
  wasPressed (key: string): boolean {
    if (localState.pressed[key] === true) {
      localState.checked[key] = true
      return true
    }

    return false
  }
}

/**
 * Starts engine that implements game loop pattern. Accepts the following
 * functions as input:
 *
 * - initGame: called once initially to initialize game state (blocking call)
 * - updateGame: called to update game state
 * - renderGame: renders the current game state
 */
export async function createEngine (
  initGame?: ?() => Promise<void>,
  updateGame?: ?(dt) => void,
  renderGame?: ?() => void
) {
  updateDimentions()

  if (initGame != null) {
    await initGame()
  }

  // normalize input
  const render: () => void = renderGame ?? emptyFunction
  const update: (dt) => void = updateGame ?? emptyFunction

  const [canvas, canvasContext] = createCanvas(
    window.innerWidth,
    window.innerHeight,
    scale
  )
  document.body?.appendChild(canvas)
  // update local engine state
  localState.context = canvasContext

  // expose rendering api
  window.clear = exposeHelper(clear)
  window.draw = exposeHelper(draw)
  window.printf = exposeHelper(printf)
  window.rect = exposeHelper(rect)

  // starts engine
  // throttles rendering & update calls according to the current fps
  ;(function gameLoop (previous: number = getTime()) {
    const current = getTime()
    const elapsed = current - previous

    if (elapsed >= maxFrameTime) {
      // skip updates if it took too long
      previous = current
    } else if (elapsed >= frameTime) {
      previous += frameTime

      // update game
      update(elapsed)
      normalizeCanvas(
        canvas,
        canvasContext,
        window.innerWidth,
        window.innerHeight,
        scale
      )
      updateDimentions()
      clear(localState)
      render()

      // reset I/O
      Object.keys(localState.checked).forEach(key => {
        delete localState.checked[key]
        delete localState.pressed[key]
      })
    }

    window.requestAnimationFrame(() => {
      gameLoop(previous)
    })
  })()

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    const key = event.key
    localState.holding[key] = true
    localState.pressed[key] = true
  })

  document.addEventListener('keyup', (event: KeyboardEvent) => {
    const key = event.key
    delete localState.holding[key]
    delete localState.pressed[key]
  })

  function exposeHelper (
    drawHelper: (EngineState, ...args: Array<empty>) => void
  ): (...args: Array<empty>) => void {
    return drawHelper.bind(null, localState)
  }

  function getTime (): number {
    return Date.now() / 1000
  }

  function updateDimentions () {
    Dimentions.width = Math.ceil(window.innerWidth / scale)
    Dimentions.height = Math.ceil(window.innerHeight / scale)
  }
}

/**
 * Generates list of tiles from the tilemap.
 */
export function genQuads (
  atlas: HTMLImageElement,
  width: number,
  height: number
): $ReadOnlyArray<HTMLImageElement> {
  const quads = []
  const [canvas, canvasContext] = createCanvas(width, height)

  for (let y = 0; y < atlas.height; y += height) {
    for (let x = 0; x < atlas.width; x += width) {
      canvasContext.clearRect(0, 0, width, height)
      canvasContext.drawImage(atlas, -x, -y)

      const image = new window.Image()
      image.src = canvas.toDataURL('image/png')

      quads.push(image)
    }
  }

  return quads
}

/**
 * Loads tile by given URL.
 */
export function newImage (url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load image: '${url}'`))
    image.src = url
  })
}
