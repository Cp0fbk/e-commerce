import React from "react";

const SortOptions = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <h2 className="text-lg font-semibold">Tìm thấy 117 kết quả</h2>
      <select className="p-2 border rounded">
        <option value="popularity">Nổi bật</option>
        <option value="priceLowToHigh">Giá: Thấp đến cao</option>
        <option value="priceHighToLow">Giá: Cao đến thấp</option>
        {/* Add other sorting options */}
      </select>
    </div>
  );
};

export default SortOptions;
