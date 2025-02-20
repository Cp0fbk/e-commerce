import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import {
  getAllCustomers,
  addCustomer,
  DeleteCustomer,
  ReactiveCustomer,
  getCustomerById,
  updateCustomer,
  getCustomersHighestOrderAmount,
} from "../../services/CustomerServices";
import { toast } from "react-toastify";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [currCustomer, setCurrCustomer] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State thông báo lỗi
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReactiveModal, setShowReactiveModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [updateID, setUpdateID] = useState(null);
  const [reactiveID, setReactiveID] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [number, setNumber] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    phoneNumber: "",
    email: "",
    shippingAddress: "",
    lname: "",
    fname: "",
    membershipClassId: undefined,
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const result = await getAllCustomers();
      console.log(result);
      setCustomerList(result.data);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  const handleAddCustomer = async () => {
    const {
      phoneNumber,
      email,
      shippingAddress,
      lname,
      fname,
      membershipClassId,
    } = newCustomer;

    // Logic to add customer goes here
    console.log("New Customer Added:", newCustomer);
    const res = await addCustomer(newCustomer);

    setNewCustomer({
      phoneNumber: "",
      email: "",
      shippingAddress: "",
      lname: "",
      fname: "",
      membershipClassId: undefined,
    });
    fetchCustomers();
    setShowModal(false);
    toast.success(res.data);
    setErrorMessage("");
  };

  const handleDelete = async (deleteID) => {
    const result = await DeleteCustomer(deleteID);
    // console.log(result);
    setDeleteID(null);
    setShowDeleteModal(false);
    fetchCustomers();
    handleSearch();
    toast.success(result.data);
  };

  const handleReactive = async (reactiveID) => {
    const result = await ReactiveCustomer(reactiveID);
    // console.log(result);
    setReactiveID(null);
    setShowReactiveModal(false);
    fetchCustomers();
    handleSearch();
    toast.success(result.data);
  };

  const handleChooseUpdate = async (id) => {
    const result = await getCustomerById(id);
    // console.log(result);
    setUpdateID(id);
    setCurrCustomer(result.data);
    setShowUpdateModal(true);
  };

  const handleUpdateCustomer = async () => {
    const result = await updateCustomer(currCustomer, updateID);

    setUpdateID(null);
    setCurrCustomer(null);
    fetchCustomers();
    setShowUpdateModal(false);
    handleSearch();
    toast.success(result.data);
  };

  const handleSearch = async () => {
    try {
      const result = await getCustomersHighestOrderAmount(
        number,
        startDate,
        endDate
      );
      console.log(result.data);
      setSearchList(result.data);
    } catch (error) {
      console.error("Error searching", error);
    }
  };

  const handleReset = () => {
    setSearchList([]);
    setNumber("");
    setStartDate("");
    setEndDate("");
    fetchCustomers();
  };

  return (
    <section className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-3xl">CUSTOMER LISTS</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Customer
        </button>
      </div>
      <hr className="my-5" />

      <div className="text-[17px] font-medium">
        Search customers with highest order amount
      </div>
      {/* w-[500px] */}
      <div className="flex gap-x-4 my-6 w-[900px]">
        <input
          type="number"
          placeholder="Enter the number of customers"
          className="border p-2 rounded-lg w-[400px]"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="date"
          placeholder="Enter Start Date"
          className="border p-2 rounded-lg w-full"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Enter End Date"
          className="border p-2 rounded-lg w-full"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
          onClick={handleSearch}
        >
          <FaSearch />
          <div>Search</div>
        </button>

        <button
          className="p-4 bg-yellow-600 text-white rounded-lg transition-all flex items-center justify-center space-x-2"
          onClick={handleReset}
        >
          <div>Reset</div>
        </button>
      </div>

      {/* list */}
      {searchList.length > 0 ? (
        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Rank
                </th>

                <th scope="col" className="px-6 py-5">
                  Customer ID
                </th>
                <th scope="col" className="px-6 py-5">
                  Lname
                </th>
                <th scope="col" className="px-6 py-3">
                  Fname
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Order Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  No Purchases
                </th>

                <th scope="col" className="px-6 py-3">
                  Total Points
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {searchList.length > 0 ? (
                searchList.map((user, index) => (
                  <tr
                    key={user.customerId}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {/* <td className="px-6 py-4">{index + 1}</td> */}
                    <td className="px-6 py-4">{user.rank}</td>

                    <td className="px-6 py-4">{user.customerId}</td>
                    <td className="px-6 py-4">{user.fname}</td>
                    <td className="px-6 py-4">{user.lname}</td>
                    <td className="px-6 py-4">{user.totalOrderAmount}</td>
                    <td className="px-6 py-4">{user.noPurchases}</td>
                    <td className="px-6 py-4">{user.totalPoints}</td>
                    {/* <td className="px-6 py-4">{user.dob}</td> */}
                    {/* <td className="px-6 py-4">{user.registrationDate}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.shippingAddress}</td> */}

                    {/* <td className="px-6 py-4">{user.store?.storeId}</td> */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            handleChooseUpdate(user.customerId);
                          }}
                          className="font-medium text-green-500"
                        >
                          <FaEdit size={20} />
                        </button>
                        {user.isDeleted ? (
                          <button
                            className="font-medium text-indigo-500"
                            onClick={() => {
                              setReactiveID(user.customerId); // Cập nhật deleteID
                              setShowReactiveModal(true); // Hiển thị modal xóa
                            }}
                          >
                            <TiTick size={25} />
                          </button>
                        ) : (
                          <button
                            className="font-medium text-red-500"
                            onClick={() => {
                              setDeleteID(user.customerId); // Cập nhật deleteID
                              setShowDeleteModal(true); // Hiển thị modal xóa
                            }}
                          >
                            <FaTrash size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                {/* <th scope="col" className="px-6 py-5">
                S.N
              </th> */}
                <th scope="col" className="px-6 py-5">
                  customerId
                </th>

                <th scope="col" className="px-6 py-5">
                  Fname
                </th>
                <th scope="col" className="px-6 py-5">
                  Lname
                </th>
                <th scope="col" className="px-6 py-3">
                  membership class
                </th>
                <th scope="col" className="px-6 py-3">
                  total points
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                {/* <th scope="col" className="px-6 py-3">
                DOB
              </th> */}
                <th scope="col" className="px-6 py-3">
                  registration Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                {/* <th scope="col" className="px-6 py-3">
                storeId
              </th> */}
                <th scope="col" className="px-6 py-5">
                  shipping address
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customerList.length > 0 ? (
                customerList.map((user, index) => (
                  <tr
                    key={user.customerId}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {/* <td className="px-6 py-4">{index + 1}</td> */}
                    <td className="px-6 py-4">{user.customerId}</td>
                    <td className="px-6 py-4">{user.fname}</td>
                    <td className="px-6 py-4">{user.lname}</td>
                    <td className="px-6 py-4">{user.membershipClass.name}</td>
                    <td className="px-6 py-4">{user.totalPoints}</td>
                    <td className="px-6 py-4">{user.phoneNumber}</td>
                    {/* <td className="px-6 py-4">{user.dob}</td> */}
                    <td className="px-6 py-4">{user.registrationDate}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.shippingAddress}</td>

                    {/* <td className="px-6 py-4">{user.store?.storeId}</td> */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            handleChooseUpdate(user.customerId);
                          }}
                          className="font-medium text-green-500"
                        >
                          <FaEdit size={20} />
                        </button>
                        {user.isDeleted ? (
                          <button
                            className="font-medium text-indigo-500"
                            onClick={() => {
                              setReactiveID(user.customerId); // Cập nhật deleteID
                              setShowReactiveModal(true); // Hiển thị modal xóa
                            }}
                          >
                            <TiTick size={25} />
                          </button>
                        ) : (
                          <button
                            className="font-medium text-red-500"
                            onClick={() => {
                              setDeleteID(user.customerId); // Cập nhật deleteID
                              setShowDeleteModal(true); // Hiển thị modal xóa
                            }}
                          >
                            <FaTrash size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-medium mb-4">Add New Customer</h3>
            {/* Form */}
            <div className="grid gap-4">
              {/* <div>
                <label className="block font-medium mb-1">Customer ID</label>
                <input
                  type="text"
                  placeholder="Enter Customer ID"
                  value={newCustomer.customerId}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      customerId: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              {/* <div>
                <label className="block font-medium mb-1">Identity Card</label>
                <input
                  type="text"
                  placeholder="Enter Identity Card"
                  value={newCustomer.identityCard}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      identityCard: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={newCustomer.fname}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, fname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={newCustomer.lname}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, lname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={newCustomer.phoneNumber}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              {/* <div>
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={newCustomer.dob}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, dob: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              {/* <div>
                <label className="block font-medium mb-1">Hire Date</label>
                <input
                  type="date"
                  value={newCustomer.hireDate}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, hireDate: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Membership Class ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Membership Class ID"
                  value={newCustomer.membershipClassId}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      membershipClassId: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              {/* <div>
                <label className="block font-medium mb-1">Supervise Date</label>
                <input
                  type="date"
                  value={newCustomer.superviseDate}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      superviseDate: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              <div>
                <label className="block font-medium mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Shipping Address"
                  value={newCustomer.shippingAddress}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      shippingAddress: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleAddCustomer}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal update customer*/}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-medium mb-4">Update Customer</h3>
            {/* Form */}
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Customer ID</label>
                <input
                  type="text"
                  placeholder="Enter Customer ID"
                  value={currCustomer.customerId}
                  onChange={(e) =>
                    setCurrCustomer({
                      ...currCustomer,
                      customerId: e.target.value,
                    })
                  }
                  disabled
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={currCustomer.fname}
                  onChange={(e) =>
                    setCurrCustomer({ ...currCustomer, fname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={currCustomer.lname}
                  onChange={(e) =>
                    setCurrCustomer({ ...currCustomer, lname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={currCustomer.phoneNumber}
                  onChange={(e) =>
                    setCurrCustomer({
                      ...currCustomer,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={currCustomer.email}
                  onChange={(e) =>
                    setCurrCustomer({ ...currCustomer, email: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Shipping Address"
                  value={currCustomer.shippingAddress}
                  onChange={(e) =>
                    setCurrCustomer({
                      ...currCustomer,
                      shippingAddress: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowUpdateModal(false);
                  setCurrCustomer(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleUpdateCustomer}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
            <h3 className="text-xl font-medium mb-4">Delete Customer</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this customer?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteID(null); // Đặt lại deleteID
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  // Handle delete logic here
                  handleDelete(deleteID);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showReactiveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
            <h3 className="text-xl font-medium mb-4">Active Customer</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to active this customer?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowReactiveModal(false);
                  setReactiveID(null); // Đặt lại deleteID
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  // Handle delete logic here
                  handleReactive(reactiveID);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Customer;
