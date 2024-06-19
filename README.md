# .Net vulnerable
[![Release](https://github.com/gavanlamb/.net-vulnerable/actions/workflows/release.yml/badge.svg)](https://github.com/gavanlamb/.net-vulnerable/actions/workflows/release.yml)
[![wakatime](https://wakatime.com/badge/github/gavanlamb/.net-vulnerable.svg)](https://wakatime.com/badge/github/gavanlamb/.net-vulnerable)

This action checks for vulnerable dependencies in a .NET project or solution.

This action uses the `dotnet list package` command.

The action can add a comment to the pull request and create a check run with the list of the vulnerable dependencies by project and framework.

## Inputs
| Name                                    | Description                                                                                                                                                                                                                                                                                                                          | Value type   | Required |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|----------|
| `add-pr-comment`                        | A flag to indicate whether to add a comment to the associated PR with a report of the vulnerable packages. If this is enabled and the action is executed for a non-pull-request build then the comment will not be added. If this is enabled then the permission for pull-requests must be set to write i.e. `pull-requests: write`. | `boolean`    | false    |
| `pr-comment-name`                       | A unique suffix for the pull-request comment for the current run.                                                                                                                                                                                                                                                                    | `string`     | false    |
| `add-check-run`                         | A flag to indicate whether to add a check run, to the action, containing a report of the vulnerable packages. If this is enabled then the permission for checks must be set to write i.e. `checks: write`.                                                                                                                           | `boolean`    | false    |
| `fail-check-run-if-contains-vulnerable` | A flag to indicate whether the check run should fail if there are any direct dependencies that are out of date. In order for this to work the check run needs to be enabled by setting `add-check-run` to be true.                                                                                                                   | `boolean`    | false    |
| `check-run-name`                        | A unique name for the check run tab.                                                                                                                                                                                                                                                                                                 | `string`     | false    |
| `include-transitive-dependencies`       | A flag to indicate whether to include transitive and top-level packages.                                                                                                                                                                                                                                                             | `boolean`    | false    |
| `nuget-sources`                         | The NuGet sources to use when searching for newer packages. To specify more than one use a comma separated value.                                                                                                                                                                                                                    | `csv string` | false    |
| `nuget-config-file-path`                | The path to the NuGet config file to use.                                                                                                                                                                                                                                                                                            | `string`     | false    |
| `frameworks`                            | The framework or frameworks to run the command for. To specify more than one use a comma separated value.                                                                                                                                                                                                                            | `csv string` | false    |
| `target`                                | The project or solution file to target. If a file is not specified, the command will search the current directory for one.                                                                                                                                                                                                           | `string`     | false    |

## Environment variables
| Name           | Description                                                                               | Required | Example                       |
|----------------|-------------------------------------------------------------------------------------------|----------|-------------------------------|
| `GITHUB_TOKEN` | The GitHub actions token. This is required for the action to interact with the GitHub API | true     | `${{ secrets.GITHUB_TOKEN }}` |

## Permissions
Minimal [workflow job permissions](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs#example-setting-permissions-for-a-specific-job)

```yaml
permissions:
  checks: write
  pull-requests: write
```

## Required steps
It is required for the application to be restored before running this action. This can be done by adding a step to restore the project or solution.


## Examples
### Execute once in your pipeline

```yaml
steps:
  - name: Restore
    run: dotnet restore
  - name: My action
    uses: gavanlamb/.net-vulnerable@latest
    with:
      add-pr-comment: true
      add-check-run: true
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Execute once in your pipeline

```yaml
steps:
  - name: Restore
    run: dotnet restore
  - name: My action
    uses: gavanlamb/.net-vulnerable@latest
    with:
      add-pr-comment: true
      add-check-run: true
      frameworks: net5.0
      pr-comment-name: net5.0
      target: ./test.sln
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  - name: My action
    uses: gavanlamb/.net-vulnerable@latest
    with:
      add-pr-comment: true
      add-check-run: true
      frameworks: net6.0
      pr-comment-name: net6.0
      target: ./test.sln
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## How to contribute

If you would like to contribute please see [CONTRIBUTING](https://github.com/gavanlamb/.net-vulnerable/blob/main/CONTRIBUTING.md).

