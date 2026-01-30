import { useState } from 'react';
import { Heart, MessageCircle, User, Settings } from 'lucide-react';
import ProfileCard from './components/ProfileCard';
import ChatInterface from './components/ChatInterface';
import UserProfile from './components/UserProfile';
import SettingsPanel from './components/SettingsPanel';

type TabType = 'discover' | 'chat' | 'profile' | 'settings';

interface AIProfile {
  id: string;
  name: string;
  age: number;
  nativeLanguage: string;
  learningLanguage: string;
  bio: string;
  interests: string[];
  personality: string;
  avatar: string;
  fluencyLevel: string;
}

const mockAIProfiles: AIProfile[] = [
  {
    id: '1',
    name: 'María García',
    age: 28,
    nativeLanguage: 'Spanish',
    learningLanguage: 'English',
    bio: '¡Hola! I\'m a passionate teacher from Madrid who loves coffee, art, and helping people learn Spanish through natural conversation.',
    interests: ['Coffee', 'Art', 'Travel', 'Cooking'],
    personality: 'Friendly and patient',
    avatar: '👩‍🏫',
    fluencyLevel: 'Advanced'
  },
  {
    id: '2',
    name: 'Pierre Dubois',
    age: 32,
    nativeLanguage: 'French',
    learningLanguage: 'English',
    bio: 'Bonjour! I\'m a tech enthusiast from Paris who enjoys discussing technology, philosophy, and French culture over a glass of wine.',
    interests: ['Technology', 'Philosophy', 'Wine', 'Cinema'],
    personality: 'Intellectual and witty',
    avatar: '👨‍💻',
    fluencyLevel: 'Intermediate'
  },
  {
    id: '3',
    name: 'Yuki Tanaka',
    age: 25,
    nativeLanguage: 'Japanese',
    learningLanguage: 'English',
    bio: 'こんにちは! I\'m an anime fan from Tokyo who loves teaching Japanese through pop culture and everyday conversations.',
    interests: ['Anime', 'Manga', 'Video Games', 'Japanese Culture'],
    personality: 'Energetic and fun',
    avatar: '👩‍🎨',
    fluencyLevel: 'Intermediate'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matchedProfiles, setMatchedProfiles] = useState<AIProfile[]>([]);
  const [selectedChat, setSelectedChat] = useState<AIProfile | null>(null);

  const currentProfile = mockAIProfiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setMatchedProfiles([...matchedProfiles, currentProfile]);
    }
    
    if (currentProfileIndex < mockAIProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            {currentProfileIndex < mockAIProfiles.length ? (
              <ProfileCard
                profile={currentProfile}
                onSwipe={handleSwipe}
              />
            ) : (
              <div className="text-center">
                <p className="text-gray-500 mb-4">No more profiles to discover!</p>
                <button 
                  onClick={() => setCurrentProfileIndex(0)}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        );
      
      case 'chat':
        return (
          <ChatInterface
            matchedProfiles={matchedProfiles}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        );
      
      case 'profile':
        return <UserProfile />;
      
      case 'settings':
        return <SettingsPanel />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            LinguaTinder
          </h1>
          <p className="text-center text-gray-600 text-sm mt-1">
            Learn Languages Through Conversation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === 'discover' ? 'text-primary-500' : 'text-gray-500'
              }`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs mt-1">Discover</span>
            </button>
            
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors relative ${
                activeTab === 'chat' ? 'text-primary-500' : 'text-gray-500'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Chat</span>
              {matchedProfiles.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {matchedProfiles.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === 'profile' ? 'text-primary-500' : 'text-gray-500'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'text-primary-500' : 'text-gray-500'
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
