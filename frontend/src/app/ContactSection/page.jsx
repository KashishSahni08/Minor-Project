'use client'
import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-1">
          <a href="/" className="text-sm text-indigo-600 hover:underline">
            </a>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">Contact Us</h2>
          <p className="text-gray-600 mt-4">
            Get in touch with our team. We’re here to help save lives together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <FiPhone className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Phone Support
                  </h4>
                  <p className="text-sm text-gray-600">24/7 Emergency Support</p>
                  <p className="text-blue-600 font-medium mt-1">
                    +918887739980
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <FiMail className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Email Support
                  </h4>
                  <p className="text-sm text-gray-600">General Inquiries</p>
                  <p className="text-blue-600 font-medium">
                    support@lifeconnect.org
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Medical Emergencies
                  </p>
                  <p className="text-blue-600 font-medium">
                    emergency@lifeconnect.org
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <FiMapPin className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Main Office
                  </h4>
                  <p className="text-gray-600">
                    123 Medical Center Drive <br />
                    Healthcare District <br />
                    Lucknow, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Send us a Message
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Fill out the form below and we’ll respond as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  required
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  required
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject *"
                  required
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message *"
                required
                className="w-full border rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              ></textarea>
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition"
              >
                <FiSend />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
