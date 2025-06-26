import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiClock, FiDollarSign, FiPhone, FiExternalLink, FiCheck, FiInfo } = FiIcons;

const Booking = () => {
  const [selectedPackage, setSelectedPackage] = useState('standard');

  const packages = [
    {
      id: 'fundamentals',
      name: 'Fundamentals Package',
      duration: '1 Hour',
      price: 25,
      description: 'Perfect for beginners focusing on basic skills',
      features: [
        'Ball Handling Basics',
        'Shooting Form',
        'Defensive Stance',
        'Court Awareness'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Training',
      duration: '1.5 Hours',
      price: 30,
      description: 'Comprehensive training for skill development',
      features: [
        'Advanced Techniques',
        'Game Situations',
        'Skill Combinations',
        'Performance Analysis'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite Package',
      duration: '1.5 Hours',
      price: 25,
      originalPrice: 30,
      description: 'Discounted premium training package',
      features: [
        'All 20 Skill Modules',
        'Personalized Program',
        'Video Analysis',
        'Progress Tracking'
      ],
      discount: true
    }
  ];

  const timeSlots = [
    '8:00 AM', '9:30 AM', '11:00 AM', '12:30 PM',
    '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'
  ];

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleExternalBooking = () => {
    window.open('https://book.squareup.com/appointments/n7hpjjgde4r0e3/location/L4W46R1JTG86N/services', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Book Your Training Session
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your preferred training package and schedule your session with Coach Julian Beard
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Package Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Training Package</h2>
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-6">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                          {selectedPackage === pkg.id && (
                            <SafeIcon icon={FiCheck} className="text-primary-600" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        
                        <div className="flex items-center space-x-6 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <SafeIcon icon={FiClock} />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiDollarSign} className="text-primary-600" />
                            <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                            {pkg.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">${pkg.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Booking Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 bg-blue-50 p-6 rounded-xl"
            >
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiInfo} className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Booking Requirements</h3>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Minimum booking: 3 days advance notice</li>
                    <li>• Maximum booking: 4-5 days per week</li>
                    <li>• Sessions can be customized based on your goals</li>
                    <li>• All skill levels welcome</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Summary & Action */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
              
              {/* Selected Package */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">
                    {packages.find(p => p.id === selectedPackage)?.name}
                  </span>
                  <span className="font-bold text-gray-900">
                    ${packages.find(p => p.id === selectedPackage)?.price}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {packages.find(p => p.id === selectedPackage)?.duration}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="flex items-center space-x-2 text-gray-600">
                  <SafeIcon icon={FiPhone} />
                  <span>573-703-5112</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleExternalBooking}
                className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiExternalLink} />
                <span>Book on Square</span>
              </button>

              <p className="text-sm text-gray-500 mt-3 text-center">
                You'll be redirected to our secure booking platform
              </p>

              {/* Additional Options */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <a
                    href="tel:573-703-5112"
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiPhone} />
                    <span>Call Direct</span>
                  </a>
                  <a
                    href="/programs"
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiCalendar} />
                    <span>View All Programs</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What should I bring?</h3>
              <p className="text-gray-600 mb-4">
                Just bring your basketball shoes, water bottle, and ready-to-work attitude. 
                We'll provide all training equipment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I reschedule?</h3>
              <p className="text-gray-600 mb-4">
                Yes, we understand schedules change. Please provide at least 24 hours notice 
                for rescheduling.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What ages do you train?</h3>
              <p className="text-gray-600 mb-4">
                We work with players of all ages, from youth to adults. Training is 
                customized based on age and skill level.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Indoor or outdoor?</h3>
              <p className="text-gray-600 mb-4">
                We have access to both indoor and outdoor courts. Weather and availability 
                will determine the best option.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;