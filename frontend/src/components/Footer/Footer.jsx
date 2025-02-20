import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-lg font-semibold mb-2">CÔNG TY CỔ PHẦN FPT</h3>
            <p className="text-sm">
              Địa chỉ: Số 1, Đường Quang Trung, P. Hiệp Phú, Q. 9, TP. HCM
            </p>
            <p className="text-sm">Điện thoại: 1800 1234</p>
            <p className="text-sm">Email: support@fptshop.com.vn</p>
          </div>

          {/* Customer Support */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-lg font-semibold mb-2">HỖ TRỢ KHÁCH HÀNG</h3>
            <ul className="text-sm">
              <li>
                <a href="/customer-service" className="hover:underline">
                  Trung tâm hỗ trợ
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:underline">
                  Giao hàng và đổi trả
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Liên hệ chúng tôi
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-lg font-semibold mb-2">
              KẾT NỐI VỚI CHÚNG TÔI
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="text-center text-sm">
          <p>© 2024 CÔNG TY CỔ PHẦN FPT. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
