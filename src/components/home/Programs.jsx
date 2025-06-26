import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowRight, FiClock, FiDollarSign } = FiIcons;

const Programs = () => {
  const programs = [
    {
      title: 'Fundamentals Package',
      duration: '1 Hour',
      price: '$25',
      features: [
        'Ball Handling Mastery',
        'Shooting Mechanics',
        'Defensive Footwork',
        'Basic Court Vision'
      ],
      popular: false
    },
    {
      title: 'Advanced Skills Package',
      duration: '1.5 Hours',
      price: '$30',
      features: [
        'Advanced Scoring Moves',
        'Pick & Roll Situations',
        'Film Breakdown',
        'Mental Toughness Training'
      ],
      popular: true
    },
    {
      title: 'Elite Training Package',
      duration: '1.5 Hours',
      price: '$25',
      originalPrice: '$30',
      features: [
        'All 20 Skill Modules',
        'Personalized Program',
        'Progress Analytics',
        'Direct Coach Access'
      ],
      popular: false,
      discount: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Training Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the program that best fits your goals and schedule
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                program.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
              }`}
            >
              {program.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
                  <SafeIcon icon={FiClock} />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiDollarSign} className="text-primary-600" />
                  <span className="text-3xl font-bold text-gray-900">{program.price}</span>
                  {program.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">{program.originalPrice}</span>
                  )}
                </div>
                {program.discount && (
                  <span className="text-sm text-primary-600 font-medium">Discounted Rate</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/booking"
                className={`w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  program.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                <span>Book Now</span>
                <SafeIcon icon={FiArrowRight} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Minimum booking: 3 days | Maximum booking: 4-5 days
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>View All 20 Skill Modules</span>
            <SafeIcon icon={FiArrowRight} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;