'use client';

import { motion } from "framer-motion";

export default function Template({ children }) {
    return (
        <motion.div
            className="w-full h-full"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}