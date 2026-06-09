import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AddRoomPage = () => {
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState({
    roomType: "",
    roomPrice: "",
    roomDescription: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState(false);

  // Load room types
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.log("Error fetching room types", error.message);
      }
    };

    fetchRoomTypes();
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Room type selection
  const handleRoomTypeChange = (e) => {
    if (e.target.value === "new") {
      setNewRoomType(true);
      setRoomDetails((prev) => ({ ...prev, roomType: "" }));
    } else {
      setNewRoomType(false);
      setRoomDetails((prev) => ({ ...prev, roomType: e.target.value }));
    }
  };

  // File selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  // Add Room Function
  const addRoom = async () => {
    if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
      setError("All fields are required.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    if (!window.confirm("Do you want to add this room?")) return;

    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);

      if (file) formData.append("photo", file);

      const result = await ApiService.addRoom(formData);

      if (result.statusCode === 200) {
        setSuccess("Room Added Successfully!");
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Add New Room
      </h2>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}
      {success && <p className="text-green-500 text-center mb-3">{success}</p>}

      {/* Image Preview */}
      <div className="mb-4">
        {preview && (
          <img
            src={preview}
            alt="Room Preview"
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border rounded-md px-3 py-2"
        />
      </div>

      {/* Room Type */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Room Type
        </label>
        <select
          value={roomDetails.roomType}
          onChange={handleRoomTypeChange}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="">Select Room Type</option>
          {roomTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
          <option value="new">Other (Add new)</option>
        </select>

        {newRoomType && (
          <input
            type="text"
            name="roomType"
            placeholder="Enter new room type"
            value={roomDetails.roomType}
            onChange={handleChange}
            className="mt-3 w-full border px-3 py-2 rounded-md"
          />
        )}
      </div>

      {/* Room Price */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Room Price
        </label>
        <input
          type="number"
          name="roomPrice"
          value={roomDetails.roomPrice}
          onChange={handleChange}
          placeholder="Enter room price"
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Room Description */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Room Description
        </label>
        <textarea
          name="roomDescription"
          value={roomDetails.roomDescription}
          onChange={handleChange}
          placeholder="Enter room description"
          className="w-full border px-3 py-2 rounded-md"
          rows="4"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        onClick={addRoom}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Add Room
      </button>
    </div>
  );
};

export default AddRoomPage;
