import React from "react";
import BrandFilter from "../../components/BrandFilter/BrandFilter";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ProductList from "../../components/ProductList/ProductList";
import SortOptions from "../../components/SortOptions/SortOptions";

const products = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    price: 5000000,
    brand: "Apple",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    description: "Điện thoại thông minh với camera chất lượng cao và chip A15.",
    specs: ["6.7 inch", "128GB", "Triple Camera"],
  },
  {
    id: 2,
    name: "iPhone 13 Pro Max",
    price: 34990000,
    brand: "Apple",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    description: "Điện thoại thông minh với camera chất lượng cao và chip A15.",
    specs: ["6.7 inch", "128GB", "Triple Camera"],
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    price: 16990000,
    brand: "Samsung",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    description: "Thiết bị với màn hình Super AMOLED và khả năng chụp ảnh đẹp.",
    specs: ["6.5 inch", "256GB", "Quad Camera"],
  },
  {
    id: 4,
    name: "OPPO Reno8",
    price: 1000000,
    brand: "OPPO",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    description: "Điện thoại với thiết kế mỏng nhẹ và camera selfie nổi bật.",
    specs: ["6.4 inch", "64GB", "Dual Camera"],
  },
  // Add other product objects
];

const MainPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-gray-100 min-h-screen mx-20">
        <div className="py-16">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
