// src/components/ProductItem.js
import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full full object-cover"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-500">{product.description}</p>
      <p className="text-red-500 font-bold">
        {product.price.toLocaleString()} ₫
      </p>

      {/* Hiển thị các tính năng (specs) */}
      <div className="flex gap-2 mt-2">
        {product.specs?.map((spec) => (
          <span key={spec} className="text-xs bg-gray-200 px-2 py-1 rounded">
            {spec}
          </span>
        ))}
      </div>

      {/* Link So sánh */}
      <div className="mt-4 flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-medium">
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
