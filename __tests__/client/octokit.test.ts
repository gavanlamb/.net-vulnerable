describe("createOctokitClient", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should pass correct config to the Octokit client", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock }));

        const OctokitMock = jest.fn();
        jest.doMock("octokit", () => ({ Octokit: OctokitMock }));

        const token = "test-token";
        process.env.GITHUB_TOKEN = token;

        const { createOctokitClient } = await import("../../src/clients/octokit");
        await createOctokitClient();

        expect(OctokitMock).toHaveBeenCalledWith({
            auth: token
        });
    });

    it("should create the Octokit client successfully", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock }));

        const OctokitMock = jest.fn();
        jest.doMock("octokit", () => ({ Octokit: OctokitMock }));

        const token = "test-token";
        process.env.GITHUB_TOKEN = token;

        const { createOctokitClient } = await import("../../src/clients/octokit");
        await createOctokitClient();

        expect(debugMock).toHaveBeenCalledWith('Going to create octokit client...');
        expect(OctokitMock).toHaveBeenCalledWith({
            auth: token
        });
        expect(debugMock).toHaveBeenCalledWith('Created Octokit client');
    });
});
