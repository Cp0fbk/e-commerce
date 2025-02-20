import { useState, useEffect } from "react";
import {
  getAllStores,
  addStore,
  deleteStore,
  updateStore,
} from "../../services/StoreServices";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const Store = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [storeList, setStoreList] = useState([]);
  const [deleteID, setDeleteID] = useState(null);

  const [newStore, setNewStore] = useState({
    storeId: "",
    numberOfEmployees: "",
    area: "",
    storeName: "",
    address: "",
  });

  const [currStore, setCurrStore] = useState({
    storeId: "",
    numberOfEmployees: "",
    area: "",
    storeName: "",
    address: "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const result = await getAllStores();
      setStoreList(result.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handleAddStore = async () => {
    try {
      const result = await addStore(newStore);
      setNewStore({
        storeId: "",
        numberOfEmployees: "",
        area: "",
        storeName: "",
        address: "",
      });
      fetchStores();
      setShowModal(false);
      toast.success(result.data);
    } catch (error) {
      console.error("Error adding store:", error);
      toast.error("Failed to add store.");
    }
  };

  const handleChooseUpdate = (store) => {
    setCurrStore(store);
    setShowUpdateModal(true);
  };

  const handleUpdateStore = async () => {
    try {
      console.log(currStore);
      console.log(currStore.storeId);
      const result = await updateStore(currStore, currStore.storeId);
      setShowUpdateModal(false);
      fetchStores();
      toast.success(result.data);
    } catch (error) {
      console.error("Error updating store:", error);
      toast.error("Failed to update store.");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteStore(deleteID);
      setDeleteID(null);
      setShowDeleteModal(false);
      fetchStores();
      toast.success(result.data);
    } catch (error) {
      console.error("Error deleting store:", error);
      toast.error("Failed to delete store.");
    }
  };

  return (
    <section className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-3xl">STORE LIST</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Store
        </button>
      </div>
      <hr className="my-5" />

      {/* Store List */}
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-5">Store ID</th>
              <th className="px-6 py-5">Employees</th>
              <th className="px-6 py-5">Area</th>
              <th className="px-6 py-5">Store Name</th>
              <th className="px-6 py-5">Address</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {storeList.length > 0 ? (
              storeList.map((item) => (
                <tr
                  key={item.storeId}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{item.storeId}</td>
                  <td className="px-6 py-4">{item.numberOfEmployees}</td>
                  <td className="px-6 py-4">{item.area}</td>
                  <td className="px-6 py-4">{item.storeName}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleChooseUpdate(item)}
                        className="text-green-500"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteID(item.storeId);
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
                  No stores found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Store Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h3 className="text-xl font-medium mb-4">Add New Store</h3>
            <div className="grid gap-4">
              {[
             
                "numberOfEmployees",
                "area",
                "storeName",
                "address",
              ].map((field) => (
                <div key={field}>
                  <label className="block font-medium mb-1">{field}</label>
                  <input
                    type="text"
                    value={newStore[field]}
                    onChange={(e) =>
                      setNewStore({ ...newStore, [field]: e.target.value })
                    }
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              ))}
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
                onClick={handleAddStore}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Store */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
            <h3 className="text-xl font-medium mb-4">Delete Store</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this store?
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
            <h3 className="text-xl font-medium mb-4">Update Store</h3>
            <div className="grid gap-4">
              {["numberOfEmployees", "area", "storeName", "address"].map(
                (field) => (
                  <div key={field}>
                    <label className="block font-medium mb-1">{field}</label>
                    <input
                      type="text"
                      value={currStore[field]}
                      onChange={(e) =>
                        setCurrStore({ ...currStore, [field]: e.target.value })
                      }
                      className="border p-2 rounded-lg w-full"
                    />
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleUpdateStore}
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

export default Store;
