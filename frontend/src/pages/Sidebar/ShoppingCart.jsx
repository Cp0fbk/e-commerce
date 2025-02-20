import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const ShoppingCart = () => {
  // Static data for demonstration
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productName: "Smartphone XYZ",
      quantity: 1,
      price: 500.0,
    },
    {
      id: 2,
      productName: "Laptop ABC",
      quantity: 1,
      price: 1200.0,
    },
    {
      id: 3,
      productName: "Tablet 123",
      quantity: 2,
      price: 300.0,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    // Handle checkout logic (e.g., redirecting to payment page)
    alert("Proceeding to checkout...");
  };

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Shopping Cart</h2>
      </div>
      <hr className="my-5" />

      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Product Name
              </th>
              <th scope="col" className="px-6 py-5">
                Quantity
              </th>
              <th scope="col" className="px-6 py-5">
                Price
              </th>
              <th scope="col" className="px-6 py-5">
                Total
              </th>
              <th scope="col" className="px-6 py-5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{item.productName}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-16 border rounded p-1"
                    />
                  </td>
                  <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-red-500">
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Your cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {cartItems.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Total: ${calculateTotal()}</h3>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
};

export default ShoppingCart;
