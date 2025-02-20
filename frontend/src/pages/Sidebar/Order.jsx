import { useState, useEffect } from "react";
import {
  getAllOrders,
  deleteOrder,
  addOrder,
  updateStatusOrder,
  updateOrder,
  addPLOrder,
  deletePLOrder,
} from "../../services/OrderServices";
import { getOrdersByTime } from "../../services/OrderServices";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddPLModal, setShowAddPLModal] = useState(false);
  const [showDeletePLModal, setShowDeletePLModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [chooseOrder, setChooseOrder] = useState(null);
  const [searchOrderByTime, setSearchOrderByTime] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [idAddPL, setIdAddPL] = useState("");
  const [idDeletePL, setIdDeletePL] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //   const [statusOrder, setStatusOrder] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [deleteID, setDeleteID] = useState(null);

  const [newOrder, setNewOrder] = useState({
    orderId: "",
    orderDate: "",
    orderStatus: "",
    totalAmount: "",
    employeeId: "",
    customerId: "",
    deliveryId: "",
  });

  const [currOrder, setCurrOrder] = useState({
    orderId: "",
    orderDate: "",
    orderStatus: "",
    totalAmount: "",
    employeeId: "",
    customerId: "",
    deliveryId: "",
  });

  const [addProductLine, setAddProductLine] = useState({
    orderId: "",
    productLineId: "",
    price: "",
    quantity: "",
  });

  const [deleteProductLine, setDeleteProductLine] = useState({
    orderId: "",
    productLineId: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await getAllOrders();
      console.log(result.data);
      setOrderList(result.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddOrder = async () => {
    try {
      console.log(newOrder);
      const result = await addOrder(newOrder);
      setNewOrder({
        // orderId: "",
        orderDate: "",
        orderStatus: "",
        totalAmount: "",
        employeeId: "",
        customerId: "",
        deliveryId: "",
      });
      fetchOrders();
      if (startDate && endDate) {
        handleSearch();
      }
      setShowModal(false);
      toast.success(result.data);
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order.");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteOrder(deleteID);
      setDeleteID(null);
      setShowDeleteModal(false);
      fetchOrders();
      if (startDate && endDate) {
        handleSearch();
      }
      toast.success(result.data);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = { orderId, orderStatus: newStatus };
      const result = await updateStatusOrder(updatedOrder, orderId);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders(); // Refresh the list after status change
      if (startDate && endDate) {
        handleSearch();
      }
      setIsMenuVisible(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  // const handleChooseUpdate = (order) => {
  //   setCurrOrder(order);
  //   setShowUpdateModal(true);
  // };

  const handleUpdateOrder = async () => {
    const result = await updateOrder(currOrder, currOrder.orderId);

    setCurrOrder(null);
    fetchOrders();
    if (startDate && endDate) {
      handleSearch();
    }
    setShowUpdateModal(false);
    toast.success(result.data);
  };

  const handleAddPLOrder = async () => {
    try {
      console.log(addProductLine);
      const result = await addPLOrder(addProductLine, addProductLine.orderId);
      setAddProductLine({
        orderId: "",
        productLineId: "",
        price: "",
        quantity: "",
      });

      fetchOrders();
      if (startDate && endDate) {
        handleSearch();
      }
      setShowAddPLModal(false);
      toast.success(result.data);
    } catch (error) {
      console.error("Error adding product line into order:", error);
      toast.error("Failed to add product line into order.");
    }
  };

  const handleDeletePLOrder = async () => {
    try {
      const result = await deletePLOrder(
        deleteProductLine,
        deleteProductLine.orderId
      );
      setDeleteProductLine({
        orderId: "",
        productLineId: "",
      });
      fetchOrders();
      if (startDate && endDate) {
        handleSearch();
      }
      setShowDeletePLModal(false);
      toast.success(result.data);
    } catch (error) {
      console.error("Error delete product line into order:", error);
      toast.error("Failed to delete product line into order.");
    }
  };

  const handleSearch = async () => {
    try {
      const result = await getOrdersByTime(startDate, endDate);
      console.log(result.data);
      setSearchOrderByTime(result.data);
    } catch (error) {
      console.error("Error searching", error);
    }
  };

  const handleReset = () => {
    setSearchOrderByTime(null);
    setStartDate("");
    setEndDate("");
    fetchOrders();
  };

  return (
    <section className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-3xl">ORDER LIST</h2>
        <div>
          {/* <button
            className="px-4 py-2 bg-green-700 text-white rounded-lg"
            onClick={() => setShowAddPLModal(true)}
          >
            Add Product Line
          </button>
          <button
            className="ml-4 px-4 py-2 bg-red-700 text-white rounded-lg"
            onClick={() => setShowDeletePLModal(true)}
          >
            Delete Product Line
          </button> */}
          <button
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add Order
          </button>
        </div>
      </div>
      <hr className="my-5" />
      <div className="text-[17px] font-medium">
        Filter customer orders by date
      </div>
      <div className="flex gap-x-4 my-4 w-[500px]">
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

      {/* Order List */}
      {searchOrderByTime ? (
        <div className="relative overflow-x-auto rounded-lg min-h-screen">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Customer ID</th>
                <th className="px-6 py-5">Customer First Name</th>
                <th className="px-6 py-5">Customer Last Name</th>
                <th className="px-6 py-5">Total Amount</th>
                <th className="px-6 py-5">Order Date</th>
                <th className="px-6 py-5">Order Status</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchOrderByTime.length > 0 ? (
                searchOrderByTime.map((item) => (
                  <tr
                    key={item.OrderID}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{item.OrderID}</td>
                    <td className="px-6 py-4">{item.CustomerID}</td>
                    <td className="px-6 py-4">{item.CustomerFirstName}</td>
                    <td className="px-6 py-4">{item.CustomerLastName}</td>
                    <td className="px-6 py-4">{item.TotalAmount}</td>

                    <td className="px-6 py-4">{item.OrderDate}</td>
                    {/* <td className="px-6 py-4">{item.OrderStatus}</td> */}
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          className="bg-gray-200 p-2 rounded-lg"
                          onClick={() => {
                            setIsMenuVisible(!isMenuVisible);
                            setChooseOrder(item.OrderID);
                          }} // Toggle menu visibility
                        >
                          {item.OrderStatus}
                        </button>
                        {isMenuVisible && chooseOrder === item.OrderID && (
                          <div className="absolute top-0 right-0 mt-2 bg-white shadow-md rounded-lg z-10">
                            <ul className="text-sm text-gray-700">
                              <li
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() =>
                                  handleStatusChange(item.OrderID, "pending")
                                }
                              >
                                pending
                              </li>
                              <li
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() =>
                                  handleStatusChange(item.OrderID, "shipping")
                                }
                              >
                                shipping
                              </li>
                              <li
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() =>
                                  handleStatusChange(item.OrderID, "completed")
                                }
                              >
                                completed
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setIdAddPL(item.OrderID);
                            setAddProductLine({
                              ...addProductLine,
                              orderId: item.OrderID,
                            });
                            setShowAddPLModal(true);
                          }}
                          className="text-green-500"
                        >
                          <IoIosAddCircle size={20} />
                        </button>

                        <button
                          onClick={() => {
                            setIdDeletePL(item.OrderID);
                            setDeleteProductLine({
                              ...deleteProductLine,
                              orderId: item.OrderID,
                            });
                            setShowDeletePLModal(true);
                          }}
                          className="text-red-700"
                        >
                          <MdDeleteForever size={22} />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteID(item.OrderID);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-500"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative overflow-x-auto rounded-lg min-h-screen">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Customer ID</th>
                <th className="px-6 py-5">Customer First Name</th>
                <th className="px-6 py-5">Customer Last Name</th>
                <th className="px-6 py-5">Customer Email</th>
                <th className="px-6 py-5">Employee ID</th>
                <th className="px-6 py-5">Order Date</th>
                <th className="px-6 py-5">Total Amount</th>
                <th className="px-6 py-5">Order Status</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length > 0 ? (
                orderList.map((item) => (
                  <tr
                    key={item.orderId}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{item.orderId}</td>

                    <td className="px-6 py-4">{item.customer?.customerId}</td>
                    <td className="px-6 py-4">{item.customer.fname}</td>
                    <td className="px-6 py-4">{item.customer.lname}</td>
                    <td className="px-6 py-4">{item.customer.email}</td>
                    <td className="px-6 py-4">{item.employee?.employeeId}</td>
                    <td className="px-6 py-4">{item.orderDate}</td>
                    {/* <td className="px-6 py-4">{item.orderStatus}</td> */}
                    <td className="px-6 py-4">{item.totalAmount}</td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          className="bg-gray-200 p-2 rounded-lg"
                          onClick={() => {
                            setIsMenuVisible(!isMenuVisible);
                            setChooseOrder(item.orderId);
                          }} // Toggle menu visibility
                        >
                          {item.orderStatus}
                        </button>
                        {isMenuVisible && chooseOrder === item.orderId && (
                          <div className="absolute top-0 right-0 mt-2 bg-white shadow-md rounded-lg z-10">
                            <ul className="text-sm text-gray-700">
                              <li
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() =>
                                  handleStatusChange(item.orderId, "pending")
                                }
                              >
                                pending
                              </li>
                              <li
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() =>
                                  handleStatusChange(item.orderId, "shipping")
                                }
                              >
                                shipping
                              </li>
                              <li
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() =>
                                  handleStatusChange(item.orderId, "completed")
                                }
                              >
                                completed
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setIdAddPL(item.orderId);
                            setAddProductLine({
                              ...addProductLine,
                              orderId: item.orderId,
                            });
                            setShowAddPLModal(true);
                          }}
                          className="text-green-500"
                        >
                          <IoIosAddCircle size={20} />
                        </button>

                        <button
                          onClick={() => {
                            setIdDeletePL(item.orderId);
                            setDeleteProductLine({
                              ...deleteProductLine,
                              orderId: item.orderId,
                            });
                            setShowDeletePLModal(true);
                          }}
                          className="text-red-700"
                        >
                          <MdDeleteForever size={22} />
                        </button>

                        {/* <button
                        onClick={() => {
                          setChooseID(item.orderId);
                          // setShowDeleteModal(true);
                        }}
                        className="text-green-700"
                      >
                        <IoIosAddCircle size={20} />
                      </button> */}

                        <button
                          onClick={() => {
                            setDeleteID(item.orderId);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-500"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h3 className="text-xl font-medium mb-4">Add New Order</h3>
            <div className="grid gap-4">
              {/* <div>
                <label className="block font-medium mb-1">Order ID</label>
                <input
                  type="text"
                  value={newOrder.orderId}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, orderId: e.target.value })
                  }
                  // disabled
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              {/* <div>
                <label className="block font-medium mb-1">Order Date</label>
                <input
                  type="date"
                  value={newOrder.orderDate}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, orderDate: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              <div>
                <label className="block font-medium mb-1">Order Status</label>
                <select
                  value={newOrder.orderStatus}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, orderStatus: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="shipping">shipping</option>
                  <option value="completed">completed</option>
                  <option value="pending">pending</option>
                </select>
              </div>

              {/* <div>
                <label className="block font-medium mb-1">Total Amount</label>
                <input
                  type="number"
                  value={newOrder.totalAmount}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, totalAmount: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
              <div>
                <label className="block font-medium mb-1">Employee ID</label>
                <input
                  type="text"
                  value={newOrder.employeeId}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      employeeId: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Customer ID</label>
                <input
                  type="text"
                  value={newOrder.customerId}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      customerId: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Delivery ID</label>
                <input
                  type="text"
                  value={newOrder.deliveryId}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, deliveryId: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => handleAddOrder()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Line */}
      {showAddPLModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h3 className="text-xl font-medium mb-4">
              Add Product Line Into Order
            </h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Order ID</label>
                <input
                  type="text"
                  value={idAddPL}
                  disabled
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Product Line ID
                </label>
                <input
                  type="text"
                  value={addProductLine.productLineId}
                  onChange={(e) =>
                    setAddProductLine({
                      ...addProductLine,
                      productLineId: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Price</label>
                <input
                  type="text"
                  value={addProductLine.price}
                  onChange={(e) =>
                    setAddProductLine({
                      ...addProductLine,
                      price: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <input
                  type="text"
                  value={addProductLine.quantity}
                  onChange={(e) =>
                    setAddProductLine({
                      ...addProductLine,
                      quantity: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowAddPLModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => handleAddPLOrder()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Line */}
      {showDeletePLModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h3 className="text-xl font-medium mb-4">
              Delete Product Line Of Order
            </h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Order ID</label>
                <input
                  type="text"
                  value={idDeletePL}
                  disabled
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Product Line ID
                </label>
                <input
                  type="text"
                  value={deleteProductLine.productLineId}
                  onChange={(e) =>
                    setDeleteProductLine({
                      ...deleteProductLine,
                      productLineId: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowDeletePLModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleDeletePLOrder()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Store */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
            <h3 className="text-xl font-medium mb-4">Delete Order</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this order?
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

      {/* Update Store Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h3 className="text-xl font-medium mb-4">Update Order</h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Order ID</label>
                <input
                  type="text"
                  value={currOrder.orderId}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, orderId: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Order Date</label>
                <input
                  type="date"
                  value={currOrder.orderDate}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, orderDate: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Order Status</label>
                <input
                  type="text"
                  value={currOrder.orderStatus}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, orderStatus: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Total Amount</label>
                <input
                  type="number"
                  value={currOrder.totalAmount}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, totalAmount: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Employee ID</label>
                <input
                  type="text"
                  value={currOrder.employee.employeeId}
                  onChange={(e) =>
                    setCurrOrder({
                      ...currOrder,
                      employee: {
                        ...currOrder.employee,
                        employeeId: e.target.value,
                      },
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Customer ID</label>
                <input
                  type="text"
                  value={currOrder.customer.customerId}
                  onChange={(e) =>
                    setCurrOrder({
                      ...currOrder,
                      customer: {
                        ...currOrder.customer,
                        customerId: e.target.value,
                      },
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              {/* <div>
                <label className="block font-medium mb-1">Delivery ID</label>
                <input
                  type="text"
                  value={currOrder.deliveryId}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, deliveryId: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowUpdateModal(false);
                  setCurrOrder(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => handleUpdateOrder()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Order;
