import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Programs from '../components/home/Programs';
import Testimonials from '../components/home/Testimonials';
import Stats from '../components/home/Stats';

const { FiArrowRight, FiStar, FiUsers, FiTrendingUp } = FiIcons;

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <Programs />
      <Testimonials />
      
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
              Ready to Elevate Your Game?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of players who have transformed their skills with B.E.A.R.D. Training
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <span>Book Your First Session</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;