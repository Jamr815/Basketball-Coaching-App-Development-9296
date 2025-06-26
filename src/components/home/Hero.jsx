import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import EditableText from '../editor/EditableText';
import EditableImage from '../editor/EditableImage';
import { useVisualEditor } from '../../hooks/useVisualEditor';

const { FiPlay, FiCalendar, FiArrowRight } = FiIcons;

const Hero = () => {
  const { editMode } = useVisualEditor();

  return (
    <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-primary-300 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 border-2 border-primary-400 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Professional Basketball Training
              </span>
              
              <EditableText
                contentKey="hero.title"
                editMode={editMode}
                type="heading"
                className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 block"
              >
                Unlock Your <span className="text-primary-400">Basketball</span><br />Potential
              </EditableText>
              
              <EditableText
                contentKey="hero.subtitle"
                editMode={editMode}
                type="textarea"
                className="text-xl text-gray-300 mb-8 max-w-lg block"
              >
                Train with Julian Beard, former professional player with international experience. Master 20 specialized skill modules designed to elevate your game.
              </EditableText>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiCalendar} />
                <span>Book Training Session</span>
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-secondary-900 transition-colors"
              >
                <SafeIcon icon={FiPlay} />
                <span>Explore Programs</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-600">
              <div className="text-center">
                <EditableText
                  contentKey="hero.stats.0.number"
                  editMode={editMode}
                  className="text-2xl font-bold text-primary-400 block"
                >
                  500+
                </EditableText>
                <EditableText
                  contentKey="hero.stats.0.label"
                  editMode={editMode}
                  className="text-sm text-gray-400 block"
                >
                  Players Trained
                </EditableText>
              </div>
              <div className="text-center">
                <EditableText
                  contentKey="hero.stats.1.number"
                  editMode={editMode}
                  className="text-2xl font-bold text-primary-400 block"
                >
                  20
                </EditableText>
                <EditableText
                  contentKey="hero.stats.1.label"
                  editMode={editMode}
                  className="text-sm text-gray-400 block"
                >
                  Skill Modules
                </EditableText>
              </div>
              <div className="text-center">
                <EditableText
                  contentKey="hero.stats.2.number"
                  editMode={editMode}
                  className="text-2xl font-bold text-primary-400 block"
                >
                  5+
                </EditableText>
                <EditableText
                  contentKey="hero.stats.2.label"
                  editMode={editMode}
                  className="text-sm text-gray-400 block"
                >
                  Years Experience
                </EditableText>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <EditableImage
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Basketball Training"
                contentKey="hero.image"
                editMode={editMode}
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white text-secondary-900 p-6 rounded-xl shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiArrowRight} className="text-white text-lg" />
                </div>
                <div>
                  <EditableText
                    contentKey="hero.cta.title"
                    editMode={editMode}
                    className="font-semibold block"
                  >
                    Start Training Today
                  </EditableText>
                  <EditableText
                    contentKey="hero.cta.subtitle"
                    editMode={editMode}
                    className="text-sm text-gray-600 block"
                  >
                    From $25/session
                  </EditableText>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;