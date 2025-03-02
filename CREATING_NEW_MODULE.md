# Creating a New Module Guide

This guide will walk you through creating a new learning module for MorbrorAppen.

## What is a Module?

In MorbrorAppen:
- A **course** is a complete learning path (like "Arduino 101")
- A **module** is a section within a course (like "Blinking LEDs")
- A **lesson** is an individual teaching unit within a module
- **Content blocks** are the different elements within a lesson (text, video, interaction)

## Step 1: Plan Your Module

Before writing code, plan your module:

1. **Choose a topic**: What will this module teach?
2. **Target age**: Is it appropriate for the 4-8 year age range?
3. **Prerequisites**: What should children know before starting?
4. **Learning outcomes**: What will they learn?
5. **Required hardware**: What physical components are needed?

## Step 2: Create the Module Data

### Add to an Existing Course

1. Open the course JSON file in `backend/data/` (e.g., `arduino-101.json`)
2. Find the `modules` array
3. Add your new module JSON object:

```json
{
  "moduleId": "module-3",
  "title": "Lyssensor",
  "position": 3,
  "lessons": [
    {
      "lessonId": "lesson-3-1",
      "title": "Hva er en lyssensor?",
      "position": 1,
      "contentBlocks": [
        {
          "type": "introduction",
          "content": {
            "text": "En lyssensor kan måle hvor lyst det er rundt oss. Den er som et øye for Arduinoen!"
          }
        },
        {
          "type": "demonstration",
          "content": {
            "imageFile": "light-sensor.jpg",
            "caption": "En lyssensor koblet til en Arduino"
          }
        }
      ]
    },
    {
      "lessonId": "lesson-3-2",
      "title": "Koble opp lyssensoren",
      "position": 2,
      "contentBlocks": [
        {
          "type": "introduction",
          "content": {
            "text": "La oss koble lyssensoren til Arduinoen for å måle lys!"
          }
        },
        {
          "type": "task",
          "content": {
            "instructions": "Følg disse trinnene for å koble opp lyssensoren:",
            "checklistItems": [
              "Koble den lange pinnen på lyssensoren til 5V",
              "Koble den korte pinnen til en 10K ohm motstand",
              "Koble den andre siden av motstanden til GND",
              "Koble midten (mellom sensor og motstand) til A0"
            ]
          }
        }
      ]
    }
  ]
}
```

## Step 3: Add UI Components (if needed)

If your module needs special UI elements:

1. Create a new component in `frontend/src/components/`
2. Import and use it in the relevant parent component

Example new component (`LightSensorDemo.jsx`):

```jsx
import React, { useState } from 'react';

const LightSensorDemo = () => {
  const [lightLevel, setLightLevel] = useState(50);
  
  const handleSliderChange = (e) => {
    setLightLevel(e.target.value);
  };
  
  return (
    <div className="p-4 bg-yellow-50 rounded-lg">
      <h3 className="font-medium mb-2">Lyssensor Demonstrasjon</h3>
      
      <div className="flex items-center mb-4">
        <div className={`w-16 h-16 rounded-full mr-4 transition-colors`}
             style={{backgroundColor: `rgb(${255 * lightLevel/100}, ${255 * lightLevel/100}, 0)`}}>
        </div>
        <div className="flex-1">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={lightLevel} 
            onChange={handleSliderChange}
            className="w-full"
          />
          <div className="text-center">
            Lysnivå: {lightLevel}%
          </div>
        </div>
      </div>
      
      <div className="text-sm">
        Når det er lysere, leser sensoren en høyere verdi.
        Når det er mørkere, leser den en lavere verdi.
      </div>
    </div>
  );
};

export default LightSensorDemo;
```

## Step 4: Add Media Files

1. Create or collect necessary images/videos for your module
2. Add them to the appropriate folder:
   - For frontend display: `frontend/public/images/courses/`
   - Reference them in your content blocks

## Step 5: Add Voice Command Support

1. Update the course's `voiceCommandKeywords` array with relevant terms:

```json
"voiceCommandKeywords": ["arduino", "lys", "blink", "prosjekt", "sensor", "lyssensor"]
```

2. Add handling for the new commands in `MorbrorAppen.jsx`:

