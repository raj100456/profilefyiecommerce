import logo from "./profile-transparent-blue.svg";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-700">
      <div className="flex flex-row justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/home">
          <div className="ml-6">
            <img src={logo} className="h-14" alt="Logo" />
          </div>
        </NavLink>
        <div className="flex flex-row items-center gap-x-6 mr-6 text-slate-100 -tracking-tighter font-medium">
          <NavLink to="/home">
            <p className="text-green-300 hover:text-green-600 cursor-pointer duration-300 transition-all ease-in">
              Home
            </p>
          </NavLink>
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl " />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-purple-600 rounded-full text-sm w-5 h-5 grid justify-items-center animate-bounce text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-red-300 hover:text-red-600 cursor-pointer duration-300 transition-all ease-in"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
