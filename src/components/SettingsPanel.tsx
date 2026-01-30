import React, { useState } from 'react';
import { Bell, Moon, Globe, Volume2, Shield, HelpCircle, ChevronRight, Target, BookOpen } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoTranslate: true,
    soundEffects: true,
    privacyMode: false,
    language: 'English',
    dailyGoal: 15,
    difficulty: 'Intermediate'
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelect = (key: keyof typeof settings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

        {/* Learning Preferences */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900">App Language</p>
                  <p className="text-sm text-gray-600">Choose your preferred interface language</p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) => handleSelect('language', e.target.value)}
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
                <option>Japanese</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900">Daily Goal</p>
                  <p className="text-sm text-gray-600">Minutes of practice per day</p>
                </div>
              </div>
              <select
                value={settings.dailyGoal}
                onChange={(e) => handleSelect('dailyGoal', parseInt(e.target.value))}
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              >
                <option value={5}>5 min</option>
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={60}>60 min</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900">Difficulty Level</p>
                  <p className="text-sm text-gray-600">Adjust conversation complexity</p>
                </div>
              </div>
              <select
                value={settings.difficulty}
                onChange={(e) => handleSelect('difficulty', e.target.value)}
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Native</option>
              </select>
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">App Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Get reminders for practice sessions</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Easier on the eyes at night</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900">Sound Effects</p>
                  <p className="text-sm text-gray-600">Play sounds for interactions</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('soundEffects')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEffects ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Safety</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900">Privacy Mode</p>
                  <p className="text-sm text-gray-600">Hide your profile from discovery</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('privacyMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacyMode ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacyMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-primary-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Help & Support</p>
                  <p className="text-sm text-gray-600">Get help with the app</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Developer</span>
              <span className="text-gray-900">LinguaTinder Team</span>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                Made with ❤️ for language learners worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
