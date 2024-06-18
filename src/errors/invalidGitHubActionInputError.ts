/**
 * Error indicating a GitHub Actions Input error
 */
class InvalidGitHubActionInputError extends Error {
    inputName: string;

    constructor(inputName: string, message: string) {
        super(message);
        this.name = 'InvalidGitHubActionInputError';
        this.inputName = inputName;
    }
}

export {
    InvalidGitHubActionInputError
};