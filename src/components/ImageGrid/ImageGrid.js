import React from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import "./ImageGrid.css";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  let sortedDocs;
  if (docs) sortedDocs = [].concat(docs).sort((a, b) => b.createdAt - a.createdAt);
  return (
    <div className="img-grid">
      {docs &&
        sortedDocs.map((doc, i) => (
          <motion.div
            className="img-wrap"
            key={i}
            onClick={() => setSelectedImg(doc.url)}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.img
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              src={doc.url}
              alt="uploaded pic"
              loading="lazy"
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
