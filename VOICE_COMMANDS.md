# Voice Command System Guide

MorbrorAppen features a voice command system that allows children to interact with the app by speaking Norwegian phrases. This guide explains how the voice system works and how to customize it.

## How Voice Commands Work

The app uses two main technologies for voice interaction:

1. **Text-to-Speech (TTS)**: Converts text to spoken words (app speaking to the user)
2. **Speech Recognition**: Converts spoken words to text (user speaking to the app)

### Text-to-Speech System

MorbrorAppen uses the ElevenLabs API for high-quality Norwegian voice synthesis:

1. **Voice Characters**: Different voices for different characters (mascot, uncles)
2. **Fallback System**: If ElevenLabs is unavailable, uses browser's built-in speech synthesis

### Speech Recognition

The current implementation uses simulated speech recognition for demonstration purposes. In a production version, you would integrate with:

1. **Web Speech API** (browser-based recognition)
2. **ElevenLabs Speech Recognition** or another service

## Setting Up ElevenLabs

1. **Create an Account**: Visit [ElevenLabs](https://elevenlabs.io/) and create an account
2. **API Key**: Find your API key in your account settings
3. **Add to App**: Enter the API key in the Settings dialog in MorbrorAppen

## Custom Voices

MorbrorAppen uses different voices for different characters:

```javascript
// From elevenlabsService.js
const VOICES = {
  mascot: 'pFZP5JQG7vIUkIANS04j',     // Ola - Energetic & Enthusiastic Norwegian male
  assistant: '2EiwWnXFnvU5JabPnv8n',  // Clyde - Authoritative male voice
  uncle1: 'ErXwobaYiN019PkySvjV',     // Antoni - Young male voice 
  uncle2: 'VR6AewLTigWG4xSOukaG'      // Adam - Older male voice
};
```

You can create custom voices on ElevenLabs by:

1. Recording voice samples
2. Training a voice model
3. Getting the voice ID and using it in the app

## Voice Command Implementation

The voice command system works in these steps:

1. **User initiates**: User taps the microphone button
2. **App listens**: Shows the listening interface
3. **Processing**: Interprets the voice command
4. **Response**: Performs the action and provides voice feedback

## How to Add New Voice Commands

To add new voice commands, modify the `handleVoiceCommand` function in `MorbrorAppen.jsx`:

```javascript
const handleVoiceCommand = (command) => {
  if (command.toLowerCase().includes('arduino') || command.toLowerCase().includes('kurs')) {
    // Existing code...
  } 
  // Add a new command handler:
  else if (command.toLowerCase().includes('spill musikk') || command.toLowerCase().includes('musikk')) {
    speakText('Jeg spiller litt fin musikk for deg!');
    // Add code to play music
  }
  else {
    speakText(responses.notUnderstood);
  }
};
```

## Keywords for Voice Commands

Course data includes keywords that can trigger related content:

```json
"voiceCommandKeywords": ["arduino", "lys", "blink", "prosjekt"]
```

When these words are detected in voice commands, the app can respond with relevant information.

## Testing Voice Commands

Since the current implementation uses simulated recognition, you can:

1. Add more test commands to the `testCommands` array
2. Implement proper speech recognition for production use

## Voice Response Customization

App responses are stored in the `responses` state in `MorbrorAppen.jsx`:

```javascript
const [responses, setResponses] = useState({
  greeting: 'Hei! Hva vil du lære i dag?',
  listening: 'Jeg lytter...',
  // other responses...
});
```

Change these texts to customize what the app says.

## Course-Specific Voice Scripts

You can add custom voice scripts for different courses using the `ttsScriptOverrides` property in course data:

```json
"ttsScriptOverrides": {
  "courseIntro": "Velkommen til Arduino-kurset! Dette blir gøy!",
  "lessonComplete": "Bra jobbet! Du har fullført leksjonen!"
}
```

## Voice Command Best Practices

For children's apps, follow these guidelines:

1. **Keep commands simple**: Use short, clear phrases
2. **Provide feedback**: Always respond to let users know if commands were understood
3. **Use consistent language**: Maintain the same terminology across the app
4. **Add visual cues**: Show visual feedback during voice interactions
5. **Be forgiving**: Accept various phrasings of the same command
6. **Design for Norwegian**: Optimize for Norwegian pronunciation patterns

## Implementation Challenges

Some challenges you might encounter:

1. **Norwegian language support**: Not all speech recognition systems support Norwegian equally well
2. **Background noise**: Children's environments can be noisy
3. **Pronunciation variations**: Children may pronounce words differently

## Future Improvements

Consider these enhancements:

1. **Intent recognition**: Use NLP to understand the meaning, not just keywords
2. **Voice authentication**: Recognize different users by voice
3. **Emotion detection**: Respond to excited or confused tones
4. **Contextual responses**: Remember conversation context for better interactions