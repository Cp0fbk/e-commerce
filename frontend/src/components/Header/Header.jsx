import React from "react";
import logo from "../../assets/img/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="flex items-center justify-between bg-red-600 text-white text-[17px] font-medium px-24 py-6">
        <div>
          <img src={logo} alt="" className="w-36 object-cover h-full" />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="px-4 py-2 bg-red-900 rounded-full flex items-center justify-center space-x-2">
            <RxHamburgerMenu size={20} />
            <div>Danh mục</div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-4 py-2 lg:w-[500px] pr-10 rounded-full text-black outline-none" // Tắt outline
            />
            <FiSearch
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="flex space-x-2 items-center justify-center">
          <NavLink to="/admin/userlist">
            <FaUser size={40} className="bg-red-900 p-2 rounded-full" />
          </NavLink>

          <div className="flex space-x-2 items-center justify-center px-4 py-2 rounded-full bg-black/90">
            <FaShoppingCart size={20} />
            <div>Giỏ hàng</div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
