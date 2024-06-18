describe('InvalidGitHubActionInputError', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('should create an instance of InvalidGitHubActionInputError with the correct properties', async () => {
        const inputName = 'testInput';
        const message = 'Invalid input provided';

        const { InvalidGitHubActionInputError } = await import("../../src/errors/invalidGitHubActionInputError");
        const error = new InvalidGitHubActionInputError(inputName, message);

        expect(error).toBeInstanceOf(InvalidGitHubActionInputError);
        expect(error.name).toBe('InvalidGitHubActionInputError');
        expect(error.inputName).toBe(inputName);
        expect(error.message).toBe(message);
    });

    it('should have a stack trace', async () => {
        const inputName = 'testInput';
        const message = 'Invalid input provided';

        const { InvalidGitHubActionInputError } = await import("../../src/errors/invalidGitHubActionInputError");
        const error = new InvalidGitHubActionInputError(inputName, message);

        expect(error.stack).toBeDefined();
    });
});