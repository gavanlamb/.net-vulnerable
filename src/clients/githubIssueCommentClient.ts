import {
    debug
} from "@actions/core";
import {
    components
} from "@octokit/openapi-types";
import {
    createOctokitClient
} from "./octokit";

/**
 * Create an issue comment on a PR
 * @param owner owner of the repo
 * @param repo repo name
 * @param issueNumber issue number to add the comment to
 * @returns {Promise<components["schemas"]["issue-comment"][]>} Resolves when the action is complete. Resolves to a collection of issue comments.
 * @throws Error when the response indicates the request was unsuccessful.
 */
async function listComments(
    owner: string,
    repo: string,
    issueNumber: number): Promise<components["schemas"]["issue-comment"][]>
{
    const client = await createOctokitClient();

    debug(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}`);
    const response = await client.rest.issues.listComments({
        owner,
        repo,
        issue_number: issueNumber});
    debug('Called the rest endpoint to fetch comments');

    if(response.status === 200)
    {
        debug('Comments retrieved successfully.');
        return response.data;
    }
    else
        throw new Error(`Request to retrieve comments failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}`);
}

/**
 * Create an issue comment on a PR
 * @param owner owner of the repo
 * @param repo repo name
 * @param issueNumber issue number to add the comment to
 * @param body comment body
 * @returns {Promise<void>} Resolves when the action is complete.
 * @throws Error when the response indicates the request was unsuccessful.
 */
async function createComment(
    owner: string,
    repo: string,
    issueNumber: number,
    body: string): Promise<void>
{
    const client = await createOctokitClient();

    debug(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}\n\tbody: ${body}`);
    const response = await client.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body
    });
    debug('Called the rest endpoint to create an issue comment');

    if(response.status === 201)
        debug('Comment created successfully.');
    else
        throw new Error(`Request to create comment failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}`);
}

/**
 * Delete issue comment from PR
 * @param owner owner of the repo
 * @param repo repo name
 * @param commentId comment ID to delete
 * @returns {Promise<void>} Resolves when the action is complete.
 * @throws Error when the response indicates the request was unsuccessful.
 */
async function deleteComment(
    owner: string,
    repo: string,
    commentId: number): Promise<void>
{
    const client = await createOctokitClient();

    debug(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}`);
    const response = await client.rest.issues.deleteComment({
        owner,
        repo,
        comment_id: commentId
    });
    debug('Called the rest endpoint to delete an issue comment');

    if(response.status === 204)
        debug('Comment deleted successfully.');
    else
        throw new Error(`Request to delete comment failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}`);
}

/**
 * Update issue comment on PR
 * @param owner owner of the repo
 * @param repo repo name
 * @param commentId comment ID to update
 * @param body comment body
 * @returns {Promise<void>} Resolves when the action is complete.
 * @throws Error when the response indicates the request was unsuccessful.
 */
async function updateComment(
    owner: string,
    repo: string,
    commentId: number,
    body: string): Promise<void>
{
    const client = await createOctokitClient();

    debug(`Going to call the rest endpoint to update an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}\n\tbody: ${body}`);
    const response = await client.rest.issues.updateComment({
        owner,
        repo,
        comment_id: commentId,
        body
    });
    debug(`Called the rest endpoint to update an issue comment`);

    if(response.status === 200)
        debug('Comment updated successfully');
    else
        throw new Error(`Request to update comment failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}`);
}

export {
    createComment,
    deleteComment,
    listComments,
    updateComment
};
