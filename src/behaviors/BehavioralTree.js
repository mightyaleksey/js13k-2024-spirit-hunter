/* @flow */

import type { Character } from '../entities/Character'

export const TaskStatus: {
  Failure: 2,
  Running: 0,
  Success: 1
} = {
  Failure: 2,
  Running: 0,
  Success: 1
}

/**
 * Selector (fallback) node
 * Fallback nodes are used to find and execute the first child that does not
 * fail. A fallback node will return with a status code of success or running
 * immediately when one of its children returns success or running (see Figure
 * I and the pseudocode below). The children are ticked in order of importance,
 * from left to right.
 *
 * Sequence node
 * Sequence nodes are used to find and execute the first child that has not yet
 * succeeded. A sequence node will return with a status code of failure or
 * running immediately when one of its children returns failure or running
 * (see Figure II and the pseudocode below). The children are ticked in order,
 * from left to right.
 */

export type TaskStatusType = $Values<typeof TaskStatus>
export type Task<T> = (number, T) => TaskStatusType
export type TaskComposition<T> = {
  type: 'f' | 's', // fallback or sequence
  tasks: $ReadOnlyArray<TaskComposition<T> | Task<T>>
}

export class BehavioralTree <T: Character> {
  entity: T
  tasks: TaskComposition<T>

  constructor (tasks: TaskComposition<T>, entity: T) {
    this.entity = entity
    this.tasks = tasks
  }

  update (dt: number) {
    this._runSubtasks(this.tasks, dt)
  }

  _runSubtasks (
    node: TaskComposition<T>,
    dt: number
  ): TaskStatusType {
    for (const task of node.tasks) {
      const status = typeof task !== 'function'
        ? this._runSubtasks(task, dt)
        : task(dt, this.entity)

      if (
        status === TaskStatus.Running ||
        status === (node.type === 'f' ? TaskStatus.Success : TaskStatus.Failure)
      ) {
        return status
      }
    }

    return node.type === 'f' ? TaskStatus.Failure : TaskStatus.Success
  }
}
