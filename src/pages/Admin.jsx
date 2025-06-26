import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import VideoUpload from '../components/admin/VideoUpload';
import ContentEditor from '../components/admin/ContentEditor';
import DrillManager from '../components/admin/DrillManager';
import TestimonialManager from '../components/admin/TestimonialManager';
import SupabaseSetup from '../components/admin/SupabaseSetup';
import ProgramsEditor from '../components/admin/ProgramsEditor';
import PhotoManager from '../components/admin/PhotoManager';
import BookingManager from '../components/admin/BookingManager';
import ImageGallery from './ImageGallery';
import Dashboard from './Dashboard';

const { 
  FiVideo, FiEdit, FiTarget, FiUsers, FiSettings, FiDatabase, FiSave, FiPlus, 
  FiImage, FiBookOpen, FiBarChart3, FiCalendar 
} = FiIcons;

const Admin = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const adminPassword = 'beard2024'; // In production, use proper authentication

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const tabs = [
    { id: 'content', label: 'Content Editor', icon: FiEdit },
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart3 },
    { id: 'images', label: 'Image Gallery', icon: FiImage },
    { id: 'programs', label: 'Programs Manager', icon: FiBookOpen },
    { id: 'drills', label: 'Drills Library', icon: FiTarget },
    { id: 'packages', label: 'Training Packages', icon: FiCalendar },
    { id: 'photos', label: 'Photo Manager', icon: FiImage },
    { id: 'database', label: 'Database Setup', icon: FiDatabase },
    { id: 'videos', label: 'Video Manager', icon: FiVideo },
    { id: 'testimonials', label: 'Testimonials', icon: FiUsers },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter admin password to manage content</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Login to Admin Panel
            </button>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Demo Password:</strong> beard2024
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Content Management System</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('adminAuth');
                setIsAuthenticated(false);
              }}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Important Notice */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiDatabase} className="text-blue-600 mt-1" />
            <div>
              <h3 className="text-blue-900 font-semibold mb-1">Complete Admin Dashboard</h3>
              <p className="text-blue-800 text-sm">
                ✅ Enhanced drills library with media support • ✅ Training packages editor • ✅ All admin tools in one place
              </p>
            </div>
          </div>
        </div>

        {/* New Features Notice */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiPlus} className="text-green-600 mt-1" />
            <div>
              <h3 className="text-green-900 font-semibold mb-1">Enhanced Features!</h3>
              <p className="text-green-800 text-sm">
                • <strong>Drills Library:</strong> Edit all drills shown on drills page with media<br/>
                • <strong>Training Packages:</strong> Edit the packages displayed on booking page<br/>
                • <strong>Media Support:</strong> Upload or link images/videos for each drill
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                  {(tab.id === 'database' || tab.id === 'drills' || tab.id === 'packages' || tab.id === 'dashboard' || tab.id === 'images') && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tab.id === 'database' ? 'bg-red-100 text-red-800' : 
                      tab.id === 'drills' || tab.id === 'packages' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {tab.id === 'database' ? 'Important' : 
                       tab.id === 'drills' || tab.id === 'packages' ? 'Enhanced' : 'Admin Only'}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'content' && <ContentEditor />}
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'images' && <ImageGallery />}
          {activeTab === 'programs' && <ProgramsEditor />}
          {activeTab === 'drills' && <DrillManager />}
          {activeTab === 'packages' && <BookingManager />}
          {activeTab === 'photos' && <PhotoManager />}
          {activeTab === 'database' && <SupabaseSetup />}
          {activeTab === 'videos' && <VideoUpload />}
          {activeTab === 'testimonials' && <TestimonialManager />}
          {activeTab === 'settings' && <AdminSettings />}
        </motion.div>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'B.E.A.R.D. Skills Training',
    contactPhone: '573-703-5112',
    contactEmail: 'info@beardskills.com',
    bookingUrl: 'https://book.squareup.com/appointments/n7hpjjgde4r0e3/location/L4W46R1JTG86N/services',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });

  const handleSave = () => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
          <input
            type="text"
            value={settings.contactPhone}
            onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Booking URL</label>
          <input
            type="url"
            value={settings.bookingUrl}
            onChange={(e) => setSettings({ ...settings, bookingUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
            <input
              type="url"
              value={settings.socialMedia.facebook}
              onChange={(e) => setSettings({ 
                ...settings, 
                socialMedia: { ...settings.socialMedia, facebook: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <input
              type="url"
              value={settings.socialMedia.instagram}
              onChange={(e) => setSettings({ 
                ...settings, 
                socialMedia: { ...settings.socialMedia, instagram: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
            <input
              type="url"
              value={settings.socialMedia.twitter}
              onChange={(e) => setSettings({ 
                ...settings, 
                socialMedia: { ...settings.socialMedia, twitter: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiSave} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Admin;