```javascript
// In the handleVoiceCommand function
else if (command.toLowerCase().includes('lyssensor') || command.toLowerCase().includes('sensor')) {
  speakText('La meg vise deg hvordan en lyssensor fungerer!');
  // Code to show the light sensor module
}
```

## Step 6: Testing Your Module

Test these aspects of your new module:

1. **Backend**: Restart the server and check `/courses` endpoint
2. **Frontend display**: Verify module appears in the course list
3. **Lesson navigation**: Check you can navigate through lessons
4. **Content display**: Ensure all content blocks render correctly
5. **Voice commands**: Test voice command recognition
6. **Mobile view**: Check how it looks on smaller screens

## Advanced: Creating Interactive Modules

For more advanced interactive modules:

### Code Playground

```jsx
import React, { useState } from 'react';

const SimpleCodePlayground = () => {
  const [code, setCode] = useState('void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}');
  const [output, setOutput] = useState('');
  
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  
  const runCode = () => {
    // This is a simplified simulation
    if (code.includes('digitalWrite') && code.includes('delay')) {
      setOutput('LED blinker! 💡');
    } else {
      setOutput('Koden kjører, men LED blinker ikke. Sjekk at du har digitalWrite og delay.');
    }
  };
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium mb-2">Min Arduino-kode</h3>
      
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="w-full h-40 font-mono text-sm p-2 border rounded"
      />
      
      <button 
        onClick={runCode}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Kjør koden
      </button>
      
      {output && (
        <div className="mt-3 p-2 bg-black text-green-300 font-mono rounded">
          {output}
        </div>
      )}
    </div>
  );
};

export default SimpleCodePlayground;
```

### Virtual Circuit Simulator

For a simple circuit simulator, you could create a component that lets users drag and drop components onto a virtual breadboard. This is more advanced and would require canvas manipulation or a library like `react-dnd`.

## Example: Complete Light Sensor Module

Here's a complete example of a light sensor module:

1. **Module data in JSON**:
```json
{
  "moduleId": "module-light-sensor",
  "title": "Lysmåling med Arduino",
  "position": 3,
  "lessons": [
    {
      "lessonId": "lesson-light-intro",
      "title": "Hva er en LDR?",
      "position": 1,
      "contentBlocks": [
        {
          "type": "introduction",
          "content": {
            "text": "En LDR (Light Dependent Resistor) er en lyssensor som endrer motstand basert på hvor mye lys den ser."
          }
        },
        {
          "type": "demonstration",
          "content": {
            "imageFile": "ldr.jpg",
            "caption": "En LDR lyssensor"
          }
        }
      ]
    },
    {
      "lessonId": "lesson-light-circuit",
      "title": "Koble opp kretsen",
      "position": 2,
      "contentBlocks": [
        {
          "type": "task",
          "content": {
            "instructions": "La oss lage en krets som kan måle lys:",
            "checklistItems": [
              "Koble LDR til 5V på den ene siden",
              "Koble den andre siden av LDR til A0 og til en 10K motstand",
              "Koble motstanden til GND"
            ]
          }
        },
        {
          "type": "code",
          "content": {
            "language": "arduino",
            "code": "void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lysVerdi = analogRead(A0);\n  Serial.println(lysVerdi);\n  delay(1000);\n}"
          }
        }
      ]
    },
    {
      "lessonId": "lesson-light-project",
      "title": "Lag et nattlys",
      "position": 3,
      "contentBlocks": [
        {
          "type": "introduction",
          "content": {
            "text": "Nå kan vi bruke lyssensoren til å lage et nattlys som slår seg på når det blir mørkt!"
          }
        },
        {
          "type": "code",
          "content": {
            "language": "arduino",
            "code": "void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  int lysVerdi = analogRead(A0);\n  \n  if (lysVerdi < 300) {\n    digitalWrite(13, HIGH); // Slå på LED når det er mørkt\n  } else {\n    digitalWrite(13, LOW);  // Slå av LED når det er lyst\n  }\n  \n  delay(100);\n}"
          }
        }
      ]
    }
  ]
}
```

2. **Reference this module** in the course data and update the backend.

3. **Add supporting images** to the frontend.

Remember, the best modules are engaging, interactive, and built around a concept that children can easily understand!