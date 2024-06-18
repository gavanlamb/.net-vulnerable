# Contributing

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Setup and Installation](#setup-and-installation)
4. [Development Guidelines](#development-guidelines)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)
7. [License](#license)
8. [Contact](#contact)

## Code of Conduct
Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md). We expect all contributors to adhere to these guidelines to foster a welcoming and inclusive environment.

## How to Contribute
We welcome contributions from everyone. Here are some ways you can help:
- Reporting bugs
- Suggesting features
- Writing documentation
- Contributing code

### Reporting Bugs
- Ensure the bug was not already reported by searching our [issue tracker](https://github.com/gavanlamb/.net-vulnerable/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/gavanlamb/.net-vulnerable/issues/new). Be sure to include:
    - A clear, descriptive title
    - Steps to reproduce the issue
    - Expected and actual results
    - Relevant logs or screenshots

### Suggesting Features
- Check if the feature was already suggested by searching our [issue tracker](https://github.com/gavanlamb/.net-vulnerable/issues).
- If not, [open a new issue](https://github.com/gavanlamb/.net-vulnerable/issues/new) with the following:
    - A clear, descriptive title
    - A detailed explanation of the feature
    - Any additional context or similar examples

### Writing Documentation
- Improve existing documentation or write new documentation by submitting a pull request.

### Contributing Code
To contribute code, please follow these steps:

1. **Fork the Repository**
    - Fork the repository to your own GitHub account by clicking the "Fork" button on the repository page.

2. **Clone Your Fork**
    - Clone the forked repository to your local machine:
      ```bash
      git clone https://github.com/{{USERNAME}}/.net-vulnerable.git
      ```

3. **Create a Branch**
    - Navigate to the project directory:
      ```bash
      cd .net-vulnerable
      ```
    - Create a new branch from `main` for each contribution. Use semantic naming conventions for your branches, including the issue number prefixed with `GH-` and the appropriate branch type[see standard](#branching-model-github-flow-with-semantic-branch-names-and-issue-numbers):
      ```bash
      git checkout -b feature/GH-123-add-login-form
      ```

4. **Make Changes**
    - Make your changes in the new branch. Ensure your commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification and there are no linting issues.
    - Make sure you have packaged the code and tested it locally before pushing the changes.
      ```bash
      npm run package
      ```

5. **Commit Your Changes**
    - Stage and commit your changes with a clear, concise message, including the issue number in the subject:
      ```bash
      git add .
      git commit -m "feat(GH-123): add login form"
      ```
    - If the changes are breaking please remember to update the documentation and tests and add a commit to bump the major version [see more](automatic-semantic-versioning-and-release-notes).

6. **Push to Your Fork**
    - Push your changes to your forked repository on GitHub:
      ```bash
      git push origin feature/GH-123-add-login-form
      ```

7. **Open a Pull Request**
    - Go to your forked repository on GitHub and open a pull request to the original repository. Provide a detailed description of your changes and link any related issues. Make sure your pull request targets the `main` branch.

8. **Discuss and Review**
    - Engage in the discussion and review process. Make any necessary changes based on feedback.

9. **Merge**
    - Once your pull request is approved and passes all tests, it can be merged into `main`.

10. **Deploy**
    - The code will be deployed automatically when pushed to main

By following this workflow, we ensure a streamlined process for contributing and maintaining the quality of the project.

## Setup and Installation
To contribute code, you’ll need to set up the project locally. Follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

## Development Guidelines
To maintain a consistent codebase, please follow these guidelines:

- Write clear, concise commit messages following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification, including the issue number in the subject.
- Follow the existing coding style.
- Ensure your code is well-documented.
- Write tests for new features and bug fixes and make sure there branch coverage is at 100%.

### Branching Model: GitHub Flow with Semantic Branch Names and Issue Numbers
GitHub Flow is a lightweight, branch-based workflow that supports teams and projects where deployments are made regularly. We use semantic branch names that include the related issue number prefixed with `GH-` for clarity and context. Here are the supported branch types:

- `feature` for new features (e.g., `feature/GH-123-add-login-form`)
- `fix` for bug fixes (e.g., `fix/GH-456-login-bug`)
- `docs` for documentation changes (e.g., `docs/GH-789-update-readme`)
- `style` for formatting, missing semi colons, etc. (e.g., `style/GH-321-reformat-code`)
- `refactor` for code refactoring (e.g., `refactor/GH-654-improve-performance`)
- `test` for adding or modifying tests (e.g., `test/GH-987-add-unit-tests`)
- `chore` for maintenance or chores (e.g., `chore/GH-111-update-dependencies`)

### Automatic Semantic Versioning and Release Notes
A semantic version is automatically generated based on commit information and tags of the `main` branch using [GitVersion](https://gitversion.net/). By following the [Semantic Versioning](https://semver.org/) specification, you help ensure that the versioning of the project is accurate and meaningful. To bump the version with a commit message, use the following:

- **Major version bump:** `+semver: breaking` or `+semver: major`
- **Minor version bump:** `+semver: feature` or `+semver: minor`
- **Patch version bump:** `+semver: fix` or `+semver: patch`
- **No version bump:** `+semver: none` or `+semver: skip`

Release notes are automatically generated from commit messages. Ensure your commit messages are clear and follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification to provide meaningful information for the release notes.

## Testing Guidelines
Ensure that your code passes all tests before submitting a pull request.

1. Run the test suite:
   ```bash
   npm test
   ```
2. Add tests for any new features or bug fixes.
3. Make sure all tests pass before pushing your changes.

By following these testing guidelines, we can maintain the quality and reliability of the project.

## License
By contributing, you agree that your contributions will be licensed under the same license as the project. See the [LICENSE](./LICENSE) file for more information.

## Contact
If you have any questions or need further assistance, feel free to [open an issue](https://github.com/gavanlamb/.net-vulnerable/issues/new).
