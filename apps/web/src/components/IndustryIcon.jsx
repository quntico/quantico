
import React from 'react';
import { motion } from 'framer-motion';

function IndustryIcon({ icon: Icon, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-3 p-4"
    >
      <div className="p-4 rounded-lg glass-card hover:bg-card/60 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <span className="text-sm text-muted-foreground text-center">{label}</span>
    </motion.div>
  );
}

export default IndustryIcon;
