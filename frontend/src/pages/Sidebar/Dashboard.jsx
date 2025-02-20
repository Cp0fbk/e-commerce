import React from "react";

const Dashboard = () => {
  // Static data for demonstration
  const metrics = {
    totalSales: 15000,
    totalOrders: 250,
    totalUsers: 1200,
    totalProducts: 300,
  };

  const recentOrders = [
    { id: 1, user: "John Doe", total: 500, date: "2024-01-15" },
    { id: 2, user: "Jane Smith", total: 1200, date: "2024-02-10" },
    { id: 3, user: "Alice Johnson", total: 300, date: "2024-03-05" },
  ];

  return (
    <section className="p-8">
      <h2 className="font-medium text-3xl mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Metrics Cards */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl">${metrics.totalSales}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl">{metrics.totalOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{metrics.totalUsers}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl">{metrics.totalProducts}</p>
        </div>
      </div>

      <h3 className="font-medium text-2xl mb-4">Recent Orders</h3>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Order ID
              </th>
              <th scope="col" className="px-6 py-5">
                User
              </th>
              <th scope="col" className="px-6 py-5">
                Total
              </th>
              <th scope="col" className="px-6 py-5">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.user}</td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
