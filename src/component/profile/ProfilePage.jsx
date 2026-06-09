import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        const userPlusBookings = await ApiService.getUserBooking(response.user.id);
        setUser(userPlusBookings.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    navigate("/home");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        
        {/* Header */}
        {user && (
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            Welcome, {user.name}
          </h2>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6 ml-72">
          <button
            onClick={handleEditProfile}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 font-semibold mb-4">{error}</p>
        )}

        {/* User Details */}
        {user && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-inner">
            <h3 className="text-xl font-bold text-gray-700 mb-3">
              My Profile Details
            </h3>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700 mt-1">
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
          </div>
        )}

        {/* Booking History */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">
            My Booking History
          </h3>

          <div className="space-y-4">
            {user && user.bookings.length > 0 ? (
              user.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 bg-white shadow flex flex-col md:flex-row gap-4"
                >
                  <div className="flex-1">
                    <p>
                      <strong>Booking Code:</strong>{" "}
                      {booking.bookingConfirmationCode}
                    </p>
                    <p>
                      <strong>Check-in Date:</strong> {booking.checkInDate}
                    </p>
                    <p>
                      <strong>Check-out Date:</strong> {booking.checkOutDate}
                    </p>
                    <p>
                      <strong>Total Guests:</strong> {booking.totalNumOfGuest}
                    </p>
                    <p>
                      <strong>Room Type:</strong> {booking.roomType}
                    </p>
                  </div>

                  {/* Room Image */}
                  <img
                    src={booking.room.roomPhotoUrl}
                    alt="Room"
                    className="w-40 h-32 rounded-lg object-cover border"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;











