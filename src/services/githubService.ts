import {
    debug,
    error,
    info,
    warning
} from '@actions/core';
import {
    context
} from '@actions/github';
import {
    getBooleanInput,
    getStringInput
} from "../helpers/inputHelper";
import {
    createComment,
    deleteComment,
    listComments,
    updateComment
} from "../clients/githubIssueCommentClient";
import {
    createCheck
} from "../clients/githubChecksClient";
import {
    CheckRunStatus
} from "../types/checkRunStatus";
import {
    CheckConclusion
} from "../types/checkConclusion";

/**
 * Get the comment ID that starts with the messageId value
 * @param owner owner of the repo
 * @param repo repo name
 * @param issueNumber issue number to add the comment to
 * @param messageId the text at the beginning of the comment that's hidden from the user
 * @returns {Promise<number | null>} Resolves when the action is complete. Either the identifier of the comment or null.
 */
async function getCommentId(
    owner: string,
    repo: string,
    issueNumber: number,
    messageId: string): Promise<number | null>
{
    const comments = await listComments(
        owner,
        repo,
        issueNumber);
    debug(`Fetched ${comments.length} comments for PR #${issueNumber}.`);

    const foundComment= comments.find(c => c.body?.startsWith(messageId));
    if (foundComment && foundComment.id) {
        debug(`Found comment for ${messageId}. Comment ID is: ${foundComment.id}`);
        return foundComment.id;
    }

    debug(`No comment found for ${messageId}`);
    return null;
}

/**
 * Add check run
 * @returns {Promise<void>} Resolves when the action is complete.
 * @param summary of the check run
 * @param body the main text that will be displayed to the user
 * @param hasAny flag to indicate if there are any packages detected, exclusive of transitive
 */
async function createCheckRun(
    summary: string,
    body: string,
    hasAny: boolean): Promise<void>
{
    try
    {
        const addCheckRunArgument = getBooleanInput('add-check-run', false);
        if (!addCheckRunArgument) {
            debug('Check run is disabled');
            return;
        }
        info("Creating a check run...");

        const addFailCheckIfContainsVulnerableArgument = getBooleanInput('fail-check-run-if-contains-vulnerable', false);

        const owner  = context.repo.owner;
        debug(`owner: ${owner}`);

        const repo  = context.repo.repo;
        debug(`repo: ${repo}`);

        const name = getStringInput('check-run-name') ?? '.Net Vulnerable';
        debug(`name: ${name}`);

        const headSha = context.payload.pull_request?.head.sha ?? context.sha;
        debug(`headSha: ${headSha}`);

        const status = CheckRunStatus.Completed;
        debug(`status: ${status}`);

        const conclusion = hasAny && addFailCheckIfContainsVulnerableArgument ? CheckConclusion.Failure : CheckConclusion.Success;
        debug(`conclusion: ${conclusion}`);

        await createCheck(
            owner,
            repo,
            name,
            headSha,
            status,
            conclusion,
            name,
            summary,
            body);
    }
    catch (err)
    {
        if(err instanceof Error)
            error(err.message);
    }
}

/**
 * Add a comment to the PR
 * @returns {Promise<void>} Resolves when the action is complete.
 * @param body the body of the comment
 */
async function addComment(
    body: string | null): Promise<void>
{
    try
    {
        const addPrCommentArgument = getBooleanInput('add-pr-comment', false);
        if (!addPrCommentArgument) {
            debug('PR comment is disabled');
            return;
        }

        const pullRequest = context.payload.pull_request;
        const isForPr = pullRequest !== undefined;
        if (!isForPr) {
            warning('This action cannot add a comment as the run is not for a PR');
            return;
        }
        info("Adding PR comment...");

        const owner  = context.repo.owner;
        debug(`owner: ${owner}`);

        const repo  = context.repo.repo;
        debug(`repo: ${repo}`);

        const issueNumber = pullRequest.number;
        debug(`issueNumber: ${issueNumber}`);

        const suffix = getStringInput('pr-comment-name') ?? pullRequest.head.ref;
        debug(`suffix: ${suffix}`);

        const messageId = `<!-- .net-vulnerable-comment:${suffix} -->`;
        debug(`messageId: ${messageId}`);

        const commentId = await getCommentId(
            owner,
            repo,
            issueNumber,
            messageId);
        debug(`commentId: ${commentId}`);

        if (commentId) {
            if (!body)
            {
                await deleteComment(
                    owner,
                    repo,
                    commentId);
                debug('Comment deleted successfully');
            }
            else
            {
                await updateComment(
                    owner,
                    repo,
                    commentId,
                    `${messageId}\n\n# .Net Vulnerable\n\n${body}`);
                debug('Comment updated successfully');
            }
        }
        else
        {
            if (body) {
                await createComment(
                    owner,
                    repo,
                    issueNumber,
                    `${messageId}\n\n# .Net Vulnerable\n\n${body}`);
                debug('Comment added successfully');
            } else {
                debug('Comment is null or empty, no action taken');
            }
        }
    }
    catch (err)
    {
        if(err instanceof Error)
            error(err.message);
    }
}

export {
    createCheckRun,
    addComment
};