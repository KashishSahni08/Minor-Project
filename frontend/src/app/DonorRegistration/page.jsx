'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DonorRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    bloodType: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    emergencyName: "",
    emergencyPhone: "",
    medicalHistory: "",
    organs: [],
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "organs") {
      setFormData((prev) => ({
        ...prev,
        organs: checked
          ? [...prev.organs, value]
          : prev.organs.filter((o) => o !== value),
      }));
    } else if (type === "checkbox" && name === "consent") {
      setFormData((prev) => ({ ...prev, consent: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("You must provide consent to register.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Donor registered successfully!");
      router.push("/");
    } else {
      alert("Error registering donor.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6 flex justify-center items-center">
    <button
      onClick={() => router.push("/")}
      className="absolute top-8 left-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Back to Home
    </button>
        <div className="w-full max-w-5xl bg-white p-10 rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Donor Registration Form
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Please fill in your details carefully
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div>
            <h2 className="font-semibold text-lg mb-4 text-blue-700 border-b pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" required placeholder="First Name *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
              <input name="lastName" required placeholder="Last Name *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
              <input type="email" name="email" required placeholder="Email *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
              <input type="tel" name="phone" required placeholder="Phone Number *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
              <input type="date" name="dob" required
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
              <select name="bloodType" required
                className="p-3 border rounded  text-black"
                onChange={handleChange}>
                <option value="">Select blood type</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="font-semibold text-lg mb-4 text-blue-700 border-b pb-2">
              Address Information
            </h2>
            <input name="address" required placeholder="Street Address *"
              className="w-full p-3 border rounded  text-black mb-4"
              onChange={handleChange}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="city" required placeholder="City *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
              <input name="state" required placeholder="State *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
              <input name="zip" required placeholder="ZIP Code *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h2 className="font-semibold text-lg mb-4 text-blue-700 border-b pb-2">
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="emergencyName" required placeholder="Contact Name *"
                className="p-3 border rounded bg-white text-black"
                onChange={handleChange}/>
              <input name="emergencyPhone" required placeholder="Contact Phone *"
                className="p-3 border rounded  text-black"
                onChange={handleChange}/>
            </div>
          </div>

          {/* Medical Info */}
          <div>
            <h2 className="font-semibold text-lg mb-4 text-blue-700 border-b pb-2">
              Medical Information
            </h2>
            <textarea
              name="medicalHistory"
              placeholder="Please describe any relevant medical conditions..."
              className="w-full p-3 border rounded text-black"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Organs */}
          <div>
            <h2 className="font-semibold text-lg mb-4 text-blue-700 border-b pb-2">
              Organs for Donation *
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-800">
              {["Heart", "Liver", "Kidney", "Lungs", "Pancreas", "Corneas", "Skin", "Bone Tissue"].map((organ) => (
                <label key={organ} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="organs"
                    value={organ}
                    onChange={handleChange}
                  />
                  {organ}
                </label>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div>
            <h2 className="font-semibold text-lg mb-4 text-blue-700 border-b pb-2">
              Consent
            </h2>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded border">
              <input type="checkbox" name="consent" required onChange={handleChange}/>
              <p className="text-sm text-gray-700">
                I hereby consent to donate my organs and tissues for transplantation purposes. 
                I understand this registration does not guarantee organ donation, and I can withdraw at any time.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center pt-6">
            <button type="button"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => router.push("/")}>
              Cancel
            </button>
            <button type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Register as Donor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistration;
