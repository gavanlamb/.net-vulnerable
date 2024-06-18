import {
    Octokit
} from "octokit";
import {
    debug
} from "@actions/core";

/**
 * Create and get the Octokit client
 * @returns {Promise<any>} Resolves when the action is complete. Include the Octokit client
 */
async function createOctokitClient(): Promise<any> {
    debug('Going to create octokit client...');

    const client = new Octokit({auth: process.env.GITHUB_TOKEN});
    debug('Created Octokit client');

    return client;
}

export {
    createOctokitClient
};
