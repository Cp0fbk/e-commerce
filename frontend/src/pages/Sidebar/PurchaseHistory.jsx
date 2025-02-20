import React from "react";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const PurchaseHistory = () => {
  // Static data for demonstration
  const purchaseHistory = [
    {
      id: 1,
      productName: "Smartphone XYZ",
      purchaseDate: "2024-01-15",
      price: "500.00",
      status: "Delivered",
    },
    {
      id: 2,
      productName: "Laptop ABC",
      purchaseDate: "2024-02-10",
      price: "1200.00",
      status: "Pending",
    },
    {
      id: 3,
      productName: "Tablet 123",
      purchaseDate: "2024-03-05",
      price: "300.00",
      status: "Cancelled",
    },
  ];

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Purchase History</h2>
      </div>
      <hr className="my-5" />

      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Order ID
              </th>
              <th scope="col" className="px-6 py-5">
                Product Name
              </th>
              <th scope="col" className="px-6 py-5">
                Purchase Date
              </th>
              <th scope="col" className="px-6 py-5">
                Price
              </th>
              <th scope="col" className="px-6 py-5">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory && purchaseHistory.length > 0 ? (
              purchaseHistory.map((purchase, index) => (
                <tr
                  key={purchase.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{purchase.id}</td>
                  <td className="px-6 py-4">{purchase.productName}</td>
                  <td className="px-6 py-4">{purchase.purchaseDate}</td>
                  <td className="px-6 py-4">${purchase.price}</td>
                  <td className="px-6 py-4">{purchase.status}</td>
                  <td className="px-6 py-4 text-center">
                    <NavLink
                      to={`/order/details/${purchase.id}`}
                      className="font-medium text-indigo-500"
                    >
                      <FaEye size={20} />
                    </NavLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No purchase history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PurchaseHistory;
