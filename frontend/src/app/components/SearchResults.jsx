"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HospitalCard from "../components/HospitalCard";

export default function SearchResults({ organ, city }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [enquiryHospital, setEnquiryHospital] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!organ && !city) return;

    const fetchHospitals = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search?city=${encodeURIComponent(
            city
          )}&organ=${encodeURIComponent(organ)}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch hospitals");
        }

        const data = await res.json();
        setHospitals(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Could not load hospitals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [organ, city]);

  // Fetch hospital details
  const handleViewDetails = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hospitals/${id}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch hospital details");
      const data = await res.json();
      setSelectedHospital(data);
    } catch (error) {
      console.error("Error fetching hospital details:", error);
    }
  };

  // Submit enquiry (no admin token required)
  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!enquiryHospital?._id) {
      alert("Please select a hospital first");
      return;
    }

    const formData = new FormData(e.target);
    const enquiry = {
      hospitalId: enquiryHospital._id,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      organ: formData.get("organ"),
      message: formData.get("message"),
    };

    console.log("Sending enquiry:", enquiry);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to submit enquiry");
      }

      const savedEnquiry = await res.json();
      console.log("Enquiry saved:", savedEnquiry);
      alert("✅ Enquiry submitted successfully!");
      setEnquiryHospital(null);
      e.target.reset();
    } catch (err) {
      console.error("❌ Enquiry submit error:", err);
      alert("❌ Something went wrong: " + err.message);
    }
  };

  return (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold text-blue-700 mb-2">Search Results</h2>

    {loading ? (
      <p className="text-gray-600 mb-6"> Loading hospitals...</p>
    ) : hospitals.length > 0 ? (
      <p className="text-gray-600 mb-6">
        Found {hospitals.length} hospitals with available{" "}
        <span className="font-semibold">{organ}</span> in{" "}
        <span className="font-semibold">{city}</span>
      </p>
    ) : (
      <p className="text-red-500 mb-6">
        No hospitals found with available {organ} in {city}.
      </p>
    )}


      {/* Hospital Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital._id}
            hospital={hospital}
            onViewDetails={() => handleViewDetails(hospital._id)}
            onEnquire={() => setEnquiryHospital(hospital)}
          />
        ))}
      </div>

      {/* Hospital Details Modal */}
      <AnimatePresence>
        {selectedHospital && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={() => setSelectedHospital(null)}
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {selectedHospital.name}
              </h2>
              <p className="text-gray-600 mb-2">{selectedHospital.address}</p>
              <p className="text-gray-500 mb-2">📍 {selectedHospital.city}</p>
              <p className="text-gray-700 mb-2">📞 {selectedHospital.phone}</p>
              {selectedHospital.emergency && (
                <p className="text-green-600 text-sm mb-2">
                  ✅ 24/7 Emergency Available
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {enquiryHospital && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative text-black"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 text-black hover:text-gray-500"
                onClick={() => setEnquiryHospital(null)}
              >
                ✖
              </button>

              <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
                Enquiry for Donor – {enquiryHospital.name}
              </h2>

              <form onSubmit={handleSubmitEnquiry} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  required
                  className="w-full p-2 border rounded"
                />

                <select
                  name="organ"
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Organ</option>
                  {enquiryHospital.availableOrgans.map((org, idx) => (
                    <option key={idx} value={org}>
                      {org}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  placeholder="Write your message"
                  rows="4"
                  className="w-full p-2 border rounded"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Submit Enquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
