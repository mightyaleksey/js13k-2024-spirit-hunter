/* @flow */

export class Animation {
  currentFrame: number
  frames: $ReadOnlyArray<number>
  frameTime: number
  timer: number

  constructor (frames: $ReadOnlyArray<number>, frameTime: number) {
    this.currentFrame = 0
    this.frames = frames
    this.frameTime = frameTime
    this.timer = 0
  }

  getCurrentFrame (): number {
    return this.frames[this.currentFrame]
  }

  update (dt: number) {
    this.timer += dt

    if (this.timer >= this.frameTime) {
      this.timer -= this.frameTime
      this.currentFrame = (this.currentFrame + 1) % this.frames.length
    }
  }
}
