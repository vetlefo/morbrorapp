import React, { useState, useEffect } from 'react';
import { Mic, BookOpen, Zap, Award, Settings, Home, MessageCircle, ChevronRight, User, Cpu, Volume2 } from 'lucide-react';

// Import our components
import CourseDetail from './components/CourseDetail';
import ProfileSection from './components/ProfileSection';
import BadgesSection from './components/BadgesSection';
import CoursesSection from './components/CoursesSection';
import SettingsDialog from './components/SettingsDialog';

// Import Eleven Labs service
import elevenlabsService from './services/elevenlabsService';

const MorbrorAppen = ({ courses }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [responses, setResponses] = useState({
    greeting: 'Hei! Hva vil du lære i dag?',
    listening: 'Jeg lytter...',
    understood: 'Jeg forstod:',
    processing: 'Jeg jobber med det...',
    notUnderstood: 'Beklager, jeg forstod ikke det. Kan du prøve igjen?'
  });

  // Check if Eleven Labs API key is set on mount
  useEffect(() => {
    // We no longer auto-play on initial load since browsers block audio
    // without user interaction first
    const apiKey = elevenlabsService.getApiKey();
    console.log("Eleven Labs API key exists:", !!apiKey);
    
    // Instead of auto-playing, we'll add a welcome button that users can click
  }, []);

  // Function to handle text-to-speech
  const speakText = async (text, voiceId = elevenlabsService.VOICES.mascot) => {
    const apiKey = elevenlabsService.getApiKey();
    
    try {
      // If API key is not set, use browser's speech synthesis directly
      if (!apiKey) {
        console.log('No API key - using browser speech synthesis');
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'nb-NO'; // Norwegian Bokmål
        window.speechSynthesis.speak(utterance);
        return;
      }
      
      // Otherwise try ElevenLabs (which has fallback to browser speech)
      await elevenlabsService.speak(text, voiceId);
    } catch (error) {
      console.error('Error speaking text:', error);
      // Show a small notification that speech failed
      alert('Kunne ikke spille av lyd. Sjekk at API-nøkkelen er gyldig.');
    }
  };

  const handleMicPress = () => {
    setIsSpeaking(true);
    setShowVoiceModal(true);
    
    // Don't auto-speak, let user click the speak button in the modal
    
    // Simulate voice recognition after 2 seconds
    setTimeout(() => {
      const testCommands = [
        'Vis meg Arduino-kurset',
        'Blink med lyset!',
        'Hvordan fungerer en LED?',
        'Fortell meg om elektronikk'
      ];
      // Pick a random command for the demo
      const randomCommand = testCommands[Math.floor(Math.random() * testCommands.length)];
      setVoiceCommand(randomCommand);

      // Simulate processing and completion
      setTimeout(() => {
        setIsSpeaking(false);
        // Don't auto-speak, user needs to interact first

        // Simulate a response ready
        setTimeout(() => {
          // Don't automatically call handleVoiceCommand, let the user click a button
          // Keep modal open for user to interact
        }, 1000);
      }, 2000);
    }, 2000);
  };
  
  // New function to handle voice command with user interaction
  const executeVoiceCommand = (command) => {
    handleVoiceCommand(command);
    // Close modal after processing
    setTimeout(() => {
      setShowVoiceModal(false);
      setVoiceCommand('');
    }, 3000);
  };
  
  // Process voice commands (simplified for prototype)
  const handleVoiceCommand = (command) => {
    if (command.toLowerCase().includes('arduino') || command.toLowerCase().includes('kurs')) {
      // Find Arduino course
      const arduinoCourse = courses.find(c => c.title.toLowerCase().includes('arduino'));
      if (arduinoCourse) {
        speakText('Jeg åpner Arduino-kurset for deg!');
        setTimeout(() => {
          setSelectedCourse(arduinoCourse);
          setShowVoiceModal(false);
        }, 2000);
      }
    } else if (command.toLowerCase().includes('blink') || command.toLowerCase().includes('lys')) {
      speakText('Jeg skal vise deg hvordan du kan blinke med en LED!');
    } else if (command.toLowerCase().includes('led') || command.toLowerCase().includes('elektronikk')) {
      speakText('En LED er en lysdiode som lyser når du kobler den til strøm. Du må huske å bruke en motstand!');
    } else {
      speakText(responses.notUnderstood);
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleBackFromCourse = () => {
    setSelectedCourse(null);
  };

  // Get course icon based on title
  const getCourseIcon = (title) => {
    if (title.toLowerCase().includes('arduino')) {
      return <Cpu size={24} className="text-blue-600" />;
    } else if (title.toLowerCase().includes('elektronikk')) {
      return <Zap size={24} className="text-green-600" />;
    } else {
      return <BookOpen size={24} className="text-indigo-600" />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800">
      {/* Header - Only show if not in course detail */}
      {!selectedCourse && (
        <header className="bg-indigo-600 text-white p-4 flex items-center justify-between rounded-b-xl shadow-md">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center mr-3">
              <Cpu size={22} className="text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold">morbrorappen</h1>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <MessageCircle size={24} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </div>
            </div>
            <Settings 
              size={24} 
              className="cursor-pointer"
              onClick={() => setShowSettings(true)}
            />
          </div>
        </header>
      )}
      
      {/* Settings Dialog */}
      <SettingsDialog 
        show={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {selectedCourse ? (
          <CourseDetail course={selectedCourse} onBack={handleBackFromCourse} />
        ) : (
          <div className="h-full overflow-y-auto">
            {activeSection === 'home' && (
              <div className="p-4">
                {/* Welcome Message */}
                <div className="card mb-6">
                  <h2 className="text-lg font-bold mb-2">Hei Simen!</h2>
                  <p className="text-sm text-gray-600">
                    Hva vil du lære i dag? Trykk på mikrofonen og fortell meg!
                  </p>
                  <button 
                    onClick={() => speakText(responses.greeting)}
                    className="mt-2 py-1 px-3 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center"
                  >
                    <Volume2 size={16} className="mr-1" />
                    Hør velkomstmelding
                  </button>
                </div>

                {/* Main Microphone Button */}
                <div className="flex justify-center my-6" onClick={handleMicPress}>
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transform transition-all ${isSpeaking ? 'scale-110 bg-red-500' : 'bg-indigo-500 hover:bg-indigo-600'}`}>
                    <div className={`w-28 h-28 rounded-full flex items-center justify-center bg-white bg-opacity-20 ${isSpeaking ? 'animate-pulse' : ''}`}>
                      <Mic size={54} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Course Modules */}
                <h3 className="section-title">Dine kursmoduler</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {courses.map((course) => (
                    <div 
                      key={course.courseId} 
                      className="card cursor-pointer"
                      onClick={() => handleCourseSelect(course)}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        {getCourseIcon(course.title)}
                      </div>
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <div className="progress-bar mr-2">
                          <div className="progress-bar-fill" style={{ width: '10%' }}></div>
                        </div>
                        <span>10%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ask an Uncle Section */}
                <h3 className="section-title">Spør en Morbror</h3>
                <div className="card mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <User size={30} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Morbror Vetle</h4>
                      <p className="text-sm text-gray-500 mb-2">Jeg kan hjelpe deg med elektronikk!</p>
                      <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">Send melding</button>
                    </div>
                  </div>
                </div>

                <div className="card mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <User size={30} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Morbror Simen</h4>
                      <p className="text-sm text-gray-500 mb-2">Jeg kan hjelpe deg med koding!</p>
                      <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">Send melding</button>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <h3 className="section-title">Nylige aktiviteter</h3>
                <div className="card mb-3 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Zap size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">LED-Eksperiment</h4>
                        <p className="text-xs text-gray-500">Fullført for 2 dager siden</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>

                <div className="card cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <BookOpen size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Første Arduino-oppgave</h4>
                        <p className="text-xs text-gray-500">Påbegynt i går</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'courses' && (
              <CoursesSection courses={courses} onSelectCourse={handleCourseSelect} />
            )}

            {activeSection === 'badges' && (
              <BadgesSection />
            )}

            {activeSection === 'profile' && (
              <ProfileSection />
            )}
          </div>
        )}
      </main>

      {/* Voice Command Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 w-4/5 max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-center">
              {isSpeaking ? 'Jeg lytter...' : 'Jeg forstod:'}
            </h3>

            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
                <Mic size={40} className="text-white" />
              </div>
            </div>

            {voiceCommand && (
              <div className="bg-gray-100 p-3 rounded-lg text-center mb-4">
                "{voiceCommand}"
              </div>
            )}

            {!isSpeaking && (
              <div className="flex justify-center flex-col items-center">
                <button
                  className="btn-primary mb-3 flex items-center"
                  onClick={() => speakText(responses.understood + " " + voiceCommand)}
                >
                  <Volume2 size={18} className="mr-2" />
                  Hør kommando
                </button>
                
                <button
                  className="btn-primary mb-3"
                  onClick={() => executeVoiceCommand(voiceCommand)}
                >
                  Utfør kommando
                </button>
                
                <button
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg"
                  onClick={() => setShowVoiceModal(false)}
                >
                  Avbryt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation - Only show if not in course detail */}
      {!selectedCourse && (
        <nav className="bg-white p-3 flex justify-around items-center rounded-t-xl shadow-lg">
          <button
            className={`flex flex-col items-center ${activeSection === 'home' ? 'text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveSection('home')}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Hjem</span>
          </button>

          <button
            className={`flex flex-col items-center ${activeSection === 'courses' ? 'text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveSection('courses')}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Kurs</span>
          </button>

          <button
            className={`flex flex-col items-center ${activeSection === 'mic' ? 'text-indigo-600' : 'text-gray-500'} relative`}
            onClick={handleMicPress}
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center -mt-5 shadow-lg">
              <Mic size={24} className="text-white" />
            </div>
          </button>

          <button
            className={`flex flex-col items-center ${activeSection === 'badges' ? 'text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveSection('badges')}
          >
            <Award size={24} />
            <span className="text-xs mt-1">Badges</span>
          </button>

          <button
            className={`flex flex-col items-center ${activeSection === 'profile' ? 'text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveSection('profile')}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profil</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default MorbrorAppen;