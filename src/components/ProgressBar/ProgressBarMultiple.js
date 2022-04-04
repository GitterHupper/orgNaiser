import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./ProgressBar.css";

const ProgressBarMultiple = ({ progress }) => {
  return (
    <motion.div className="progressMultiple" initial={{ width: 0 }} animate={{ width: progress + "%" }}></motion.div>
  );
};

export default ProgressBarMultiple;
