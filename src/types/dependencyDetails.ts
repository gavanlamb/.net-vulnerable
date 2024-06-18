import {
    DependencyType
} from "./dependencyType";
import {
    Vulnerability
} from './vulnerability';

interface dependencyDetails {
    id: string;
    requestedVersion?: string;
    resolvedVersion: string;
    type: DependencyType;
    vulnerabilities: Vulnerability[];
}

export {
    dependencyDetails
};