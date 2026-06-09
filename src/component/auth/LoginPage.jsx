import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const response = await ApiService.loginUser({ email, password });

      if (response.statusCode === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none 
              focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none 
              focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg 
            font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;





// import React,{useState} from "react";
// import { useNavigate,useLocation } from "react-router-dom";
// import ApiService from "../../service/ApiService";

// function LoginPage() {
//     const [email, setEamil] =useState('');
//     const [password, setPassword] =useState('');
//     const [error, setError] =useState('');
//     const navigate = useNavigate();
//     const location = useLocation;

//     const from = location.state?.from?.pathname || '/home';

//     const handleSubmit = async (e) =>{
//         e.preventDefault();

//         if(!email || !password){
//             setError('Please fill in all fields.')
//             setTimeout(()=>setError(''),5000);
//             return;
//         }

//         try{
//             const response =await ApiService.loginUser({email,password});
//             if(response.statusCode ===200){
//                 localStorage.setItem('token',response.token);
//                 localStorage.setItem('role',response.role);
//                 navigate(from,{replace: true});

//             }
            
//         }
//         catch(error){
//             setError(error.response?.data?.message || error.message);
//             setTimeout(() => setError(''),5000)
                
//             }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Login</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e)=>setEamil(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="">Password:</label>
//                     <input 
//                         type="password" 
//                         value={password}
//                         onChange={(e)=> setPassword(e.target.value)}
//                         required
//                     />

//                 </div>
//                 <button type="submit"></button>
//             </form>

//             <p className="register-link">
//                 Don't have an account? <a href="/register">Register</a>
//             </p>
//         </div>
//     )
// }













