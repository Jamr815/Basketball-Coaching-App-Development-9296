import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAward, FiGlobe, FiUsers, FiTarget, FiHeart, FiTrendingUp, FiCalendar, FiArrowRight } = FiIcons;

const About = () => {
  const achievements = [
    {
      icon: FiGlobe,
      title: 'International Experience',
      description: 'Played professionally in Italy, Germany, Spain, Ireland, and China'
    },
    {
      icon: FiAward,
      title: 'Record Holder',
      description: 'Multiple high school and college records and accolades'
    },
    {
      icon: FiUsers,
      title: '500+ Players Trained',
      description: 'Mentored hundreds of athletes at all skill levels'
    },
    {
      icon: FiTarget,
      title: 'Specialized Training',
      description: 'Expert in skill development and basketball IQ enhancement'
    }
  ];

  const values = [
    {
      icon: FiHeart,
      title: 'Character Building',
      description: 'Developing sportsmanship, leadership, and integrity on and off the court'
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Development',
      description: 'Mastering fundamental skills through proven techniques and personalized coaching'
    },
    {
      icon: FiTarget,
      title: 'Basketball IQ',
      description: 'Enhancing court awareness, strategy understanding, and decision-making abilities'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-900 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Meet Coach Julian Beard
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Former professional basketball player turned mentor, dedicated to developing 
                the next generation of basketball talent through personalized coaching and 
                proven methodologies.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">5+</div>
                  <div className="text-sm text-gray-400">Countries Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">10+</div>
                  <div className="text-sm text-gray-400">Years Pro</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">500+</div>
                  <div className="text-sm text-gray-400">Players Trained</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Coach Julian Beard"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary-50 p-8 rounded-2xl"
            >
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-6">
                <SafeIcon icon={FiTarget} className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                Empower basketball players through specialized skill development in a supportive 
                environment that builds skills, confidence, and game intelligence. We believe 
                every player has untapped potential waiting to be unlocked.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-secondary-50 p-8 rounded-2xl"
            >
              <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mb-6">
                <SafeIcon icon={FiTrendingUp} className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                Become a leading destination for basketball skill development recognized for 
                innovative coaching, personalized training, and athlete growth on and off the court. 
                Building tomorrow's champions today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
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
              Professional Background
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Years of international professional experience translated into effective coaching methodologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={achievement.icon} className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              What We Focus On
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our training philosophy centers on three core pillars that create complete basketball players
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8"
              >
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={value.icon} className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 text-lg">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              From Player to Mentor
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="mb-6">
                My journey began on the courts of my hometown, where I first fell in love with basketball. 
                Through dedication and hard work, I earned the opportunity to play at the highest levels, 
                including professional leagues across Europe and Asia.
              </p>
              <p className="mb-6">
                Playing internationally taught me more than just basketball skills—it showed me the 
                universal language of the game and how different cultures approach training and development. 
                These experiences shaped my coaching philosophy and gave me unique insights into player development.
              </p>
              <p className="mb-6">
                After my playing career, I realized my true calling was helping young athletes reach their 
                potential. Every player I work with brings their own dreams and challenges, and I'm committed 
                to providing them with the tools, knowledge, and support they need to succeed.
              </p>
              <p>
                B.E.A.R.D. Skills Training represents everything I've learned as a player and coach. 
                It's not just about basketball—it's about building character, confidence, and the 
                work ethic that leads to success in all areas of life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Experience the difference that professional coaching and personalized training can make in your game
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <SafeIcon icon={FiCalendar} />
                <span>Book Your Session</span>
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                <span>Explore Programs</span>
                <SafeIcon icon={FiArrowRight} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;