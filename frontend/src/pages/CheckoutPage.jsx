import React, { useState, useEffect } from 'react';
import { ChevronRight} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Api from '../context/ApiContext';

// eslint-disable-next-line no-unused-vars
const availableVouchers = [
  { code: 'WELCOME10', discount: 0.1, maxDiscount: 500000, minOrder: 5000000 },
  { code: 'FLASH25', discount: 0.25, maxDiscount: 1000000, minOrder: 10000000 },
  { code: 'FREESHIP', discount: 0, shipping: true }
];

// Danh mục sản phẩm cho menu
const categories = [
  { id: 1, name: 'Điện thoại', subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO'] },
  { id: 2, name: 'Laptop', subcategories: ['Macbook', 'Dell', 'HP', 'Lenovo', 'Asus'] },
  { id: 3, name: 'Máy tính bảng', subcategories: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad'] },
  { id: 4, name: 'Tai nghe', subcategories: ['AirPods', 'Sony', 'JBL', 'Beats'] },
  { id: 5, name: 'Đồng hồ thông minh', subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi Watch'] },
];

export default function CheckoutPage({ appliedVoucher = null }) {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, qr
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const fetchCart = async () => {
  try {
    const data = await Api.getCart();
    const items = data.content;

    // Lấy ảnh cho từng item
    const itemsWithImages = await Promise.all(
      items.map(async (item) => {
        try {
          const imageUrl = await Api.getImagesByProductLine(item.productId.id);
          
          return { ...item, image: imageUrl }; // Gán image vào item
        } catch (error) {
          console.error("Image fetch failed for product:", item.productId.id);
          return { ...item, image: '' }; // fallback
        }
      })
    );

    setCartItems(itemsWithImages);
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
};


  useEffect(() => {
  fetchCart();
}, []);

  // Tính toán tổng tiền
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = appliedVoucher ? 
    (appliedVoucher.shipping ? 0 : Math.min(subtotal * appliedVoucher.discount, appliedVoucher.maxDiscount)) : 0;
  const shipping = subtotal > 2000000 || (appliedVoucher && appliedVoucher.shipping) ? 0 : 30000;
  const total = subtotal - discount + shipping;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async () => {
    const checkoutInfo = {
      shippingAddress: shippingInfo.address,
      lname: shippingInfo.lname,
      fname: shippingInfo.fname,
      phoneNumber: shippingInfo.phone,
      paymentMethod: paymentMethod,
      note: shippingInfo.note || '',
    };

    try {
      const orderResponse = await Api.checkout(checkoutInfo);
      const orderId = orderResponse?.orderId;

      if (paymentMethod === 'qr') {
        const returnUrl = `${window.location.origin}/payment/success?paymentId=${orderId}`;
        const cancelUrl = `${window.location.origin}/payment/cancel?paymentId=${orderId}`;

        const paymentPayload = {
          orderId: orderId,
          returnUrl,
          cancelUrl
        };

        console.log('Creating payment with payload:', paymentPayload);

        const paymentRes = await Api.createPayment(paymentPayload); 

        if (paymentRes?.data?.checkoutUrl) {
          window.location.href = paymentRes.data.checkoutUrl;
        } else {
          console.error('Lỗi khi tạo payment:', paymentRes.message);
          alert("Không thể tạo liên kết thanh toán. Vui lòng thử lại!");
        }
      } else {
        alert(orderResponse.message || "Đặt hàng thành công!");
        setOrderConfirmed(true);
        window.location.href = "/";
      }
    } catch (error) {
      alert("Đặt hàng thất bại. Vui lòng thử lại!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to={`/`} className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <Link to={`/cart`} className="text-gray-500 hover:text-blue-600">Giỏ hàng</Link>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <span className="text-gray-900 font-medium">Thanh toán</span>
        </div>

        {orderConfirmed ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-green-600">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm tại TechSphere. Đơn hàng của bạn đã được ghi nhận.</p>
            <p className="text-gray-600 mb-6">Chúng tôi sẽ liên hệ với bạn sớm để xác nhận chi tiết.</p>
            <Link to={`/`} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Quay lại trang chủ</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thông tin vận chuyển & phương thức thanh toán */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmitOrder}>
                {/* Thông tin vận chuyển */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Thông tin vận chuyển</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Họ *</label>
                        <input
                          type="text"
                          name="lname"
                          value={shippingInfo.lname}
                          onChange={handleShippingChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Tên *</label>
                        <input
                          type="text"
                          name="fname"
                          value={shippingInfo.fname}
                          onChange={handleShippingChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Số điện thoại *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Địa chỉ giao hàng *</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tỉnh/Thành phố *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Ghi chú (tùy chọn)</label>
                      <textarea
                        name="note"
                        value={shippingInfo.note}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <div>
                        <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                        <p className="text-sm text-gray-600">Bạn sẽ thanh toán khi nhận được hàng</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="qr"
                        checked={paymentMethod === 'qr'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <div>
                        <p className="font-medium">Thanh toán trực tuyến</p>
                        <p className="text-sm text-gray-600">Quét mã QR code</p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center mb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      <p className="text-sm text-gray-600">{item.color || item.storage || item.options}</p>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá:</span>
                    <span className="text-green-600">- {formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{shipping > 0 ? formatPrice(shipping) : <span className="text-green-600">Miễn phí</span>}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-base">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>
                <button
                  onClick={handleSubmitOrder}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-4 font-medium transition-colors"
                >
                  Xác nhận đặt hàng
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">(Đã bao gồm VAT nếu có)</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}