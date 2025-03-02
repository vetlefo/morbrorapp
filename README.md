# MorbrorAppen (Uncle App)

MorbrorAppen is an educational application designed to help children (ages 4-8) learn programming and electronics with the help of virtual "uncles." The app features a child-friendly interface with voice commands in Norwegian, interactive lessons, and an engaging UI focused on simplicity.

## Project Overview

This project consists of:

1. **Frontend**: A React application with a modern UI built using Tailwind CSS
2. **Backend**: A FastAPI service that provides course content and API endpoints

## Key Features

- 🎮 **Child-friendly interface** designed for ages 4-8
- 🎙️ **Voice commands** using ElevenLabs API for Norwegian text-to-speech
- 👨‍🏫 **Virtual "uncles"** who guide children through programming concepts
- 📱 **Mobile-first design** optimized for tablet use
- 🧩 **Interactive lessons** on electronics and Arduino programming
- 🏆 **Badges and achievements** to motivate learning

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- An ElevenLabs API key (optional, for voice functionality)

### Setting Up the Repository

1. Clone this repository:
   ```
   git clone https://github.com/your-username/morbrorapp.git
   cd morbrorapp
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd ../backend
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   uvicorn main:app --reload
   ```
   The backend will run on http://localhost:8000

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
   The frontend will run on http://localhost:3000

## Project Structure

### Frontend Structure

```
frontend/
├── public/               # Static files
├── src/
│   ├── components/       # UI components
│   │   ├── BadgesSection.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── CoursesSection.jsx
│   │   ├── ProfileSection.jsx
│   │   └── SettingsDialog.jsx
│   ├── services/         # API services
│   │   └── elevenlabsService.js
│   ├── App.jsx           # Main app component
│   ├── MorbrorAppen.jsx  # Core application UI
│   ├── index.jsx         # Entry point
│   └── index.css         # Global styles with Tailwind
├── package.json          # Dependencies and scripts
└── tailwind.config.js    # Tailwind CSS configuration
```

### Backend Structure

```
backend/
├── data/                 # Course JSON data
│   ├── arduino-101.json
│   └── arduino-102.json
├── main.py               # FastAPI application
└── requirements.txt      # Python dependencies
```

## Voice Commands

The application supports voice commands through:

1. **Browser Speech Recognition API** (fallback)
2. **ElevenLabs API** (for high-quality Norwegian voice)

To set up ElevenLabs:
1. Create an account on [ElevenLabs](https://elevenlabs.io/)
2. Get your API key
3. Enter it in the Settings section of the app

## Learning Progression

The app guides children through:

1. **Introducing basic concepts** of electronics and programming
2. **Interactive demonstrations** with voice and visual guidance
3. **Simple projects** they can complete with adult supervision
4. **Achievements and badges** to track progress

## Contributing

This project is designed as an educational tool for learning coding. If you want to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Notes for Beginners

### Understanding React Components

Each `.jsx` file in the `components/` directory represents a reusable UI element. For example:

- `CourseDetail.jsx` - Shows detailed information about a selected course
- `BadgesSection.jsx` - Displays achievements the user has earned
- `SettingsDialog.jsx` - Contains configuration options for the app

### API Integration

The app uses:
- Axios for API requests to the backend
- ElevenLabs for text-to-speech in Norwegian

### Styling with Tailwind CSS

The app uses Tailwind CSS for styling:
- Utility classes in JSX elements (like `className="bg-indigo-600 text-white p-4"`)
- Custom components defined in `index.css` (like `.card`, `.btn-primary`)

## License

This project is licensed under the MIT License.