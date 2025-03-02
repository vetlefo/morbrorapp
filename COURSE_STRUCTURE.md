# Course Data Structure Guide

This guide explains the structure of course data in MorbrorAppen and how to create or modify course content.

## Overview

Courses in MorbrorAppen are defined using JSON files stored in the `backend/data/` directory. Each course is organized into:

- **Courses**: The highest level containing all course information
- **Modules**: Sections within a course
- **Lessons**: Individual learning units within modules
- **Content Blocks**: Different types of content within lessons

## Course JSON Structure

Here's the complete structure of a course JSON file:

```json
{
  "courseId": "unique-identifier",
  "title": "Course Title",
  "shortTitle": "Short Name",
  "description": "Detailed description of the course",
  "targetAgeRange": "5-7",
  "difficultyLevel": "1",
  "prerequisites": ["optional-prerequisite-course-ids"],
  "estimatedCompletionTime": "3 timer",
  "coverImage": "image-filename.jpg",
  "mascot": "Character name",
  "badge": "badge-id",
  "voiceCommandKeywords": ["keyword1", "keyword2"],
  "parentNotes": "Notes for parents/guardians",
  "creationDate": "YYYY-MM-DD",
  "lastUpdated": "YYYY-MM-DD",
  "version": "1.0",
  "active": true,
  "ttsScriptOverrides": {
    "customMessage1": "Custom text for Text-to-Speech"
  },
  "hardwareRequirements": ["item1", "item2"],
  "modules": [
    {
      "moduleId": "module-1",
      "title": "Module Title",
      "position": 1,
      "lessons": [
        {
          "lessonId": "lesson-1-1",
          "title": "Lesson Title",
          "position": 1,
          "contentBlocks": [
            {
              "type": "introduction",
              "content": {
                "text": "Introduction text"
              }
            },
            // More content blocks...
          ]
        },
        // More lessons...
      ]
    },
    // More modules...
  ]
}
```

## Required Fields for Courses

Every course must have these fields:

- **courseId**: Unique identifier for the course
- **title**: Full title displayed in the UI
- **description**: Detailed description of the course
- **modules**: Array of module objects (at least one module required)

## Module Structure

Modules group related lessons together:

```json
{
  "moduleId": "module-1",
  "title": "Getting Started with Arduino",
  "position": 1,
  "lessons": []
}
```

- **moduleId**: Unique identifier for the module
- **title**: Title displayed in the UI
- **position**: Order of this module in the course (1-based)
- **lessons**: Array of lesson objects

## Lesson Structure

Lessons contain the actual learning content:

```json
{
  "lessonId": "lesson-1-1",
  "title": "What is an Arduino?",
  "position": 1,
  "contentBlocks": []
}
```

- **lessonId**: Unique identifier for the lesson
- **title**: Title displayed in the UI
- **position**: Order of this lesson in the module (1-based)
- **contentBlocks**: Array of content block objects

## Content Block Types

Content blocks are the building blocks of lessons. There are several types:

### 1. Introduction Block

Text introduction to a concept:

```json
{
  "type": "introduction",
  "content": {
    "text": "An Arduino is a small computer that can control things like lights and motors!"
  }
}
```

### 2. Demonstration Block

Video or image demonstrations:

```json
{
  "type": "demonstration",
  "content": {
    "videoFile": "demo-video.mp4"
  }
}
```

or

```json
{
  "type": "demonstration",
  "content": {
    "imageFile": "demo-image.jpg",
    "caption": "Arduino board with components"
  }
}
```

### 3. Interaction Block

Interactive elements for user engagement:

```json
{
  "type": "interaction",
  "content": {
    "type": "voice-command",
    "prompt": "Can you say 'blink the light'?",
    "expectedResponses": ["blink light", "blink", "light"]
  }
}
```

or

```json
{
  "type": "interaction",
  "content": {
    "type": "quiz",
    "question": "What color is the power LED on the Arduino?",
    "options": ["Red", "Green", "Blue", "Yellow"],
    "correctAnswer": 1
  }
}
```

### 4. Code Block

For displaying code examples:

```json
{
  "type": "code",
  "content": {
    "language": "arduino",
    "code": "void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}"
  }
}
```

### 5. Task Block

Hands-on activities:

```json
{
  "type": "task",
  "content": {
    "instructions": "Connect the LED to pin 13 and GND",
    "checklistItems": [
      "Find a red LED",
      "Connect the long leg to pin 13",
      "Connect the short leg to GND"
    ]
  }
}
```

## Adding a New Course

To add a new course:

1. Create a new JSON file in `backend/data/` (e.g., `robotics-101.json`)
2. Follow the structure above to define your course
3. Make sure the courseId is unique
4. Restart the backend server to load the new course

## Modifying Existing Courses

To modify an existing course:

1. Edit the corresponding JSON file
2. Save the file
3. Restart the backend server to load the changes

## Content Best Practices

When creating course content for children:

1. **Keep text simple**: Use short sentences appropriate for ages 4-8
2. **Focus on visuals**: Include plenty of images and videos
3. **Interactive elements**: Add interactions to maintain engagement
4. **Progressive learning**: Start simple and gradually introduce complexity
5. **Consistent vocabulary**: Use the same terms for the same concepts
6. **Norwegian language**: Write all content in clear Norwegian appropriate for children

## Example Course Creation Walkthrough

Let's create a simple "Intro to Robotics" course:

1. Create `robotics-101.json` with basic structure:
   ```json
   {
     "courseId": "robotics-101",
     "title": "Grunnleggende Robotikk",
     "shortTitle": "Robotikk 101",
     "description": "Lær om roboter og hvordan de fungerer!",
     "targetAgeRange": "6-8",
     "difficultyLevel": "1",
     "prerequisites": [],
     "estimatedCompletionTime": "2 timer",
     "coverImage": "robotics.jpg",
     "mascot": "Robo",
     "badge": "robotics-beginner",
     "voiceCommandKeywords": ["robot", "robotikk", "motor"],
     "parentNotes": "Denne kursen introduserer barnet for grunnleggende robotkonsepter.",
     "creationDate": "2023-03-02",
     "lastUpdated": "2023-03-02",
     "version": "1.0",
     "active": true,
     "ttsScriptOverrides": {},
     "hardwareRequirements": [],
     "modules": []
   }
   ```

2. Add a module:
   ```json
   "modules": [
     {
       "moduleId": "module-1",
       "title": "Hva er en robot?",
       "position": 1,
       "lessons": []
     }
   ]
   ```

3. Add lessons to the module:
   ```json
   "lessons": [
     {
       "lessonId": "lesson-1-1",
       "title": "Roboter i hverdagen",
       "position": 1,
       "contentBlocks": [
         {
           "type": "introduction",
           "content": {
             "text": "Roboter er maskiner som kan bevege seg og gjøre ting på egen hånd. De finnes overalt rundt oss!"
           }
         },
         {
           "type": "demonstration",
           "content": {
             "imageFile": "robots-examples.jpg",
             "caption": "Forskjellige typer roboter"
           }
         }
       ]
     }
   ]
   ```

4. Add the new course file to the backend and restart the server

## Additional Resources

- [JSON Validator](https://jsonlint.com/) - Validate your course JSON
- [Markdown Guide](https://www.markdownguide.org/) - For formatting text content
- [Child-Friendly Writing Guide](https://www.readable.com/blog/how-to-write-for-children/) - Tips for writing content for children