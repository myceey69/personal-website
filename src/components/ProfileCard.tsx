import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Globe, Star } from 'lucide-react';

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

interface ProfileCardProps {
  profile: AIProfile;
  onSwipe: (direction: 'left' | 'right') => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setDragOffset({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      onSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.abs(dragOffset.x) / 200;

  const getFluencyColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Beginner': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Swipe Indicators */}
      {Math.abs(dragOffset.x) > 50 && (
        <>
          <div 
            className="absolute top-20 left-8 z-20 bg-red-500 text-white rounded-full p-4 shadow-lg"
            style={{ opacity: dragOffset.x < 0 ? opacity : 0 }}
          >
            <X className="w-8 h-8" />
          </div>
          <div 
            className="absolute top-20 right-8 z-20 bg-green-500 text-white rounded-full p-4 shadow-lg"
            style={{ opacity: dragOffset.x > 0 ? opacity : 0 }}
          >
            <Heart className="w-8 h-8" />
          </div>
        </>
      )}

      {/* Profile Card */}
      <motion.div
        ref={cardRef}
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        onMouseDown={handleMouseDown}
        whileTap={{ scale: 0.98 }}
      >
        {/* Profile Header */}
        <div className="relative h-64 bg-gradient-to-br from-pink-400 to-purple-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl">{profile.avatar}</span>
          </div>
          
          {/* Language Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium">{profile.learningLanguage}</span>
          </div>

          {/* Fluency Level */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getFluencyColor(profile.fluencyLevel)}`} />
            <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
              {profile.fluencyLevel}
            </span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-gray-600">
                {profile.nativeLanguage} → {profile.learningLanguage}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Personality</h3>
            <p className="text-gray-600">{profile.personality}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onSwipe('left')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-4 transition-all hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => onSwipe('right')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full p-4 transition-all hover:scale-110 shadow-lg"
            >
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
