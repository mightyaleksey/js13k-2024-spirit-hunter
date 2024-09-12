/* @flow */

import { nullthrows } from '../util'

type SoundName =
  | 'enemyHit'
  | 'laser'

interface SoundAudio {
  play(): void
}

const soundbank: {[SoundName]: SoundAudio} = {}

export function initSounds () {
  soundbank.enemyHit = window.sfxr.toAudio('11111JWCBmwPrHgUYTY22NTVVr8ELS4dgMRCWNP4ns8uo45dKynKrqe7XiR39QS5DwF1ZSCPsFYYHsbLxajA7FBbsV5jBCaoUFRpTiHyCRTDSiKu5riJiJrj')
  soundbank.laser = window.sfxr.toAudio('11111391dYeYMXRc68xUWiTmo4EknU8mxy28cRaz1XUJJN9LuCb38Z2VWXsiz2M2thZ84fV6jSV6rFeyffQ5cBNvDZUg74Ts4Lhz4Pd4aMLyzLehW7AugyUB')
}

export function playSound (name: SoundName) {
  const sound = nullthrows(soundbank[name])
  sound.play()
}
