describe("getFileName", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should return the file name without extension", async () => {
        const filePath = "/path/to/file.txt";

        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock }));

        const { getFileName } = await import("../../src/helpers/pathHelper");
        const result = getFileName(filePath);

        expect(result).toBe("file");
        expect(debugMock).toHaveBeenCalledWith(`Going to get the file name from ${filePath}`);
        expect(debugMock).toHaveBeenCalledWith(`The file name with extension is file.txt`);
        expect(debugMock).toHaveBeenCalledWith(`The file extension is .txt`);
        expect(debugMock).toHaveBeenCalledWith(`The file name is file`);
    });

    it("should return the file name without extension for a file without a path", async () => {
        const filePath = "file.txt";

        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock }));

        const { getFileName } = await import("../../src/helpers/pathHelper");
        const result = getFileName(filePath);

        expect(result).toBe("file");
        expect(debugMock).toHaveBeenCalledWith(`Going to get the file name from ${filePath}`);
        expect(debugMock).toHaveBeenCalledWith(`The file name with extension is file.txt`);
        expect(debugMock).toHaveBeenCalledWith(`The file extension is .txt`);
        expect(debugMock).toHaveBeenCalledWith(`The file name is file`);
    });

    it("should return the file name without extension for a file without an extension", async () => {
        const filePath = "/path/to/file";

        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock }));

        const { getFileName } = await import("../../src/helpers/pathHelper");
        const result = getFileName(filePath);

        expect(result).toBe("file");
        expect(debugMock).toHaveBeenCalledWith(`Going to get the file name from ${filePath}`);
        expect(debugMock).toHaveBeenCalledWith(`The file name with extension is file`);
        expect(debugMock).toHaveBeenCalledWith(`The file extension is `);
        expect(debugMock).toHaveBeenCalledWith(`The file name is file`);
    });

    it("should handle files with multiple dots", async () => {
        const filePath = "/path/to/file.name.txt";

        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({ debug: debugMock }));

        const { getFileName } = await import("../../src/helpers/pathHelper");
        const result = getFileName(filePath);

        expect(result).toBe("file.name");
        expect(debugMock).toHaveBeenCalledWith(`Going to get the file name from ${filePath}`);
        expect(debugMock).toHaveBeenCalledWith(`The file name with extension is file.name.txt`);
        expect(debugMock).toHaveBeenCalledWith(`The file extension is .txt`);
        expect(debugMock).toHaveBeenCalledWith(`The file name is file.name`);
    });
});
