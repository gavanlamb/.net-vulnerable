import {
    Configuration
} from "../../src/types/configuration";

describe("run", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should create message and call methods to create check and comment", async () => {
        const configuration: Configuration = {
            parameters: "--vulnerable",
            version: 1,
            sources: [],
            projects: [
                {
                    path: "/path/to/project.csproj",
                    frameworks: [
                        {
                            framework: "net5.0",
                            topLevelPackages: [
                                {
                                    id: "PackageA",
                                    requestedVersion: "1.0.0",
                                    resolvedVersion: "1.0.0",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                },
                                {
                                    id: "PackageB",
                                    requestedVersion: "1.0.0-foo",
                                    resolvedVersion: "1.0.0-foo",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                },
                                {
                                    id: "PackageC",
                                    requestedVersion: "1.0.0",
                                    resolvedVersion: "1.0.0",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                },
                                {
                                    id: "PackageD",
                                    requestedVersion: "1.0.0-foo",
                                    resolvedVersion: "1.0.0-foo",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                },
                                {
                                    id: "PackageE",
                                    requestedVersion: "1.0.0",
                                    resolvedVersion: "1.0.0",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                }
                            ],
                            transitivePackages: [
                                {
                                    id: "PackageF",
                                    resolvedVersion: "1.0.0-foo",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                },
                                {
                                    id: "PackageG",
                                    resolvedVersion: "1.0.0-foo",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                },
                                {
                                    id: "PackageH",
                                    resolvedVersion: "1.0.0",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                },
                                {
                                    id: "PackageI",
                                    resolvedVersion: "1.0.1",
                                    vulnerabilities: [
                                        {
                                            severity: "high",
                                            advisoryurl: "https://example.com",
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const listVulnerablePackagesMock = jest.fn();
        listVulnerablePackagesMock.mockReturnValue(Promise.resolve(configuration));
        jest.doMock("../../src/services/dotnetService", () => ({ listVulnerablePackages: listVulnerablePackagesMock }));

        const detailedBody = "# .Net Vulnerable";
        const getDetailedBodyMock = jest.fn();
        getDetailedBodyMock.mockReturnValue(detailedBody);
        const summaryBody = "# .Net Vulnerable";
        const getSummaryBodyMock = jest.fn();
        getSummaryBodyMock.mockReturnValue(summaryBody);
        jest.doMock("../../src/services/summaryService", () => ({ getDetailedBody: getDetailedBodyMock, getSummaryBody: getSummaryBodyMock }));

        const addCommentMock = jest.fn();
        addCommentMock.mockReturnValue(Promise.resolve);
        const createCheckRunMock = jest.fn();
        createCheckRunMock.mockReturnValue(Promise.resolve);
        jest.doMock("../../src/services/githubService", () => ({ addComment: addCommentMock, createCheckRun: createCheckRunMock }));

        const { run } = await import("../../src/services/vulnerableService");
        await run();

        expect(getDetailedBodyMock).toHaveBeenCalledWith(configuration);
        expect(getSummaryBodyMock).toHaveBeenCalledWith(configuration);
        expect(createCheckRunMock).toHaveBeenCalledWith(summaryBody, detailedBody, true);
        expect(addCommentMock).toHaveBeenCalledWith(detailedBody);
    });

    it("should catch exceptions and fail execution", async () => {
        const setFailedMock = jest.fn();
        jest.doMock("@actions/core", () => ({ setFailed: setFailedMock }));

        const errorMessage = "Error message";

        const listVulnerablePackagesMock = jest.fn();
        listVulnerablePackagesMock.mockImplementation(() => { throw new Error(errorMessage); });
        jest.doMock("../../src/services/dotnetService", () => ({ listVulnerablePackages: listVulnerablePackagesMock }));

        jest.doMock("../../src/services/summaryService", () => {});

        jest.doMock("../../src/services/githubService", () => {});

        const { run } = await import("../../src/services/vulnerableService");
        await run();

        expect(setFailedMock).toHaveBeenCalledTimes(1);
        expect(setFailedMock).toHaveBeenCalledWith(errorMessage);
    });
});
