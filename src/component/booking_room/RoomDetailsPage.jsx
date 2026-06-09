import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();

    const [roomDetails, setRoomDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalGuests, setTotalGuests] = useState(1);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userId, setUserId] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await ApiService.getRoomById(roomId);
                setRoomDetails(response.room);

                const userProfile = await ApiService.getUserProfile();
                setUserId(userProfile.user.id);

            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [roomId]);

    // Validate and calculate total price & guests
    const handleConfirmationBooking = () => {
        if (!checkInDate || !checkOutDate) {
            setErrorMessage('Please select check-in and check-out dates.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        // Ensure valid numbers
        const adults = Math.max(1, numAdults || 1);
        const children = Math.max(0, numChildren || 0);

        const oneDay = 24 * 60 * 60 * 1000;
        const totalDays = Math.round(Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / oneDay)) + 1;

        setNumAdults(adults);
        setNumChildren(children);
        setTotalGuests(adults + children);
        setTotalPrice(roomDetails.roomPrice * totalDays);
    };

    const acceptBooking = async () => {
        try {
            // Validate before sending
            if (!checkInDate || !checkOutDate) {
                setErrorMessage('Check-in and Check-out dates are required.');
                return;
            }
            if (numAdults < 1) {
                setErrorMessage('Number of adults must be at least 1.');
                return;
            }
            if (numChildren < 0) {
                setErrorMessage('Number of children cannot be negative.');
                return;
            }

           const bookingData = {
    checkInDate: new Date(checkInDate).toISOString(),
    checkOutDate: new Date(checkOutDate).toISOString(),
    numOfAdults: numAdults,   // <-- matches backend
    numOfChildren: numChildren
};

            const response = await ApiService.bookRoom(roomId, userId, bookingData);

            if (response.statusCode === 200) {
                setConfirmationCode(response.bookingConfirmationCode);
                setShowMessage(true);

                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/rooms');
                }, 8000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    if (isLoading) return <p>Loading room details...</p>;
    if (error) return <p>{error}</p>;
    if (!roomDetails) return <p>Room not found.</p>;

    const { roomType, roomPrice, roomPhotoUrl, roomDescription } = roomDetails;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
            {showMessage && (
                <p className="text-green-600 bg-green-100 p-3 rounded-md text-center font-semibold mb-4">
                    Booking successful! Confirmation Code: {confirmationCode}
                </p>
            )}

            {errorMessage && (
                <p className="text-red-600 bg-red-100 p-3 rounded-md text-center font-semibold mb-4">
                    {errorMessage}
                </p>
            )}

            <h2 className="text-3xl font-bold text-teal-700 text-center mb-6">
                Room Details
            </h2>

            <img
                src={roomPhotoUrl}
                alt={roomType}
                className="w-full max-h-80 object-cover rounded-lg shadow-md"
            />

            <div className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-800">{roomType}</h3>
                <p className="text-xl text-teal-600 font-medium">₹{roomPrice} / night</p>
                <p className="text-gray-600 mt-2">{roomDescription || "No description available"}</p>
            </div>

            <div className="mt-6">
                <button
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md transition"
                    onClick={() => setShowDatePicker(true)}
                >
                    Book Now
                </button>

                {showDatePicker && (
                    <div className="mt-5 bg-gray-50 p-5 rounded-lg border shadow">
                        <div className="flex flex-col gap-4">
                            <DatePicker
                                className="w-full p-3 border rounded-md"
                                selected={checkInDate}
                                onChange={(date) => setCheckInDate(date)}
                                selectsStart
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                placeholderText="Check-in Date"
                                dateFormat="dd/MM/yyyy"
                            />

                            <DatePicker
                                className="w-full p-3 border rounded-md"
                                selected={checkOutDate}
                                onChange={(date) => setCheckOutDate(date)}
                                selectsEnd
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                placeholderText="Check-out Date"
                                dateFormat="dd/MM/yyyy"
                            />

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="font-medium">Adults:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={numAdults}
                                        onChange={(e) => setNumAdults(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label className="font-medium">Children:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={numChildren}
                                        onChange={(e) => setNumChildren(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </div>

                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                                onClick={handleConfirmationBooking}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                )}

                {totalPrice > 0 && (
                    <div className="mt-6 bg-white border rounded-lg p-5 shadow">
                        <p className="text-lg font-medium text-gray-700">
                            Total Price: <span className="font-bold text-teal-700">₹{totalPrice}</span>
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                            Total Guests: <span className="font-bold">{totalGuests}</span>
                        </p>

                        <button
                            className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
                            onClick={acceptBooking}
                        >
                            Accept Booking
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomDetailsPage;




// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import ApiService from '../../service/ApiService';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const RoomDetailsPage = () => {
//     const navigate = useNavigate();
//     const { roomId } = useParams();
   

//     const [roomDetails, setRoomDetails] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [checkInDate, setCheckInDate] = useState(null);
//     const [checkOutDate, setCheckOutDate] = useState(null);
//     const [numAdults, setNumAdults] = useState(1);
//     const [numChildren, setNumChildren] = useState(0);

//     const [totalPrice, setTotalPrice] = useState(0);
//     const [totalGuests, setTotalGuests] = useState(1);

//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [userId, setUserId] = useState('');
//     const [showMessage, setShowMessage] = useState(false);
//     const [confirmationCode, setConfirmationCode] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);

//                 const response = await ApiService.getRoomById(roomId);
//                 setRoomDetails(response.room);

//                 const userProfile = await ApiService.getUserProfile();
//                 setUserId(userProfile.user.id);

//             } catch (error) {
//                 setError(error.response?.data?.message || error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchData();
//     }, [roomId]);


//     const handleConfirmationBooking = async () => {
//         if (!checkInDate || !checkOutDate) {
//             setErrorMessage('Please select check-in and check-out dates.');
//             setTimeout(() => setErrorMessage(''), 5000);
//             return;
//         }

//         const oneDay = 24 * 60 * 60 * 1000;
//         const totalDays = Math.round(Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / oneDay)) + 1;

//         const guests = numAdults + numChildren;
//         const total = roomDetails.roomPrice * totalDays;

//         setTotalGuests(guests);
//         setTotalPrice(total);
//     };


//     const acceptBooking = async () => {
//         try {
//             const bookingData = {
//                 checkInDate: new Date(checkInDate).toISOString(),
//                 checkOutDate: new Date(checkOutDate).toISOString(),
//                  numAdults:numAdults,
//                  numChildren:numChildren
//             };

//             const response = await ApiService.bookRoom(roomId, userId, bookingData);

//             if (response.statusCode === 200) {
//                 setConfirmationCode(response.bookingConfirmationCode);
//                 setShowMessage(true);

//                 setTimeout(() => {
//                     setShowMessage(false);
//                     navigate('/rooms');
//                 }, 8000);
//             }
//         } catch (error) {
//             setErrorMessage(error.response?.data?.message || error.message);
//             setTimeout(() => setErrorMessage(''), 5000);
//         }
//     };

//     if (isLoading) return <p>Loading room details...</p>;
//     if (error) return <p>{error}</p>;
//     if (!roomDetails) return <p>Room not found.</p>;

//     const { roomType, roomPrice, roomPhotoUrl, roomDescription } = roomDetails;

//     return (
//         <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">

//             {showMessage && (
//                 <p className="text-green-600 bg-green-100 p-3 rounded-md text-center font-semibold mb-4">
//                     Booking successful! Confirmation Code: {confirmationCode}
//                 </p>
//             )}

//             {errorMessage && (
//                 <p className="text-red-600 bg-red-100 p-3 rounded-md text-center font-semibold mb-4">
//                     {errorMessage}
//                 </p>
//             )}

//             <h2 className="text-3xl font-bold text-teal-700 text-center mb-6">
//                 Room Details
//             </h2>

//             <img
//                 src={roomPhotoUrl}
//                 alt={roomType}
//                 className="w-full max-h-80 object-cover rounded-lg shadow-md"
//             />

//             <div className="mt-6">
//                 <h3 className="text-2xl font-semibold text-gray-800">{roomType}</h3>
//                 <p className="text-xl text-teal-600 font-medium">₹{roomPrice} / night</p>
//                 <p className="text-gray-600 mt-2">
//                     {roomDescription || "No description available"}
//                 </p>
//             </div>

//             {/* Book Now */}
//             <div className="mt-6">
//                 <button
//                     className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md transition"
//                     onClick={() => setShowDatePicker(true)}
//                 >
//                     Book Now
//                 </button>

//                 {showDatePicker && (
//                     <div className="mt-5 bg-gray-50 p-5 rounded-lg border shadow">

//                         <div className="flex flex-col gap-4">
//                             <DatePicker
//                                 className="w-full p-3 border rounded-md"
//                                 selected={checkInDate}
//                                 onChange={(date) => setCheckInDate(date)}
//                                 selectsStart
//                                 startDate={checkInDate}
//                                 endDate={checkOutDate}
//                                 placeholderText="Check-in Date"
//                                 dateFormat="dd/MM/yyyy"
//                             />

//                             <DatePicker
//                                 className="w-full p-3 border rounded-md"
//                                 selected={checkOutDate}
//                                 onChange={(date) => setCheckOutDate(date)}
//                                 selectsEnd
//                                 startDate={checkInDate}
//                                 endDate={checkOutDate}
//                                 placeholderText="Check-out Date"
//                                 dateFormat="dd/MM/yyyy"
//                             />

//                             <div className="flex gap-4">

//                                 <div className="w-1/2">
//                                     <label className="font-medium">Adults:</label>
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         value={numAdults}
//                                         onChange={(e) => setNumAdults(parseInt(e.target.value))}
//                                         className="w-full p-2 border rounded-md"
//                                     />
//                                 </div>

//                                 <div className="w-1/2">
//                                     <label className="font-medium">Children:</label>
//                                     <input
//                                         type="number"
//                                         min="0"
//                                         value={numChildren}
//                                         onChange={(e) => setNumChildren(parseInt(e.target.value))}
//                                         className="w-full p-2 border rounded-md"
//                                     />
//                                 </div>

//                             </div>

//                             <button
//                                 className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
//                                 onClick={handleConfirmationBooking}
//                             >
//                                 Confirm Booking
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {totalPrice > 0 && (
//                     <div className="mt-6 bg-white border rounded-lg p-5 shadow">
//                         <p className="text-lg font-medium text-gray-700">
//                             Total Price: <span className="font-bold text-teal-700">₹{totalPrice}</span>
//                         </p>
//                         <p className="text-lg font-medium text-gray-700">
//                             Total Guests: <span className="font-bold">{totalGuests}</span>
//                         </p>

//                         <button
//                             className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
//                             onClick={acceptBooking}
//                         >
//                             Accept Booking
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RoomDetailsPage;










// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import ApiService from '../../service/ApiService';
// import DatePicker from 'react-datepicker';

// const RoomDetailsPage =() => {
//     const navigate = useNavigate();
//     const {roomId} = useParams();
//     const [roomDetails,setRoomDetails]=useState(null);
//     const [isLoading,setIsLoading]=useState(true);
//     const [error,setError]=useState(null);
//     const [checkInDate,setCheckInDate]=useState(null);
//     const [checkOutDate,setCheckOutDate]=useState(null);
//     const [numAdults,setNumAdults]=useState(1);
//     const [numChildren,setNumChildren]=useState(0);
//     const [totalPrice,setTotalPrice]=useState(0);
//     const [totalGuests,setTotalGuests]=useState(1);
//     const [showDatePicker,setShowDatePicker]=useState(false);
//     const [userId,setUserId]=useState('');
//     const [showMessage,setShowMessage]=useState(false);
//     const [confirmationCode,setConfirmationCode]=useState('');
//     const [errorMessage,setErrorMessage]=useState('');

//     useEffect (()=>{
//         const fetchDate =async()=>{
//             try{
//                 setIsLoading(true);
//                 const response = await ApiService.getRoomById(roomId);
//                 setRoomDetails(response.room);
//                 const userProfile = await ApiService.getUserProfile();
//                 setUserId(userProfile.user.id);
//             }
//             catch(error){
//                 setError(error.response?.data?.message || error.message);
//             }
//             finally{
//                 setIsLoading(false);
//             }
//         };
//         fetchDate();
//     },[roomId]);

//     const handleConfirmationBooking = async => {

//         if(!checkInDate || ! checkOutDate){
//             setErrorMessage('Please select check-in and check-out dates.');
//             setTimeout(()=>setErrorMessage(''),5000);
//             return;
//         }

//         if(isNaN(numAdults) || numAdults<1 || isNaN(numChildren) || numChildren<0){
//             setErrorMessage('Please entre valid number for adults And Children.')
//              setTimeout(()=>setErrorMessage(''),5000);
//             return;
//         }

//         const oneDay = 24 * 60 * 60 * 1000;
//         const startdate = new Date(checkInDate);
//         const endDate =new Date (checkOutDate);
//         const totalDays = Math.round(Math.abs((endDate-startdate)/oneDay))+1;

//         const totalGuests = numAdults + numChildren;

//         const roomPricePerNight = roomDetails.roomPrice;
//         const totalPrice = roomPricePerNight * totalDays;

//         setTotalPrice(totalPrice);
//         setTotalGuests(totalGuests);
//     };

//     const acceptBooking = async () => {
//         try{
//             const startDate = new Date(checkInDate);
//             const endDate = new Date (checkOutDate);

//             const formattedCheckInDate = new Date(startDate.getTime()-(startDate.getTimezoneOffset()*60000)).toISOString();
//             const formattedCheckOutDate = new Date(endDate.getTime()-(endDate.getTimezoneOffset()*60000)).toISOString();

//             const booking ={
//                 checkInDate:formattedCheckInDate,
//                 checkOutDate:formattedCheckOutDate,
//                 numAdults:numAdults,
//                 numChildren:numChildren
//             };

//             const response =await ApiService.bookRoom(roomId,userId,booking);
//             if(response.statusCode === 200){
//                 setConfirmationCode(response.bookingConfirmationCode);
//                 setShowMessage(true);

//                 setTimeout(() => {
//                     setShowMessage(false);
//                     navigate('/rooms');
//                 },10000)
//             }
//         }
//         catch(error){
//             setErrorMessage(error.response?.data?.message || error.message);
//             setTimeout(() => setErrorMessage(''),5000);
//         }
//     };

//     if(isLoading){
//         return <p className='room-details-loading'>Loading roomDetails....</p>
//     }
//     if(error){
//         return <p className='room-details-loading'>{error}</p>
//     }
//     if(!roomDetails){
//         return <p className='room-details-loading'>Room not found.</p>
//     }

//     const {roomType,roomPrice,roomPhotoUrl,description,booking}= roomDetails;
//   return (
//     <div className='room-details-booking'>
//         {showMessage && (
//             <p className='booking-success-message'>
//                 Booking successful! Confirmation code:{confirmationCode}. An SMS and email of your booking Details have b
//             </p>
//         )}

//         {errorMessage && (
//             <p className='error-message'>{errorMessage}</p>
//         )}
      
//       <h2>Room Details</h2>
//       <br />
//       <img src={roomPhotoUrl} alt={roomType} className='room-details-image'/>
//       <div className='room-details-info'>
//         <h3>{roomType}</h3>
//         <p>Price : ${roomPrice} / night</p>
//         <p>{description}</p>
//       </div>
//       {booking && booking.length >0 &&(
//         <div>
//             <h3>
//                 Existing Booking Details
//             </h3>
//             <ul className='booking-list'>
//                 {
//                     booking.map((booking,index)=>(
//                         <li key={booking.id} className='booking-item'>
//                             <span className='booking-number'>Booking {index + 1}</span>
//                             <span className='booking-text'>Check-in:{booking.checkInDate}</span>
//                             <span className='booking-text'>Check-Out:{booking.checkOutDate}</span>
//                         </li>
//                     ))
//                 }
//             </ul>
//         </div>
//       )}

//       <div className='booking-info'>
//         <button className='book-now-button' onClick={()=>setShowDatePicker(true)}>Book Now</button>
//         <button className='go-back-button' onClick={()=>setShowDatePicker(false)}>Go Back</button>
//         {showDatePicker && (
//             <div className='date-picker-container'>
//                 <DatePicker
//                     className='detail-search-field'
//                     selected={checkInDate}
//                     onChange={(date)=>setCheckInDate(date)}
//                     selectsStart
//                     startDate={checkInDate}
//                     endDate={checkOutDate}
//                     placeholderText='Check-in Date'
//                     dateFormat={dd/mm/yyyy}
//                 />
//                 <DatePicker
//                     className='detail-search-field'
//                     selected={checkOutDate}
//                     onChange={(date)=>setCheckInDate(date)}
//                     selectsStart
//                     startDate={checkInDate}
//                     endDate={checkOutDate}
//                     placeholderText='Check-in Date'
//                     dateFormat={dd/mm/yyyy}
//                 />
//                 <div className='guest-container'>
//                     <div className='guest-div'>
//                         <label>Adults:</label>
//                         <input type="number"
//                         min="1"
//                         value={numAdults} 
//                         onChange={(e)=>setNumAdults(parseInt(e.target.value))}/>

//                     </div>
//                     <div className='guest-div'>
//                         <label htmlFor="">Children:</label>
//                          <input type="number"
//                         min="0"
//                         value={numChildren} 
//                         onChange={(e)=>setNumChildren(parseInt(e.target.value))}/>

//                     </div>
//                     <button className='confirm-booking' onClick={handleConfirmationBooking}>Confirm Booking</button>

//                 </div>
//             </div>
//         )}

//         {totalPrice > 0 && (
//             <div className='total-price'>
//                 <p>Total Price : ${totalPrice}</p>
//                 <p>Total Guests:{totalGuests}</p>
//                 <button onClick={acceptBooking} className='accept-booking'>Accept Booking</button>
//             </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default RoomDetailsPage;
