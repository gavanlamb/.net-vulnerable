import {
    Configuration
} from "../../src/types/configuration";

describe("getDetailedBody", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should return a detailed markdown view for a given configuration", async () => {
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

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view " +
            "## project.csproj\n" +
            "\n" +
            "### net5.0\n" +
            "\n" +
            "| Package name | Type | Request version | Resolved version | Severity |\n" +
            "|---|---|---:|---:|---:|\n" +
            "| PackageA | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n" +
            "| PackageB | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |\n" +
            "| PackageC | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n" +
            "| PackageD | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |\n" +
            "| PackageE | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n" +
            "| PackageF | Transitive |  | 1.0.0-foo | [high](https://example.com) |\n" +
            "| PackageG | Transitive |  | 1.0.0-foo | [high](https://example.com) |\n" +
            "| PackageH | Transitive |  | 1.0.0 | [high](https://example.com) |\n" +
            "| PackageI | Transitive |  | 1.0.1 | [high](https://example.com) |\n\n");
        expect(result).toContain("## project.csproj");
        expect(result).toContain("### net5.0");
        expect(result).toContain("| Package name | Type | Request version | Resolved version | Severity |");
        expect(result).toContain("|---|---|---:|---:|---:|");
        expect(result).toContain("| PackageA | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageB | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageC | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageD | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageE | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageF | Transitive |  | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageG | Transitive |  | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageH | Transitive |  | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageI | Transitive |  | 1.0.1 | [high](https://example.com) |");
    });

    it("should return a detailed markdown view for a given configuration when topLevelPackages is undefined", async () => {
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

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view ## project.csproj\n" +
            "\n" +
            "### net5.0\n" +
            "\n" +
            "| Package name | Type | Request version | Resolved version | Severity |\n" +
            "|---|---|---:|---:|---:|\n" +
            "| PackageF | Transitive |  | 1.0.0-foo | [high](https://example.com) |\n" +
            "| PackageG | Transitive |  | 1.0.0-foo | [high](https://example.com) |\n" +
            "| PackageH | Transitive |  | 1.0.0 | [high](https://example.com) |\n" +
            "| PackageI | Transitive |  | 1.0.1 | [high](https://example.com) |\n\n");
        expect(result).toContain("## project.csproj");
        expect(result).toContain("### net5.0");
        expect(result).toContain("| Package name | Type | Request version | Resolved version | Severity |");
        expect(result).toContain("|---|---|---:|---:|---:|");
        expect(result).toContain("| PackageF | Transitive |  | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageG | Transitive |  | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageH | Transitive |  | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageI | Transitive |  | 1.0.1 | [high](https://example.com) |");
    });

    it("should return a detailed markdown view for a given configuration when topLevelPackages is empty", async () => {
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
                            topLevelPackages: [],
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

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view ## project.csproj\n" +
          "\n" +
          "### net5.0\n" +
          "\n" +
          "| Package name | Type | Request version | Resolved version | Severity |\n" +
          "|---|---|---:|---:|---:|\n" +
          "| PackageF | Transitive |  | 1.0.0-foo | [high](https://example.com) |\n" +
          "| PackageG | Transitive |  | 1.0.0-foo | [high](https://example.com) |\n" +
          "| PackageH | Transitive |  | 1.0.0 | [high](https://example.com) |\n" +
          "| PackageI | Transitive |  | 1.0.1 | [high](https://example.com) |\n\n");
        expect(result).toContain("## project.csproj");
        expect(result).toContain("### net5.0");
        expect(result).toContain("| Package name | Type | Request version | Resolved version | Severity |");
        expect(result).toContain("|---|---|---:|---:|---:|");
        expect(result).toContain("| PackageF | Transitive |  | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageG | Transitive |  | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageH | Transitive |  | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageI | Transitive |  | 1.0.1 | [high](https://example.com) |");
    });

    it("should return a detailed markdown view for a given configuration when transitivePackages is undefined", async () => {
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
                            ]
                        }
                    ]
                }
            ]
        };

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view " +
          "## project.csproj\n" +
          "\n" +
          "### net5.0\n" +
          "\n" +
          "| Package name | Type | Request version | Resolved version | Severity |\n" +
          "|---|---|---:|---:|---:|\n" +
          "| PackageA | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n" +
          "| PackageB | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |\n" +
          "| PackageC | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n" +
          "| PackageD | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |\n" +
          "| PackageE | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n\n");
        expect(result).toContain("## project.csproj");
        expect(result).toContain("### net5.0");
        expect(result).toContain("| Package name | Type | Request version | Resolved version | Severity |");
        expect(result).toContain("|---|---|---:|---:|---:|");
        expect(result).toContain("| PackageA | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageB | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageC | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageD | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageE | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
    });

    it("should return a detailed markdown view for a given configuration when transitivePackages is empty", async () => {
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
                            transitivePackages: []
                        }
                    ]
                }
            ]
        };

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view " +
          "## project.csproj\n" +
          "\n" +
          "### net5.0\n" +
          "\n" +
          "| Package name | Type | Request version | Resolved version | Severity |\n" +
          "|---|---|---:|---:|---:|\n" +
          "| PackageA | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n" +
          "| PackageB | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |\n" +
          "| PackageC | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n" +
          "| PackageD | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |\n" +
          "| PackageE | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |\n\n");
        expect(result).toContain("## project.csproj");
        expect(result).toContain("### net5.0");
        expect(result).toContain("| Package name | Type | Request version | Resolved version | Severity |");
        expect(result).toContain("|---|---|---:|---:|---:|");
        expect(result).toContain("| PackageA | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageB | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageC | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
        expect(result).toContain("| PackageD | Top Level | 1.0.0-foo | 1.0.0-foo | [high](https://example.com) |");
        expect(result).toContain("| PackageE | Top Level | 1.0.0 | 1.0.0 | [high](https://example.com) |");
    });

    it("should return a message indicating all frameworks contains no items", async () => {
        const configuration: Configuration = {
            parameters: "--vulnerable",
            version: 1,
            sources: [],
            projects: [
                {
                    path: "/path/to/project.csproj",
                    frameworks: undefined
                }
            ]
        };

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({ getFileName: getFileNameMock }));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view All packages are free of vulnerabilities");
        expect(result).toContain("All packages are free of vulnerabilities");
    });

    it("should return a message indicating all packages are up-to-date when there are no updates", async () => {
        const configuration: Configuration = {
            parameters: "--vulnerable",
            version: 1,
            sources: [],
            projects: [
                {
                    path: "/path/to/project.csproj",
                    frameworks: []
                }
            ]
        };

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({ getFileName: getFileNameMock }));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view All packages are free of vulnerabilities");
        expect(result).toContain("All packages are free of vulnerabilities");
    });

    it("should return an empty detailed view when there are no projects", async () => {
        const configuration: Configuration = {
            parameters: "--vulnerable",
            version: 1,
            sources: [],
            projects: []
        };

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const { getDetailedBody } = await import("../../src/services/summaryService");
        const result = getDetailedBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating detailed view...");
        expect(debugMock).toHaveBeenCalledWith("Generated detailed view All packages are free of vulnerabilities");
        expect(result).toContain("All packages are free of vulnerabilities");
    });
});

