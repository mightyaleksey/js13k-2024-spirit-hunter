/* @flow */

import { GamePlayState } from './states/game/GamePlayState'
import { StateMachine } from './states/StateMachine'
import { createEngine, genQuads, newImage } from './engine'

async function initGame () {
  window.gTextures = {
    tiles: genQuads(await newImage('/tilemap_packed.png'), 16, 16)
  }

  window.gStateMachine = new StateMachine({
    play: () => new GamePlayState()
  })
  // eslint-disable-next-line no-undef
  gStateMachine.change('play')
}

function updateGame (dt: number) {
  // eslint-disable-next-line no-undef
  gStateMachine.update(dt)
}

function renderGame () {
  // eslint-disable-next-line no-undef
  gStateMachine.render()
}

createEngine(initGame, updateGame, renderGame)
