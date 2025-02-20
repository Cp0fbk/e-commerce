import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import DeviceImage from "../../assets/img/iphone.webp"; // Placeholder image
import { getAllDevices } from "../../services/ProductServices";

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const result = await getAllDevices();

      setDeviceList(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Device List</h2>
      </div>
      <hr className="my-5" />

      {/* list */}
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Device ID
              </th>
              <th scope="col" className="px-6 py-5">
                Ram
              </th>
              <th scope="col" className="px-6 py-5">
                Operator System
              </th>
              <th scope="col" className="px-6 py-5">
                Battery Capacity
              </th>
              <th scope="col" className="px-6 py-5">
                Weight
              </th>
              <th scope="col" className="px-6 py-5">
                Camera
              </th>
              <th scope="col" className="px-6 py-5">
                Storage
              </th>
              <th scope="col" className="px-6 py-5">
                Screen Size
              </th>
              <th scope="col" className="px-6 py-5">
                Display Resolution
              </th>
              <th scope="col" className="px-6 py-5">
                Product line id
              </th>
            </tr>
          </thead>
          <tbody>
            {deviceList && deviceList.length > 0 ? (
              deviceList.map((device, index) => (
                <tr
                  key={device.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{device.id}</td>
                  <td className="px-6 py-4">{device.ram}</td>
                  <td className="px-6 py-4">{device.operatorSystem}</td>
                  <td className="px-6 py-4">{device.batteryCapacity}</td>
                  <td className="px-6 py-4">{device.weight}</td>
                  <td className="px-6 py-4">{device.camera}</td>
                  <td className="px-6 py-4">{device.storage}</td>
                  <td className="px-6 py-4">{device.screenSize}</td>
                  <td className="px-6 py-4">{device.displayResolution}</td>
                  <td className="px-6 py-4">{device.productLine.id}</td>

                  {/* <td className="px-6 py-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                      <img
                        src={device.image || DeviceImage}
                        alt={device.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{device.stock}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <NavLink
                        to={`/device/view/${device.id}`}
                        className="font-medium text-indigo-500"
                      >
                        <FaEye size={20} />
                      </NavLink>
                      <NavLink
                        to={`/device/edit/${device.id}`}
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
                  No devices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DeviceList;
