# MorbrorAppen Development Guidelines

## App Overview
MorbrorAppen ("Uncle App") is an educational tool for children (4-8 years old) to learn programming and electronics with help from virtual "uncles". It features voice commands, Norwegian language, and an engaging UI focused on simplicity.

## Build Commands
- Frontend: `cd frontend && npm run start` - Run development server (port 3000)
- Frontend: `cd frontend && npm run build` - Build for production
- Frontend: `cd frontend && npm run test` - Run tests
- Frontend: `cd frontend && npm run test -- --testNamePattern="test name"` - Run specific test
- Backend: `cd backend && uvicorn main:app --reload` - Run API server (port 8000)

## API Service Integration
- ElevenLabs API: Voice synthesis for Norwegian TTS
- Configuration in src/services/elevenlabsService.js
- Language code "no" specified to ensure proper Norwegian pronunciation
- Voice IDs should match character personalities (mascot, uncles, assistant)

## Code Style

### Frontend (React)
- Use JSX syntax with functional components and hooks
- Imports ordered: React, external libraries, local components
- Error handling: Use try/catch with clear error states in UI
- Naming: camelCase for variables/functions, PascalCase for components
- UI elements should follow Norwegian language text

### Backend (FastAPI)
- Type hints required for all function parameters and returns
- Use Pydantic models for data validation 
- Error handling with appropriate HTTP exceptions
- Function/variable names in snake_case
- Class names in PascalCase

### General
- Document complex logic with clear comments
- Keep functions small and focused
- Meaningful variable names that convey purpose
- Consistent indentation (2 spaces frontend, 4 spaces backend)
- Voice commands should use standard Norwegian pronunciation 
- All UI text should be in Norwegian (Bokmål)