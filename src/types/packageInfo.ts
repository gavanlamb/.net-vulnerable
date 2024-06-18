import {
    Vulnerability
} from './vulnerability';

interface PackageInfo {
    id: string;
    requestedVersion?: string;
    resolvedVersion: string;
    vulnerabilities: Vulnerability[];
}

export {
    PackageInfo
};