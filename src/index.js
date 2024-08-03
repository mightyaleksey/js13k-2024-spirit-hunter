/* @flow */

import { GamePlayState } from './states/game/GamePlayState'
import { StateMachine } from './states/StateMachine'
import { StateStack } from './states/StateStack'
import { createEngine, genQuads, newImage } from './engine'

async function initGame () {
  window.gTextures = {
    tiles: genQuads(await newImage('/tilemap_packed.png'), 16, 16)
  }

  window.gStateStack = new StateStack()
  window.gStateMachine = new StateMachine({
    play: () => new GamePlayState()
  })

  gStateMachine.change('play')
  gStateStack.push(gStateMachine)
}

function updateGame (dt: number) {
  gStateStack.update(dt)
}

function renderGame () {
  gStateStack.render()
}

createEngine(initGame, updateGame, renderGame)
