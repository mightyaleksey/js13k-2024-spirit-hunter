/* @flow */

import type { Entity } from '../../entities/Entity'

import { BaseState } from '../BaseState'
import { Character } from '../../entities/Character'
import { Console } from '../../elements/Console'
import { Damage } from '../../entities/Damage'
import {
  CharacterAttackDC,
  CharacterHp,
  CharacterHpDC,
  CharacterSpeedDC,
  DebugConsole,
  TileSize
} from '../../shared/constants'
import { Dialog } from './Dialog'
import { Dimentions, printf, setColor, setFont, translate } from '../../engine'
import { Enemy } from '../../entities/Enemy'
import { FirstAid } from '../../entities/FirstAid'
import { GameStartState } from './GameStartState'
import { Joystick } from '../../elements/Joystick'
import { Obstacle } from '../../entities/Obstacle'
import { Player } from '../../entities/Player'
import { PortraitMode } from './PortraitMode'
import { Projectile } from '../../entities/Projectile'
import { TileMap } from '../../elements/TileMap'
import { TransitionState } from './TransitionState'

import { collides, forEachRight, random } from '../../util'
import { gameStates } from '../../shared/game'

export class GamePlayState extends BaseState {
  tileMap: TileMap
  cameraX: number
  cameraY: number

  entities: Array<Entity>
  player: Player

  // debugger
  console: Console
  // mobile control
  joystick: Joystick

  enter () {
    this.tileMap = new TileMap()
    this.cameraX = this.tileMap.startX()
    this.cameraY = this.tileMap.startY()

    const player = this.player = new Player(8 * TileSize + 3, 5 * TileSize)
    this.entities = [this.player].concat(this.tileMap.obstacles)

    this.tileMap.genEnemies(
      this.entities,
      this.player.x,
      this.player.y
    )

    if (DebugConsole) this.console = new Console()
    this.joystick = new Joystick()
    player.entities = this.entities
    player.joystick = this.joystick
  }

  render () {
    this.tileMap.renderBg()

    // emulate camera effect
    translate(-this.cameraX, -this.cameraY)

    this.tileMap.render()
    sortEntities(this.entities).forEach(entity => entity.render())

    // restore camera
    translate(this.cameraX, this.cameraY)

    // infographics
    setColor('#fff')
    setFont(8)
    const hp = Math.ceil(0.1 * this.player.stats[CharacterHp])
    printf('❤️'.repeat(Math.min(10, hp)), 5, 5)
    if (hp > 10) printf('❤️'.repeat(hp - 10), 5, 15)

    setColor('#fff', 0.7)
    printf(this.tileMap.enemies.length + ' enemies', 5, 4, Dimentions.width - 50, 'right')
    printf(this.tileMap.level + ' lvl', 5, 4, Dimentions.width - 10, 'right')
    printf(this.player.level + ' lvl', 5, 27, 30, 'right')

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

    forEachRight(this.entities, (entity, j) => {
      entity.update(dt)

      if (!entity.isDestroyed) return
      this.entities.splice(j, 1)

      if (entity instanceof Enemy) {
        const exp = this.tileMap.level * (
          entity.stats[CharacterAttackDC] +
          entity.stats[CharacterHpDC] +
          entity.stats[CharacterSpeedDC]
        )

        this.player.getExp(exp)

        if (random(10) > 7) {
          this.entities.push(
            new FirstAid(
              entity.x + 3,
              entity.y + 3
            )
          )
        }
      }
    })

    // check collision (time complexity O(n*n))
    // (try Spatial Partition if any perf issues)
    // https://gameprogrammingpatterns.com/spatial-partition.html
    const collidableEntities = this.entities.filter(entity =>
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

    const player = this.entities[0]
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
    this.tileMap.updateViewpoint(
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

    if (this.tileMap.enemies.length === 0) {
      gameStates[0].push(
        new Dialog({
          title: 'Good Job',
          body: `Level ${this.tileMap.level} completed!`,

          handler: () => {
            this.tileMap.level++
            this.tileMap.genEnemies(
              this.entities,
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

// higher value, last render
function genEntityLayer (entity: Entity): number {
  if (entity instanceof Character) return 1
  if (entity instanceof Obstacle) return 1
  if (entity instanceof Projectile) return 2
  if (entity instanceof Damage) return 3
  return 0
}

function sortEntities (
  entities: $ReadOnlyArray<Entity>
): $ReadOnlyArray<Entity> {
  return entities.slice().sort((left, right) => {
    const leftLayer = genEntityLayer(left)
    const rightLayer = genEntityLayer(right)
    if (leftLayer !== rightLayer) return leftLayer - rightLayer
    return left.y - right.y
  })
}
