import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  HelpCircle,
  Shield,
  RefreshCw,
  MessageCircle,
  Phone,
  MapPin,
  Mail,
  Clock,
} from "lucide-react";
import { CategoryContext } from '../context/CategoryContext';

const Footer = () => {
  const { categories, loading } = useContext(CategoryContext);
  const categoryNameMapping = {
    1: 'Điện Thoại',
    2: 'Laptop',
    3: 'Máy tính bảng',
    4: 'Tai nghe',
    5: 'Chuột',
    6: 'Bàn Phím',
    // Add more mappings as needed
  };
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Cột 1: TechSphere */}
          <div>
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-extrabold text-red-600 hover:text-red-500 transition-colors tracking-tight"
            >
              <img src="/logo192.png" alt="Logo" className="h-10 w-10 mb-1" />
              <span>TechSphere</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Chuyên cung cấp các sản phẩm điện tử chính hãng với giá tốt nhất
              thị trường.
            </p>
            <p className="mt-2 text-gray-300 text-sm italic">
              Công nghệ dẫn đầu, tương lai trong tầm tay.
            </p>
            <p className="mt-2 text-green-300 font-semibold flex items-center">
              <Phone size={18} className="mr-2" />
              Hotline: 1800 1234
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 hover:scale-110 transition-all duration-200"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 hover:scale-110 transition-all duration-200"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 hover:scale-110 transition-all duration-200"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Cột 2: Danh mục sản phẩm */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
              Danh Mục Sản Phẩm
            </h3>
            <ul className="space-y-2 text-sm">
            {loading ? (
                <li className="text-gray-500">Đang tải danh mục...</li>
              ) : categories && categories.length > 0 ? (
                categories
                .sort((a, b) => a.categoryTypeId - b.categoryTypeId)
                .map((category) => (
                  <li key={category.categoryTypeId}>
                    <Link
                      to={`/detail/${category.categoryTypeId}`}
                      className="flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200"
                    >
                      <ChevronRight size={16} className="mr-2" />
                      {categoryNameMapping[category.categoryTypeId] || category.name || 'Không xác định'}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Không có danh mục nào</li>
              )}
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
              Hỗ Trợ Khách Hàng
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/guide"
                  className="flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200"
                >
                  <HelpCircle size={16} className="mr-2" />
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200"
                >
                  <Shield size={16} className="mr-2" />
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200"
                >
                  <Phone size={16} className="mr-2" />
                  Liên hệ hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
              Thông Tin Liên Hệ
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Đường Công Nghệ, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span className="text-green-300 font-semibold">1800 1234</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a
                  href="mailto:support@techsphere.com"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  support@techsphere.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>8:00 - 22:00 (T2 - CN)</span>
              </li>
              <li>
                <Link
                  to="/stores"
                  className="flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200"
                >
                  <MapPin size={16} className="mr-2" />
                  Tìm cửa hàng gần nhất
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-green-700 mt-8 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-300">
            <p>© {new Date().getFullYear()} TechSphere. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link
                to="/privacy"
                className="hover:text-green-300 transition-colors duration-200"
              >
                Chính sách bảo mật
              </Link>
              <Link
                to="/terms"
                className="hover:text-green-300 transition-colors duration-200"
              >
                Điều khoản dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
