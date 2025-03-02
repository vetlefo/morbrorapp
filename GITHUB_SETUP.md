# Setting Up MorbrorAppen on GitHub

This guide will walk you through creating a GitHub repository for MorbrorAppen and setting it up for collaborative development.

## 1. Create a GitHub Account

If you don't already have one:

1. Go to [GitHub.com](https://github.com)
2. Click "Sign up"
3. Follow the registration steps

## 2. Create a New Repository

1. Log into GitHub
2. Click the "+" icon in the top right, then "New repository"
3. Fill in the repository information:
   - **Repository name**: `morbrorapp` (or any name you prefer)
   - **Description**: "Educational app for teaching children programming and electronics"
   - **Visibility**: Public (or Private if you prefer)
   - Check "Add a README file"
   - Check "Choose a license" and select "MIT License"
4. Click "Create repository"

## 3. Set Up Your Local Repository

### Option 1: Push Existing Code to GitHub

If you've already cloned this project:

```bash
# Navigate to your project directory
cd /path/to/morbrorapp-3

# Initialize git repository (if not already initialized)
git init

# Add the GitHub repository as remote
git remote add origin https://github.com/your-username/morbrorapp.git

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

### Option 2: Clone the Empty Repository and Add Files

```bash
# Clone the empty repository
git clone https://github.com/your-username/morbrorapp.git

# Copy project files into the cloned directory
# (Use your file manager or cp -r command)

# Add all files
cd morbrorapp
git add .

# Commit the files
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

## 4. Repository Structure Best Practices

Organize your repository with these files:

1. **README.md** - Project overview and setup instructions
2. **BEGINNERS_GUIDE.md** - Guide for beginners learning coding
3. **.gitignore** - List of files/directories to ignore

Create a `.gitignore` file with:

```
# Node modules
node_modules/

# Build outputs
build/
dist/

# Environment variables
.env
.env.local

# Python virtual environment
.venv/
__pycache__/

# IDE files
.vscode/
.idea/

# MacOS files
.DS_Store

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

## 5. Inviting Collaborators

To invite your brother or others:

1. Go to your repository on GitHub
2. Click "Settings" > "Collaborators"
3. Click "Add people"
4. Enter their GitHub username or email
5. Select their role (usually "Write" is appropriate for contributors)

## 6. Basic Git Workflow for Beginners

Teach your brother this simple workflow:

### First-time Setup

```bash
# Clone the repository (download it)
git clone https://github.com/your-username/morbrorapp.git
cd morbrorapp

# Install dependencies
cd frontend
npm install
cd ../backend
pip install -r requirements.txt
```

### Making Changes

```bash
# Get latest changes
git pull

# Make your changes to files

# See what files you changed
git status

# Add your changes
git add .

# Commit your changes with a message
git commit -m "Add description of what I changed"

# Send changes to GitHub
git push
```

## 7. GitHub Project Management

Use GitHub's built-in tools:

1. **Issues** - For tracking bugs and feature requests
2. **Projects** - For organizing work using kanban boards
3. **Discussions** - For general conversations about the project

## 8. GitHub Pages (Optional)

You can deploy the frontend to GitHub Pages:

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://your-username.github.io/morbrorapp",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## 9. Learning Git Through Practice

For beginners, try these exercises:

1. Create a new branch for a feature
2. Make changes and commit them
3. Create a pull request
4. Review and merge the changes
5. Resolve a simple merge conflict

## 10. Git and GitHub Resources

- [GitHub Skills](https://skills.github.com/) - Interactive tutorials
- [Git Handbook](https://guides.github.com/introduction/git-handbook/) - Basic concepts
- [GitHub Learning Lab](https://lab.github.com/) - Hands-on tutorials
- [Oh Sh*t, Git!?!](https://ohshitgit.com/) - Help fixing git mistakes

Remember, learning Git takes practice! Start with the basics and gradually learn more advanced concepts.