import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import Api from '../context/ApiContext';

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Đang xử lý hủy thanh toán...');
  const paymentId = searchParams.get('paymentId');

  useEffect(() => {
    if (!paymentId) {
      setMessage('Thiếu thông tin đơn hàng.');
      return;
    }

    Api.cancelPayment(paymentId)
      .then((res) => {
        if (res?.status === 'cancelled') {
          setMessage('Thanh toán đã bị hủy.');
        } else {
          setMessage('Không xác định được trạng thái hủy thanh toán.');
        }
      })
      .catch(() => {
        setMessage('Đã xảy ra lỗi khi xử lý hủy thanh toán.');
      });
  }, [paymentId]);

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <XCircle size={64} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-2">Thanh toán bị hủy</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
