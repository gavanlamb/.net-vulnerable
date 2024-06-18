import {
    debug
} from "@actions/core";
import {
    CheckRunStatus
} from "../types/checkRunStatus";
import {
    CheckConclusion
} from "../types/checkConclusion";
import {
    createOctokitClient
} from "./octokit";
/**
 * Create an issue comment on a PR
 * @param owner owner of the repo
 * @param repo repo name
 * @param name the name of the check run
 * @param headSha headSha
 * @param status the status of the check
 * @param conclusion status of the conclusion
 * @param title of the check run
 * @param summary of the check run
 * @param body of the check run
 * @returns {Promise<void>} Resolves when the action is complete
 * @throws Error when the response indicates the request was unsuccessful.
 */
async function createCheck(
    owner: string,
    repo: string,
    name: string,
    headSha: string,
    status: CheckRunStatus,
    conclusion: CheckConclusion,
    title: string,
    summary: string,
    body: string): Promise<void>
{
    const client = await createOctokitClient();

    debug(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tname: ${name}\n\theadSha: ${headSha}\n\tstatus: ${status}\n\tconclusion: ${conclusion}\n\ttitle: ${title}\n\tsummary: ${summary}\n\tbody: ${body}`);
    const response = await client.rest.checks.create({
        owner,
        repo,
        name,
        head_sha: headSha,
        details_url: undefined,
        external_id: undefined,
        status,
        started_at: new Date().toISOString(),
        conclusion,
        completed_at: new Date().toISOString(),
        output: {
            title,
            summary,
            text: body
        }
    });
    debug('Called the rest endpoint to create check run');

    if(response.status === 201)
        debug('Check run created successfully.');
    else
        throw new Error(`Failed to create the check run for:\n\towner: ${owner}\n\trepo: ${repo}\n\theadSha: ${headSha}`);
}

export {
    createCheck
};
