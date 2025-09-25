"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HospitalModal({ hospital, onClose }) {
  if (!hospital) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 w-[720px] max-w-full"
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-blue-700">{hospital.name}</h2>
              <p className="text-gray-600">{hospital.address}</p>
              <p className="text-sm text-gray-500">📍 {hospital.distance}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {hospital.availableOrgans?.map((o, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">{o}</span>
                ))}
              </div>
              <p className="text-gray-700 mt-3">📞 {hospital.phone}</p>
              {hospital.emergency && <p className="text-green-600 mt-1">✅ 24/7 Emergency</p>}
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Close</button>
            <a href={`tel:${hospital.phone}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Call Hospital</a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
