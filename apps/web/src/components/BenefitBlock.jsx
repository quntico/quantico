
import React from 'react';
import { motion } from 'framer-motion';

function BenefitBlock({ icon: Icon, title, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 p-4 rounded-lg glass-card"
    >
      <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h4 className="font-medium text-foreground heading">{title}</h4>
      </div>
    </motion.div>
  );
}

export default BenefitBlock;
