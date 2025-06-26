import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSave, FiRefreshCw, FiEdit } = FiIcons;

const ContentEditor = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'Unlock Your Basketball Potential',
      subtitle: 'Train with Julian Beard, former professional player with international experience. Master 20 specialized skill modules designed to elevate your game.',
      stats: [
        { number: '500+', label: 'Players Trained' },
        { number: '20', label: 'Skill Modules' },
        { number: '5+', label: 'Years Experience' }
      ]
    },
    about: {
      mission: 'Empower basketball players through specialized skill development in a supportive environment that builds skills, confidence, and game intelligence. We believe every player has untapped potential waiting to be unlocked.',
      vision: 'Become a leading destination for basketball skill development recognized for innovative coaching, personalized training, and athlete growth on and off the court. Building tomorrow\'s champions today.',
      achievements: [
        {
          title: 'International Experience',
          description: 'Played professionally in Italy, Germany, Spain, Ireland, and China'
        },
        {
          title: 'Record Holder',
          description: 'Multiple high school and college records and accolades'
        },
        {
          title: '500+ Players Trained',
          description: 'Mentored hundreds of athletes at all skill levels'
        },
        {
          title: 'Specialized Training',
          description: 'Expert in skill development and basketball IQ enhancement'
        }
      ]
    },
    programs: {
      description: 'Comprehensive basketball skill development covering every aspect of the game. Each module is designed by Julian Beard based on professional experience.',
      packages: [
        {
          name: 'Fundamentals Package',
          duration: '1 Hour',
          price: 25,
          features: ['Ball Handling Basics', 'Shooting Form', 'Defensive Stance', 'Court Awareness']
        },
        {
          name: 'Standard Training',
          duration: '1.5 Hours',
          price: 30,
          popular: true,
          features: ['Advanced Techniques', 'Game Situations', 'Skill Combinations', 'Performance Analysis']
        },
        {
          name: 'Elite Package',
          duration: '1.5 Hours',
          price: 25,
          originalPrice: 30,
          features: ['All 20 Skill Modules', 'Personalized Program', 'Video Analysis', 'Progress Tracking']
        }
      ]
    }
  });

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const saveContent = () => {
    localStorage.setItem('siteContent', JSON.stringify(content));
    alert('Content saved successfully!');
  };

  const resetContent = () => {
    if (window.confirm('Are you sure you want to reset all content to defaults?')) {
      localStorage.removeItem('siteContent');
      window.location.reload();
    }
  };

  const updateHeroStat = (index, field, value) => {
    const newStats = [...content.hero.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({
      ...content,
      hero: { ...content.hero, stats: newStats }
    });
  };

  const updateAchievement = (index, field, value) => {
    const newAchievements = [...content.about.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setContent({
      ...content,
      about: { ...content.about, achievements: newAchievements }
    });
  };

  const updatePackage = (index, field, value) => {
    const newPackages = [...content.programs.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setContent({
      ...content,
      programs: { ...content.programs, packages: newPackages }
    });
  };

  const updatePackageFeature = (packageIndex, featureIndex, value) => {
    const newPackages = [...content.programs.packages];
    const newFeatures = [...newPackages[packageIndex].features];
    newFeatures[featureIndex] = value;
    newPackages[packageIndex] = { ...newPackages[packageIndex], features: newFeatures };
    setContent({
      ...content,
      programs: { ...content.programs, packages: newPackages }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Editor</h2>
          <p className="text-gray-600">Edit website content and copy</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={resetContent}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} />
            <span>Reset</span>
          </button>
          <button
            onClick={saveContent}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiSave} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiEdit} />
          <span>Hero Section</span>
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, title: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <textarea
              value={content.hero.subtitle}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, subtitle: e.target.value }
              })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Hero Stats</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.hero.stats.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Number"
                      value={stat.number}
                      onChange={(e) => updateHeroStat(index, 'number', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-center font-bold text-lg"
                    />
                    <input
                      type="text"
                      placeholder="Label"
                      value={stat.label}
                      onChange={(e) => updateHeroStat(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiEdit} />
          <span>About Section</span>
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
            <textarea
              value={content.about.mission}
              onChange={(e) => setContent({
                ...content,
                about: { ...content.about, mission: e.target.value }
              })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
            <textarea
              value={content.about.vision}
              onChange={(e) => setContent({
                ...content,
                about: { ...content.about, vision: e.target.value }
              })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Achievements</label>
            <div className="space-y-4">
              {content.about.achievements.map((achievement, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Achievement Title"
                      value={achievement.title}
                      onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={achievement.description}
                      onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiEdit} />
          <span>Programs Section</span>
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Programs Description</label>
            <textarea
              value={content.programs.description}
              onChange={(e) => setContent({
                ...content,
                programs: { ...content.programs, description: e.target.value }
              })}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Training Packages</label>
            <div className="space-y-6">
              {content.programs.packages.map((pkg, packageIndex) => (
                <div key={packageIndex} className="border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Package Name"
                      value={pkg.name}
                      onChange={(e) => updatePackage(packageIndex, 'name', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={pkg.duration}
                      onChange={(e) => updatePackage(packageIndex, 'duration', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={pkg.price}
                      onChange={(e) => updatePackage(packageIndex, 'price', parseInt(e.target.value))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <input
                          key={featureIndex}
                          type="text"
                          value={feature}
                          onChange={(e) => updatePackageFeature(packageIndex, featureIndex, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder={`Feature ${featureIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pkg.popular || false}
                        onChange={(e) => updatePackage(packageIndex, 'popular', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Mark as Popular</span>
                    </label>
                    {pkg.originalPrice && (
                      <input
                        type="number"
                        placeholder="Original Price"
                        value={pkg.originalPrice}
                        onChange={(e) => updatePackage(packageIndex, 'originalPrice', parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;