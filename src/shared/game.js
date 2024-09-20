/* @flow */

import type { AlignMode } from '../engine'
import type { StateMachine } from '../states/StateMachine'
import type { StateStack } from '../states/StateStack'

import { printc } from '../engine'

export type GameState =
  | 'play'

export interface State {
  enter (input: mixed): void;
  exit (): void;
  render (): void;
  update (dt: number): void;
}

// $FlowExpectedError[invalid-tuple-arity]
export const gameStates: [StateStack, StateMachine<GameState>] = []

export const gameFont: $ReadOnlyArray<HTMLImageElement> = []
export const gameTiles: $ReadOnlyArray<HTMLImageElement> = []

export function appendElements<T> (
  collection: $ReadOnlyArray<T>,
  elements: $ReadOnlyArray<T>
) {
  // $FlowExpectedError[prop-missing]: mutating read only array
  elements.forEach(elem => collection.push(elem))
}

export function print (
  text: string,
  x: number,
  y: number,
  limit?: ?number,
  align?: ?AlignMode,
  scale?: number
) {
  printc(gameFont, text, x, y, limit, align, scale)
}
