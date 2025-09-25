'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function AboutUs() {
    const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-green-500 text-white">
      <div className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Welcome to <span className="font-semibold">LifeConnect Portal</span> — 
          a platform dedicated to saving lives by connecting organ donors with 
          those in need through verified hospitals and organizations.
        </p>
      </div>

      <div className="bg-white text-gray-900 py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed">
          Our mission is simple: <span className="font-semibold">bridge the gap</span> 
          between organ donors and recipients. We aim to build a transparent, 
          accessible, and reliable network that empowers individuals to give 
          the gift of life while making the donation and transplantation process easier.
        </p>
      </div>

      <div className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Our Vision</h2>
        <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed">
          We envision a future where <span className="font-semibold">no life is lost</span> 
          due to the unavailability of organs. By leveraging technology and 
          community support, we want to create a world where organ donation 
          becomes a widely accepted act of kindness and humanity.
        </p>
      </div>


      <div className="bg-white text-gray-900 text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Join Us in Saving Lives</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Whether you’re a donor, recipient, or a hospital, LifeConnect provides 
          the tools and support needed to make organ donation easier, safer, 
          and more impactful.
        </p>
        <a
          href="/signup"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
