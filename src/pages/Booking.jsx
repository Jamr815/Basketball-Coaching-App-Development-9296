import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import EditableText from '../components/editor/EditableText';
import { useVisualEditor } from '../hooks/useVisualEditor';

const { FiCalendar, FiClock, FiDollarSign, FiPhone, FiExternalLink, FiCheck, FiInfo, FiTarget } = FiIcons;

const Booking = () => {
  const { editMode } = useVisualEditor();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = () => {
    const savedPackages = localStorage.getItem('bookingPackages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    } else {
      // Default packages if none saved
      const defaultPackages = [
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
          ],
          popular: false
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
          popular: false,
          discount: true
        }
      ];
      setPackages(defaultPackages);
    }
  };

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
          <EditableText
            contentKey="booking.title"
            editMode={editMode}
            type="heading"
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 block"
          >
            Book Your Training Session
          </EditableText>
          <EditableText
            contentKey="booking.subtitle"
            editMode={editMode}
            type="textarea"
            className="text-xl text-gray-600 max-w-3xl mx-auto block"
          >
            Choose your preferred training package and schedule your session with Coach Julian Beard
          </EditableText>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Package Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Packages</h2>

              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="relative p-6 rounded-xl border-2 border-gray-200 bg-white"
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
                          {pkg.discount && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Discount
                            </span>
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
                    <EditableText
                      contentKey="booking.requirements.title"
                      editMode={editMode}
                      className="font-semibold text-blue-900 mb-2 block"
                    >
                      Booking Requirements
                    </EditableText>
                    <EditableText
                      contentKey="booking.requirements.content"
                      editMode={editMode}
                      type="textarea"
                      className="text-blue-800 block"
                    >
                      • Minimum booking: 3 days advance notice • Maximum booking: 4-5 days per week • Sessions can be customized based on your goals • All skill levels welcome
                    </EditableText>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Booking Action */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ready to Book?</h3>
              
              {/* Contact Information */}
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="flex items-center space-x-2 text-gray-600">
                  <SafeIcon icon={FiPhone} />
                  <EditableText
                    contentKey="booking.contact.phone"
                    editMode={editMode}
                    className="inline"
                  >
                    573-703-5112
                  </EditableText>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleExternalBooking}
                className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 mb-4"
              >
                <SafeIcon icon={FiExternalLink} />
                <span>Book on Square</span>
              </button>

              <EditableText
                contentKey="booking.redirect.notice"
                editMode={editMode}
                className="text-sm text-gray-500 text-center block mb-6"
              >
                You'll be redirected to our secure booking platform
              </EditableText>

              {/* Additional Options */}
              <div className="pt-6 border-t border-gray-200">
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
                    <SafeIcon icon={FiTarget} />
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
          <EditableText
            contentKey="booking.faq.title"
            editMode={editMode}
            type="heading"
            className="text-2xl font-bold text-gray-900 mb-8 text-center block"
          >
            Frequently Asked Questions
          </EditableText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <EditableText
                contentKey="booking.faq.q1.question"
                editMode={editMode}
                className="font-semibold text-gray-900 mb-2 block"
              >
                What should I bring?
              </EditableText>
              <EditableText
                contentKey="booking.faq.q1.answer"
                editMode={editMode}
                type="textarea"
                className="text-gray-600 mb-4 block"
              >
                Just bring your basketball shoes, water bottle, and ready-to-work attitude. We'll provide all training equipment.
              </EditableText>
            </div>
            <div>
              <EditableText
                contentKey="booking.faq.q2.question"
                editMode={editMode}
                className="font-semibold text-gray-900 mb-2 block"
              >
                Can I reschedule?
              </EditableText>
              <EditableText
                contentKey="booking.faq.q2.answer"
                editMode={editMode}
                type="textarea"
                className="text-gray-600 mb-4 block"
              >
                Yes, we understand schedules change. Please provide at least 24 hours notice for rescheduling.
              </EditableText>
            </div>
            <div>
              <EditableText
                contentKey="booking.faq.q3.question"
                editMode={editMode}
                className="font-semibold text-gray-900 mb-2 block"
              >
                What ages do you train?
              </EditableText>
              <EditableText
                contentKey="booking.faq.q3.answer"
                editMode={editMode}
                type="textarea"
                className="text-gray-600 mb-4 block"
              >
                We work with players of all ages, from youth to adults. Training is customized based on age and skill level.
              </EditableText>
            </div>
            <div>
              <EditableText
                contentKey="booking.faq.q4.question"
                editMode={editMode}
                className="font-semibold text-gray-900 mb-2 block"
              >
                Indoor or outdoor?
              </EditableText>
              <EditableText
                contentKey="booking.faq.q4.answer"
                editMode={editMode}
                type="textarea"
                className="text-gray-600 mb-4 block"
              >
                We have access to both indoor and outdoor courts. Weather and availability will determine the best option.
              </EditableText>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;