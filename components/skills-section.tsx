"use client";

import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layers } from 'lucide-react';

const skills = {
  'Frontend Development': {
    icon: Globe,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion','Angular'],
  },
  'Backend Development': {
    icon: Database,
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL','C#',],
  },
  'Programming Languages': {
    icon: Code2,
    skills: ['JavaScript', 'TypeScript', '.NET', 'SQL', 'HTML', 'CSS','C++'],
  },
  'Tools & Technologies': {
    icon: Layers,
    skills: ['Git', 'Docker', 'AWS', 'Firebase', 'Vercel', 'Figma'],
  },
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center md:text-left">Skills & Expertise</h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {Object.entries(skills).map(([category, { icon: Icon, skills }], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-4 md:p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <h3 className="text-lg md:text-xl font-semibold">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 md:px-3 py-0.5 md:py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;