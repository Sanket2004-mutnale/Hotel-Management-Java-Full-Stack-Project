// import React, { useEffect, useState } from "react";
// import ApiService from "../../service/ApiService";
// import Pagination from "../common/Pagination";
// import RoomResult from "../common/RoomResults";
// import RoomSearch from "../common/RoomSearch";

// const AllRoomsPage = () => {
//     const[room,setRooms] = useState([]);
//     const[filteredRoom,setFilteredRooms] = useState([]);
//     const[roomType,setRoomTypes] =useState([]);
//     const[selectedRoomTypes,setSelectedRoomTypes] =useState('');
//     const[currentPages,setCurrentPages] =useState(1);
//     const[roomperPages,setPerPages] =useState(5);

//     const handleSearchResult =(results) => {
//         setRooms(results);
//         setFilteredRoom(results);
//     }

//     useEffect(()=>{
//         const fetchRooms =async()=>{
//             try{
//                 const response = await ApiService.getAllRoom();
//                 const allRooms = response.roomList;
//                 setRooms(allRooms);
//                 setFilteredRooms(allRooms);

//             }catch(error){
//                 console.error('Error fetching rooms:'.error.message);
//             }
//         };

//         const fetchRoomTypes = async () => {
//             try{
//                 const types = await ApiService.getRoomTypes();
//                 setRoomTypes(types);

//             }
//             catch(error){
//                 console.error('Error fetching room types:',error.message);
//             }
//         };

//         fetchRooms();
//         fetchRoomTypes();
//     },[])

//     const handleRoomTypeChange = (e) => {
//         setSelectedRoomTypes(e.target.value);
//         filteredRoom(e.target.value);
//     };

//     const filterRooms = (type) =>{
//         if (type ===''){
//             setFilteredRooms(room);
//         }
//         else{
//             const filtered = room.filter((room)=> room.roomType === type);
//             setFilteredRooms(filtered);
//         }
//         setCurrentPages(1);
//     };

//     //Pagination

//     const indexOfLastRoom = currentPages * roomperPages;
//     const indexOfFirstRoom = indexOfLastRoom - roomperPages;
//     const currentRooms = filterRooms.slice(indexOfFirstRoom , indexOfLastRoom);

//     const paginate = (pageNumber) => setCurrentPages(pageNumber);

//     return(
//         <div className="all-rooms">
//             <h2>All Rooms</h2>
//             <div className="all-room-filter-div">
//                 <label htmlFor="">Filter by Room Type:</label>
//                 <select value={selectedRoomTypes} onChange={handleRoomTypeChange} name="" id="">
//                     <option value="">All</option>
//                     {roomType.map((type) =>(
//                         <option key={type} value={type}>{type}</option>
//                     ))}
//                 </select>
//             </div>

//             <RoomSearch handleSearchResult={handleSearchResult}/>
//             <RoomResult roomSearchResults={currentRooms}/>

//             <Pagination
//                 roomsPerPages = {roomperPages}
//                 totalRooms={filterRooms.length}
//                 currentPages={currentPages} 
//                 paginate={paginate}   
//             />
//         </div>
//     )
// };
// export default AllRoomsPage;


import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import RoomResult from "../common/RoomResults";
import RoomSearch from "../common/RoomSearch";

const AllRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 5;

    const handleSearchResult = (results) => {
        setRooms(results);
        setFilteredRooms(results);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRoom();
                const allRooms = response.roomList;
                setRooms(allRooms);
                setFilteredRooms(allRooms);
            } catch (error) {
                console.error("Error fetching rooms:", error.message);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error("Error fetching room types:", error.message);
            }
        };

        fetchRooms();
        fetchRoomTypes();
    }, []);

    const handleRoomTypeChange = (e) => {
        const type = e.target.value;
        setSelectedRoomType(type);
        filterRooms(type);
    };

    const filterRooms = (type) => {
        if (type === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;

    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Page Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                All Rooms
            </h2>

            {/* Filter Section */}
            <div className="mb-6 flex items-center gap-4">
                <label className="text-lg font-medium text-gray-700">
                    Filter by Room Type:
                </label>

                <select
                    value={selectedRoomType}
                    onChange={handleRoomTypeChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                    <option value="">All</option>
                    {roomTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Room Search Component */}
            <div className="mb-6">
                <RoomSearch haddleSearchResult={handleSearchResult}/>
            </div>

            {/* Room List */}
            <RoomResult roomSearchResults={currentRooms} />

            {/* Pagination */}
            <div className="mt-6">
                <Pagination
                 totalRooms={filteredRooms.length}
                 roomPage={roomsPerPage}
                 currentPage={currentPage}
                 paginate={paginate}
                />
            </div>

        </div>
    );
};

export default AllRoomsPage;




