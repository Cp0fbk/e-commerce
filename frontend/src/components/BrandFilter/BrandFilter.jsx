import React from "react";

const brands = [
  "Apple",
  "Samsung",
  "Oppo",
  "Xiaomi",
  "Honor",
  "Realme",
  "Tecno",
  "Benco",
  "ZTE",
  "Inoi",
  "TCL",
  "Nokia",
  "Masstel",
  "Vsmart",
  "Viettel",
  "Mobi",
];

const BrandFilter = () => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {brands.map((brand) => (
        <button
          key={brand}
          className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-100"
        >
          {brand}
        </button>
      ))}
    </div>
  );
};

export default BrandFilter;
