# Contributing to MorbrorAppen

Thank you for your interest in contributing to MorbrorAppen! This document will guide you through the contribution process and help you get started.

## Ways to Contribute

There are many ways to contribute to this project:

- **Add new courses or modules**: Create educational content
- **Improve the UI/UX**: Make the interface more engaging for children
- **Fix bugs**: Help make the app more stable
- **Add features**: Implement new functionality
- **Improve documentation**: Help others learn how to use or contribute to the project
- **Translate content**: Help make the app accessible in other Norwegian dialects

## Getting Started

### For Beginners

If you're new to coding:

1. Start by reading the `BEGINNERS_GUIDE.md`
2. Try making small changes first, like modifying text or simple UI elements
3. Use the branching workflow described in `GIT_WORKFLOW.md`
4. Ask questions if you get stuck!

### For More Experienced Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Workflow

### Setting Up Development Environment

1. Clone the repository
2. Install dependencies:
   ```
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```
3. Copy `.env.example` files to `.env` in both frontend and backend folders
4. Start the development servers:
   ```
   # Backend
   cd backend
   uvicorn main:app --reload
   
   # Frontend (in another terminal)
   cd frontend
   npm start
   ```

### Branching Strategy

- `main` - Stable production code
- `develop` - Development branch, merge your features here
- `feature/feature-name` - For new features
- `fix/bug-name` - For bug fixes
- `docs/topic` - For documentation changes

### Pull Request Process

1. Update documentation if necessary
2. Make sure your code follows the project's style guidelines
3. Test your changes thoroughly
4. Ensure any new files include appropriate licensing headers
5. Submit a pull request to the `develop` branch

## Code Style Guidelines

### Frontend (React)

- Use functional components and hooks
- Follow consistent indentation (2 spaces)
- Use descriptive variable names
- Keep components small and focused
- Document complex logic with comments
- Write all user-facing text in Norwegian

### Backend (FastAPI)

- Use type hints for function parameters and returns
- Use Pydantic models for data validation
- Follow PEP 8 style guidelines (4 spaces for indentation)
- Document functions with docstrings
- Keep endpoints RESTful

## Creating Educational Content

When creating courses, modules, or lessons:

1. Follow the structure in `COURSE_STRUCTURE.md`
2. Make content age-appropriate (4-8 years)
3. Focus on interactivity and engagement
4. Use simple, clear Norwegian language
5. Include visual elements when possible
6. Test with real children if possible

## Testing

Test changes thoroughly before submitting:

1. Test on different screen sizes (mobile, tablet, desktop)
2. Verify that voice commands work correctly
3. Check that course content displays properly
4. Ensure navigation works as expected
5. Validate that API endpoints return correct data

## Community Guidelines

- Be respectful and inclusive in all communications
- Help newcomers - we all started somewhere!
- Give constructive feedback
- Acknowledge the work of others
- Focus on the best outcome for the children using this app

## Recognition

Contributors will be acknowledged in the project documentation. Significant contributions may be highlighted in release notes.

## Questions?

If you have any questions about contributing:

1. Check the existing documentation
2. Open an issue on GitHub
3. Ask in discussions

Thank you for helping make MorbrorAppen better for children learning to code!