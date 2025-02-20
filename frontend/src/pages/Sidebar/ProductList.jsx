import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ProductImage from "../../assets/img/iphone.webp"; // Placeholder image
import { getAllProducts } from "../../services/ProductServices";
import {
  getTotalSalesOfPL,
  getTopSellingProducts,
} from "../../services/ProductServices";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [searchTotalSales, setSearchTotalSales] = useState("");
  const [searchTopSelling, setSearchTopSelling] = useState(null);

  const [searchProductLineId, setSearchProductLineId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [minQuantitySold, setMinQuantitySold] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await getAllProducts();

      setProductList(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await getTotalSalesOfPL(
        searchProductLineId,
        startDate,
        endDate
      );
      console.log(result.data);
      setSearchTotalSales(result.data);
    } catch (error) {
      console.error("Error searching", error);
    }
  };

  const handleReset = () => {
    setSearchTotalSales("");
    setSearchProductLineId("");
    setStartDate("");
    setEndDate("");
    fetchProducts();
  };

  const handleSearchTopSelling = async () => {
    try {
      const result = await getTopSellingProducts(minQuantitySold, date);
      console.log(result.data);
      setSearchTopSelling(result.data);
    } catch (error) {
      console.error("Error searching", error);
    }
  };

  const handleResetTopSelling = () => {
    setSearchTopSelling(null);
    setMinQuantitySold("");
    setDate("");

    fetchProducts();
  };

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Product List</h2>
      </div>
      <hr className="my-5" />

      <div className="text-[17px] font-medium">
        Check total sales of a product line
      </div>
      <div className="flex gap-x-4 my-4 w-[500px]">
        <input
          type="number"
          placeholder="Enter Product Line ID"
          className="border p-2 rounded-lg w-[200px]"
          value={searchProductLineId}
          onChange={(e) => setSearchProductLineId(e.target.value)}
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

      {searchTotalSales >= 0 && (
        <div className="text-[17px] font-medium mb-4 text-green-700">
          Total sales of a product line ID {searchProductLineId}:{" "}
          {searchTotalSales}
        </div>
      )}

      {/* Get top selling products */}
      <div className="text-[17px] font-medium">
        Get products that met KPIs for the day
      </div>
      <div className="flex gap-x-4 my-4 w-[500px]">
        <input
          type="number"
          placeholder="Min Quantity Sold"
          className="border p-2 rounded-lg w-[200px]"
          value={minQuantitySold}
          onChange={(e) => setMinQuantitySold(e.target.value)}
        />
        <input
          type="date"
          placeholder="Enter Date"
          className="border p-2 rounded-lg w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
          onClick={handleSearchTopSelling}
        >
          <FaSearch />
          <div>Search</div>
        </button>

        <button
          className="p-4 bg-yellow-600 text-white rounded-lg transition-all flex items-center justify-center space-x-2"
          onClick={handleResetTopSelling}
        >
          <div>Reset</div>
        </button>
      </div>

      {/* list */}
      {searchTopSelling ? (
        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Product Line ID
                </th>
                <th scope="col" className="px-6 py-5">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-5">
                  Brand
                </th>
                <th scope="col" className="px-6 py-5">
                  Total Quantity Sold
                </th>
              </tr>
            </thead>
            <tbody>
              {searchTopSelling && searchTopSelling.length > 0 ? (
                searchTopSelling.map((product, index) => (
                  <tr
                    key={product.ProductLineID}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{product.ProductLineID}</td>
                    <td className="px-6 py-4">{product.ProductName}</td>
                    <td className="px-6 py-4">{product.Brand}</td>
                    <td className="px-6 py-4">{product.TotalQuantitySold}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No products found
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
                <th scope="col" className="px-6 py-5">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-5">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-5">
                  Brand
                </th>
                <th scope="col" className="px-6 py-5">
                  Is Used
                </th>
                <th scope="col" className="px-6 py-5">
                  Stock Status
                </th>
                <th scope="col" className="px-6 py-5">
                  Price
                </th>
                <th scope="col" className="px-6 py-5">
                  Description
                </th>
                <th scope="col" className="px-6 py-5">
                  Category
                </th>
                <th scope="col" className="px-6 py-5">
                  Color
                </th>
                <th scope="col" className="px-6 py-5">
                  Promotion
                </th>
                <th scope="col" className="px-6 py-5">
                  Discount Percentage
                </th>
                <th scope="col" className="px-6 py-5">
                  Category Type
                </th>
              </tr>
            </thead>
            <tbody>
              {productList && productList.length > 0 ? (
                productList.map((product, index) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{product.id}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4">
                      {product.isUsed ? "true" : "false"}
                    </td>
                    <td className="px-6 py-4">
                      {product.stockStatus ? "true" : "false"}
                    </td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">{product.description}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.color}</td>
                    <td className="px-6 py-4">{product.promotion}</td>
                    <td className="px-6 py-4">{product.discountPercentage}</td>
                    <td className="px-6 py-4">{product.categoryType.name}</td>

                    {/* <td className="px-6 py-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                      <img
                        src={product.image || ProductImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <NavLink
                        to={`/product/view/${product.id}`}
                        className="font-medium text-indigo-500"
                      >
                        <FaEye size={20} />
                      </NavLink>
                      <NavLink
                        to={`/product/edit/${product.id}`}
                        className="font-medium text-green-500"
                      >
                        <FaEdit size={20} />
                      </NavLink>
                      <button className="font-medium text-red-500">
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ProductList;
