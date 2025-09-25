"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

function Home() {
  const router = useRouter();
  const [organType, setOrganType] = useState("");
  const [cityType, setcityType] = useState("");

  const handleSearch = () => {
    if (!organType || !cityType) return;
    router.push(`/search?organ=${encodeURIComponent(organType)}&city=${encodeURIComponent(cityType)}`);
  };
  

  return (
    <div className="  min-h-screen bg-gradient-to-r from-green-500 to-blue-600 text-white flex flex-col">
      <div className="flex-grow">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold">❤️ LifeConnect</h1>
          <p className="mt-4 text-2xl text-center">
            Connecting organ donors with those in need through verified hospitals.
            <br /> Search for available organs and find nearby medical facilities ready to help save lives.
          </p>

          {/* Search Box */}
          <div className="mt-8 p-6 rounded-xl shadow-lg w-1/2 mx-auto text-black">
            <h2 className="flex items-center justify-center text-xl font-semibold mb-4 gap-2 text-white">
              <FiSearch className="text-2xl mb-1 text-white" />
              Find Available Organs
            </h2>

            <div className="flex gap-4">
              <select
                className="p-2 w-full bg-gray-100 text-black  rounded"
                value={organType}
                onChange={(e) => setOrganType(e.target.value)}
              >
                <option value="">Select organ type</option>
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Heart">Heart</option>
                <option value="Lung">Lung</option>
                <option value="Bone">Bone</option>
                <option value="Cornea">Cornea</option>
              </select>

             <select
                className="p-2 w-full bg-gray-100 text-black  rounded"
                value={cityType}
                onChange={(e) => setcityType(e.target.value)}
              >
                <option value="">Select city type</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Delhi"> Delhi</option>
                <option value="Mumbhi">Mumbhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
               <option value="Bangalore">Bangalore</option>
               <option value="Hyderabad">Hyderabad</option>


              </select>


              <button
                className="bg-orange-600 text-white px-4 rounded hover:bg-orange-400 transition duration-300"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* Registration Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => router.push("/DonorRegistration")}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
            >
              Register as Donor
            </button>
            <button
              onClick={() => router.push("/HospitalRegistration")}
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
            >
              Hospital Registration
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white text-blue-600 py-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            How LifeConnect Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 shadow rounded-lg bg-blue-50 text-center">
              <h3 className="text-lg font-semibold">1. Search</h3>
              <p>Select the organ type and City</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-green-50 text-center">
              <h3 className="text-lg font-semibold">2. Match</h3>
              <p>View compatible donors & hospitals</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-orange-50 text-center">
              <h3 className="text-lg font-semibold">3. Connect</h3>
              <p>Contact hospitals directly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
