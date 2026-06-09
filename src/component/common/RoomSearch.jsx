// // import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ApiService from "../../service/ApiService";
// import { useState } from "react";

// const RoomSearch = ({ haddleSearchResult }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [roomType, setRoomType] = useState("");
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchRoomTypes = async () => {
//       try {
//         const types = await ApiService.getRoomTypes();
//         setRoomTypes(types || []);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };
//     fetchRoomTypes();
//   }, []);

//   const showError = (message, timeout = 5000) => {
//     setError(message);
//     setTimeout(() => setError(""), timeout);
//   };

//   const handleInternalSearch = async () => {
//     if (!startDate || !endDate || !roomType) {
//       showError("Please select all fields");
//       return;
//     }

//     try {
//       const formattedStartDate = startDate.toISOString().split("T")[0];
//       const formattedEndDate = endDate.toISOString().split("T")[0];

//       const response = await ApiService.getAvailableRoomsByDateAndType(
//         formattedStartDate,
//         formattedEndDate,
//         roomType
//       );

//       if (response.statusCode === 200) {
//         if (!response.roomList.length) {
//           showError(
//             "Room not available for selected type and date range"
//           );
//           return;
//         }

//         haddleSearchResult(response.roomList);
//       }
//     } catch (err) {
//       showError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <section className="w-full bg-white py-6 flex flex-col items-center">
//       <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-end gap-6 p-6 rounded-xl shadow-md bg-white">

//         {/* Check-in */}
//         <div className="flex flex-col w-full">
//           <label className="font-semibold text-gray-600 mb-1">Check-in Date</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="Select Check-in Date"
//             className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Check-out */}
//         <div className="flex flex-col w-full">
//           <label className="font-semibold text-gray-600 mb-1">Check-out Date</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="Select Check-out Date"
//             className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Room Type */}
//         <div className="flex flex-col w-full">
//           <label className="font-semibold text-gray-600 mb-1">Room Type</label>
//           <select
//             value={roomType}
//             onChange={(e) => setRoomType(e.target.value)}
//             className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select Room Type</option>
//             {roomTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleInternalSearch}
//           className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition w-full md:w-auto"
//         >
//           Search Rooms
//         </button>
//       </div>

//       {error && (
//         <p className="text-red-600 font-medium mt-4 text-center">{error}</p>
//       )}
//     </section>
//   );
// };

// export default RoomSearch;


import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../service/ApiService";

const RoomSearch = ({ haddleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types || []);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRoomTypes();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => setError(""), timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError("Please select all fields");
      return;
    }

    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const response = await ApiService.getAvailableRoomsByDateAndType(
        formattedStartDate,
        formattedEndDate,
        roomType
      );

      if (response.statusCode === 200) {
        if (!response.roomList.length) {
          showError(
            "Room not available for selected type and date range"
          );
          return;
        }

        haddleSearchResult(response.roomList);
      }
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="w-full bg-white py-6 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-end gap-6 p-6 rounded-xl shadow-md bg-white">

        {/* Check-in */}
        <div className="flex flex-col w-full">
          <label className="font-semibold text-gray-600 mb-1">Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col w-full">
          <label className="font-semibold text-gray-600 mb-1">Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Room Type */}
        <div className="flex flex-col w-full">
          <label className="font-semibold text-gray-600 mb-1">Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleInternalSearch}
          className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition w-full md:w-auto"
        >
          Search Rooms
        </button>
      </div>

      {error && (
        <p className="text-red-600 font-medium mt-4 text-center">{error}</p>
      )}
    </section>
  );
};

export default RoomSearch;
