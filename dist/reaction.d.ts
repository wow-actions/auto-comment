import * as github from '@actions/github';
export declare namespace Reaction {
    function add(octokit: ReturnType<typeof github.getOctokit>, comment_id: number, // eslint-disable-line
    reactions: string | string[], owner?: string, repo?: string): Promise<void>;
}
