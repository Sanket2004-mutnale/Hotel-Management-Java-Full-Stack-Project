import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber } = formData;
    if (!name || !email || !password || !phoneNumber) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage("Please fill all the fields.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    try {
      const response = await ApiService.registerUser(formData);

      if (response.statusCode === 200) {
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
        });

        setSuccessMessage("User registered successfully!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Sign Up
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-center font-semibold mb-4">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-600 text-center font-semibold mb-4">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 
              focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 
              focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 
              focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 
              focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg
            hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;














// import React, { useState } from "react";
// import ApiService from "../../service/ApiService";
// import { useNavigate } from "react-router-dom";

// function RegisterPage(){
//     const navigate = useNavigate();

//     const [formData ,setFormData] = useState({
//         name:'',
//         email:'',
//         password:'',
//         phoneNumber:''
//     });

//     const [errorMessage,setErrorMessage] = useState('');
//     const [successMessage,setSuccessMessage] = useState('');

//     const handleInputChange = (e) =>{
//         const {name , value} =e.target;
//         setFormData({...formData,[name]:value});
//     };

//     const validateForm =() =>{
//         const {name,email,pasword,phoneNumber}=formData;
//         if(!name || !email || !pasword || !phoneNumber){
//             return false;
//         }
//         return true;
//     };
//     const handleSubmit = async(e) =>{
//         e.preventDefault();
//         if(!validateForm()){
//             setErrorMessage('Please fill all the fields.');
//             setTimeout(()=>setErrorMessage(''),5000);
//             return;
//         }
//         try{
//             const response = await ApiService.registerUser(formData);

//             if(response.statusCode === 200){
//                 setFormData({
//                     name:'',
//                     email:'',
//                     password:'',
//                     phoneNumber:''
//                 })
//                 setSuccessMessage('User registered successfully');
//                 setTimeout(()=>{
//                     setSuccessMessage('');
//                     navigate('/');
//                 },3000)
//             }
//         }
//         catch(error){
//                 setErrorMessage(error,response?.data?.message || error.message);
//                 setTimeout(()=>setErrorMessage(''),5000);
//         }
//     };

//     return(
//         <div className="auth-container">
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             {successMessage&& <p className="success-message">{successMessage}</p>}

//             <h2>Sign Up</h2>
//             <form action="" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Name:</label>
//                         <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label>Email:</label>
//                         <input type="email" name="email" value={formData.email} onChange={handleInputChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label>Phone Number:</label>
//                         <input type="text" name="phonenumber" value={formData.phoneNumber} onChange={handleInputChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label>Password:</label>
//                         <input type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
//                     </div>
//                     <button type="submit">Register</button>
//             </form>
//             <p className="register-link">
//                 Already have an account? <a href="/Login">Login</a>
//             </p>
//         </div>
//     )
// }

