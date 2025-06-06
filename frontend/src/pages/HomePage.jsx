import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; // Thêm import Link từ react-router-dom
import Header from '../components/Header';
import Footer from '../components/Footer';
import Api from '../context/ApiContext';

// Data mẫu

const featuredProducts = [
  { id: 25, name: 'Acer Swift 5', price: '25.990.000đ', discount: '26.990.000đ', image: 'image/image25.jpg', rating: 5 },
  { id: 36, name: 'Sony WH-1000XM5', price: '7.990.000đ', discount: '9.790.000đ', image: 'image/image36.jpg', rating: 4.5 },
  { id: 29, name: 'Samsung Galaxy Tab S8', price: '19.990.000đ', discount: '20.990.000đ', image: 'image/image29.jpg', rating: 5 },
  { id: 51, name: 'Corsair Scimitar RGB Elite', price: '22.990.000đ', discount: '24.990.000đ', image: 'image/image51.jpg', rating: 4.5 },
  { id: 15, name: 'OPPO Reno 12 Pro', price: '14.990.000đ', discount: '16.300.000đ', image: 'image/image15.jpg', rating: 5 },
  { id: 59, name: 'Corsair K70 RGB MK.2', price: '10.990.000đ', discount: '12.990.000đ', image: 'image/image59.webp', rating: 4.5 },
  { id: 48, name: 'Logitech G102 Prodigy', price: '1.050.000đ', discount: '1.650.000đ', image: 'image/image48.png', rating: 4 },
  { id: 8, name: 'iPhone 15 Pro Max', price: '32.990.000đ', discount: '35.990.000đ', image: 'image/image8.jpg', rating: 4 },
];

const banners = [
  { id: 1, title: 'iPhone 15 Pro Max', description: 'Giảm đến 5.000.000đ', image: 'https://viendidong.com/wp-content/uploads/2023/09/iphone-15-pro-max-ra-mat-thumbnail-viendidong.jpg' },
  { id: 2, title: 'MacBook Pro M3', description: 'Trả góp 0%', image: 'https://images.vexels.com/media/users/3/126443/raw/ff9af1e1edfa2c4a46c43b0c2040ce52-banner-da-barra-de-toque-do-macbook-pro.jpg' },
  { id: 8, title: 'Samsung Galaxy S24 Ultra', description: 'Tặng tai nghe Galaxy Buds', image: 'https://images.samsung.com/vn/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-camera-overview-mo.jpg?imbypass=true' },
];

const newArrivals = [
  { id: 9, name: 'Samsung Galaxy Z Fold 6', price: '41.990.000đ', image: 'image/image9.jpg' },
  { id: 60, name: 'Razer BlackWidow V3 Mini', price: '1.400.000đ', image: 'image/image60.png' },
  { id: 10, name: 'Xiaomi 14 Ultra', price: '23.990.000đ', image: 'image/image10.jpg' },
  { id: 7, name: 'Tai nghe AirPods Max', price: '12.990.000đ', image: 'image/image7.webp' },
];

const brands = [
  { id: 1, name: 'Apple', imageUrl: 'https://cdn.tgdd.vn/Brand//1/Apple482-b_37.jpg' },
  { id: 2, name: 'Samsung', imageUrl: 'https://cdn.tgdd.vn/Brand//1/samsungnew-220x48-220x48-1.png' },
  { id: 3, name: 'Sony', imageUrl: 'https://cdn.tgdd.vn/Brand//1/Sony482-b_41.jpg' },
  { id: 4, name: 'Xiaomi', imageUrl: 'https://cdn.tgdd.vn/Brand//1/logo-xiaomi-220x48-14-220x48.png' },
  { id: 5, name: 'Asus', imageUrl: 'https://cdn.tgdd.vn/Brand//1/Asus482-b_26.png' },
  { id: 6, name: 'Oppo', imageUrl: 'https://cdn.tgdd.vn/Brand//1/OPPO42-b5-220x48-6.jpg' },
];


// const [categories, setCategories] = useState([]);
// const [banners, setBanners] = useState([]);
// const [featuredProducts, setFeaturedProducts] = useState([]);
// const [newArrivals, setNewArrivals] = useState([]);

