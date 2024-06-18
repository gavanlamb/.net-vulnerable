import {
    NugetSource
} from "./nugetSource";
import {
    Problem
} from "./problem";
import {
    Project
} from "./project";

interface Configuration {
    version: number;
    parameters: string;
    problems?: Problem[],
    sources: NugetSource[];
    projects: Project[];
}

export {
    Configuration
};