describe("getSummaryBody", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should return a summary markdown view", async () => {
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

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getSummaryBody } = await import("../../src/services/summaryService");
        const result = getSummaryBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating summary view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated summary view " +
            "| Project Name | Type | Count |\n" +
            "|----|----|---:|\n" +
            "| project.csproj | Top Level | 5 |\n" +
            "| project.csproj | Transitive | 4 |\n");
        expect(result).toContain("| Project Name | Type | Count |");
        expect(result).toContain("|----|----|---:|");
        expect(result).toContain("| project.csproj | Top Level | 5 |");
        expect(result).toContain("| project.csproj | Transitive | 4 |");
    });

    it("should return a summary markdown with the distinct count when multiple frameworks have the same outdated packages", async () => {
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

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getSummaryBody } = await import("../../src/services/summaryService");
        const result = getSummaryBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating summary view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated summary view " +
            "| Project Name | Type | Count |\n" +
            "|----|----|---:|\n" +
            "| project.csproj | Top Level | 5 |\n" +
            "| project.csproj | Transitive | 4 |\n");
        expect(result).toContain("| Project Name | Type | Count |");
        expect(result).toContain("|----|----|---:|");
        expect(result).toContain("| project.csproj | Top Level | 5 |");
        expect(result).toContain("| project.csproj | Transitive | 4 |");
    });

    it("should return a summary markdown view excluding transitive dependencies", async () => {
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
                            ]
                        }
                    ]
                }
            ]
        };

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getSummaryBody } = await import("../../src/services/summaryService");
        const result = getSummaryBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating summary view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated summary view " +
          "| Project Name | Type | Count |\n" +
          "|----|----|---:|\n" +
          "| project.csproj | Top Level | 5 |\n");
        expect(result).toContain("| Project Name | Type | Count |");
        expect(result).toContain("|----|----|---:|");
        expect(result).toContain("| project.csproj | Top Level | 5 |");
    });

    it("should return a summary markdown view excluding top level dependencies", async () => {
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

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getSummaryBody } = await import("../../src/services/summaryService");
        const result = getSummaryBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating summary view...");
        expect(getFileNameMock).toHaveBeenCalledWith("/path/to/project.csproj");
        expect(debugMock).toHaveBeenCalledWith("Generated summary view " +
          "| Project Name | Type | Count |\n" +
          "|----|----|---:|\n" +
          "| project.csproj | Transitive | 4 |\n");
        expect(result).toContain("| Project Name | Type | Count |");
        expect(result).toContain("|----|----|---:|");
        expect(result).toContain("| project.csproj | Transitive | 4 |");
    });

    it("should return a string indicating frameworks all packages are up-to-date", async () => {
        const configuration: Configuration = {
            parameters: "--vulnerable",
            version: 1,
            sources: [],
            projects: [
                {
                    path: "/path/to/project.csproj"
                }
            ]
        };

        const debugMock = jest.fn();
        const infoMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock, info: infoMock }));

        const getFileNameMock = jest.fn().mockReturnValue("project.csproj");
        jest.doMock("../../src/helpers/pathHelper", () => ({getFileName: getFileNameMock}));

        const { getSummaryBody } = await import("../../src/services/summaryService");
        const result = getSummaryBody(configuration);

        expect(infoMock).toHaveBeenCalledWith("Generating summary view...");
        expect(debugMock).toHaveBeenCalledWith("Generated summary view All packages are free of vulnerabilities");
        expect(result).toContain("All packages are free of vulnerabilities");
    });
});
