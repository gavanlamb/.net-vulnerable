import {
    Configuration
} from "../types/configuration";
import {
    getFileName
} from "../helpers/pathHelper";
import {
    dependencyDetails
} from "../types/dependencyDetails";
import {
    DependencyType
} from "../types/dependencyType";
import {
    info,
    debug
} from "@actions/core";
import {
    Vulnerability
} from '../types/vulnerability';

function getSeverity(
    vulnerabilities: Vulnerability[]): string
{
    const severityStatements: string[] = [];

    for (const vulnerability of vulnerabilities)
    {
        const severity = vulnerability.severity;
        const url = vulnerability.advisoryurl;
        severityStatements.push(
            `[${severity}](${url})`
        );
    }

    return severityStatements.join('<br/>');
}

/**
 * Get the detailed body of the vulnerable packages
 * @param configuration to generate the detailed body for
 */
function getDetailedBody(
    configuration: Configuration): string
{
    info('Generating detailed view...');

    let markdown = "";

    for (const project of configuration.projects)
    {
        const frameworks = project.frameworks ?? [];
        if(frameworks.length === 0)
            continue;

        const fileName = getFileName(project.path);
        markdown += `## ${fileName}\n\n`;

        for (const framework of frameworks)
        {
            let dependencies: dependencyDetails[] = [];
            const topLevelPackages = framework.topLevelPackages ?? [];
            for (const topLevelPackage of topLevelPackages)
            {
                dependencies.push(
                    {
                        ...topLevelPackage,
                        type: DependencyType.TopLevel
                    }
                );
            }

            const transitivePackages = framework.transitivePackages ?? [];
            for (const transitivePackage of transitivePackages)
            {
                dependencies.push(
                    {
                        ...transitivePackage,
                        type: DependencyType.Transitive
                    }
                );
            }

            dependencies = dependencies.sort((a, b) => a.id.localeCompare(b.id));

            markdown += `### ${framework.framework}\n\n`;
            markdown += `| Package name | Type | Request version | Resolved version | Severity |\n`;
            markdown += `|---|---|---:|---:|---:|\n`;
            for (const dependency of dependencies)
            {
                const id = dependency.id;
                const type = dependency.type;
                const requestedVersion = dependency.requestedVersion ?? '';
                const resolvedVersion = dependency.resolvedVersion;
                const severity = getSeverity(dependency.vulnerabilities);
                markdown += `| ${id} | ${type} | ${requestedVersion} | ${resolvedVersion} | ${severity} |\n`;
            }

            markdown += "\n";
        }
    }

    if(!markdown)
    {
        markdown = `All packages are free of vulnerabilities`;
    }

    debug(`Generated detailed view ${markdown}`);
    return markdown;
}

/**
 * Get the summary body of the vulnerable packages
 * @param configuration to generate the summary body for
 */
function getSummaryBody(
    configuration: Configuration): string
{
    info('Generating summary view...');

    let markdown = "";

    for (const project of configuration.projects)
    {
        const frameworks = project.frameworks ?? [];
        if(frameworks.length === 0)
            continue;

        const fileName = getFileName(project.path);

        const topLevelPackagesCount = frameworks
            .flatMap(framework => framework.topLevelPackages ?? [])
            .filter((item, index, self) => index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item)))
            .length;
        if(topLevelPackagesCount > 0)
            markdown += `| ${fileName} | ${DependencyType.TopLevel} | ${topLevelPackagesCount} |\n`;

        const transitivePackagesCount = frameworks
            .flatMap(framework => framework.transitivePackages ?? [])
            .filter((item, index, self) => index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item)))
            .length;
        if(transitivePackagesCount > 0)
            markdown += `| ${fileName} | ${DependencyType.Transitive} | ${transitivePackagesCount} |\n`;
    }

    if(markdown)
    {
        markdown = `| Project Name | Type | Count |\n|----|----|---:|\n${markdown}`;
    }
    else
    {
        markdown = `All packages are free of vulnerabilities`;
    }

    debug(`Generated summary view ${markdown}`);
    return markdown;
}

export {
    getDetailedBody,
    getSummaryBody
};
