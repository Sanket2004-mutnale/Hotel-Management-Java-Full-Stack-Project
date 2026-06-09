// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ApiService from "../../service/ApiService";

// const RoomResult = ({roomSearchResults}) => {
//     const navigate = useNavigate();

//     const isAdmin =  ApiService.isAdmin();

//     return(
//         <section className="room-results">
//             {roomSearchResults && roomSearchResults.length>0 && (
//                 <div className="room-list">
//                     {roomSearchResults.map(room =>(
//                         <div key={room.id} className='room-list-item'>
//                             <img className="room-list-item-image" src={room.roomPhotoUrl} alt={room.roomType} />
//                             <div className="room-details">
//                                 <h3>{room.roomType}</h3>
//                                 <p>Price :${room.roomPrice} /night</p>
//                                 <p>Description : {room.roomDescription}</p>
//                             </div>
//                             <div className="book-now-div">
//                                 {isAdmin ? (
//                                     <button className="edit-now-button"
//                                     onClick={()=> navigate(`/admin/edit-room/${room.id}`)}>Edit Room</button>
//                                 ):(
//                                     <button className="book-now-button"
//                                     onClick={()=>navigate(`room-details-book/${room.id}`)}>View/Book Now 
//                                     </button>
//                                 )}

//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//         </section>
//     )
// }
// export default RoomResult;

import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const RoomResult = ({ roomSearchResults }) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  return (
    <section className="w-full py-6">
      {roomSearchResults?.length > 0 && (
        <div className="flex flex-col gap-6">
          {roomSearchResults.map((room) => (
            <div
              key={room.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white border rounded-xl shadow-sm p-4 md:p-6 gap-6"
            >
              {/* Left: Image */}
              <img
                src={room.roomPhotoUrl} alt={room.roomType}
                className="w-full md:w-48 h-32 object-cover rounded-lg shadow"
              />

              {/* Middle: Room Details */}
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-teal-700">
                  {room.roomType}
                </h3>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Price:</span> ${room.roomPrice} / night
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Description:</span>{" "}
                  {room.roomDescription}
                </p>
              </div>

              {/* Right: Button */}
              <div>
                {isAdmin ? (
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-5 py-2 rounded-lg transition"
                    onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                  >
                    Edit Room
                  </button>
                ) : (
                  <button
                    className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-2 rounded-lg transition"
                    onClick={() => navigate(`/room-details-book/${room.id}`)}
                  >
                    View/Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoomResult;

