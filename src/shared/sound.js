/* @flow */

import { NoSound } from './constants'

import { nullthrows } from '../util'

type SoundName =
  | 'death'
  | 'hit'
  | 'laser'
  | 'powerup'

interface SoundAudio {
  play(): void
}

const soundbank: {[SoundName]: SoundAudio} = {}

export function initSounds () {
  const sounds = [
    'death', '7BMHBGJp1pLzcwfGX3oUr5AAx4BaegfyaxSbpHMiF9ccaB41RnGD94gGi2ZGMe7XnMPXNVnd8t5MMJNeSfBVUfyZbqzLtQUyoDUx1cEJKni316fXo1wWw1LUw',
    'hit', '11111JWCBmwPrHgUYTY22NTVVr8ELS4dgMRCWNP4ns8uo45dKynKrqe7XiR39QS5DwF1ZSCPsFYYHsbLxajA7FBbsV5jBCaoUFRpTiHyCRTDSiKu5riJiJrj',
    'laser', '11111391dYeYMXRc68xUWiTmo4EknU8mxy28cRaz1XUJJN9LuCb38Z2VWXsiz2M2thZ84fV6jSV6rFeyffQ5cBNvDZUg74Ts4Lhz4Pd4aMLyzLehW7AugyUB',
    'powerup', '11111Ho5khiTQRjKTZGV85Lnkbu4eiX47XdQgTHxoBFpKR9maAsSaxoU3ecGMpQhzastitBEGd7KgWxpRjCWMDD2vW6Pk7QnK5abzbvCT8e9ZvtEVrZVyHuy'
  ]

  for (let k = 0; k < sounds.length; k += 2) {
    soundbank[sounds[k]] = window.sfxr.toAudio(sounds[k + 1])
  }
}

export function playSound (name: SoundName) {
  const sound = nullthrows(soundbank[name])
  NoSound || sound.play()
}
