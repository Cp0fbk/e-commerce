import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Api from '../context/ApiContext';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState('Đang xử lý thanh toán...');
  const paymentId = params.get('paymentId');

  useEffect(() => {
    if (!paymentId) {
      setMessage('Thiếu thông tin thanh toán.');
      return;
    }

    Api.paymentSuccess(paymentId)
      .then((res) => {
        if (res.status === 200 && res.data.status === 'success') {
          setMessage('Thanh toán thành công! Cảm ơn bạn đã mua sắm tại cửa hàng.');
        } else {
          setMessage('Không xác nhận được thanh toán.');
        }
      })
      .catch(() => {
        setMessage('Lỗi khi xử lý kết quả thanh toán.');
      });
  }, [paymentId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Kết quả thanh toán</h1>
      <p className="text-gray-700 mb-6">{message}</p>
      <Link to="/" className="text-blue-600 hover:underline">Quay lại trang chủ</Link>
    </div>
  );
}
