# MorbrorAppen - Beginner's Guide

This guide is designed to help beginners understand how the MorbrorAppen works and how to make simple changes to the codebase. If you're new to coding, this is a great project to learn with!

## What is MorbrorAppen?

MorbrorAppen (Uncle App) is an educational app designed to help children learn programming and electronics. The app features:

- Voice commands in Norwegian
- Interactive lessons about Arduino and electronics
- Virtual "uncles" who guide children through learning

## Technology Overview

The app is built using:

- **React** - A JavaScript library for building user interfaces
- **Tailwind CSS** - A utility-first CSS framework for styling
- **FastAPI** - A Python framework for building the backend API
- **ElevenLabs API** - For text-to-speech in Norwegian

## Understanding the Code Structure

### Frontend (React)

The frontend is where users interact with the app. It's built with React and organized as follows:

1. **Components** - Reusable UI elements
2. **Services** - Code that communicates with external APIs
3. **App.jsx and MorbrorAppen.jsx** - The main application components

#### Key Files to Understand:

- `src/App.jsx` - The entry point that loads data from the backend
- `src/MorbrorAppen.jsx` - The main UI component with navigation and voice commands
- `src/components/CourseDetail.jsx` - Shows course lessons and content
- `src/services/elevenlabsService.js` - Handles text-to-speech functionality

### Backend (FastAPI)

The backend serves course data and handles API requests:

1. **main.py** - The FastAPI application with routes
2. **data/*.json** - Course content in JSON format

## Making Simple Changes

Here are some easy changes you can make to start learning:

### 1. Change the Welcome Message

Open `src/MorbrorAppen.jsx` and look for:

```jsx
const [responses, setResponses] = useState({
  greeting: 'Hei! Hva vil du lære i dag?',
  // other messages...
});
```

Change the greeting message to something new!

### 2. Add a New Course

Create a new JSON file in `backend/data/` following the format of existing courses. For example:

```json
{
  "courseId": "electronics-101",
  "title": "Grunnleggende Elektronikk",
  "shortTitle": "Elektronikk 101",
  "description": "Lær om elektronikk på en morsom måte!",
  "targetAgeRange": "6",
  // ... other fields similar to arduino-101.json
}
```

### 3. Customize the UI Colors

Open `tailwind.config.js` to change the color scheme. For example:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        indigo: {
          // Change these values to customize colors
          600: '#4F46E5', 
        },
      },
    },
  },
  // ... rest of the config
};
```

## How to Test Your Changes

1. Start the backend server:
   ```
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open http://localhost:3000 in your browser to see your changes

## Next Learning Steps

Once you're comfortable with basic changes, try these:

1. **Add a new feature** - Like a timer for lessons or a note-taking area
2. **Create a new component** - Try making a simple "Tip of the Day" component
3. **Add more voice commands** - Expand the voice recognition capabilities
4. **Improve the UI** - Make the interface more engaging for children

## Resources for Learning

- **React**: [React Official Tutorial](https://reactjs.org/tutorial/tutorial.html)
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **FastAPI**: [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- **JavaScript**: [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- **Python**: [Python Official Tutorial](https://docs.python.org/3/tutorial/)

## Debugging Tips

If something isn't working:

1. Check the browser console (F12) for errors
2. Look at the terminal where you started the frontend/backend for error messages
3. Try adding `console.log()` statements to understand what's happening
4. Remember: breaking things and fixing them is part of learning!

## Questions to Explore

As you learn, try answering these questions:

1. How does the app fetch course data from the backend?
2. What happens when a user clicks on a course?
3. How does the voice command system work?
4. How are the UI components styled with Tailwind CSS?
5. How could you add a new page or feature to the app?

Learning to code is a journey - have fun exploring this project!