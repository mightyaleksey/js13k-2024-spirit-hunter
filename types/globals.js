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
