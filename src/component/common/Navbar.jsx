import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";


function Navbar() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you really want to logout?");
    if (isLogout) {
      ApiService.logout();
      navigate("/home");
    }
  };

  return (
    <nav className="bg-white text-black shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <img
           src="/assets/image/crownhotel-logo.png"
            alt="Crown Hotel Logo"
            className="h-10 w-10 rounded-full border border-yellow-400"
          />
          <NavLink
            to="/home"
            className="text-2xl font-semibold tracking-wide text-yellow-400 hover:text-yellow-300 transition-all"
          >
            Crown Hotel
          </NavLink>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6 font-medium">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 text-lg font-semibold border-b-2 border-yellow-400 pb-1 transition-all duration-200"
                  : "hover:text-yellow-300 transition-all duration-200"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 text-lg font-semibold border-b-2 border-yellow-400 pb-1 transition-all duration-200"
                  : "hover:text-yellow-300 transition-all duration-200"
              }
            >
              Rooms
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/find-booking"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 text-lg font-semibold border-b-2 border-yellow-400 pb-1 transition-all duration-200"
                  : "hover:text-yellow-300 transition-all duration-200"
              }
            >
              Find Booking
            </NavLink>
          </li>

          {isUser && (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 text-lg font-semibold border-b-2 border-yellow-400 pb-1 transition-all duration-200"
                    : "hover:text-yellow-300 transition-all duration-200"
                }
              >
                Profile
              </NavLink>
            </li>
          )}

          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 text-lg font-semibold border-b-2 border-yellow-400 pb-1 transition-all duration-200"
                    : "hover:text-yellow-300 transition-all duration-200"
                }
              >
                Admin
              </NavLink>
            </li>
          )}

          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 text-lg font-semibold border-b-2 border-yellow-400 pb-1 transition-all duration-200"
                      : "hover:text-yellow-300 transition-all duration-200"
                  }
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 text-lg font-semibold border-b-2 border-yellow-400 pb-1 transition-all duration-200"
                      : "hover:text-yellow-300 transition-all duration-200"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <li
              onClick={handleLogout}
              className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-200"
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
