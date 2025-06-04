import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import Api from '../context/ApiContext';

// Dữ liệu mẫu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const RegisterPage = () => {
  const { setIsLoggedIn, setUserInfo } = useContext(AuthContext);
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '', // username là email
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    lname: '',
    fname: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    if (!isValidEmail(registerData.username)) {
      alert('Địa chỉ email không hợp lệ!');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Chuẩn bị dữ liệu người dùng để gửi đến API
      const userData = {
        name: registerData.lname + '' + registerData.fname,
        username: registerData.username,
        phoneNumber: registerData.phoneNumber,
        password: registerData.password,
        lname: registerData.lname,
        fname: registerData.fname,
      };
      console.log(userData); // Kiểm tra dữ liệu trước khi gửi đi
      // Gọi API đăng ký
      const response = await Api.Register(userData);
      
      if (response.status === 200 || response.status === 201) {
        // Lưu thông tin người dùng vào context
        setUserInfo({ 
          name: registerData.fname + ' ' + registerData.lname, 
          username: registerData.username,
          email: registerData.email, 
          phoneNumber: registerData.phoneNumber 
        });
        setIsLoggedIn(true);
        
        // Hiển thị thông báo thành công
        alert('Đăng ký thành công!');
        
        // Chuyển hướng đến trang tài khoản
        navigate('/account');
      }
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      setError('Đăng ký thất bại. Vui lòng thử lại!');
      alert('Đăng ký thất bại. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Đăng ký</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Đăng ký</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto"> {/* Tăng độ rộng tối đa */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid layout cho 2 cột */}
              <div>
                <label className="block text-sm font-medium mb-1">Họ</label>
                <input
                  type="text"
                  value={registerData.fname}
                  onChange={(e) => setRegisterData({ ...registerData, fname: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tên</label>
                <input
                  type="text"
                  value={registerData.lname}
                  onChange={(e) => setRegisterData({ ...registerData, lname: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="text"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  value={registerData.phoneNumber}
                  onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
            
            <p className="text-sm text-center">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">Đăng nhập</Link>
            </p>
          </form>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  );
};

export default RegisterPage;