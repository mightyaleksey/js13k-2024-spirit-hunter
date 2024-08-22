/* @flow */

import type { State } from '../shared/game'

export class BaseState implements State {
  enter (input: mixed) {}
  exit () {}
  render () {}
  update (dt: number) {}
}
