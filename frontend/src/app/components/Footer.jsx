'use client'
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-4 mt-auto">
      <div className="w-full px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between w-full py-4 md:flex-row">
          
          <p className="mb-4 text-sm text-center text-gray-200 md:mb-0">
            © {new Date().getFullYear()} LifeConnect. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-gray-200 sm:justify-center">
            <a href="#" className="hover:text-gray-400 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
