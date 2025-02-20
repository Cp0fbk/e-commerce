import React, { useState } from "react";

const FilterPanel = ({ onFilterChange }) => {
  const [price, setPrice] = useState(null);
  const [operatingSystem, setOperatingSystem] = useState([]);
  const [batteryCapacity, setBatteryCapacity] = useState([]);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    onFilterChange({
      price: e.target.value,
      operatingSystem,
      batteryCapacity,
    });
  };

  const handleOperatingSystemChange = (os) => {
    const updatedOS = operatingSystem.includes(os)
      ? operatingSystem.filter((item) => item !== os)
      : [...operatingSystem, os];
    setOperatingSystem(updatedOS);
    onFilterChange({
      price,
      operatingSystem: updatedOS,
      batteryCapacity,
    });
  };

  const handleBatteryCapacityChange = (capacity) => {
    const updatedCapacity = batteryCapacity.includes(capacity)
      ? batteryCapacity.filter((item) => item !== capacity)
      : [...batteryCapacity, capacity];
    setBatteryCapacity(updatedCapacity);
    onFilterChange({
      price,
      operatingSystem,
      batteryCapacity: updatedCapacity,
    });
  };

  return (
    <div className="w-64 p-4 bg-white border rounded-lg shadow">
      <h3 className="font-semibold">Mức giá</h3>
      <ul>
        <li>
          <input
            type="radio"
            name="price"
            value="all"
            onChange={handlePriceChange}
          />{" "}
          Tất cả
        </li>
        <li>
          <input
            type="radio"
            name="price"
            value="under-2m"
            onChange={handlePriceChange}
          />{" "}
          Dưới 2 triệu
        </li>
        <li>
          <input
            type="radio"
            name="price"
            value="2m-5m"
            onChange={handlePriceChange}
          />{" "}
          Từ 2 - 5 triệu
        </li>
        <li>
          <input
            type="radio"
            name="price"
            value="over-5m"
            onChange={handlePriceChange}
          />{" "}
          Trên 5 triệu
        </li>
      </ul>

      <h3 className="font-semibold mt-4">Hệ điều hành</h3>
      <ul>
        <li>
          <input
            type="checkbox"
            onChange={() => handleOperatingSystemChange("Apple")}
          />{" "}
          iOS
        </li>
        <li>
          <input
            type="checkbox"
            onChange={() => handleOperatingSystemChange("Samsung")}
          />{" "}
          Android
        </li>
        <li>
          <input
            type="checkbox"
            onChange={() => handleOperatingSystemChange("OPPO")}
          />{" "}
          OPPO
        </li>
      </ul>

      <h3 className="font-semibold mt-4">Dung lượng pin</h3>
      <ul>
        <li>
          <input
            type="checkbox"
            onChange={() => handleBatteryCapacityChange("under-3000")}
          />{" "}
          Dưới 3000 mAh
        </li>
        <li>
          <input
            type="checkbox"
            onChange={() => handleBatteryCapacityChange("3000-4000")}
          />{" "}
          3000 - 4000 mAh
        </li>
      </ul>
    </div>
  );
};

export default FilterPanel;
