import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import Api from "../context/ApiContext";

// Hard-coded data cho phần không có trong API
const additionalProductInfo = {
  specifications: {
    "Màn hình": "6.7 inch, Super Retina XDR",
    Chip: "A17 Pro",
    RAM: "8GB",
    "Bộ nhớ trong": "512GB",
    "Hệ điều hành": "iOS 17",
    "Camera sau": "48MP + 12MP + 12MP",
    "Camera trước": "12MP",
    Pin: "4422 mAh, sạc nhanh 20W",
  },
  reviews: [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, camera chụp ảnh đẹp, hiệu năng mạnh mẽ!",
      date: "2025-04-01",
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 4,
      comment: "Thiết kế đẹp, pin dùng được cả ngày, nhưng giá hơi cao.",
      date: "2025-03-28",
    },
  ],
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productImages, setProductImages] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [availableStock, setAvailableStock] = useState(50); // Giả sử mỗi sản phẩm có 50 đơn vị
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch product details
        const productData = await Api.getProductById(id);
        setProduct(productData);

        // Fetch product images cho sản phẩm chính
        try {
          const images = await Api.getProductImages(productData.id);
          setProductImages((prev) => ({
            ...prev,
            [productData.id]: images,
          }));
          setSelectedImage(
            (images && images[0]?.imageUrl) || productData.imageUrl
          );
        } catch (imageError) {
          console.error("Error fetching main product images:", imageError);
          setSelectedImage(productData.imageUrl);
        }

        // Fetch categories
        const categoriesData = await Api.getAllCategories();
        setCategories(categoriesData);

        // Fetch related products
        const relatedProductsData = await Api.filterProducts({
          categoryTypeId: productData.categoryTypeId,
          page: 0,
          size: 4,
        });

        // Lọc và giới hạn 4 sản phẩm liên quan
        const filteredProducts = relatedProductsData.content
          .filter((p) => p.id !== productData.id)
          .slice(0, 4);

        // Fetch images cho từng sản phẩm liên quan
        const productsWithImages = await Promise.all(
          filteredProducts.map(async (product) => {
            try {
              // const images = await Api.getProductImages(product.id);
              return {
                ...product,
                rating: Math.floor(Math.random() * 3) + 3,
              };
            } catch (error) {
              console.error(
                `Error fetching images for product ${product.id}:`,
                error
              );
              return {
                ...product,
                rating: Math.floor(Math.random() * 3) + 3,
              };
            }
          })
        );

        // Lưu ảnh của các sản phẩm liên quan vào state
        const newProductImages = { ...productImages };
        for (const product of filteredProducts) {
          try {
            const images = await Api.getProductImages(product.id);
            newProductImages[product.id] = images;
          } catch (error) {
            console.error(
              `Error fetching images for product ${product.id}:`,
              error
            );
          }
        }
        setProductImages(newProductImages);
        setRelatedProducts(productsWithImages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Không thể tải thông tin sản phẩm");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, productImages]);

  // Xử lý khi bấm Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (quantity > availableStock) {
      alert("Số lượng sản phẩm trong kho không đủ!");
      return;
    }

    try {
      await Api.addToCart({
        productLineId: product.id,
        quantity: quantity,
      });
      setAvailableStock((prev) => prev - quantity);
      alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  // Xử lý khi bấm Mua ngay
  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      // Thêm vào giỏ hàng trước
      await Api.addToCart({
        productLineId: product.id,
        quantity: quantity,
      });
      // Chuyển đến trang checkout
      navigate("/checkout");
    } catch (error) {
      console.error("Error processing buy now:", error);
      alert("Có lỗi xảy ra khi xử lý mua ngay");
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Không tìm thấy sản phẩm
      </div>
    );
  }

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
            <Link
              to={`/products?category=${product.categoryTypeId}`}
              className="text-gray-500 hover:text-blue-600"
            >
              {categories.find(
                (c) => c.categoryTypeId === product.categoryTypeId
              )?.name || "Danh mục"}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src={selectedImage || product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-contain rounded-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <div className="flex gap-2 mt-4 justify-center">
                {productImages[product.id]?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.imageUrl}
                    alt={`${product.name} ${idx + 1}`}
                    className={`w-20 h-20 object-contain rounded-md cursor-pointer border-2 
                      ${
                        selectedImage === img.imageUrl
                          ? "border-blue-600"
                          : "border-gray-200"
                      }`}
                    onClick={() => setSelectedImage(img.imageUrl)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <RatingStars rating={5} />
                <span className="ml-2 text-gray-600">
                  ({additionalProductInfo.reviews.length} đánh giá)
                </span>
              </div>
              <div className="mb-4">
                <span className="text-red-600 font-bold text-2xl">
                  {product.price.toLocaleString("vi-VN")}đ
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    {product.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="mb-4">
                <span
                  className={`text-sm ${
                    availableStock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {availableStock > 0
                    ? `Còn ${availableStock} sản phẩm`
                    : "Hết hàng"}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-700 mr-4">Số lượng:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center border-none focus:outline-none"
                  />
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(product.quantity, prev + 1)
                      )
                    }
                    className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                  className={`flex-1 py-3 rounded-md ${
                    product.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.quantity === 0}
                  className={`flex-1 py-3 rounded-md ${
                    product.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  } text-white`}
                >
                  Mua ngay
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Thông số kỹ thuật
              </h2>
              <table className="w-full text-gray-700">
                <tbody>
                  {Object.entries(additionalProductInfo.specifications).map(
                    ([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-2 font-medium">{key}</td>
                        <td className="py-2">{value}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Đánh giá sản phẩm
          </h2>
          {additionalProductInfo.reviews.length === 0 ? (
            <p className="text-gray-600">
              Chưa có đánh giá nào cho sản phẩm này.
            </p>
          ) : (
            <div className="space-y-4">
              {additionalProductInfo.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="font-medium mr-2">{review.user}</span>
                    <RatingStars rating={review.rating} />
                    <span className="text-gray-500 text-sm ml-2">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <img
                    src={
                      (productImages[product.id] &&
                        productImages[product.id][0]?.imageUrl) ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                    className="w-full h-48 object-contain rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer mt-2">
                    {product.name}
                  </h3>
                  <RatingStars rating={product.rating} />
                  <div className="mt-2">
                    <span className="text-red-600 font-bold text-lg">
                      {product.price.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 block text-center"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer categories={categories} />
    </div>
  );
}
