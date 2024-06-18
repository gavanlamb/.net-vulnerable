describe("default", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should call run when loaded", async () => {
        const runMock = jest.fn();
        jest.doMock("../src/services/vulnerableService", () => ({ run: runMock }));

        await import("../src/index");

        expect(runMock).toHaveBeenCalledTimes(1);
    });
});
