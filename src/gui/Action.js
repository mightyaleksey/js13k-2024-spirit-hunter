/* @flow */

import { Keys, Touch } from '../engine'

export class Action {
  static wasPressed (): boolean {
    return (
      Keys.wasPressed(' ') ||
      Keys.wasPressed('Enter') ||
      Touch.wasTouched()
    )
  }
}
