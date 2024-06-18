describe('DotnetCommandProblemError', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('should create an instance of DotnetCommandProblemError with the correct properties', async () => {
        const projectName = 'testInput.csproj';
        const message = 'Project not restored';

        const { DotnetCommandProblemError } = await import("../../src/errors/dotnetCommandProblemError");
        const error = new DotnetCommandProblemError(projectName, message);

        expect(error).toBeInstanceOf(DotnetCommandProblemError);
        expect(error.name).toBe('DotnetCommandProblemError');
        expect(error.projectName).toBe(projectName);
        expect(error.message).toBe(message);
    });

    it('should have a stack trace', async () => {
        const projectName = 'testInput.csproj';
        const message = 'Project not restored';

        const { DotnetCommandProblemError } = await import("../../src/errors/dotnetCommandProblemError");
        const error = new DotnetCommandProblemError(projectName, message);

        expect(error.stack).toBeDefined();
    });
});