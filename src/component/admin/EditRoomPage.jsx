import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState({
    roomPhotoUrl: "",
    roomType: "",
    roomPrice: "",
    roomDescription: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch room details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await ApiService.getRoomById(roomId);

        setRoomDetails({
          roomPhotoUrl: response.room.roomPhotoUrl,
          roomType: response.room.roomType,
          roomPrice: response.room.roomPrice,
          roomDescription: response.room.roomDescription,
        });
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File Upload
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

  // Update Room
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);

      if (file) formData.append("photo", file);

      const result = await ApiService.updateRoom(roomId, formData);

      if (result.statusCode === 200) {
        setSuccess("Room updated successfully.");

        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  // Delete Room
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      const result = await ApiService.deleteRoom(roomId);

      if (result.statusCode === 200) {
        setSuccess("Room deleted successfully.");

        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Edit Room
      </h2>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}
      {success && <p className="text-green-500 text-center mb-3">{success}</p>}

      {/* Image Section */}
      <div className="mb-4">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        ) : (
          roomDetails.roomPhotoUrl && (
            <img
              src={roomDetails.roomPhotoUrl}
              alt="Room"
              className="w-full h-48 object-cover rounded-md mb-3"
            />
          )
        )}

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Room Type */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Room Type</label>
        <input
          type="text"
          name="roomType"
          value={roomDetails.roomType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Room Price */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Room Price</label>
        <input
          type="number"
          name="roomPrice"
          value={roomDetails.roomPrice}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Room Description */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Room Description</label>
        <textarea
          name="roomDescription"
          value={roomDetails.roomDescription}
          onChange={handleChange}
          rows="4"
          className="w-full border px-3 py-2 rounded-md"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="w-1/2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Update Room
        </button>

        <button
          onClick={handleDelete}
          className="w-1/2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Delete Room
        </button>
      </div>
    </div>
  );
};

export default EditRoomPage;
