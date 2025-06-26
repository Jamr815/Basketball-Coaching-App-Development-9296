import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { number: '500+', label: 'Players Trained', color: 'text-primary-600' },
    { number: '95%', label: 'Skill Improvement', color: 'text-green-600' },
    { number: '20', label: 'Training Modules', color: 'text-blue-600' },
    { number: '5+', label: 'Years Experience', color: 'text-purple-600' }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;