# MorbrorAppen Setup Guide

This guide provides step-by-step instructions to set up the MorbrorAppen project. Follow these instructions carefully to ensure a smooth setup process.

## 1. Project Initialization

This section covers setting up the project directory and initial files.

**Step 1: Create Project Directory**

Create a new directory for the project. The name of this directory is not critical, call it `morbrorapp-3`

**Step 2: Initialize Project Structure**
Create the necessary directories and files for the project. The specifics will depend on whether this is primarily a frontend or backend project, or a full-stack project. Based on the original document, it seems like a full-stack project with a React frontend and a FastAPI backend. Therefore, we'll create a basic structure for that.

Create the following directories and files:

```
morbrorapp-3/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │    └── index.html
│   └── src/
│       ├── App.jsx
│       └── index.jsx
├── docs/
│    └── setup.md (this file)
```

## 2. Backend Setup (FastAPI)

This section guides you through setting up the backend using FastAPI.

**Step 1: Navigate to Backend Directory**
```
cd backend
```

**Step 2: Install Dependencies**

Install the required Python packages using pip. Create a `requirements.txt` file in the `backend` directory with the following content:

```
fastapi
uvicorn
pydantic
motor  # For MongoDB
python-dotenv
```
Then, run:
```
pip install -r requirements.txt
```

**Step 3: Create `main.py`**

