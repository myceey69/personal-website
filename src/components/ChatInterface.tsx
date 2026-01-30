import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Mic, Volume2, BookOpen, Lightbulb } from 'lucide-react';

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

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  translation?: string;
  correction?: string;
}

interface ChatInterfaceProps {
  matchedProfiles: AIProfile[];
  selectedChat: AIProfile | null;
  onSelectChat: (profile: AIProfile | null) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  matchedProfiles,
  selectedChat,
  onSelectChat,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (_userMessage: string): string => {
    const responses = [
      "That's interesting! Tell me more about that.",
      "I love learning about different cultures. What's your favorite tradition?",
      "Your pronunciation is getting better! Keep practicing.",
      "Let me help you with that phrase. In Spanish, we would say 'hola' for hello.",
      "That's a great question! The grammar rule here is quite simple once you understand it.",
      "I enjoy our conversations! How was your day?",
      "Great job! You're making excellent progress with your language skills.",
      "Let's practice that together. Can you try saying it again?",
      "I love that you're so dedicated to learning! What motivates you?",
      "That's a perfect example of how this grammar rule works in real conversation.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
        translation: "This is a translation example",
        correction: inputText.includes('good') ? "Try using 'excellent' for more emphasis!" : undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          <p className="text-gray-600 text-sm mt-1">
            Start a conversation with your language partners
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {matchedProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <BookOpen className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-center px-4">
                No matches yet! Start swiping to find language partners.
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {matchedProfiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => onSelectChat(profile)}
                  className="w-full bg-white rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-3xl">{profile.avatar}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-600">
                      {profile.nativeLanguage} → {profile.learningLanguage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectChat(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-2xl">{selectedChat.avatar}</span>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
            <p className="text-sm text-gray-600">
              Learning {selectedChat.learningLanguage}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              
              {message.translation && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <p className="text-xs opacity-90">
                    💬 {message.translation}
                  </p>
                </div>
              )}
              
              {message.correction && (
                <div className="mt-2 pt-2 border-t border-gray-300">
                  <p className="text-xs text-blue-600">
                    💡 {message.correction}
                  </p>
                </div>
              )}
              
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex gap-2 mt-2">
          <button className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors">
            <Lightbulb className="w-3 h-3" />
            Get Help
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs hover:bg-green-100 transition-colors">
            <BookOpen className="w-3 h-3" />
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
