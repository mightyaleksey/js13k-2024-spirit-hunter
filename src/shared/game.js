/* @flow */

import type { StateMachine } from '../states/StateMachine'
import type { StateStack } from '../states/StateStack'

export interface State {
  enter (input: mixed): void;
  exit (): void;
  render (): void;
  update (dt: number): void;
}

// $FlowExpectedError[invalid-tuple-arity]
export const gameStates: [StateStack, StateMachine] = []

export const gameTiles: $ReadOnlyArray<HTMLImageElement> = []

export function appendElements<T> (
  collection: $ReadOnlyArray<T>,
  elements: $ReadOnlyArray<T>
) {
  // $FlowExpectedError[prop-missing]: mutating read only array
  elements.forEach(elem => collection.push(elem))
}
