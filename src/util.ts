import * as core from '@actions/core'
import * as github from '@actions/github'
import mustache from 'mustache'
import random from 'lodash.random'
import camelCase from 'lodash.camelcase'

export namespace Util {
  export function getOctokit() {
    const token = core.getInput('GITHUB_TOKEN', { required: true })
    return github.getOctokit(token)
  }

  export function pickComment(
    comment: string | string[],
    args?: { [key: string]: any },
  ) {
    let result: string
    if (typeof comment === 'string' || comment instanceof String) {
      result = comment.toString()
    } else {
      const pos = random(0, comment.length, false)
      result = comment[pos] || comment[0]
    }

    return args ? mustache.render(result, args) : result
  }

  const eventTypes = {
    issues: [
      'opened',
      'edited',
      'deleted',
      'transferred',
      'pinned',
      'unpinned',
      'closed',
      'reopened',
      'assigned',
      'unassigned',
      'labeled',
      'unlabeled',
      'locked',
      'unlocked',
      'milestoned',
      'demilestoned',
    ],
    pull_request: [
      'assigned',
      'unassigned',
      'labeled',
      'unlabeled',
      'opened',
      'edited',
      'closed',
      'merged',
      'reopened',
      'synchronize',
      'ready_for_review',
      'locked',
      'unlocked',
      'review_requested',
      'review_request_removed',
    ],
  }

  export function getEventName() {
    const { context } = github
    const event = (
      context.eventName === 'pull_request_target'
        ? 'pull_request'
        : context.eventName
    ) as 'issues' | 'pull_request'
    let action = context.payload.action as string
    if (event === 'pull_request' && action === 'closed') {
      const pr = context.payload.pull_request as any
      if (pr.merged) {
        action = 'merged'
      }
    }
    const actions = eventTypes[event]
    return actions.includes(action) ? camelCase(`${event}.${action}`) : null
  }

  export function getComment() {
    const eventName = getEventName()
    if (eventName) {
      return core.getInput(eventName) || core.getInput(`${eventName}Comment`)
    }

    return null
  }

  export function getReactions() {
    const eventName = getEventName()
    if (eventName) {
      return core.getInput(`${eventName}Reactions`)
    }

    return null
  }
}
