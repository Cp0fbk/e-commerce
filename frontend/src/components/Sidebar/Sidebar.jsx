import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoIosLogOut, IoIosHeartEmpty } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { MdOutlineCategory, MdOutlineBedroomParent } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TbCurrencyDollar } from "react-icons/tb";
import { MdDevices } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { BsDeviceSsdFill } from "react-icons/bs";

// import ModalConfirm from "../ModalConfirm/ModalConfirm";
// import logoutImage from "../../assets/img/logout.jpg";
import Logo from "../../assets/img/logo.png";
// import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const role = "ADMIN";
  const [isModalOpen, setModalOpen] = useState(false);
  // const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hàm xử lý logout
  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
    navigate("/"); // Điều hướng về trang home sau khi logout
  };

  // Hàm tạo class cho các NavLink
  const getNavLinkClass = (isActive) =>
    `flex items-center gap-3 mb-2 p-4 rounded-lg text-white hover:bg-accent hover:scale-105 text-[17px] font-medium transition-all duration-300 ease-in-out ${
      isActive ? "text-white bg-red-700" : ""
    }`;

  return (
    <>
      <section className="flex flex-col min-h-screen">
        {/* Logo và tên khách sạn */}
        <NavLink to="/" className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-40 object-cover py-4" />
        </NavLink>

        {/* Các mục điều hướng của Sidebar */}
        <div>
          {/* <NavLink
            to="/dashboard"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <CiGrid41 size={22} />
            <span>Dashboard</span>
          </NavLink> */}

          {/* Mục hiển thị cho Admin */}
          {role === "ADMIN" && (
            <>
              {/* <NavLink to="/admin/createroom" className={({ isActive }) => getNavLinkClass(isActive)}>
                <FaPlusCircle size={22} />
                <span>Create Room</span>
              </NavLink> */}

              <NavLink
                to="/admin/userlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FiUser size={22} />
                <span>All Customers</span>
              </NavLink>
              <NavLink
                to="/admin/employee"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FiUser size={22} />
                <span>All Employees</span>
              </NavLink>

              <NavLink
                to="/admin/store"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <IoStorefront size={22} />
                <span>All Stores</span>
              </NavLink>

              <NavLink
                to="/admin/order"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaCartShopping size={22} />
                <span>All Orders</span>
              </NavLink>

              <NavLink
                to="/admin/productlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaProductHunt size={22} />
                <span>All Products List</span>
              </NavLink>

              <NavLink
                to="/admin/devicelist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <MdDevices size={22} />
                <span>All Devices List</span>
              </NavLink>

              <NavLink
                to="/admin/accessorieslist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <BsDeviceSsdFill size={22} />
                <span>All Accessories List</span>
              </NavLink>

              {/* <NavLink
                to="/admin/purchasehistory"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaHistory size={22} />
                <span>Purchase History</span>
              </NavLink>

              <NavLink
                to="/admin/events"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <MdOutlineCategory size={22} />
                <span>Events</span>
              </NavLink>

              <NavLink
                to="/admin/report"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <TbCurrencyDollar size={22} />
                <span>Report</span>
              </NavLink> */}
            </>
          )}

          {/* Mục hiển thị cho User */}
          {role === "USER" && (
            <>
              {/* <NavLink to="/payment" className={({ isActive }) => getNavLinkClass(isActive)}>
                <TbCurrencyDollar size={22} />
                <span>Payment</span>
              </NavLink> */}

              <NavLink
                to="/shoppingcart"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaCartShopping size={22} />
                <span>Shopping Cart</span>
              </NavLink>

              <NavLink
                to="/purchasehistory"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaHistory size={22} />
                <span>Purchase History</span>
              </NavLink>

              {/* <NavLink to="/favorites" className={({ isActive }) => getNavLinkClass(isActive)}>
                <IoIosHeartEmpty size={22} />
                <span>My Favorites</span>
              </NavLink> */}
            </>
          )}

          {/* Mục Profile cho cả User và Admin */}
          {/* <NavLink
            to="/profile"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <IoSettingsOutline size={22} />
            <span>Personal Profile</span>
          </NavLink> */}

          {/* Nút Logout */}
          <div className="flex items-center justify-center m-5 hover:opacity-60 text-center">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-3 text-white bg-orange-600 py-4 px-12 rounded-full"
            >
              <IoIosLogOut size={22} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Modal xác nhận logout */}
        {/* <ModalConfirm
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          image={logoutImage} 
        /> */}
      </section>
    </>
  );
};

export default Sidebar;
