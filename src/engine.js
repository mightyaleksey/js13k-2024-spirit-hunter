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
  touched: boolean,
  touches: {[string]: [number, number]},
}

// Time since the last update in seconds.
type dt = number

const frameRate = 60
const frameTime = 1 / frameRate
const maxFrameTime = 1
const scale = 3

const localState: EngineState = {
  // $FlowFixMe[incompatible-type]
  context: null,

  // keeps information about keys that were checked for the "pressed" state so
  // we can update its state on the next tick
  checked: {},
  // keeps keyboard state
  holding: {},
  pressed: {},
  // touch events
  touched: false,
  touches: {}
}

export function clear () {
  const c = localState.context
  c.clearRect(0, 0, c.canvas.width, c.canvas.height)
}

export function circle (
  mode: DrawMode,
  x: number,
  y: number,
  radius: number
) {
  const c = localState.context
  c.beginPath()
  c.arc(x, y, radius, 0, 2 * Math.PI)
  mode === 'fill' ? c.fill() : c.stroke()
}

export function draw (
  drawable: HTMLImageElement,
  x: number,
  y: number
) {
  const c = localState.context
  c.drawImage(drawable, Math.floor(x), Math.floor(y))
}

export function getTextWidth (text: string): number {
  const c = localState.context
  return c.measureText(text).width
}

export function line (
  x0: number,
  y0: number,
  x1: number,
  y1: number
) {
  const c = localState.context
  c.beginPath()
  c.moveTo(x0, y0)
  c.lineTo(x1, y1)
  c.stroke()
}

export function printf (
  text: string,
  x: number,
  y: number,
  limit?: ?number,
  align?: AlignMode
) {
  const c = localState.context
  limit = limit ?? (Dimentions.width - x)

  const width = getTextWidth(text)
  const dx = align === 'right'
    ? limit - width
    : align === 'center'
      ? 0.5 * (limit - width)
      : 0

  c.fillText(
    text,
    Math.floor(x + dx),
    Math.floor(y),
    limit
  )
}

export function rect (
  mode: DrawMode,
  x: number,
  y: number,
  width: number,
  height: number,
  r?: number
) {
  const c = localState.context
  c.beginPath()
  c.roundRect(
    Math.floor(x),
    Math.floor(y),
    Math.floor(width),
    Math.floor(height),
    r ?? 0
  )
  mode === 'fill' ? c.fill() : c.stroke()
}

export function setColor (color: string, opacity?: number) {
  const c = localState.context
  c.fillStyle = color
  c.strokeStyle = color
  c.globalAlpha = opacity ?? 1
}

export function setFont (font: number | string) {
  const c = localState.context
  c.font = typeof font === 'number'
    ? c.font.replace(/\d+/, String(font))
    : font
}

export function translate (dx: number, dy: number) {
  const c = localState.context
  c.translate(
    Math.floor(dx),
    Math.floor(dy)
  )
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
  canvasContext.font = '8px Consolas, monaco, monospace'
  canvasContext.textBaseline = 'top'
  canvasContext.scale(scale, scale)
}

/**
 * Provides canvas virtual resolution
 */
export const Dimentions = {
  isMobile: false,
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
 * Handles mobile I/O
 */
export const Touch = {
  getPosition (id: ?string): ?[number, number] {
    // $FlowExpectedError[incompatible-type]: missing null check
    return localState.touches[id] ?? null
  },
  getTouches (): $ReadOnlyArray<string> {
    return Object.keys(localState.touches)
  },
  wasTouched (): boolean {
    return localState.touched
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

  // starts engine
  // throttles rendering & update calls according to the current fps
  ;(function gameLoop (previous: number = getTime()) {
    const current = getTime()
    const elapsed = current - previous

    if (elapsed >= maxFrameTime) {
      // skip updates if it took too long
      previous = current
    } else if (elapsed >= frameTime) {
      previous = current

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
      clear()

      // save and restore helps to restore "translate" changes
      canvasContext.save()
      render()
      canvasContext.restore()

      // reset I/O
      Object.keys(localState.checked).forEach(key => {
        delete localState.checked[key]
        delete localState.pressed[key]
      })

      localState.touched = false
    }

    window.requestAnimationFrame(() => {
      gameLoop(previous)
    })
  })()

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    preventDefault(event)
    const key = event.key
    localState.holding[key] = true
    localState.pressed[key] = true
  })

  document.addEventListener('keyup', (event: KeyboardEvent) => {
    preventDefault(event)
    const key = event.key
    delete localState.holding[key]
    delete localState.pressed[key]
  })

  document.addEventListener('touchstart', onTouch)
  document.addEventListener('touchmove', onTouch)
  document.addEventListener('touchend', onTouchEnd)

  function onTouch (event: TouchEvent) {
    preventDefault(event)

    Dimentions.isMobile = true
    localState.touched = true

    for (let t = 0; t < event.changedTouches.length; t++) {
      const touchEvent = event.changedTouches[t]
      localState.touches[String(touchEvent.identifier)] = [
        touchEvent.pageX / scale,
        touchEvent.pageY / scale
      ]
    }
  }

  function onTouchEnd (event: TouchEvent) {
    preventDefault(event)

    for (let t = 0; t < event.changedTouches.length; t++) {
      const touchEvent = event.changedTouches[t]
      delete localState.touches[String(touchEvent.identifier)]
    }
  }

  function preventDefault (event: UIEvent) {
    event.preventDefault()
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

export function renderQuadsForDebug (
  quads: $ReadOnlyArray<HTMLImageElement>,
  size?: number = 16
) {
  const columns = Math.floor(window.innerWidth / scale / (size + 1))

  let x = 0
  let y = 0

  setColor('#11eb11')
  setFont(8)

  quads.forEach((quad, index) => {
    const tx = x * (size + 1) + 1
    const ty = y * (size + 1) + 1
    draw(quad, tx, ty)
    printf(String(index), tx, ty)

    x += 1
    if (x === columns) {
      x = 0
      y += 1
    }
  })
}
