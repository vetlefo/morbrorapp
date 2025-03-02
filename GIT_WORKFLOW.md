# Git Workflow Guide for Beginners

This guide covers common Git operations you'll use while working on MorbrorAppen.

## Basic Git Commands

### Creating and Switching Branches

Branches let you work on features without affecting the main codebase.

```bash
# Create a new branch and switch to it
git checkout -b feature/my-cool-feature

# Switch between existing branches
git checkout main       # Go back to main branch
git checkout feature/my-cool-feature  # Go to your feature branch

# See all branches (current branch has an asterisk)
git branch
```

### Saving Your Changes

```bash
# See what files you've changed
git status

# Add specific files to be committed
git add src/components/MyComponent.jsx

# Add all changed files
git add .

# Commit your changes with a descriptive message
git commit -m "Add new animation to the microphone button"
```

### Syncing with GitHub

```bash
# Get the latest changes from GitHub
git pull

# Send your changes to GitHub
git push

# If it's a new branch, set upstream tracking
git push -u origin feature/my-cool-feature
```

## Starting Fresh (Reset to Original State)

If things go wrong and you want to start over:

### Soft Reset (Keep Your Changes)

```bash
# Reset to the last commit but keep your changes as uncommitted
git reset --soft HEAD~1
```

### Hard Reset (Discard Changes)

```bash
# CAUTION: This will discard all uncommitted changes
git reset --hard HEAD

# To go back to a specific commit
git reset --hard <commit-hash>

# To reset to match the remote main branch
git fetch origin
git reset --hard origin/main
```

### Stashing Changes Temporarily

```bash
# Save changes without committing, to apply later
git stash save "My work in progress"

# Get your changes back when ready
git stash apply

# List all stashed changes
git stash list

# Clear all stashed changes
git stash clear
```

## Common Workflows

### 1. Start a New Feature

```bash
# Update main branch
git checkout main
git pull

# Create feature branch
git checkout -b feature/new-button

# Work, commit changes
git add .
git commit -m "Add new button design"

# Push to GitHub
git push -u origin feature/new-button
```

### 2. Fix a Bug

```bash
# Create bug fix branch
git checkout -b fix/login-error

# Fix the bug & commit
git add .
git commit -m "Fix login error when password contains special characters"

# Push to GitHub
git push -u origin fix/login-error
```

### 3. Update from Main

```bash
# When you need to get updates from main into your branch
git checkout feature/my-feature
git merge main

# If there are conflicts, resolve them, then:
git add .
git commit -m "Merge main into feature/my-feature"
```

### 4. Creating a Pull Request

After pushing your branch to GitHub:

1. Go to the repository on GitHub
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select your branch as "compare"
5. Add description of your changes
6. Click "Create pull request"

## Fixing Common Mistakes

### Committed to Wrong Branch

```bash
# Save the commit hash
git log -1

# Switch to correct branch
git checkout correct-branch

# Apply the commit to this branch
git cherry-pick <commit-hash>

# Go back and remove from wrong branch
git checkout wrong-branch
git reset --hard HEAD~1
```

### Added Wrong Files to Commit

```bash
# If you haven't committed yet
git reset  # Unstage all files
git add [correct files]  # Add only the files you want

# If you already committed
git reset --soft HEAD~1  # Undo the commit but keep changes
git reset  # Unstage all files
git add [correct files]  # Add only files you want
git commit -m "Correct commit message"
```

### Fixing Bad Commit Message

```bash
# Change the last commit message
git commit --amend -m "New commit message"
```

## Visual Git Tools

If you prefer a visual interface, try:

- **GitHub Desktop**: Easy for beginners
- **GitKraken**: More advanced features
- **VS Code Git integration**: Works within your editor

## Git Terminology

- **Repository**: The project and its history
- **Branch**: A separate line of development
- **Commit**: A saved snapshot of changes
- **Merge**: Combining changes from different branches
- **Pull**: Get changes from remote repository
- **Push**: Send changes to remote repository
- **Fork**: Personal copy of someone else's repository
- **Clone**: Download a repository to your computer