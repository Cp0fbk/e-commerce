import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AccessoryImage from "../../assets/img/iphone.webp"; // Placeholder image
import { getAllAccessory } from "../../services/ProductServices";

const AccessoryList = () => {
  const [accessoryList, setAccessoryList] = useState([]);

  useEffect(() => {
    fetchAccessory();
  }, []);

  const fetchAccessory = async () => {
    try {
      const result = await getAllAccessory();

      setAccessoryList(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Accessory List</h2>
      </div>
      <hr className="my-5" />

      {/* list */}
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Accessory ID
              </th>

              <th scope="col" className="px-6 py-5">
                Battery Capacity
              </th>
              <th scope="col" className="px-6 py-5">
                Product Line ID
              </th>
              <th scope="col" className="px-6 py-5">
                Name
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
            {accessoryList && accessoryList.length > 0 ? (
              accessoryList.map((accessory, index) => (
                <tr
                  key={accessory.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{accessory.id}</td>
                  <td className="px-6 py-4">{accessory.batteryCapacity}</td>
                  <td className="px-6 py-4">{accessory.productLine.id}</td>
                  <td className="px-6 py-4">{accessory.productLine.name}</td>
                  <td className="px-6 py-4">{accessory.productLine.brand}</td>
                  <td className="px-6 py-4">
                    {accessory.productLine.isUsed ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">
                    {accessory.productLine.stockStatus ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">{accessory.productLine.price}</td>
                  <td className="px-6 py-4">
                    {accessory.productLine.description}
                  </td>
                  <td className="px-6 py-4">
                    {accessory.productLine.category}
                  </td>
                  <td className="px-6 py-4">{accessory.productLine.color}</td>
                  <td className="px-6 py-4">
                    {accessory.productLine.promotion}
                  </td>
                  <td className="px-6 py-4">
                    {accessory.productLine.discountPercentage}
                  </td>
                  <td className="px-6 py-4">
                    {accessory.productLine.categoryType.categoryTypeId}
                  </td>

                  {/* <td className="px-6 py-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                      <img
                        src={accessory.image || AccessoryImage}
                        alt={accessory.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{accessory.stock}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <NavLink
                        to={`/accessory/view/${accessory.id}`}
                        className="font-medium text-indigo-500"
                      >
                        <FaEye size={20} />
                      </NavLink>
                      <NavLink
                        to={`/accessory/edit/${accessory.id}`}
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
                  No accessory found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AccessoryList;
