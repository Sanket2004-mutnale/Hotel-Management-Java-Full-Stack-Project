import React, { useState } from "react";
import ApiService from "../../service/ApiService";

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Booking not found");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">

        {/* Title */}
        <h2 className="text-3xl font-semibold text-teal-700 text-center mb-6">
          Find Your Booking
        </h2>

        {/* Search Box */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Booking Confirmation Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow 
                       hover:bg-teal-700 transition-all"
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {/* Booking Details */}
        {bookingDetails && (
          <div className="mt-8 p-6 rounded-xl bg-gray-50 shadow-inner border">

            <h3 className="text-2xl font-semibold text-teal-700 mb-4">
              Booking Details
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</p>
              <p><strong>Check-in:</strong> {bookingDetails.checkInDate}</p>
              <p><strong>Check-out:</strong> {bookingDetails.checkOutDate}</p>
              <p><strong>Adults:</strong> {bookingDetails.numOfAdults}</p>
              <p><strong>Children:</strong> {bookingDetails.numOfChildren}</p>
            </div>

            <hr className="my-4" />

            <h3 className="text-xl font-semibold text-teal-700">Booker Details</h3>
            <div className="space-y-2 text-gray-700 mt-2">
              <p><strong>Name:</strong> {bookingDetails.user.name}</p>
              <p><strong>Email:</strong> {bookingDetails.user.email}</p>
              <p><strong>Phone:</strong> {bookingDetails.user.phoneNumber}</p>
            </div>

            <hr className="my-4" />

            <h3 className="text-xl font-semibold text-teal-700">Room Details</h3>
            <div className="mt-2 text-gray-700">
              <p><strong>Room Type:</strong> {bookingDetails.room.roomType}</p>

             
               <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes='' srcSet=''  className="ml-52 w-64 rounded-lg shadow mt-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindBookingPage;


// import React, { useState } from 'react';
// import ApiService from '../../service/ApiService';

// const FindbookingPage =() => {
//     const [confirmationCode,setConfirmationCode] = useState('');
//     const[bookingDetails,setBookingDetails] = useState(null);
//     const[error,setError] =useState('',5000);

//     const handleSearch = async () =>{
//         if(!confirmationCode.trim()){
//             setError("Please Entre a Booking confirmation code");
//             setTimeout(()=>setError(''),5000);
//             return;
//         }
//         try{
//             const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
//             setBookingDetails(response.booking);
//             setError(null);
//         }
//         catch(error){
//             setError(error.response?.data?.message || error.message);
//             setTimeout(()=>setError(''),5000);
//         }
//     };
//   return (
//     <div className='find-booking-page'>
//         <h2>Find Booking</h2>

//         <div className='search-container'>
//             <input
//                required
//                type="text"
//                placeholder='Entre your booking confirmation code'
//                value={confirmationCode}
//                onChange={(e) => setConfirmationCode(e.target.value)}
//             />
//         </div>
//         {error && <p style={{color:'red'}}>{error}</p>}
//         {bookingDetails && (
//             <div className='booking-details'>
//                 <h3>Booking Details</h3>
//                 <p>Confirmation Code:{bookingDetails.bookingConfirmationCode}</p>
//                 <p>Check-in Date:{bookingDetails.checkInDate}</p>
//                 <p>Check-out Date:{bookingDetails.checkOutDate}</p>
//                 <p>Num Of Adults:{bookingDetails.numOfAdults}</p>
//                 <p>Num Of children:{bookingDetails.numOfChildren}</p>
//                 <br />
//                 <hr />
//                 <br />

//                 <h3>Booker Details</h3>
//                 <div>
//                     <p>Name:{bookingDetails.user.name}</p>
//                     <p>Email:{bookingDetails.user.email}</p>
//                     <p>Phone Number:{bookingDetails.user.phoneNumber}</p>
//                 </div>

//                 <br />
//                 <hr />
//                 <br />

//                 <h3>Room Details</h3>

//                 <div>
//                     <p>Room Type:{bookingDetails.room.roomType}</p>
//                     <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes='' srcSet='' />
//                 </div>
//             </div>
            
//         )}
      
//     </div>
//   );
// };

// export default FindbookingPage;
