import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDatabase, FiCheck, FiX, FiCopy, FiExternalLink } = FiIcons;

const SupabaseSetup = () => {
  const [step, setStep] = useState(1);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = () => {
    const connected = localStorage.getItem('supabaseConnected') === 'true';
    setIsConnected(connected);
    if (connected) {
      setStep(4);
    }
  };

  const createTable = `
-- Create site_content table for storing editable content
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed)
CREATE POLICY "Allow all operations on site_content" 
ON site_content FOR ALL 
TO public 
USING (true) 
WITH CHECK (true);

-- Insert default content
INSERT INTO site_content (site_id, content) 
VALUES ('beard-basketball', '{}') 
ON CONFLICT (site_id) DO NOTHING;
  `;

  const testConnection = async () => {
    try {
      // Update the supabase.js file content
      const supabaseContent = `
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = '${supabaseUrl}'
const SUPABASE_ANON_KEY = '${supabaseKey}'

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
      `;

      // Store credentials
      localStorage.setItem('supabaseUrl', supabaseUrl);
      localStorage.setItem('supabaseKey', supabaseKey);
      localStorage.setItem('supabaseConnected', 'true');
      
      setIsConnected(true);
      setStep(4);
      
      // Show success message
      alert('Supabase connected successfully! Please refresh the page to activate the connection.');
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Connection failed. Please check your credentials.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (isConnected) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiCheck} className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Supabase Connected!</h2>
          <p className="text-gray-600 mb-6">
            Your content changes will now be saved permanently to your Supabase database.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('supabaseConnected');
              setIsConnected(false);
              setStep(1);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect Supabase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Supabase for Persistent Content</h2>
      
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= num ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step > num ? <SafeIcon icon={FiCheck} /> : num}
            </div>
            {num < 4 && <div className={`w-12 h-1 ${step > num ? 'bg-primary-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Step 1: Create Supabase Project</h3>
          <p className="text-gray-600">
            If you don't have a Supabase project yet, create one at supabase.com
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com</a></li>
              <li>Click "Start your project"</li>
              <li>Create a new project</li>
              <li>Wait for it to be ready (2-3 minutes)</li>
            </ol>
          </div>
          <button
            onClick={() => setStep(2)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Next: Setup Database
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Step 2: Create Database Table</h3>
          <p className="text-gray-600">
            Copy and run this SQL in your Supabase SQL Editor:
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg relative">
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{createTable}</pre>
            <button
              onClick={() => copyToClipboard(createTable)}
              className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
              title="Copy SQL"
            >
              <SafeIcon icon={FiCopy} />
            </button>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Next: Get API Keys
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Step 3: Get API Credentials</h3>
          <p className="text-gray-600">
            Get your API URL and anon key from Supabase Settings → API
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project URL
              </label>
              <input
                type="url"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anon Key
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Where to find these:</strong><br />
              1. Go to your Supabase project dashboard<br />
              2. Click Settings → API<br />
              3. Copy the URL and anon/public key
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={testConnection}
              disabled={!supabaseUrl || !supabaseKey}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              Connect Supabase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupabaseSetup;