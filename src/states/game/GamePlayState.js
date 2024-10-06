/* @flow */

import { BaseState } from '../BaseState'
import { BlasterCooldownState } from '../weapons/BlasterCooldownState'
import { Console } from '../../elements/Console'
import { CharacterHp, DebugConsole, ReloadDuration } from '../../shared/constants'
import { Dialog } from './Dialog'
import { Dimentions, draw, rect, setColor } from '../../engine'
import { GameStartState } from './GameStartState'
import { Joystick } from '../../elements/Joystick'
import { Player } from '../../entities/Player'
import { PortraitMode } from './PortraitMode'
import { TileMap } from '../../elements/TileMap'
import { TransitionState } from './TransitionState'

import { collides } from '../../util'
import { gameStates, gameTiles, print } from '../../shared/game'

export class GamePlayState extends BaseState {
  tileMap: TileMap
  cameraX: number
  cameraY: number

  player: Player

  // debugger
  console: Console
  // mobile control
  joystick: Joystick

  enter () {
    this.tileMap = new TileMap()
    this.cameraX = this.tileMap.cameraX
    this.cameraY = this.tileMap.cameraY

    this.player = this.tileMap.player
    this.tileMap.genEnemies(
      this.player.x,
      this.player.y
    )

    if (DebugConsole) this.console = new Console()
    this.joystick = new Joystick()
    this.player.joystick = this.joystick
  }

  render () {
    this.tileMap.render()

    // infographics
    setColor('#fff')
    const hp = Math.ceil(0.1 * this.player.stats[CharacterHp])
    for (let i = 0; i < hp; i++) {
      draw(gameTiles[108], 4 + 9 * (i % 10), 6 + (i > 9 ? 9 : 0))
    }

    setColor('#fff', 0.7)
    print(this.tileMap.enemies + ' enemies', 2, 4, Dimentions.width - 4, 'right')
    print(this.tileMap.level + ' challenge', 2, 17, Dimentions.width - 4, 'right')
    print(this.player.level + ' level', 2, 30, 56, 'right')

    // show reload duration
    const barLength = 30
    const progress = this.player.blasterWeapon.current instanceof BlasterCooldownState
      ? this.player.blasterWeapon.current.timer / ReloadDuration
      : 1

    rect(
      'fill',
      0.5 * (Dimentions.width - barLength),
      Dimentions.height - 10,
      barLength * progress,
      2
    )

    if (DebugConsole) this.console.render()
    this.joystick.render()
  }

  update (dt: number) {
    PortraitMode.check()

    if (DebugConsole) {
      this.console.update(dt)
      this.joystick.isVisible &&
      this.console.metrics.push(
        'ox', this.joystick.offsetX.toFixed(2),
        'oy', this.joystick.offsetY.toFixed(2),
        'jd', this.joystick.direction
      )
    }

    this.joystick.update(dt)
    this.tileMap.update(dt)

    // check collision (time complexity O(n*n))
    // (try Spatial Partition if any perf issues)
    // https://gameprogrammingpatterns.com/spatial-partition.html
    const collidableEntities = this.tileMap.entities.filter(entity =>
      entity.isCollidable ||
      entity.isSolid)

    collidableEntities.forEach((left, j) => {
      for (let k = j + 1; k < collidableEntities.length; ++k) {
        const right = collidableEntities[k]
        if (!collides(left, right, 1)) continue

        if (left.isSolid && right.isSolid) {
          left.retreate(dt)
          right.retreate(dt)
        }

        if (left.isCollidable && right.isCollidable) {
          left.collided(right)
          right.collided(left)
        }
      }
    })

    const player = this.player
    // update camera position
    this.cameraX = this.updateCamera(
      this.cameraX,
      player.x,
      0.3 * Dimentions.width,
      0.7 * Dimentions.width
    )
    this.cameraY = this.updateCamera(
      this.cameraY,
      player.y,
      0.3 * Dimentions.height,
      0.7 * Dimentions.height
    )
    this.tileMap.updateCamera(
      this.cameraX,
      this.cameraY
    )

    if (this.player.isDestroyed) {
      gameStates[0].push(
        new Dialog({
          title: 'Game Over',
          body: 'Do better next time!',

          handler: () => TransitionState.transitionTo(new GameStartState(1))
        })
      )
    }

    if (this.tileMap.enemies === 0) {
      gameStates[0].push(
        new Dialog({
          title: 'Good Job',
          body: `Challenge ${this.tileMap.level} completed!`,

          handler: () => {
            this.tileMap.level++
            this.tileMap.genEnemies(
              this.player.x,
              this.player.y
            )
          }
        })
      )
    }
  }

  /* helpers */

  updateCamera (
    currentValue: number,
    movingPoint: number,
    leftEdge: number,
    rightEdge: number
  ): number {
    // move camera left
    if (movingPoint < currentValue + leftEdge) {
      return movingPoint - leftEdge
    }

    // move camera right
    if (movingPoint > currentValue + rightEdge) {
      return movingPoint - rightEdge
    }

    return currentValue
  }
}
