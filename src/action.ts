import * as core from '@actions/core'
import * as github from '@actions/github'
import { Reaction } from './reaction'
import { Util } from './util'

export namespace Action {
  export async function run() {
    try {
      const { context } = github
      const { action } = context.payload

      core.info(`action: ${action}`)
      core.info(`event: ${Util.getEventName()}`)

      const startDate = Util.getStartDate()
      const endDate = Util.getEndDate()
      if (startDate || endDate) {
        core.info(`StartDate: ${startDate} - EndDate ${endDate}`)
        const now = new Date()
        core.info(`Today: ${now}`)

        if (!(startDate && startDate < now)) {
          throw new Error('Running before StartDate - not executing')
        }
        if (!(endDate && endDate > now)) {
          throw new Error('Running after EndDate - not executing')
        }
        core.info('Running inside of configured time - executing')
      }

      const comment = Util.getComment()
      const payload = context.payload.issue || context.payload.pull_request
      if (comment && payload) {
        core.info(`start comment: ${comment}`)
        const octokit = Util.getOctokit()
        const { data } = await octokit.rest.issues.createComment({
          ...context.repo,
          issue_number: payload.number,
          body: Util.pickComment(comment, {
            payload,
            author: payload.user.login,
            id: payload.number.toString(),
          }),
        })

        // octokit.rest.reactions.deleteLegacy()

        const reactions = Util.getReactions()
        if (reactions) {
          await Reaction.add(octokit, data.id, reactions)
        }
      }
    } catch (e) {
      core.error(e)
      core.setFailed(e.message)
    }
  }
}
