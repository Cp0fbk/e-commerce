import React, { useState, useEffect, useContext } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import Api from "../context/ApiContext";

// Data mẫu


export default function CategoryPage() {
  const ITEMS_PER_PAGE = 8; // Số sản phẩm mỗi trang
  // State
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const location = useLocation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState("id");
  const [productImages, setProductImages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [availableBrands, setAvailableBrands] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  const [openFilterSection, setOpenFilterSection] = useState({
    category: true,
    price: true,
    brand: true,
    features: {},
  });

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Api.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all products when component mounts
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await Api.getAllProducts();
  //       setProducts(data);
  //       setFilteredProducts(data);
  //       setTotalPages(Math.ceil(data.length / productsPerPage));
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Không thể tải danh sách sản phẩm");
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, [productsPerPage]);

  const handleSortChange = (value) => {
    setSortOption(value);

    // Xác định field và direction dựa trên option được chọn
    switch (value) {
      case "price-asc":
        setSortField("price");
        setSortDirection("asc");
        break;
      case "price-desc":
        setSortField("price");
        setSortDirection("desc");
        break;
      case "name-asc":
        setSortField("name");
        setSortDirection("asc");
        break;
      case "name-desc":
        setSortField("name");
        setSortDirection("desc");
        break;
      case "rating":
        setSortField("rating");
        setSortDirection("desc");
        break;
      default: // featured
        setSortField("id");
        setSortDirection("desc");
        break;
    }
  };

  // Cập nhật useEffect để fetch products với các tham số sắp xếp
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       let data;

  //       if (categoryId) {
  //         // Nếu có categoryId, gọi API filter với categoryTypeId và sắp xếp
  //         data = await Api.filterProducts({
  //           categoryTypeId: parseInt(categoryId),
  //           page: currentPage - 1,
  //           size: productsPerPage,
  //           sortField: sortField,
  //           sortDirection: sortDirection,
  //           // Thêm các filter khác nếu được chọn
  //           ...(selectedPriceRanges.length > 0 && {
  //             minPrice: Math.min(
  //               ...selectedPriceRanges.map((id) => {
  //                 const ranges = [
  //                   { id: 1, min: 0, max: 5000000 },
  //                   { id: 2, min: 5000000, max: 10000000 },
  //                   { id: 3, min: 10000000, max: 15000000 },
  //                   { id: 4, min: 15000000, max: 20000000 },
  //                   { id: 5, min: 20000000, max: Infinity },
  //                 ];
  //                 return ranges.find((r) => r.id === id).min;
  //               })
  //             ),
  //             maxPrice: Math.max(
  //               ...selectedPriceRanges.map((id) => {
  //                 const ranges = [
  //                   { id: 1, min: 0, max: 5000000 },
  //                   { id: 2, min: 5000000, max: 10000000 },
  //                   { id: 3, min: 10000000, max: 15000000 },
  //                   { id: 4, min: 15000000, max: 20000000 },
  //                   { id: 5, min: 20000000, max: Infinity },
  //                 ];
  //                 return ranges.find((r) => r.id === id).max;
  //               })
  //             ),
  //           }),
  //           ...(selectedBrands.length > 0 && { brands: selectedBrands }),
  //           ...(inStockOnly && { stockStatus: true }),
  //         });
  //       } else {
  //         // Nếu không có categoryId, lấy tất cả sản phẩm với sắp xếp
  //         data = await Api.getAllProducts({
  //           page: currentPage - 1,
  //           size: productsPerPage,
  //           sortField: sortField,
  //           sortDirection: sortDirection,
  //         });
  //       }

  //       setProducts(data.content || data);
  //       setFilteredProducts(data.content || data);
  //       setTotalPages(
  //         data.totalPages || Math.ceil(data.length / productsPerPage)
  //       );
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Không thể tải danh sách sản phẩm");
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [
  //   categoryId,
  //   currentPage,
  //   productsPerPage,
  //   sortField,
  //   sortDirection,
  //   selectedPriceRanges,
  //   selectedBrands,
  //   inStockOnly,
  // ]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
        
  //       // Tạo filterDTO với các điều kiện hiện tại
  //       const filterDTO = {
  //         page: currentPage - 1,
  //         size: ITEMS_PER_PAGE,
  //         sortField: sortField,
  //         sortDirection: sortDirection,
  //         ...(categoryId && { categoryTypeId: parseInt(categoryId) }),
  //         ...(selectedBrands.length > 0 && { brands: selectedBrands }),
  //         ...(selectedPriceRanges.length > 0 && {
  //           minPrice: Math.min(...selectedPriceRanges.map(id => {
  //             const ranges = [
  //               { id: 1, min: 0, max: 5000000 },
  //               { id: 2, min: 5000000, max: 10000000 },
  //               { id: 3, min: 10000000, max: 15000000 },
  //               { id: 4, min: 15000000, max: 20000000 },
  //               { id: 5, min: 20000000, max: Infinity }
  //             ];
  //             return ranges.find(r => r.id === id).min;
  //           })),
  //           maxPrice: Math.max(...selectedPriceRanges.map(id => {
  //             const ranges = [
  //               { id: 1, min: 0, max: 5000000 },
  //               { id: 2, min: 5000000, max: 10000000 },
  //               { id: 3, min: 10000000, max: 15000000 },
  //               { id: 4, min: 15000000, max: 20000000 },
  //               { id: 5, min: 20000000, max: Infinity }
  //             ];
  //             return ranges.find(r => r.id === id).max;
  //           }))
  //         }),
  //         ...(inStockOnly && { stockStatus: true })
  //       };
  
  //       let response;
  //       if (Object.keys(filterDTO).length > 3) { // Nếu có thêm điều kiện lọc ngoài page, size và sort
  //         response = await Api.filterProducts(filterDTO);
  //       } else {
  //         response = await Api.getAllProducts({
  //           page: currentPage - 1,
  //           size: ITEMS_PER_PAGE,
  //           sortField: sortField,
  //           sortDirection: sortDirection
  //         });
  //       }
  
  //       setProducts(response.content);
  //       setFilteredProducts(response.content);
  //       setTotalPages(response.totalPages);
  //       setTotalElements(response.totalElements);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       setError("Không thể tải danh sách sản phẩm");
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchProducts();
  // }, [currentPage, categoryId, selectedBrands, selectedPriceRanges, inStockOnly, sortField, sortDirection]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Luôn yêu cầu categoryId
        if (!categoryId) {
          setError("Không tìm thấy danh mục");
          setLoading(false);
          return;
        }

        // Luôn thêm categoryId vào filterDTO nếu có
        const filterDTO = {
          page: currentPage - 1,
          size: ITEMS_PER_PAGE,
          sortField: sortField,
          sortDirection: sortDirection,
          ...(categoryId && { categoryTypeId: parseInt(categoryId) }),
          ...(selectedBrands.length > 0 && { brands: selectedBrands }),
          ...(selectedPriceRanges.length > 0 && {
            minPrice: Math.min(...selectedPriceRanges.map(id => {
              const ranges = [
                { id: 1, min: 0, max: 5000000 },
                { id: 2, min: 5000000, max: 10000000 },
                { id: 3, min: 10000000, max: 15000000 },
                { id: 4, min: 15000000, max: 20000000 },
                { id: 5, min: 20000000, max: Infinity }
              ];
              return ranges.find(r => r.id === id).min;
            })),
            maxPrice: Math.max(...selectedPriceRanges.map(id => {
              const ranges = [
                { id: 1, min: 0, max: 5000000 },
                { id: 2, min: 5000000, max: 10000000 },
                { id: 3, min: 10000000, max: 15000000 },
                { id: 4, min: 15000000, max: 20000000 },
                { id: 5, min: 20000000, max: Infinity }
              ];
              return ranges.find(r => r.id === id).max;
            }))
          }),
          ...(inStockOnly && { stockStatus: true })
        };
  
        // Kiểm tra nếu đang ở trang tìm kiếm nâng cao (không có categoryId)
        if (!categoryId) {
          delete filterDTO.categoryTypeId;
        }
  
        const response = await Api.filterProducts(filterDTO);
        setProducts(response.content);
        setFilteredProducts(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Không thể tải danh sách sản phẩm");
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [currentPage, categoryId, selectedBrands, selectedPriceRanges, inStockOnly, sortField, sortDirection]);

  // Filter products when filters change
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filterDTO = {
        categories: selectedCategories,
        minPrice:
          selectedPriceRanges.length > 0
            ? Math.min(
                ...selectedPriceRanges.map((id) => {
                  const ranges = [
                    { id: 1, min: 0, max: 5000000 },
                    { id: 2, min: 5000000, max: 10000000 },
                    { id: 3, min: 10000000, max: 15000000 },
                    { id: 4, min: 15000000, max: 20000000 },
                    { id: 5, min: 20000000, max: Infinity },
                  ];
                  return ranges.find((r) => r.id === id).min;
                })
              )
            : null,
        maxPrice:
          selectedPriceRanges.length > 0
            ? Math.max(
                ...selectedPriceRanges.map((id) => {
                  const ranges = [
                    { id: 1, min: 0, max: 5000000 },
                    { id: 2, min: 5000000, max: 10000000 },
                    { id: 3, min: 10000000, max: 15000000 },
                    { id: 4, min: 15000000, max: 20000000 },
                    { id: 5, min: 20000000, max: Infinity },
                  ];
                  return ranges.find((r) => r.id === id).max;
                })
              )
            : null,
        brands: selectedBrands,
        features: Object.entries(selectedFeatures).reduce(
          (acc, [key, values]) => {
            if (values.length > 0) acc[key] = values;
            return acc;
          },
          {}
        ),
        stockStatus: inStockOnly ? true : null,
        page: currentPage - 1,
        size: productsPerPage,
        sort: sortOption === "featured" ? null : sortOption,
      };

      try {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search")?.toLowerCase() || "";
        if (searchQuery) filterDTO.name = searchQuery;

        const response = await Api.filterProducts(filterDTO);
        setFilteredProducts(response.content);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Không thể lọc sản phẩm");
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [
    location.search,
    selectedCategories,
    selectedPriceRanges,
    selectedBrands,
    selectedFeatures,
    inStockOnly,
    sortOption,
    currentPage,
    productsPerPage,
  ]);

  // Initialize features filter
  useEffect(() => {
    const initialFeatures = {
      1: false, // RAM
      2: false, // Bộ nhớ trong
      3: false, // Kích thước màn hình
    };
    setOpenFilterSection((prev) => ({
      ...prev,
      features: initialFeatures,
    }));
  }, []);

  const categoryNameMapping = {
    1: 'Điện Thoại',
    2: 'Laptop',
    3: 'Máy tính bảng',
    4: 'Tai nghe',
    5: 'Chuột',
    6: 'Bàn phím',
    // Add more mappings as needed
  };

  // Handle add to cart
  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const productInfo = {
        productLineId: product.id,
        price: product.price,
        quantity: 1,
      };
      await Api.addToCart(productInfo);
      alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    } catch (err) {
      alert("Không thể thêm vào giỏ hàng: " + err.message);
    }
  };

  useEffect(() => {
    const fetchProductImages = async () => {
      const imagePromises = filteredProducts.map(async (product) => {
        try {
          const images = await Api.getProductImages(product.id);
          return { productId: product.id, images };
        } catch (error) {
          console.error(`Error fetching images for product ${product.id}:`, error);
          return { productId: product.id, images: [] };
        }
      });
  
      const results = await Promise.all(imagePromises);
      const imagesMap = results.reduce((acc, { productId, images }) => {
        acc[productId] = images;
        return acc;
      }, {});
      
      setProductImages(imagesMap);
    };
  
    if (filteredProducts.length > 0) {
      fetchProductImages();
    }
  }, [filteredProducts]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await Api.getAllBrands();
        setAvailableBrands(brands);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);
  // Phân trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý bộ lọc
  const toggleFilterSection = (section) => {
    setOpenFilterSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFeatureSection = (featureId) => {
    setOpenFilterSection((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [featureId]: !prev.features[featureId],
      },
    }));
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handlePriceChange = async (priceRangeId) => {
    setSelectedPriceRanges((prev) => {
      const newRanges = prev.includes(priceRangeId)
        ? prev.filter((id) => id !== priceRangeId)
        : [...prev, priceRangeId];
  
      // Gọi API filter với categoryId và các filter khác
      const filterDTO = {
        page: 0,
        size: ITEMS_PER_PAGE,
        sortField: sortField,
        sortDirection: sortDirection,
        ...(categoryId && { categoryTypeId: parseInt(categoryId) }),
        ...(selectedBrands.length > 0 && { brands: selectedBrands }),
        ...(newRanges.length > 0 && {
          minPrice: Math.min(...newRanges.map(id => {
            const ranges = [
              { id: 1, min: 0, max: 5000000 },
              { id: 2, min: 5000000, max: 10000000 },
              { id: 3, min: 10000000, max: 15000000 },
              { id: 4, min: 15000000, max: 20000000 },
              { id: 5, min: 20000000, max: Infinity }
            ];
            return ranges.find(r => r.id === id).min;
          })),
          maxPrice: Math.max(...newRanges.map(id => {
            const ranges = [
              { id: 1, min: 0, max: 5000000 },
              { id: 2, min: 5000000, max: 10000000 },
              { id: 3, min: 10000000, max: 15000000 },
              { id: 4, min: 15000000, max: 20000000 },
              { id: 5, min: 20000000, max: Infinity }
            ];
            return ranges.find(r => r.id === id).max;
          }))
        }),
        ...(inStockOnly && { stockStatus: true })
      };
  
      // Gọi API filter
      Api.filterProducts(filterDTO).then(response => {
        setProducts(response.content);
        setFilteredProducts(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setCurrentPage(1);
        setLoading(false);
      }).catch(err => {
        setError("Không thể lọc sản phẩm theo giá");
        setLoading(false);
      });
  
      return newRanges;
    });
  };

  const handleBrandChange = async (brand) => {
    try {
      setLoading(true);
      // Cập nhật state selectedBrands
      const newSelectedBrands = selectedBrands.includes(brand) 
        ? selectedBrands.filter(b => b !== brand) 
        : [...selectedBrands, brand];
      setSelectedBrands(newSelectedBrands);
  
      // // Tạo object filter
      // const filterDTO = {
      //   brand: brand, // Gửi brand được chọn
      //   categoryTypeId: categoryId ? parseInt(categoryId) : null,
      //   page: currentPage - 1,
      //   size: productsPerPage,
      //   sortField: sortField,
      //   sortDirection: sortDirection,
      //   ...(selectedPriceRanges.length > 0 && {
      //     minPrice: Math.min(...selectedPriceRanges.map(id => {
      //       const ranges = [
      //         { id: 1, min: 0, max: 5000000 },
      //         { id: 2, min: 5000000, max: 10000000 },
      //         { id: 3, min: 10000000, max: 15000000 },
      //         { id: 4, min: 15000000, max: 20000000 },
      //         { id: 5, min: 20000000, max: Infinity }
      //       ];
      //       return ranges.find(r => r.id === id).min;
      //     })),
      //     maxPrice: Math.max(...selectedPriceRanges.map(id => {
      //       const ranges = [
      //         { id: 1, min: 0, max: 5000000 },
      //         { id: 2, min: 5000000, max: 10000000 },
      //         { id: 3, min: 10000000, max: 15000000 },
      //         { id: 4, min: 15000000, max: 20000000 },
      //         { id: 5, min: 20000000, max: Infinity }
      //       ];
      //       return ranges.find(r => r.id === id).max;
      //     }))
      //   }),
      //   ...(inStockOnly && { stockStatus: true })
      // };
  
      // // Gọi API filter
      // const response = await Api.filterProducts(filterDTO);
      
      // // Cập nhật state với kết quả trả về
      // setProducts(response.content || []);
      // setFilteredProducts(response.content || []);
      // setTotalPages(response.totalPages || 1);
      
  //     
  
    // Tạo filterDTO với các điều kiện lọc hiện tại
    const filterDTO = {
      page: currentPage - 1,
      size: ITEMS_PER_PAGE,
      sortField: sortField,
      sortDirection: sortDirection,
      brands: newSelectedBrands, // Gửi tất cả brands đã chọn
      ...(categoryId && { categoryTypeId: parseInt(categoryId) }),
      ...(selectedPriceRanges.length > 0 && {
        minPrice: Math.min(...selectedPriceRanges.map(id => {
          const ranges = [
            { id: 1, min: 0, max: 5000000 },
            { id: 2, min: 5000000, max: 10000000 },
            { id: 3, min: 10000000, max: 15000000 },
            { id: 4, min: 15000000, max: 20000000 },
            { id: 5, min: 20000000, max: Infinity }
          ];
          return ranges.find(r => r.id === id).min;
        })),
        maxPrice: Math.max(...selectedPriceRanges.map(id => {
          const ranges = [
            { id: 1, min: 0, max: 5000000 },
            { id: 2, min: 5000000, max: 10000000 },
            { id: 3, min: 10000000, max: 15000000 },
            { id: 4, min: 15000000, max: 20000000 },
            { id: 5, min: 20000000, max: Infinity }
          ];
          return ranges.find(r => r.id === id).max;
        }))
      }),
      ...(inStockOnly && { stockStatus: true })
    };

    // Gọi API filter với điều kiện mới
    const response = await Api.filterProducts(filterDTO);
    
    // Cập nhật state với kết quả trả về
    setProducts(response.content);
    setFilteredProducts(response.content);
    setTotalPages(response.totalPages);
    setTotalElements(response.totalElements);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi filter
    
    setLoading(false);
  } catch (err) {
    console.error("Error filtering by brand:", err);
    setError("Không thể lọc sản phẩm theo thương hiệu");
    setLoading(false);
  }
  };

  const handleFeatureChange = (featureId, option) => {
    setSelectedFeatures((prev) => {
      const currentOptions = prev[featureId] || [];
      return {
        ...prev,
        [featureId]: currentOptions.includes(option)
          ? currentOptions.filter((opt) => opt !== option)
          : [...currentOptions, option],
      };
    });
  };

  const handleInStockChange = () => setInStockOnly((prev) => !prev);

  const clearAllFilters = () => {
    
    setSelectedPriceRanges([]);
    setSelectedBrands([]);
    setSelectedFeatures({});
    setInStockOnly(false);
    setCurrentPage(1);

     // Gọi API để lấy lại sản phẩm chỉ với categoryId
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const filterDTO = {
          page: 0,
          size: ITEMS_PER_PAGE,
          sortField: sortField,
          sortDirection: sortDirection,
          ...(categoryId && { categoryTypeId: parseInt(categoryId) })
        };

        const response = await Api.filterProducts(filterDTO);
        setProducts(response.content);
        setFilteredProducts(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Không thể tải danh sách sản phẩm");
        setLoading(false);
      }
    };

    fetchProducts();
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedPriceRanges.length +
    selectedBrands.length +
    Object.values(selectedFeatures).reduce(
      (acc, curr) => acc + curr.length,
      0
    ) +
    (inStockOnly ? 1 : 0);

  // Component RatingStars
  const RatingStars = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  if (loading) return <div className="text-center py-10">Đang tải...</div>;
  if (error)
    return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            {loading ? (
              <span className="text-gray-700 font-medium">Đang tải...</span>
            ) : categories && categories.length > 0 && categoryId ? (
              (() => {
                const customNames = {
                  1: "Điện thoại",
                  2: "Laptop",
                  3: "Máy tính bảng",
                  4: "Tai nghe",
                  5: "Chuột",
                  6: "Bàn phím",
                };
                const category = categories.find(
                  (cat) => cat.categoryTypeId === parseInt(categoryId)
                );
                // Return the display name
                return (
                  <span className="text-gray-700 font-medium">
                    {customNames[category?.categoryTypeId] || category?.name || "Sản phẩm"}
                  </span>
                );
              })()
            ) : null}
            {/* (
              <span className="text-gray-700 font-medium">
                Tìm kiếm nâng cao{" "}
              </span>
            ) */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0 pr-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-bold text-lg mb-4">Bộ lọc sản phẩm</h2>
              <div className="mb-4">
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={handleInStockChange}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 text-gray-700">
                    Còn hàng
                  </label>
                </div>
              </div>
              {/* <div className="border-t pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleFilterSection("category")}
                >
                  <h3 className="font-medium">Danh mục sản phẩm</h3>
                  {openFilterSection.category ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openFilterSection.category && (
                  <div className="space-y-2 mt-2 ml-1">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryChange(category.name)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-gray-700"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
              <div className="border-t pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleFilterSection("price")}
                >
                  <h3 className="font-medium">Giá</h3>
                  {openFilterSection.price ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openFilterSection.price && (
                  <div className="space-y-2 mt-2 ml-1">
                    {[
                      { id: 1, name: "Dưới 5 triệu" },
                      { id: 2, name: "5 - 10 triệu" },
                      { id: 3, name: "10 - 15 triệu" },
                      { id: 4, name: "15 - 20 triệu" },
                      { id: 5, name: "Trên 20 triệu" },
                    ].map((range) => (
                      <div key={range.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`price-${range.id}`}
                          checked={selectedPriceRanges.includes(range.id)}
                          onChange={() => handlePriceChange(range.id)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label
                          htmlFor={`price-${range.id}`}
                          className="ml-2 text-gray-700"
                        >
                          {range.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleFilterSection("brand")}
                >
                  <h3 className="font-medium">Thương hiệu</h3>
                  {openFilterSection.brand ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openFilterSection.brand && (
                  <div className="space-y-2 mt-2 ml-1">
                    {[
                      "Apple",
                      "Samsung",
                      "Xiaomi",
                      "OPPO",
                      "Vivo",
                      "Realme",
                      "Nokia",
                    ].map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="ml-2 text-gray-700"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {[
                { id: 1, name: "RAM", options: ["4GB", "6GB", "8GB", "12GB"] },
                {
                  id: 2,
                  name: "Bộ nhớ trong",
                  options: ["64GB", "128GB", "256GB", "512GB", "1TB"],
                },
                {
                  id: 3,
                  name: "Kích thước màn hình",
                  options: ["Dưới 6 inch", "6.1 - 6.5 inch", "Trên 6.5 inch"],
                },
              ].map((feature) => (
                <div key={feature.id} className="border-t pt-4">
                  <div
                    className="flex justify-between items-center cursor-pointer mb-2"
                    onClick={() => toggleFeatureSection(feature.id)}
                  >
                    <h3 className="font-medium">{feature.name}</h3>
                    {openFilterSection.features[feature.id] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>
                  {openFilterSection.features[feature.id] && (
                    <div className="space-y-2 mt-2 ml-1">
                      {feature.options.map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`feature-${feature.id}-${idx}`}
                            checked={
                              selectedFeatures[feature.id]?.includes(option) ||
                              false
                            }
                            onChange={() =>
                              handleFeatureChange(feature.id, option)
                            }
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label
                            htmlFor={`feature-${feature.id}-${idx}`}
                            className="ml-2 text-gray-700"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Listing */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {loading
                  ? "Đang tải..."
                  : categories && categories.length > 0 && categoryId
                  ? categoryNameMapping[parseInt(categoryId)] ||categories.find((cat) => cat.categoryTypeId === parseInt(categoryId))?.name || "Sản phẩm"
                  : null} 
              </h1>
              <p className="text-gray-600 mt-2">
                {loading
                  ? "Đang tải..."
                  : categories && categories.length > 0 && categoryId
                  ? (() => {
                      const category = categories.find(
                        (cat) => cat.categoryTypeId === parseInt(categoryId)
                      );
                      switch (category?.name) {
                        case "Smartphone":
                          return "Khám phá các mẫu điện thoại mới nhất với công nghệ hiện đại";
                        case "Laptop":
                          return "Trải nghiệm sức mạnh của các dòng laptop cao cấp và gaming";
                        case "Tablet":
                          return "Khơi nguồn sáng tạo mọi lúc, mọi nơi với công nghệ trong tầm tay";
                        case "Headphone":
                          return "Đắm chìm trong thế giới âm thanh với chất lượng cao cấp";
                        case "Mouse":
                          return "Điều khiển từng chuyển động mượt mà với độ chính xác tuyệt đối";
                        case "Keyboard":
                          return "Thỏa sức gõ phím, tận hưởng cảm giác êm tay trong từng cú chạm";
                        default:
                          return "Khám phá các sản phẩm mới nhất với công nghệ hiện đại";
                      }
                    })()
                  : null}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <button
                  className="md:hidden flex items-center text-gray-700 hover:text-blue-600"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter size={20} className="mr-2" /> Bộ lọc{" "}
                  {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Hiển thị:</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid" ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list" ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sắp xếp:</span>
                <select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Nổi bật</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">
                  Không tìm thấy sản phẩm nào phù hợp.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div className={viewMode === "list" ? "w-1/3 pr-4" : ""}>
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={(productImages[product.id] && productImages[product.id][0]?.imageUrl) || "https://via.placeholder.com/150"}
                          alt={product.name}
                          className="w-full h-48 object-contain rounded-md"
                          onError={(e) => {
                            e.target.onerror = null; // Prevents infinite loop
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </Link>
                    </div>
                    <div className={viewMode === "list" ? "w-2/3" : ""}>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <RatingStars rating={product.rating || 0} />
                      <div className="mt-2">
                        <span className="text-red-600 font-bold text-lg">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                        {product.oldPrice && (
                          <span className="text-gray-500 line-through ml-2">
                            {product.oldPrice.toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </div>
                      {viewMode === "list" && (
                        <ul className="mt-2 text-sm text-gray-600">
                          {product.features?.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          )) || (
                            <li className="line-clamp-2">
                              {product.description || "Chưa có mô tả cho sản phẩm này"}
                            </li>
                          )}
                        </ul>
                      )}
                      <div className="mt-3">
                        <span
                          className={`text-sm ${
                            product.stockStatus
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.stockStatus ? "Còn hàng" : "Hết hàng"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => {
                  // Hiển thị tối đa 5 nút phân trang
                  if (
                    i === 0 || // Luôn hiển thị trang đầu
                    i === totalPages - 1 || // Luôn hiển thị trang cuối
                    (i >= currentPage - 2 && i <= currentPage + 2) // Hiển thị 2 trang trước và sau trang hiện tại
                  ) {
                    return (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  } else if (
                    i === currentPage - 3 || // Thêm dấu ... trước trang hiện tại
                    i === currentPage + 3 // Thêm dấu ... sau trang hiện tại
                  ) {
                    return <span key={i}>...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
                <span className="ml-4 text-gray-600">
                  Trang {currentPage} / {totalPages} (Tổng {totalElements} sản phẩm)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Bộ lọc sản phẩm</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-gray-600"
              >
                Đóng
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={clearAllFilters}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="inStock-mobile"
                  checked={inStockOnly}
                  onChange={handleInStockChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="inStock-mobile" className="ml-2 text-gray-700">
                  Còn hàng
                </label>
              </div>
            </div>
            <div className="border-t pt-4">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleFilterSection("category")}
              >
                <h3 className="font-medium">Danh mục sản phẩm</h3>
                {openFilterSection.category ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
              {openFilterSection.category && (
                <div className="space-y-2 mt-2 ml-1">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-mobile-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => handleCategoryChange(category.name)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label
                        htmlFor={`category-mobile-${category.id}`}
                        className="ml-2 text-gray-700"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t pt-4">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleFilterSection("price")}
              >
                <h3 className="font-medium">Giá</h3>
                {openFilterSection.price ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
              {openFilterSection.price && (
                <div className="space-y-2 mt-2 ml-1">
                  {[
                    { id: 1, name: "Dưới 5 triệu" },
                    { id: 2, name: "5 - 10 triệu" },
                    { id: 3, name: "10 - 15 triệu" },
                    { id: 4, name: "15 - 20 triệu" },
                    { id: 5, name: "Trên 20 triệu" },
                  ].map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`price-mobile-${range.id}`}
                        checked={selectedPriceRanges.includes(range.id)}
                        onChange={() => handlePriceChange(range.id)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label
                        htmlFor={`price-mobile-${range.id}`}
                        className="ml-2 text-gray-700"
                      >
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t pt-4">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleFilterSection("brand")}
              >
                <h3 className="font-medium">Thương hiệu</h3>
                {openFilterSection.brand ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
              {openFilterSection.brand && (
                <div className="space-y-2 mt-2 ml-1">
                  {[
                    "Apple",
                    "Samsung",
                    "Xiaomi",
                    "OPPO",
                    "Vivo",
                    "Realme",
                    "Nokia",
                  ].map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-mobile-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label
                        htmlFor={`brand-mobile-${brand}`}
                        className="ml-2 text-gray-700"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {[
              { id: 1, name: "RAM", options: ["4GB", "6GB", "8GB", "12GB"] },
              {
                id: 2,
                name: "Bộ nhớ trong",
                options: ["64GB", "128GB", "256GB", "512GB", "1TB"],
              },
              {
                id: 3,
                name: "Kích thước màn hình",
                options: ["Dưới 6 inch", "6.1 - 6.5 inch", "Trên 6.5 inch"],
              },
            ].map((feature) => (
              <div key={feature.id} className="border-t pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleFeatureSection(feature.id)}
                >
                  <h3 className="font-medium">{feature.name}</h3>
                  {openFilterSection.features[feature.id] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openFilterSection.features[feature.id] && (
                  <div className="space-y-2 mt-2 ml-1">
                    {feature.options.map((option, idx) => (
                      <div key={idx} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`feature-mobile-${feature.id}-${idx}`}
                          checked={
                            selectedFeatures[feature.id]?.includes(option) ||
                            false
                          }
                          onChange={() =>
                            handleFeatureChange(feature.id, option)
                          }
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label
                          htmlFor={`feature-mobile-${feature.id}-${idx}`}
                          className="ml-2 text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer categories={categories} />
    </div>
  );
}
