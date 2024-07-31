/* @flow */

import { BaseState } from '../BaseState'
import { Player } from '../../entities/Player'

export class GamePlayState extends BaseState {
  player: Player

  constructor () {
    super()
    this.player = new Player()
  }

  update (dt: number) {
    this.player.update(dt)
  }

  render () {
    draw(gTextures.tiles[0], 20, 20)
    draw(gTextures.tiles[1], 36, 20)
    draw(gTextures.tiles[2], 52, 20)
    this.player.render()
  }
}