Create a `main.py` file in the `backend` directory with the following basic FastAPI setup:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import json
import os
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- CORS Configuration ---
origins = [
    "http://localhost:3000",  # Allow requests from the frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# --- Data Models ---
class ContentBlock(BaseModel):
    type: str
    content: Dict

class Lesson(BaseModel):
    lessonId: str
    title: str
    position: int
    contentBlocks: List[ContentBlock]

class Module(BaseModel):
    moduleId: str
    title: str
    position: int
    lessons: List[Lesson]

class Course(BaseModel):
    courseId: str
    title: str
    shortTitle: str
    description: str
    targetAgeRange: str
    difficultyLevel: str
    prerequisites: List[str]
    estimatedCompletionTime: str
    coverImage: str
    mascot: str
    badge: str
    voiceCommandKeywords: List[str]
    parentNotes: str
    creationDate: str
    lastUpdated: str
    version: str
    active: bool
    ttsScriptOverrides: Dict
    hardwareRequirements: List[str]
    modules: List[Module]

# --- Load Course Data ---
def load_course_data():
    courses = {}
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    for filename in os.listdir(data_dir):
        if filename.endswith(".json"):
            filepath = os.path.join(data_dir, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                try:
                    course_data = json.load(f)
                    # Validate with Pydantic model
                    course = Course(**course_data)
                    courses[course.courseId] = course
                except (json.JSONDecodeError, ValidationError) as e:
                    print(f"Error loading course from {filename}: {e}")
    return courses

courses_data = load_course_data()

# --- API Endpoints ---
@app.get("/")
async def read_root():
    return {"message": "MorbrorAppen Backend is running!"}

@app.get("/courses", response_model=List[Course])
async def list_courses():
    return list(courses_data.values())

@app.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    if course_id not in courses_data:
        raise HTTPException(status_code=404, detail="Course not found")
    return courses_data[course_id]
```

**Step 4: Test Backend**
Run the backend server:
```
uvicorn main:app --reload
```
Open your browser and go to `http://127.0.0.1:8000`. You should see the message "MorbrorAppen Backend is running!".

## 3. Frontend Setup (React)**

This section covers setting up the frontend using React.

**Step 1: Navigate to Frontend Directory**
```
cd ../frontend
```

**Step 2: Create a Basic React App**
If you don't already have a React project set up, you can create one. If you do, skip to step 3.
```
npx create-react-app .
```

**Step 3: Install Dependencies**

Install any necessary frontend dependencies (e.g., Axios for API requests).

```
npm install axios
```

**Step 4: Modify `src/App.jsx`**

Replace the content of `src/App.jsx` with the following to test the backend connection:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000') // Assuming backend runs on port 8000
      .then(response => {
        console.log("Response:", response); // Add logging here
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setMessage("Failed to connect to backend.");
      });
  }, []);

  return (
    <div>
      <h1>MorbrorAppen Frontend</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
```

**Step 5: Start Frontend**
```
npm start
```
This will open the app in your browser (usually at `http://localhost:3000`). You should see the frontend app displaying the message from the backend.

## 4. Course Structure Setup

This section describes how to create the initial course data.

**Step 1: Create Data Directory**

Create a `data` directory within the `backend` directory to store course data:

```
mkdir ../backend/data
```

**Step 2: Create Course JSON Files**

Create JSON files for each course within the `data` directory.  For example, create `arduino-101.json`:

```json
{
  "courseId": "arduino-101",
  "title": "Min Første Arduino",
  "shortTitle": "Arduino 101",
  "description": "Lær om Arduino og hvordan du kan bruke den til å lage kule ting!",
  "targetAgeRange": "4-8",
  "difficultyLevel": "1",
  "prerequisites": [],
  "estimatedCompletionTime": "2 lekeøkter",
  "coverImage": "arduino-101.jpg",
  "mascot": "Arduino-bot",
  "badge": "arduino-beginner",
  "voiceCommandKeywords": ["arduino", "lys", "blink"],
  "parentNotes": "Hjelp barnet med å koble til Arduino-kortet.",
  "creationDate": "2025-02-25",
  "lastUpdated": "2025-02-25",
  "version": "1.0",
  "active": true,
  "ttsScriptOverrides": {},
  "hardwareRequirements": ["Arduino Uno", "LED", "220 ohm resistor"],
  "modules": [
    {
      "moduleId": "module-1",
      "title": "Bli kjent med Arduino",
      "position": 1,
      "lessons": [
        {
          "lessonId": "lesson-1-1",
          "title": "Hva er en Arduino?",
          "position": 1,
          "contentBlocks": [
            {
              "type": "introduction",
              "content": {
                "text": "En Arduino er som en liten datahjerne!",
                "audioFile": "intro-arduino.mp3"
              }
            },
            {
              "type": "demonstration",
              "content": {
                "videoFile": "arduino-parts.mp4"
              }
            },
            {
              "type": "interaction",
              "content": {
                "type": "voice-command",
                "prompt": "Kan du peke på Arduino-kortet?",
                "expectedResponses": ["her", "dette", "der"]
              }
            }
          ]
        }
      ]
    }
  ]
}
```

**Step 3: Load Course Data in Backend**

Modify your `backend/main.py` to load and serve this course data. Here's an example of how you might do that (this is a simplified example; you'll likely need to adjust it based on your final database setup):

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import json
import os
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- CORS Configuration ---
origins = [
    "http://localhost:3000",  # Allow requests from the frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# --- Data Models ---
class ContentBlock(BaseModel):
    type: str
    content: Dict

class Lesson(BaseModel):
    lessonId: str
    title: str
    position: int
    contentBlocks: List[ContentBlock]

class Module(BaseModel):
    moduleId: str
    title: str
    position: int
    lessons: List[Lesson]

class Course(BaseModel):
    courseId: str
    title: str
    shortTitle: str
    description: str
    targetAgeRange: str
    difficultyLevel: str
    prerequisites: List[str]
    estimatedCompletionTime: str
    coverImage: str
    mascot: str
    badge: str
    voiceCommandKeywords: List[str]
    parentNotes: str
    creationDate: str
    lastUpdated: str
    version: str
    active: bool
    ttsScriptOverrides: Dict
    hardwareRequirements: List[str]
    modules: List[Module]

# --- Load Course Data ---
def load_course_data():
    courses = {}
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    for filename in os.listdir(data_dir):
        if filename.endswith(".json"):
            filepath = os.path.join(data_dir, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                try:
                    course_data = json.load(f)
                    # Validate with Pydantic model
                    course = Course(**course_data)
                    courses[course.courseId] = course
                except (json.JSONDecodeError, ValidationError) as e:
                    print(f"Error loading course from {filename}: {e}")
    return courses

courses_data = load_course_data()

# --- API Endpoints ---
@app.get("/")
async def read_root():
    return {"message": "MorbrorAppen Backend is running!"}

@app.get("/courses", response_model=List[Course])
async def list_courses():
    return list(courses_data.values())

@app.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    if course_id not in courses_data:
        raise HTTPException(status_code=404, detail="Course not found")
    return courses_data[course_id]
```

## 5. Hardware Setup

This section provides instructions for connecting the Arduino and other hardware.

**Step 1: Connect Arduino**

Connect the Arduino Uno to your computer using a USB cable.

**Step 2: Install Arduino IDE**

Download and install the Arduino IDE from the official Arduino website.

**Step 3: Upload Example Code**

Open the Arduino IDE and upload a simple blink sketch to verify the connection. You can find examples in the Arduino IDE under `File > Examples > 01.Basics > Blink`.

**Step 4: (Optional) Connect Other Hardware**

Connect any additional hardware components (LEDs, resistors, etc.) as required by the specific course. Detailed wiring diagrams should be provided within the course content itself.

## 6. Running the Application

**Step 1: Start Backend**

Navigate to the `backend` directory and run:

```
uvicorn main:app --reload
```

**Step 2: Start Frontend**

Navigate to the `frontend` directory and run:

```
npm start
```

This will start both the backend and frontend servers. You should now be able to access the MorbrorAppen in your browser.

## Completed Steps

- [x] Project Initialization: Created project directory and initial files.
- [x] Backend Setup: Installed backend dependencies.
- [x] Backend Setup: Tested backend.
- [x] Frontend Setup: Installed frontend dependencies (completed by user).
- [x] Frontend Setup: Started frontend.
- [x] Course Structure Setup: Created initial course data (`backend/data/arduino-101.json`).
- [x] Fixed CORS issue to allow frontend to communicate with backend.