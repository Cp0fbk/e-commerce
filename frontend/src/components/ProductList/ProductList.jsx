import React, { useState, useMemo } from "react";
import FilterPanel from "../FilterPanel/FilterPanel";
import ProductItem from "../ProductItem/ProductItem";

const ProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(""); // "price-asc", "price-desc", "name-asc", "name-desc"
  const [filters, setFilters] = useState({
    price: null,
    operatingSystem: [],
    batteryCapacity: [],
  });

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sort
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply search, sort, and filters
  const filteredProducts = useMemo(() => {
    let result = products;

    // Search
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.price) {
      result = result.filter((product) => {
        const price = parseInt(product.price);
        switch (filters.price) {
          case "under-2m":
            return price < 2000000;
          case "2m-5m":
            return price >= 2000000 && price <= 5000000;
          case "over-5m":
            return price > 5000000;
          default:
            return true;
        }
      });
    }

    // Filter by operating system
    if (filters.operatingSystem.length > 0) {
      result = result.filter((product) =>
        filters.operatingSystem.includes(product.brand)
      );
    }

    // Filter by battery capacity (assuming we have this attribute)
    if (filters.batteryCapacity.length > 0) {
      result = result.filter((product) =>
        filters.batteryCapacity.includes(product.batteryCapacity)
      );
    }

    // Sort
    if (sortOption) {
      result = [...result].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "name-asc") return a.name.localeCompare(b.name);
        if (sortOption === "name-desc") return b.name.localeCompare(a.name);
        return 0;
      });
    }

    return result;
  }, [products, searchQuery, sortOption, filters]);

  return (
    <div className="flex space-x-4">
      {/* Filter Panel */}
      <FilterPanel onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Search and Sort */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded p-2 w-1/2"
          />

          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border rounded p-2"
          >
            <option value="">Sắp xếp</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
