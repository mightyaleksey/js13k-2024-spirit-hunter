/* @flow */

import type { Player } from '../../entities/Player'

import { BaseState } from '../BaseState'

export class BaseWeaponState extends BaseState {
  entity: Player

  constructor (entity: Player) {
    super()
    this.entity = entity
  }
}
