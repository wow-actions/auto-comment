<h1 align="center">💬 Auto Comment</h1>

<p align="center">
  <a href="https://github.com/wow-actions/auto-comment/actions/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/actions/workflow/status/wow-actions/auto-comment/release.yml?branch=master&logo=github&style=flat-square" ></a>
  <a href="/wow-actions/auto-comment/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/wow-actions/auto-comment?style=flat-square"></a>
  <a href="https://www.typescriptlang.org" rel="nofollow"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
  <a href="https://github.com/wow-actions/auto-comment/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" ></a>
  <a href="https://github.com/marketplace/actions/auto-comment" rel="nofollow"><img alt="website" src="https://img.shields.io/static/v1?label=&labelColor=505050&message=Marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" ></a>
  <a href="https://lgtm.com/projects/g/wow-actions/auto-comment/context:javascript" rel="nofollow"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/wow-actions/auto-comment.svg?logo=lgtm&style=flat-square" ></a>
</p>

<p align="center">
  <strong>Automatically comment issues or PRs on events triggered.</strong>
</p>

## 🚀 Usage

Create a `.github/workflows/auto-comment.yml` file in the repository you want to install this action, then add the following to it:

```yml
name: Auto Comment
on: [issues, pull_request]
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/auto-comment@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          issuesOpened: |
            👋 @{{ author }}
            Thank you for raising an issue. We will will investigate into the matter and get back to you as soon as possible.
            Please make sure you have given us as much context as possible.

          pullRequestOpened: |
            👋 @{{ author }}
            Thank you for raising your pull request.
            Please make sure you have followed our contributing guidelines. We will review it as soon as possible
```

There are a couple of events that you will need to setup depending on what you want.

### Available Events

- issuesOpened
- issuesEdited
- issuesDeleted
- issuesTransferred
- issuesPinned
- issuesUnpinned
- issuesClosed
- issuesReopened
- issuesAssigned
- issuesUnassigned
- issuesLabeled
- issuesUnlabeled
- issuesLocked
- issuesUnlocked
- issuesMilestoned
- issuesDemilestoned
- pullRequestAssigned
- pullRequestUnassigned
- pullRequestLabeled
- pullRequestUnlabeled
- pullRequestEdited
- pullRequestOpened
- pullRequestClosed
- pullRequestMerged
- pullRequestReopened
- pullRequestSynchronize
- pullRequestReadyForReview
- pullRequestLocked
- pullRequestUnlocked
- pullRequestReviewRequested
- pullRequestReviewRequestRemoved

And we can also add reactions to comment with `[eventName]Comment` and `[eventName]Reactions` input. Available reactions:

| content    | emoji |
| ---------- | :---: |
| `+1`       |  👍   |
| `-1`       |  👎   |
| `laugh`    |  😄   |
| `confused` |  😕   |
| `heart`    |  ❤️   |
| `hooray`   |  🎉   |
| `rocket`   |  🚀   |
| `eyes`     |  👀   |

```yml
name: Auto Comment
on: [issues, pull_request]
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/auto-comment@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          issuesOpenedReactions: 'hooray, +1'
          issuesOpenedComment: |
            👋 @{{ author }}
            Thank you for raising an issue. We will investigate into the matter and get back to you as soon as possible.
            Please make sure you have given us as much context as possible.
```

### Available Placeholders

| Name | Description |
| --- | --- |
| {{ author }} | The GitHub username of the person who opened the issue/pr |
| {{ id }} | The numeric id of the issue/pr |
| {{ payload.* }} | The payload of the [issue/pr](https://docs.github.com/cn/rest/pulls/pulls#get-a-pull-request) |

## 🔖 License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
