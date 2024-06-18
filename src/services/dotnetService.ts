import {
    getBooleanInput,
    getStringArrayInput,
    getStringInput
} from "../helpers/inputHelper";
import {
    getExecOutput
} from "@actions/exec";
import {
    Configuration
} from "../types/configuration";
import {
    debug,
    info
} from "@actions/core";
import {
    getFileName
} from '../helpers/pathHelper';
import {
    DotnetCommandProblemError
} from '../errors/dotnetCommandProblemError';

/**
 * Gets the packages-to-exclude argument from the action
 * @returns --exclude {packages} if the argument is set.
 */
function getTargetArgument(): string {
    const value = getStringInput('target');
    if (value)
        return value;
    return '';
}

/**
 * Gets the include-transitive-dependencies argument from the action.
 * @returns --include-transitive if the argument is true.
 */
function getIncludeTransitiveDependenciesArgument(): string {
    const value = getBooleanInput('include-transitive-dependencies', false);
    if (value)
        return '--include-transitive';
    return '';
}

/**
 * Gets an array of NuGet package source arguments from the action
 * @returns an array of --source {source} if the argument is set.
 */
function getNuGetSourceArguments(): string[] {
    const values = getStringArrayInput('nuget-sources');
    const sources: string[] = [];
    for (const value of values){
        sources.push(`--source`);
        sources.push(`${value}`);
    }
    return sources;
}

/**
 * Gets the packages-to-exclude argument from the action
 * @returns array containing '--config' and '{config}; if the argument is set.
 */
function getNuGetConfigArgument(): string[] {
    const value = getStringInput('nuget-config-file-path');
    const config: string[] = [];
    if (value) {
        config.push(`--config`);
        config.push(`${value}`);
    }
    return config;
}

/**
 * Gets an array of NuGet package source arguments from the action
 * @returns an array of --framework {framework} if the argument is set.
 */
function getFrameworkArguments(): string[] {
    const values = getStringArrayInput('frameworks');
    const sources: string[] = [];
    for (const value of values){
        sources.push(`--framework`);
        sources.push(`${value}`);
    }
    return sources;
}

/**
 * List vulnerable packages
 * @returns the
 */
async function listVulnerablePackages(): Promise<Configuration> {
    info("Determining vulnerable packages...");

    const args: string[] = [
        'list',
        getTargetArgument(),
        'package',
        '--vulnerable',
        getIncludeTransitiveDependenciesArgument(),
        ...getNuGetSourceArguments(),
        ...getNuGetConfigArgument(),
        ...getFrameworkArguments(),
        '--format',
        'json',
        '--verbosity',
        'q'
    ].filter(arg => arg !== '');

    debug(`Going to execute "dotnet ${args.join(" ")}"`);
    const output = await getExecOutput('dotnet', args, { silent: true });
    debug(`Executed "dotnet ${args.join(" ")}" and the status code is ${output.exitCode}`);

    if(output.exitCode === 0)
    {
        debug(`Executed "dotnet ${args.join(" ")}" and the output is ${output.stdout}`);
        return JSON.parse(output.stdout) as Configuration;
    }
    else
    {
        debug(`Executed "dotnet ${args.join(" ")}" and the output is ${output.stderr}`);
        const configuration = JSON.parse(output.stderr) as Configuration;
        if(configuration.problems && configuration.problems.length > 0)
        {
            const problem = configuration.problems[0];
            const fileName = getFileName(problem.project);
            const message = problem.text.replace(problem.project, fileName);
            throw new DotnetCommandProblemError(fileName, message);
        }
        throw new Error(output.stderr);
    }
}

export {
    listVulnerablePackages
};