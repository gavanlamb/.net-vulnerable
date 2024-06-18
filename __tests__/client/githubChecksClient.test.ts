import {
    CheckRunStatus
} from "../../src/types/checkRunStatus";
import {
    CheckConclusion
} from "../../src/types/checkConclusion";

describe("createCheck", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should not suppress exceptions if client code throws", async () => {
        const errorMessage = "Error encountered when calling octokit client";
        const createOctokitClientMock = jest.fn(() => {
            throw new Error(errorMessage);
        });
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const { createCheck } = await import("../../src/clients/githubChecksClient");
        const exec = createCheck(
            "owner",
            "repo",
            "check-name",
            "headSha",
            CheckRunStatus.Completed,
            CheckConclusion.Success,
            "Check Title",
            "Check Summary",
            "Check Body"
        );

        await expect(exec).rejects.toThrow(errorMessage);
        expect(createOctokitClientMock).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the check run creation fails", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const createOctokitClientMock = jest.fn(() => ({rest:{ checks:{ create:jest.fn(() => ({ status: 500 }))}}}));
        jest.doMock("../../src/clients/octokit", () => ({createOctokitClient: createOctokitClientMock}));

        const owner = "owner";
        const repo = "repo";
        const headSha = "headSha";

        const { createCheck } = await import("../../src/clients/githubChecksClient");
        const exec = createCheck(
            owner,
            repo,
            "check-name",
            headSha,
            CheckRunStatus.Completed,
            CheckConclusion.Success,
            "Check Title",
            "Check Summary",
            "Check Body"
        );

        await expect(exec).rejects.toThrow(`Failed to create the check run for:\n\towner: ${owner}\n\trepo: ${repo}\n\theadSha: ${headSha}`);
        expect(createOctokitClientMock).toHaveBeenCalledTimes(1);
        expect(debugMock).toHaveBeenCalledWith("Going to call the rest endpoint to delete an issue comment with the following details:\n" +
            "\towner: owner\n" +
            "\trepo: repo\n" +
            "\tname: check-name\n" +
            "\theadSha: headSha\n" +
            "\tstatus: completed\n" +
            "\tconclusion: success\n" +
            "\ttitle: Check Title\n" +
            "\tsummary: Check Summary\n" +
            "\tbody: Check Body");
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to create check run");
    });

    it("should create a check run successfully", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const createOctokitClientMock = jest.fn(() => ({ rest:{ checks:{ create: jest.fn(() => ({ status: 201 })) }}}));
        jest.doMock("../../src/clients/octokit", () => ({createOctokitClient: createOctokitClientMock}));

        const { createCheck } = await import("../../src/clients/githubChecksClient");
        await createCheck(
            "owner",
            "repo",
            "check-name",
            "headSha",
            CheckRunStatus.Completed,
            CheckConclusion.Success,
            "Check Title",
            "Check Summary",
            "Check Body"
        );

        expect(createOctokitClientMock).toHaveBeenCalledTimes(1);
        expect(debugMock).toHaveBeenCalledWith("Going to call the rest endpoint to delete an issue comment with the following details:\n" +
            "\towner: owner\n" +
            "\trepo: repo\n" +
            "\tname: check-name\n" +
            "\theadSha: headSha\n" +
            "\tstatus: completed\n" +
            "\tconclusion: success\n" +
            "\ttitle: Check Title\n" +
            "\tsummary: Check Summary\n" +
            "\tbody: Check Body");
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to create check run");
        expect(debugMock).toHaveBeenCalledWith("Check run created successfully.");
    });
});
