"use client";
import React, { useEffect, useState } from "react";

function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/enquiries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch enquiries");
        return res.json();
      })
      .then((data) => {
      
        setEnquiries(data.filter((e) => e && e.name && e.email));
      })
      .catch((err) => {
        console.error(err);
        alert("❌ " + err.message);
      })
      .finally(() => setLoading(false));
  }, []);


  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? updated : e))
      );
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Enquiry Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading enquiries...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Organ</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-black">
              {enquiries.length > 0 ? (
                enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{enq.name}</td>
                    <td className="px-4 py-2">{enq.email}</td>
                    <td className="px-4 py-2">{enq.phone}</td>
                    <td className="px-4 py-2">{enq.organ}</td>
                    <td className="px-4 py-2">{enq.message}</td>
                    <td className="px-4 py-2">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-sm font-semibold ${
                          enq.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : enq.status === "Disapproved"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => updateStatus(enq._id, "Approved")}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(enq._id, "Disapproved")}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Disapprove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No enquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EnquiriesPage;