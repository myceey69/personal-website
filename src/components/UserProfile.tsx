import React, { useState } from 'react';
import { User, Globe, Target, Award, Edit2, Camera } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Language Learner',
    age: 25,
    nativeLanguage: 'English',
    learningLanguage: 'Spanish',
    bio: 'Passionate about learning new languages and connecting with people from different cultures.',
    goals: ['Conversational fluency', 'Travel preparation', 'Cultural understanding'],
    level: 'Intermediate',
    streak: 7,
    completedLessons: 42,
    timeSpent: '12 hours'
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
            >
              {isEditing ? <User className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="text-xl font-semibold bg-gray-50 px-2 py-1 rounded border border-gray-200 w-full"
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
              )}
              <p className="text-gray-600">Age {profile.age}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-700">Native</span>
              </div>
              {isEditing ? (
                <select
                  value={profile.nativeLanguage}
                  onChange={(e) => setProfile({...profile, nativeLanguage: e.target.value})}
                  className="w-full bg-white px-2 py-1 rounded border border-gray-200 text-sm"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Italian</option>
                  <option>Portuguese</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                  <option>Korean</option>
                </select>
              ) : (
                <p className="font-medium text-gray-900">{profile.nativeLanguage}</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-700">Learning</span>
              </div>
              {isEditing ? (
                <select
                  value={profile.learningLanguage}
                  onChange={(e) => setProfile({...profile, learningLanguage: e.target.value})}
                  className="w-full bg-white px-2 py-1 rounded border border-gray-200 text-sm"
                >
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Italian</option>
                  <option>Portuguese</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                  <option>Korean</option>
                  <option>English</option>
                </select>
              ) : (
                <p className="font-medium text-gray-900">{profile.learningLanguage}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 resize-none"
                rows={3}
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Learning Goals</label>
            <div className="flex flex-wrap gap-2">
              {profile.goals.map((goal, index) => (
                <span
                  key={index}
                  className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  {goal}
                </span>
              ))}
              {isEditing && (
                <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  + Add Goal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-orange-50 rounded-lg p-3 mb-2">
                <span className="text-2xl font-bold text-orange-600">{profile.streak}</span>
              </div>
              <p className="text-xs text-gray-600">Day Streak</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-3 mb-2">
                <span className="text-2xl font-bold text-blue-600">{profile.completedLessons}</span>
              </div>
              <p className="text-xs text-gray-600">Lessons</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-3 mb-2">
                <span className="text-2xl font-bold text-green-600">{profile.level}</span>
              </div>
              <p className="text-xs text-gray-600">Level</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-3xl mb-1">🔥</div>
              <p className="text-xs text-gray-600">Week Warrior</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">💬</div>
              <p className="text-xs text-gray-600">Chat Master</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🌍</div>
              <p className="text-xs text-gray-600">Culture Explorer</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">📚</div>
              <p className="text-xs text-gray-600">Bookworm</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🎯</div>
              <p className="text-xs text-gray-600">Goal Getter</p>
            </div>
            <div className="text-center opacity-50">
              <div className="text-3xl mb-1">🔒</div>
              <p className="text-xs text-gray-600">Locked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
