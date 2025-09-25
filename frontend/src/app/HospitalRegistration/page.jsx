'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HospitalRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hospitalName: "",
    registrationNumber: "",
    licenseNumber: "",
    hospitalType: "",
    contactPersonName: "",
    designation: "",
    email: "",
    primaryPhone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    bedCapacity: "",
    icuBeds: "",
    emergencyServices: false,
    traumaCenter: false,
    transplantPrograms: [],
    accreditations: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "transplantPrograms") {
      setFormData((prev) => ({
        ...prev,
        transplantPrograms: checked
          ? [...prev.transplantPrograms, value]
          : prev.transplantPrograms.filter((p) => p !== value),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("You must agree to the terms to register.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/hospitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Hospital registered successfully!");
      router.push("/");
    } else {
      alert("Error registering hospital.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">


      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Hospital Registration
        </h1>
        <p className="text-gray-600 mb-6">Join the LifeConnect network</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Hospital Info */}
          <h2 className="font-semibold text-lg text-black">Hospital Information</h2>
          <input name="hospitalName" required placeholder="Hospital Name *" className="w-full p-2 border rounded" onChange={handleChange}/>
          <input name="registrationNumber" required placeholder="Hospital Registration Number *" className="w-full p-2 border rounded" onChange={handleChange}/>
          <input name="licenseNumber" required placeholder="Medical License Number *" className="w-full p-2 border rounded" onChange={handleChange}/>
          <select name="hospitalType" required className="w-full p-2 border rounded" onChange={handleChange}>
            <option value="">Select hospital type</option>
            <option>Government</option>
            <option>Private</option>
            <option>Charitable</option>
            <option>Teaching</option>
          </select>

          {/* Contact Person */}
          <h2 className="font-semibold text-lg">Contact Person Information</h2>
          <input name="contactPersonName" required placeholder="Contact Person Name *" className="w-full p-2 border rounded" onChange={handleChange}/>
          <input name="designation" required placeholder="Designation * (e.g., Chief Medical Officer)" className="w-full p-2 border rounded" onChange={handleChange}/>
          <input type="email" name="email" required placeholder="Email *" className="w-full p-2 border rounded" onChange={handleChange}/>
          <input type="tel" name="primaryPhone" required placeholder="Primary Phone *" className="w-full p-2 border rounded" onChange={handleChange}/>
          <input type="tel" name="alternatePhone" placeholder="Alternate Phone" className="w-full p-2 border rounded" onChange={handleChange}/>

          {/* Address */}
          <h2 className="font-semibold text-lg">Hospital Address</h2>
          <input name="address" required placeholder="Street Address *" className="w-full p-2 border rounded" onChange={handleChange}/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="city" required placeholder="City *" className="p-2 border rounded" onChange={handleChange}/>
            <input name="state" required placeholder="State *" className="p-2 border rounded" onChange={handleChange}/>
            <input name="zip" required placeholder="ZIP Code *" className="p-2 border rounded" onChange={handleChange}/>
          </div>

        
          {/* Services */}
          <h2 className="font-semibold text-lg">Hospital Services</h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="emergencyServices" onChange={handleChange}/>
            24/7 Emergency Services
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="traumaCenter" onChange={handleChange}/>
            Donar Center
          </label>

      

          {/* Accreditations */}
          <h2 className="font-semibold text-lg">Accreditations & Certifications</h2>
          <textarea
            name="accreditations"
            placeholder="List your hospital's accreditations (JCAHO, NABH, ISO, etc.)"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          ></textarea>

          {/* Consent */}
          <div className="flex items-start gap-2">
            <input type="checkbox" name="consent" required onChange={handleChange}/>
            <p className="text-sm text-gray-600">
              I hereby certify that all information provided is accurate and complete. 
              I understand that LifeConnect will verify all credentials and licenses before approving our hospital 
              for the organ donation network. I agree to comply with all ethical guidelines and legal requirements.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button type="button" className="px-4 py-2 border rounded text-gray-600" onClick={() => router.push("/")}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalRegistration;