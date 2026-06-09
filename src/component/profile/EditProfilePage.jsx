// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ApiService from "../../service/ApiService";

// const EditProfilePage =() =>{
//     const [user,setUSer] =useState(null);
//     const[error,setError]=useState(null);
//     const navigate =useNavigate();

//     useEffect (()=>{
//         const fetchUserProfile = async () => {
//             try{
//                 const response = await ApiService.getUserProfile();
//                 setUSer(response.user);
//             }
//             catch(error){
//                 setError(error.message);
//             }
//         };

//         fetchUserProfile();
//     },[]);

//     const handleDeleteProfile = async () =>{
//         if(!window.confirm('Are you sure you want to delete your account?')){
//             return;
//         }
//         try{
//             await ApiService.deleteUser(user.id);
//             navigate('/signup');
//         }
//         catch(error){
//             setError(error.message);
//         }
//     };

//     return(
//         <div className="edit-profile-page">
//             <h2>
//                 Edit Profile
//             </h2>
//             {error && <p className="error-message">{error}</p>}
//             {user &&(
//                 <div className="profile-details">
//                     <p><strong>Name:</strong>{user.name}</p>
//                     <p><strong>Email:</strong>{user.email}</p>
//                     <p><strong>Phone Number:</strong>{user.phoneNumber}</p>
//                     <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
//                 </div>
//             )}
//         </div>
//     )
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        setUser(response.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    try {
      await ApiService.deleteUser(user.id);
      ApiService.logout();
      navigate("/"); // redirect to login
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex items-center justify-center">
      <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-lg">
        
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Edit Profile
        </h2>

        {error && (
          <p className="text-red-600 mb-4 font-semibold">{error}</p>
        )}

        {user && (
          <div className="space-y-4 text-gray-700">

            <p className="text-lg">
              <strong className="font-semibold">Name: </strong>
              {user.name}
            </p>

            <p className="text-lg">
              <strong className="font-semibold">Email: </strong>
              {user.email}
            </p>

            <p className="text-lg">
              <strong className="font-semibold">Phone Number: </strong>
              {user.phoneNumber}
            </p>

            <button
              onClick={handleDeleteProfile}
              className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              Delete Profile
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full mt-3 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;



