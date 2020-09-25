import * as core from '@actions/core'
import * as github from '@actions/github'
import { Util } from './util'

export namespace Action {
  export async function run() {
    try {
      const context = github.context
      const comment = Util.getComment()
      const payload = context.payload.issue || context.payload.pull_request
      if (comment && payload) {
        const octokit = Util.getOctokit()
        await octokit.issues.createComment({
          ...context.repo,
          issue_number: payload.number,
          body: Util.pickComment(comment, { author: payload.user.login }),
        })
      }
    } catch (e) {
      core.error(e)
      core.setFailed(e.message)
    }
  }
}
