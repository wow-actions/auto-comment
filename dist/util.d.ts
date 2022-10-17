export declare namespace Util {
    function getOctokit(): import("@octokit/core").Octokit & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & {
        paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
    };
    function pickComment(comment: string | string[], args?: {
        [key: string]: any;
    }): string;
    function getEventName(): string | null;
    function getComment(): string | null;
    function getReactions(): string | null;
}
