/* @flow */

export interface State {
  enter (input: mixed): void;
  exit (): void;
  render (): void;
  update (dt: number): void;
}

export class BaseState implements State {
  enter (input: mixed) {}
  exit () {}
  render () {}
  update (dt: number) {}
}
