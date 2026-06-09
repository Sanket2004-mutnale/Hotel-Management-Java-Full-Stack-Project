import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AdminPage = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await ApiService.getUserProfile();
        setAdminName(response.user?.name || "Admin");
      } catch (error) {
        console.error("Error fetching admin details", error.message);
      }
    };

    fetchAdminName();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg text-center">

        <h1 className="text-3xl font-bold text-indigo-600">
          Welcome, {adminName}
        </h1>

        <p className="text-gray-600 mt-2 mb-6">
          Manage hotel operations efficiently
        </p>

        <div className="space-y-4">
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
            onClick={() => navigate("/admin/manage-rooms")}
          >
            Manage Rooms
          </button>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/admin/manage-bookings")}
          >
            Manage Bookings
          </button>

          <button
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AdminPage;







