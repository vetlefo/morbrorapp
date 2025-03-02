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