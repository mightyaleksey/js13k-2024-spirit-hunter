/* @flow */

// import { GamePlayState } from './states/game/GamePlayState'
import { GameStartState } from './states/game/GameStartState'
import { StateStack } from './states/StateStack'
import { appendElements, gameStates, gameTiles } from './shared/game'
import { createEngine, genQuads, newImage, renderQuadsForDebug } from './engine'
import { initSounds } from './shared/sound'

async function initGame () {
  appendElements(gameTiles,
    genQuads(await newImage('./tilemap2.png'), 16, 16))
  appendElements(gameTiles,
    genQuads(await newImage('./characters2.png'), 16, 16))
  await initSounds()

  appendElements(gameStates, [
    new StateStack()
  ])

  // gameStates[0].push(new GamePlayState())
  gameStates[0].push(new GameStartState())
}

function updateGame (dt: number) {
  gameStates[0].update(dt)
}

function renderGame () {
  gameStates[0].render()
  // renderQuadsForDebug(gameTiles)
}

createEngine(initGame, updateGame, renderGame)
