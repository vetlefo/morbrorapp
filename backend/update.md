# MorbrorAppen Development Update

## Project Summary
MorbrorAppen ("Uncle App") is an educational tool for children (4-8 years old) to learn programming and electronics with help from virtual "uncles". It features voice commands, Norwegian language, and an engaging UI focused on simplicity.

## Current Progress

We created a prototype for MorbrorAppen with the following features:

1. Built a React frontend with components:
   - Main app UI with home, courses, badges, and profile sections
   - Course detail view for lessons
   - Settings dialog with voice configuration
   - Voice command system with visual feedback

2. Added Eleven Labs voice integration:
   - Created `elevenlabsService.js` for API communication
   - Implemented fallbacks to browser speech synthesis
   - Added custom voice support for Norwegian

3. Fixed multiple issues:
   - CORS problems with backend API
   - Tailwind CSS configuration and styling
   - 400 error responses from Eleven Labs API
   - Browser autoplay restrictions

## Key Files
- `/frontend/src/MorbrorAppen.jsx` - Main app component
- `/frontend/src/services/elevenlabsService.js` - Voice service
- `/frontend/src/components/SettingsDialog.jsx` - Voice configuration UI
- `/frontend/src/components/VoiceCloneGuide.jsx` - Guides for voice cloning

## Current Focus
We're trying to configure the correct model_id for Eleven Labs' Flash 2.5 to use with the Norwegian "Ola" voice (ID: pFZP5JQG7vIUkIANS04j).

## Next Steps
Determine the correct model ID for Eleven Labs Flash 2.5 model and update our service to properly handle Norwegian speech in the app.