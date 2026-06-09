import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";

const ManageBookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [bookingsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    // Fetch bookings
   useEffect(() => {
    const fetchBooking = async () => {
        try {
            const response = await ApiService.getAllBookings();
            console.log("API RESPONSE ==> ", response);
            
            const allBookings = Array.isArray(response)
                ? response
                : response.bookingList || [];
                
            setBookings(allBookings);
            setFilteredBookings(allBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    fetchBooking();
}, []);

    // Filter bookings when search changes
    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term.trim() === "") {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode &&
                booking.bookingConfirmationCode
                    .toLowerCase()
                    .includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Pagination logic
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">All Bookings</h2>

            {/* Search */}
            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Filter by Booking Number:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                    className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Booking List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg shadow bg-white">
                        <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                        <p><strong>Check In:</strong> {booking.checkInDate}</p>
                        <p><strong>Check Out:</strong> {booking.checkOutDate}</p>
                        <p><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>

                        <button
                            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                        >
                            Manage Booking
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6">
                <Pagination
                    roomPerPage={bookingsPerPage}
                    totalRooms={filteredBookings.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default ManageBookingPage;
