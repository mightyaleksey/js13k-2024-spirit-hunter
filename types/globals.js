/* @flow */
/* eslint-disable no-unused-vars */

interface State {
  enter (input: mixed): void;
  exit (): void;
  render (): void;
  update (dt: number): void;
}

declare const gStateMachine: State & {
  change(stateName: string, input?: mixed): void
}

declare const gStateStack: {
  pop(): void,
  push(state: State): void,
  render(): void,
  update(dt: number): void
}

declare const gTextures: $ReadOnly<{
  tiles: $ReadOnlyArray<HTMLImageElement>
}>

type AlignMode = 'center' | 'left' | 'right'
type DrawMode = 'fill' | 'line'

declare function clear (): void
declare function draw (drawable: HTMLImageElement, x: number, y: number): void
declare function printf (text: string, x: number, y: number, limit?: number, align?: AlignMode): void
declare function rect (mode: DrawMode, x: number, y: number, width: number, height: number, r?: number): void
declare function setColor (color: string): void
declare function setFont (font: string): void
