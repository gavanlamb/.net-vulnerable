import {
    PackageInfo
} from "./packageInfo";

interface FrameworkInfo {
    framework: string;
    topLevelPackages?: PackageInfo[];
    transitivePackages?: PackageInfo[];
}

export {
    FrameworkInfo
};
