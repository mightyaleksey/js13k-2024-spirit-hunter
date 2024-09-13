/* @flow */

import type { GameState } from './shared/game'
import { GamePlayState } from './states/game/GamePlayState'
import { StateMachine } from './states/StateMachine'
import { StateStack } from './states/StateStack'
import { appendElements, gameStates, gameTiles } from './shared/game'
import { createEngine, genQuads, newImage, renderQuadsForDebug } from './engine'
import { initSounds, toggleMusic } from './shared/sound'

async function initGame () {
  appendElements(gameTiles,
    genQuads(await newImage('/tilemap2.png'), 16, 16))
  appendElements(gameTiles,
    genQuads(await newImage('/characters2.png'), 16, 16))
  await initSounds()

  appendElements(gameStates, [
    new StateStack(),
    new StateMachine<GameState>({
      play: () => new GamePlayState()
    })
  ])

  gameStates[0].push(gameStates[1])
  gameStates[1].change('play')

  setTimeout(toggleMusic, 100)
}

function updateGame (dt: number) {
  gameStates[0].update(dt)
}

function renderGame () {
  gameStates[0].render()
  // renderQuadsForDebug(gameTiles)
}

createEngine(initGame, updateGame, renderGame)