// React.useEffect(() => {
//   async function fetchData() {
//     try {
//       const [catRes, bannerRes, featuredRes, newRes] = await Promise.all([
//         fetch('/api/categories'),
//         fetch('/api/banners'),
//         fetch('/api/products/featured'),
//         fetch('/api/products/new'),
//       ]);

//       const [catData, bannerData, featuredData, newData] = await Promise.all([
//         catRes.json(),
//         bannerRes.json(),
//         featuredRes.json(),
//         newRes.json(),
//       ]);

//       setCategories(catData);
//       setBanners(bannerData);
//       setFeaturedProducts(featuredData);
//       setNewArrivals(newData);
//     } catch (err) {
//       console.error('Lỗi khi tải dữ liệu:', err);
//     }
//   }

//   fetchData();
// }, []);


export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // Star component for ratings
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  };

  // Next banner after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentBanner]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await Api.getAllCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Không thể tải danh mục sản phẩm");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      <main>
        {/* Hero Banner */}
        <div className="relative">
          <div className="container mx-auto px-4 py-6">
            <div className="relative overflow-hidden rounded-lg h-64 md:h-96">
              {banners.map((banner, idx) => (
                <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                    <div className="text-white ml-8 md:ml-16">
                      <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                      <p className="text-lg md:text-xl mb-4">{banner.description}</p>
                      <Link 
                        to={`/products/${banner.id}`} // Thay bằng link đến sản phẩm phù hợp
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block"
                      >
                        Mua ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`h-2 w-2 rounded-full ${idx === currentBanner ? 'bg-white' : 'bg-white/50'}`}
                    onClick={() => setCurrentBanner(idx)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category thumbnails
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {categories
                .sort((a, b) => a.categoryTypeId - b.categoryTypeId)
                .map(category => {
                  const customNames = {
                    1: "Điện thoại",
                    2: "Laptop",
                    3: "Máy tính bảng",
                    4: "Tai nghe",
                    5: "Chuột",
                    6: "Bàn phím",
                  };
                  
                  const customImages = {
                    1: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
                    2: "https://surfaceviet.vn/wp-content/uploads/2024/05/Surface-Laptop-7-Platinum-13.8-inch.jpg",
                    3: "https://cdn.tgdd.vn/Products/Images/522/247517/iPad-9-wifi-trang-600x600.jpg",
                    4: "https://bizweb.dktcdn.net/100/340/129/products/tai-nghe-sony-ch-ch520-cuongphanvn-15.jpg?v=1728015465527",
                    5: "https://product.hstatic.net/200000637319/product/logitech-g102-lightsync-rgb-wired-gaming-mouse-black-903150-_41483e8daff448edbb83afc2524b811f_master.jpg",
                    6: "https://product.hstatic.net/1000233206/product/logitech-g-pro-x-mechanical-gaming-keyboard_2-600x400_0472fe2fcf3640dd8836c1fed7377043_grande.jpg"
                  };

                  return (
                    <Link 
                      to={`/detail/${category.categoryTypeId}`}
                      key={category.categoryTypeId} 
                      className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <img 
                          src={customImages[category.categoryTypeId]} 
                          alt={customNames[category.categoryTypeId]} 
                          className="w-8 h-8 object-contain" 
                        />
                      </div>
                      <span className="text-center font-medium">
                        {customNames[category.categoryTypeId]}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div> */}

        {/* Category thumbnails */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {categories
                .sort((a, b) => a.categoryTypeId - b.categoryTypeId)
                .map(category => {
                  const customNames = {
                    1: "Điện thoại",
                    2: "Laptop",
                    3: "Máy tính bảng",
                    4: "Tai nghe",
                    5: "Chuột",
                    6: "Bàn phím",
                  };
                  
                  const customImages = {
                    1: "https://image01-in.oneplus.net/media/202406/19/ec64eb41a8e787a798be1b71c13a51bb.png?x-amz-process=image/format,webp/quality,Q_80",
                    2: "https://cdn2.fptshop.com.vn/unsafe/lenovo_thinkbook_14_g7_iml_1_86346ba35a.png",
                    3: "https://p2-ofp.static.pub/fes/cms/2021/10/28/juqs65pgl1gh3dysi7yv1tnvtsiqva364946.png",
                    4: "https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch520_Primary_image?$categorypdpnav$&fmt=png-alpha",
                    5: "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/non-braid/hyjal-g502-hero/g502-hero-gallery-2-nb.png?v=1",
                    6: "https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/non-braid/g213-finch/g213-gallery-1-nb.png?v=1"
                  };

                  return (
                    <Link 
                      to={`/detail/${category.categoryTypeId}`}
                      key={category.categoryTypeId} 
                      className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                        <img 
                          src={customImages[category.categoryTypeId]} 
                          alt={customNames[category.categoryTypeId]} 
                          className="w-20 h-20 md:w-28 md:h-28 object-contain hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <span className="text-center font-medium text-sm md:text-base">
                        {customNames[category.categoryTypeId]}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sản Phẩm Mới</h2>
              <Link to="/newProducts" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {newArrivals.map(product => (
                <div key={product.id} className="flex-shrink-0 w-40 md:w-56">
                  <Link 
                    to={`/products/${product.id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow block"
                  >
                    <div className="p-4">
                      <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-4" />
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-blue-600 font-semibold">{product.price}</p>
                      <div className="mt-2">
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Mới</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sản Phẩm Nổi Bật</h2>
              <Link to="/detail/1" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border">
                  <div className="p-4">
                    <div className="relative">
                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.name} className="w-full h-40 md:h-48 object-contain mb-4" />
                      </Link>
                      <button className="absolute top-0 right-0 p-1 text-gray-400 hover:text-red-500">
                        <Heart size={20} />
                      </button>
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-2 h-10">{product.name}</h3>
                    </Link>
                    <div className="flex items-baseline mb-1">
                      <span className="text-blue-600 font-semibold">{product.price}</span>
                      <span className="text-gray-400 text-sm line-through ml-2">{product.discount}</span>
                    </div>
                    <RatingStars rating={product.rating} />
                    <Link 
                      to={`/products/${product.id}`}
                      className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors block text-center"
                    >
                      Thêm vào giỏ
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banners Grid */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden h-48">
                <img src="https://file.hstatic.net/1000329106/file/13-3-23_ipad_6e6b3bba09d24c98a9ff4fccdc84dad0_1024x1024.jpg" alt="Khuyến mãi máy tính bảng" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Máy tính bảng sale cực đậm</h3>
                    <p className="mb-4">Ưu đãi đặc biệt cho sinh viên</p>
                    <Link 
                      to="/promotions" 
                      className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 inline-block"
                    >
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden h-48">
                <img src="https://cdn.hoanghamobile.com/i/preview-np-V2/Uploads/ImageHightlight/6701_xiaomi-redmi-13-6gb-128gb/xiaomi-redmi-13-6gb-128gb638555336287725673.jpg" alt="Khuyến mãi điện thoại" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Khuyến mãi cuối tuần</h3>
                    <p className="mb-4">Giảm 10% cho tất cả điện thoại</p>
                    <Link 
                      to="/promotions" 
                      className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 inline-block"
                    >
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Thương Hiệu Nổi Bật</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <Link 
                  to={`/brands/${brand.id}`} 
                  key={brand.id} 
                  className="border rounded-lg p-4 flex items-center justify-center h-20 hover:shadow-md transition-shadow"
                >
                  <img src={brand.imageUrl} alt={brand.name} className="max-h-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>


        {/* Blog Posts */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tin Tức Công Nghệ</h2>
              <Link to="/blog" className="text-blue-600 hover:underline flex items-center">
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, idx) => (
                <Link 
                  to={`/blog/${idx+1}`} 
                  key={idx} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img src={`https://news.khangz.com/wp-content/uploads/2023/12/TOP-DIEN-THOAI-TAM-TRUNG-DANG-MUA-NHAT-2023-1-1.jpg`} alt={`Blog ${idx+1}`} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Top 10 điện thoại đáng mua năm 2025</h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      Khám phá những mẫu điện thoại mới nhất với công nghệ đột phá và hiệu năng vượt trội...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">24/03/2025</span>
                      <span className="text-blue-600 hover:underline">Đọc tiếp</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer categories={categories} />
    </div>
  );
}