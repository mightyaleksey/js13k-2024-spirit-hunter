/* @flow */

import type { State } from '../shared/game'
import { BaseState } from './BaseState'

export type StateFactoryType = {
  [string]: () => State
}

export class StateMachine extends BaseState {
  current: State
  states: StateFactoryType

  constructor (states: StateFactoryType) {
    super()
    this.current = new BaseState()
    this.states = states
  }

  change (stateName: string, input: mixed) {
    this.current.exit()
    this.current = this.states[stateName]()
    this.current.enter(input)
  }

  render () {
    this.current.render()
  }

  update (dt: number) {
    this.current.update(dt)
  }
}
