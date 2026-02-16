---
name: generating-commit-messages
description: Generate conventional commit messages from staged changes and the current branch name. Use when the user asks for a commit message or to commit changes.
---

# Generating Commit Messages

## 1. Get Context

Run these commands to get the branch name and staged changes:

```bash
git rev-parse --abbrev-ref HEAD
git diff --cached
```

## 2. Generate Message

Create a semantic commit message following [Conventional Commits](https://www.conventionalcommits.org/).

**Format**:

```text
type(scope): description

[optional body]

[optional footer]
```

**Scope Rules**:

- If the branch name contains a ticket ID (e.g., `feature/JIRA-123-fix` -> `JIRA-123`), use it as the scope: `feat(JIRA-123): ...`
- If no ID is found in the branch name, use the component/module name as the scope.

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: formatting, missing semi colons, etc; no code change
- `refactor`: Refactoring production code
- `test`: Adding tests, refactoring test; no production code change
- `chore`: Updating build tasks, package manager configs, etc; no production code change

## 3. Branch Suggestion

If the current branch is `main`, `master`, `develop`, or `staging`, the user might have forgotten to create a feature branch.

- **Suggest a new branch name** based on the changes (e.g., `feat/add-auth-middleware`, `fix/login-error`).
- Ask if they want to create this branch before committing.
