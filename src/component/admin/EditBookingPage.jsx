import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();

    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);

    const achieveBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to archive this booking?")) return;

        try {
            const response = await ApiService.cancelBooking(bookingId);

            if (response.statusCode === 200) {
                setSuccess("The booking was successfully archived.");

                setTimeout(() => {
                    setSuccess(null);
                    navigate("/admin/manage-bookings");
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);

            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">Booking Details</h2>

            {error && (
                <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                    {error}
                </p>
            )}

            {success && (
                <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
                    {success}
                </p>
            )}

            {bookingDetails && (
                <div className="space-y-6">
                    {/* Booking Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Booking Information</h3>
                        <p><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</p>
                        <p><strong>Check-In:</strong> {bookingDetails.checkInDate}</p>
                        <p><strong>Check-Out:</strong> {bookingDetails.checkOutDate}</p>
                        <p><strong>Adults:</strong> {bookingDetails.numOfAdults}</p>
                        <p><strong>Children:</strong> {bookingDetails.numOfChildren}</p>
                       
                    </div>

                    <hr />

                    {/* User Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">User Information</h3>
                        <p><strong>Name:</strong> {bookingDetails.user.name}</p>
                        <p><strong>Email:</strong> {bookingDetails.user.email}</p>
                        <p><strong>Phone:</strong> {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <hr />

                    {/* Room Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Room Information</h3>
                        <p><strong>Room Type:</strong> {bookingDetails.room.roomType}</p>
                        <p><strong>Price:</strong> ₹{bookingDetails.room.roomPrice}</p>
                        <p><strong>Description:</strong> {bookingDetails.room.roomDescription}</p>

                        <img
                            src={bookingDetails.room.roomPhotoUrl}
                            alt="Room"
                            className="ml-52 w-80 h-56 object-cover rounded mt-3 shadow"
                        />
                    </div>

                    {/* Archive Button */}
                    <button
                        onClick={() => achieveBooking(bookingDetails.id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-lg font-semibold transition"
                    >
                        Achive Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;
