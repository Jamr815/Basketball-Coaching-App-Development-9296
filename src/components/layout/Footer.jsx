import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPhone, FiMail, FiMapPin, FiInstagram, FiTwitter, FiFacebook } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <span className="text-xl font-display font-bold">B.E.A.R.D.</span>
                <span className="text-sm text-gray-300 block">Skills Training</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering basketball players through specialized skill development in a supportive 
              environment that builds skills, confidence, and game intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <SafeIcon icon={FiFacebook} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <SafeIcon icon={FiInstagram} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <SafeIcon icon={FiTwitter} className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-gray-300 hover:text-primary-400 transition-colors">Programs</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Coach</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-primary-400 transition-colors">Book Session</Link></li>
              <li><Link to="/drills" className="text-gray-300 hover:text-primary-400 transition-colors">Drills Library</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-primary-400" />
                <span className="text-gray-300">573-703-5112</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="text-primary-400" />
                <span className="text-gray-300">info@beardskills.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="text-primary-400" />
                <span className="text-gray-300">Training Locations Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 B.E.A.R.D. Skills Training. All rights reserved. | Empowering Athletes Through Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;