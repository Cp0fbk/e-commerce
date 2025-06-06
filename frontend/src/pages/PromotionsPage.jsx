import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Api from "../context/ApiContext";

// Dữ liệu mẫu cho khuyến mãi
// const promotions = [
//   {
//     id: 1,
//     title: 'Giảm 25% Điện thoại cao cấp',
//     description: 'Áp dụng cho tất cả điện thoại từ 10 triệu trở lên. Nhập mã FLASH25 khi thanh toán.',
//     code: 'FLASH25',
//     image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/2c/d1/2cd1411aff4dac02bb16d95e0788a78a.png',
//     startDate: '2025-04-01',
//     endDate: '2025-04-15',
//     discount: 'Giảm tối đa 1.000.000đ',
//   },
//   {
//     id: 2,
//     title: 'Miễn phí vận chuyển',
//     description: 'Miễn phí vận chuyển cho mọi đơn hàng khi sử dụng mã FREESHIP.',
//     code: 'FREESHIP',
//     image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/5a/0b/5a0b3a4ac408c4074f4ab69a68b97fdb.png',
//     startDate: '2025-04-01',
//     endDate: '2025-04-30',
//     discount: 'Miễn phí shipping',
//   },
//   {
//     id: 3,
//     title: 'Chào mừng khách mới - Giảm 10%',
//     description: 'Giảm 10% cho đơn hàng đầu tiên với mã WELCOME10.',
//     code: 'WELCOME10',
//     image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/36/c5/36c57ffedb683cb412fb645d3fd0cbff.png',
//     startDate: '2025-04-01',
//     endDate: '2025-12-31',
//     discount: 'Giảm tối đa 500.000đ',
//   },
//   {
//     id: 4,
//     title: 'Sale tai nghe - Giảm đến 30%',
//     description: 'Ưu đãi đặc biệt cho tất cả tai nghe Sony và JBL. Không cần mã.',
//     code: null,
//     image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/28/f3/28f30b22055691ea516abcb527d48444.png',
//     startDate: '2025-04-08',
//     endDate: '2025-04-20',
//     discount: 'Giảm đến 30%',
//   },
// ];

// Dữ liệu bổ sung cho khuyến mãi
const promotionExtras = {
  1: {
    image:
      "https://cdn.shopify.com/s/files/1/0755/1365/9703/files/20241219-143737_600x600.jpg?v=1734601341",
    code: "XMAS10",
    discount: "Giảm 10% tối đa 500.000đ",
    description: "Ưu đãi đặc biệt mùa Giáng sinh cho tất cả tai nghe cao cấp.",
  },
  2: {
    image:
      "https://img.freepik.com/premium-vector/new-year-headphone-sale-facebook-cover-banner-design_220809-293.jpg",
    code: "NEWYEAR10",
    discount: "Giảm 10% tối đa 300.000đ",
    description: "Chào đón năm mới với ưu đãi hấp dẫn cho tai nghe không dây.",
  },
  3: {
    image:
      "https://storage-asset.msi.com/global/picture/promotion/seo_165579193362b1613d8b55b1.49322982.jpeg",
    code: "SCHOOL10",
    discount: "Giảm 10% tối đa 2.000.000đ",
    description: "Ưu đãi đặc biệt mùa tựu trường cho các dòng laptop học tập.",
  },
  4: {
    image:
      "https://file.hstatic.net/1000329106/file/13-3-23_ipad_6e6b3bba09d24c98a9ff4fccdc84dad0_1024x1024.jpg",
    code: "WEEKEND15",
    discount: "Giảm 15% không giới hạn giá trị đơn hàng",
    description: "Chỉ cuối tuần! Giảm giá cực sâu cho máy tính bảng.",
  },
  5: {
    image:
      "https://cdnv2.tgdd.vn/mwg-static/common/News/1425248/top-5-dien-thoai-samsung-ban-chay-nhat-thang-03-2022-tai-20.jpg",
    code: "SUMMER10",
    discount: "Giảm 10% tối đa 400.000đ",
    description: "Khuyến mãi hè rực rỡ cho tất cả điện thoại.",
  },
  6: {
    image:
      "https://fitsmallbusiness.com/wp-content/uploads/2021/08/Screenshot_HSN_Free_Shipping_Promotion.jpg",
    code: "FREESHIP100",
    discount: "Miễn phí vận chuyển cho đơn từ 100.000đ",
    description: "Áp dụng toàn quốc cho mọi sản phẩm công nghệ.",
  },
};

// Danh mục sản phẩm cho menu
const categories = [
  {
    id: 1,
    name: "Điện thoại",
    subcategories: ["iPhone", "Samsung", "Xiaomi", "OPPO"],
  },
  {
    id: 2,
    name: "Laptop",
    subcategories: ["Macbook", "Dell", "HP", "Lenovo", "Asus"],
  },
  {
    id: 3,
    name: "Máy tính bảng",
    subcategories: ["iPad", "Samsung Galaxy Tab", "Xiaomi Pad"],
  },
  {
    id: 4,
    name: "Tai nghe",
    subcategories: ["AirPods", "Sony", "JBL", "Beats"],
  },
  {
    id: 5,
    name: "Đồng hồ thông minh",
    subcategories: ["Apple Watch", "Samsung Galaxy Watch", "Xiaomi Watch"],
  },
];

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const [allPromotionsRes, activePromotionsRes] = await Promise.all([
          Api.getAllPromotions(),
          Api.getActivePromotions(),
        ]);

        // Thêm thông tin bổ sung vào dữ liệu API
        const enhancedPromotions = allPromotionsRes.map((promo) => ({
          ...promo,
          ...promotionExtras[promo.promotionId],
        }));

        setPromotions(enhancedPromotions);
        setActivePromotions(activePromotionsRes);
      } catch (err) {
        setError("Failed to fetch promotions");
        console.error("Error fetching promotions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  // Kiểm tra khuyến mãi còn hiệu lực
  const isActive = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return today <= expiry;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header categories={categories} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Đang tải phần khuyến mãi...</div>
        </main>
        <Footer categories={categories} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header categories={categories} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </main>
        <Footer categories={categories} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to={`/`} className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Khuyến mãi</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Khuyến mãi & Ưu đãi</h1>

        {/* Danh sách khuyến mãi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.promotionId}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {promo.image && (
                <img
                  src={promo.image}
                  alt={promo.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{promo.name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {promo.description || promo.type}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    {promo.discount}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive(promo.endDate)
                        ? (isActive(promo.startDate) ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600")
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isActive(promo.endDate) ? (isActive(promo.startDate) ? "Sắp diễn ra" : "Đang hoạt động") : "Đã hết hạn"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Thời hạn: {promo.startDate} - {promo.endDate}
                </p>
                <div className="flex gap-2">
                  {promo.code ? (
                    <button
                      onClick={() => copyToClipboard(promo.code)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      {promo.code} (Sao chép)
                    </button>
                  ) : null}
                  <a
                    href="/cart"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center transition-colors"
                  >
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {promotions.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            Hiện tại không có khuyến mãi nào.
          </div>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}
