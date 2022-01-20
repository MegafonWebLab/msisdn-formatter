## How to commit

Project uses [conventional commits](https://www.conventionalcommits.org/ru/v1.0.0-beta.4/). A more applied description
can be found [here](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

A commit message has to describe:

- **type**, level of change (i.e. feat, fix, ci or docs);
- **scope** of changes (i.e. component);
- **description** of changes to be in changelog.

### Types examples by semver

Fix:
```
patch: fix(button): add new prop onClick
```

Feature:
```
minor: feat(incredible-component): add new component
```

Breaking:
```
major:

feat(button): remove onClick prop

BREAKING CHANGE: remove onClick prop, use onKeyDown instead
```

You can use `commitizen` to make commits with convention:

```bash
$ git add .
$ git cz
```

`cz` starts a wizard that will guide you through the steps to create a valid message.

If something goes wrong with commit (i.e. linter fails), you can retry with command `git cz --retry`.

### Commit types

Main types are `fix` and `feat` for patch and minor changes. They are used in 99% cases. Others can be found in
[angular documentation](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
Breaking changes may appear under any type. When breaking commits are merged - new major version gets released.

### Changelog

Commit messages with type `feat`, `fix`, `perf`, and all commits marked as `breaking change` with any type will be
included in the changelog.

### Adding commits to an existing branch

If branch already has a commit with type that will be recorded in the changelog, new commits can be added with type
`refactor` not to be included in the changelog.

## Package publishing

Any commit in main branch will trigger release check.
If there will be some changes after previous tag and
other requirements are met - package will be published automatically.

## Legal Information

When contributing to the project you adopt the `Rules for use of intellectual property in simplified manner` and `Rules for participation in open source projects of MegaFon PJSC` that are available at [https://www.megafon.ru/opensource/](https://www.megafon.ru/opensource/) in Russian and English languages.
