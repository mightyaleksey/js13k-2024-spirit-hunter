/* @flow */
/* eslint-disable no-unused-vars */

declare const gStateMachine: {
  change(stateName: string, input?: mixed): void,
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
declare function printf (): void
declare function rect (mode: DrawMode, x: number, y: number, width: number, height: number): void
