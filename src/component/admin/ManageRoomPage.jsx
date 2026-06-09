import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import RoomResult from "../common/RoomResults";

const ManageRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] =useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRoom();
        const allRooms = response.roomList;

        setRooms(allRooms);
        setFilteredRooms(allRooms); // important!
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };

    const fetchRoomType = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.log("Error fetching room types", error.message);
      }
    };

    fetchRooms();
    fetchRoomType();
  }, []);

  const handleRoomTypeChange = (e) => {
    const type = e.target.value;
    setSelectedRoomTypes(type);

    if (type === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === type);
      setFilteredRooms(filtered);
    }

    setCurrentPage(1);
  };

  // PAGINATION
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Manage Rooms
        </h2>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <label className="font-semibold text-gray-700 mr-2">Filter By Room Type:</label>
            <select
              value={selectedRoomTypes}
              onChange={handleRoomTypeChange}
              className="border px-3 py-2 rounded-lg shadow-sm"
            >
              <option value="">All</option>
              {roomTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => navigate("/admin/add-room")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Add Room
          </button>
        </div>

        {/* Room Results */}
        <RoomResult roomSearchResults={currentRooms} />

        {/* Pagination */}
        <Pagination
          roomsPerPage={roomsPerPage}
          totalRooms={filteredRooms.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ManageRoomPage;
