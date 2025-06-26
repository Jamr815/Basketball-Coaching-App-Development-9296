import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTarget, FiUsers, FiTrendingUp, FiAward, FiVideo, FiCalendar } = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiTarget,
      title: 'Personalized Training',
      description: 'Customized skill development programs tailored to your specific needs and goals.'
    },
    {
      icon: FiUsers,
      title: 'Expert Mentorship',
      description: 'Learn from Julian Beard, former professional player with international experience.'
    },
    {
      icon: FiTrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and performance metrics.'
    },
    {
      icon: FiAward,
      title: '20 Skill Modules',
      description: 'Comprehensive training covering all aspects of basketball from fundamentals to advanced techniques.'
    },
    {
      icon: FiVideo,
      title: 'Video Analysis',
      description: 'Film breakdown and game study to enhance your basketball IQ and decision-making.'
    },
    {
      icon: FiCalendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with our integrated booking system.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Why Choose B.E.A.R.D. Training?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience professional-level basketball training with personalized attention and proven methodologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-6">
                <SafeIcon icon={feature.icon} className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;