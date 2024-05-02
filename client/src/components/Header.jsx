import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
    setIsMobileMenuOpen(false); // Close the mobile menu on logout
  };

  const handleToggleMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Function to close the mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="flex h-[80px] items-center justify-center shadow-md relative">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* Logo */}
        <div className="flex h-[60px] items-center justify-center overflow-hidden">
          <Link to="/" onClick={closeMobileMenu}>
            <p className="font-bold text-orange-600">FIND MY NOTES</p>
          </Link>
        </div>

        {/* Hamburger Menu for mobile/tablet */}
        <GiHamburgerMenu
          className="text-xl cursor-pointer md:hidden"
          onClick={handleToggleMenu}
        />

        {/* Navigation Links */}
        <div
          className={`absolute top-[80px] left-0 right-0 bg-white z-50 md:relative md:bg-transparent md:top-auto ${isMobileMenuOpen ? 'flex flex-col items-center w-full' : 'hidden'} md:flex md:flex-row md:items-center md:gap-4`}
        >
          {/* Home and About Links */}
          <Link to="/" className="px-4 py-2 md:py-0" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/about" className="px-4 py-2 md:py-0" onClick={closeMobileMenu}>
            About
          </Link>

          {/* Conditional Rendering based on authentication */}
          {isAuthenticated ? (
            <>
              <Link to="/search" className="px-4 py-2 md:py-0" onClick={closeMobileMenu}>
                <FaSearch className="text-xl" />
              </Link>
              <Link to="/upload" className="px-4 py-2 md:py-0" onClick={closeMobileMenu}>
                <MdOutlineFileUpload className="text-2xl" />
              </Link>
              <Link to="/profile" className="px-4 py-2 md:py-0" onClick={closeMobileMenu}>
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                  Profile
                </button>
              </Link>
              <button
                className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 md:py-0" onClick={closeMobileMenu}>
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-sky-700">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="px-4 py-2 md:py-0" onClick={closeMobileMenu}>
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-sky-700">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
