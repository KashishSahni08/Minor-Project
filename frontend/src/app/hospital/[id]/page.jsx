import React from "react";

async function getHospital(id) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const res = await fetch(`${apiBase}/api/hospitals/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function HospitalPage({ params }) {
  const hospital = await getHospital(params.id);
  if (!hospital) return <div className="p-8"> Hospital not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{hospital.name}</h1>
      <p className="text-gray-600 mb-1">{hospital.address}</p>
      <p className="text-gray-500 mb-2">📍 {hospital.city}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Available Organs</h2>
      <div className="flex flex-wrap gap-2">
        {hospital.availableOrgans?.map((o, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
          >
            {o}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-gray-700">📞 {hospital.phone}</p>
        {hospital.emergency && (
          <p className="text-green-600 mt-1 font-medium">
            ✅ 24/7 Emergency Available
          </p>
        )}
      </div>

      <div className="mt-6">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            hospital.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          📍 View on Google Maps
        </a>
      </div>
    </div>
  );
}
