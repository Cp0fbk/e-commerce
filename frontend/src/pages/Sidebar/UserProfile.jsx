import React, { useState } from "react";
import User1 from "../../assets/img/user.avif"; // Đảm bảo đường dẫn đúng
import { IoDiamondOutline } from "react-icons/io5";

const UserProfile = () => {
  // Giả định dữ liệu người dùng
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Thành phố XYZ",
    rank: "Gold",
    role: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Xử lý cập nhật thông tin người dùng ở đây
    console.log("Updated user info:", user);
  };

  return (
    <section className="py-8 px-4 md:px-20">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center">
          <img
            src={User1}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <div className="text-[30px] font-medium">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>
          </div>
        </div>

        <div className="md:mr-32 mr-6 px-6 py-3 bg-orange-600 text-white font-bold text-[17px] rounded-3xl flex items-center space-x-2">
          <IoDiamondOutline size={20} />
          <div>{user.rank}</div>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="mt-10">
        <div className="mb-4">
          <label className="block mb-2">Full Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Contact Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Role:</label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 hover:opacity-60 mt-2 text-white text-[17px] font-medium max-w-[240px] mx-auto rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserProfile;
