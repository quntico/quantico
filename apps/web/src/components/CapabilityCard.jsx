import React from 'react';
import { motion } from 'framer-motion';

function CapabilityCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glow-border rounded-xl p-6 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-4 rounded-lg bg-primary/10">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-primary heading">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default CapabilityCard;