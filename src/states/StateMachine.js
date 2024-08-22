/* @flow */

import type { State } from '../shared/game'
import { BaseState } from './BaseState'

export type StateFactoryType<StateName> = {
  [StateName]: () => State
}

export class StateMachine<StateName> extends BaseState {
  current: State
  states: StateFactoryType<StateName>

  constructor (states: StateFactoryType<StateName>) {
    super()
    this.current = new BaseState()
    this.states = states
  }

  change (stateName: StateName, input: mixed) {
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
