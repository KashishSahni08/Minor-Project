"use client";
import React from "react";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";

const HospitalCard = ({ hospital, onViewDetails, onEnquire }) => {

  return (
    
    <div className="p-6 bg-white shadow-md rounded-xl mb-6 border hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-blue-700">{hospital.name}</h2>
        {hospital.emergency && (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            🚨 Emergency
          </span>
        )}
      </div>

      <p className="text-gray-700 flex items-center gap-2 mb-2">
        <FaMapMarkerAlt className="text-red-500" />
        {hospital.address}, {hospital.city}
      </p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          hospital.address
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm mb-3 inline-block"
      >
        View on Google Maps
      </a>

      <div className="flex flex-wrap gap-2 mb-4">
        {hospital.availableOrgans.map((organ, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
          >
            {organ}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6 mb-4">
        <a
          href={`tel:${hospital.phone}`}
          className="flex items-center gap-2 text-green-600 font-semibold hover:underline"
        >
          <FaPhone /> {hospital.phone}
        </a>
        <a
          href={`https://wa.me/${hospital.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-500 font-semibold hover:underline"
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => onViewDetails(hospital._id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View Details
        </button>

        <button
          onClick={() => onEnquire(hospital)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Enquiry
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;
