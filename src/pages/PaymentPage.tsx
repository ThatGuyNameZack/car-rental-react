import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Home, CheckCircle } from 'lucide-react';
import { useAuthAndProfile } from '../hooks/useUser';
import { useCreateRental } from '../hooks/useRentals';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firebaseUser } = useAuthAndProfile();
  const { createRental, loading: bookingLoading } = useCreateRental();
  
  const bookingData = location.state;

  if (!bookingData) {
    return <div className="p-10 text-center">Data pesanan tidak ditemukan. Silakan pilih mobil kembali.</div>;
  }

  const { car, pickupDate, returnDate, rentalDays, total, insurance, location: pickupLocation } = bookingData;

  const handlePayment = async () => {
    if (!firebaseUser) {
      alert("Silakan login terlebih dahulu untuk melanjutkan pembayaran.");
      navigate('/login');
      return;
    }

    try {
      await createRental({
        userId: firebaseUser.uid,
        carId: car.id,
        carSnapshot: {
          brand: car.brand,
          model: car.model,
          image: car.image_urls[0],
          plate: car.plate || 'B 1234 XX'
        },
        pickupDate,
        returnDate,
        location: pickupLocation,
        totalPrice: total,
        status: 'upcoming'
      });

      navigate('/payment/success');

    } catch (error) {
      alert("Gagal memproses pesanan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Pembayaran</h1>
          <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-600">
            <Home className="w-5 h-5" /> <span>Beranda</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Metode Pembayaran</h2>
            <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-lg flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
              <span className="font-semibold">Transfer Bank / E-Wallet (Mock)</span>
            </div>
            <p className="text-gray-600 text-sm">
              Untuk demo ini, pembayaran akan dianggap otomatis berhasil tanpa gateway eksternal.
            </p>
          </div>

          <aside className="lg:w-96">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>
              
              <div className="mb-4 border-b pb-4">
                <img src={car.image_urls[0]} alt="car" className="w-full h-32 object-cover rounded-lg mb-2" />
                <h4 className="font-bold">{car.brand} {car.model}</h4>
                <p className="text-sm text-gray-600">{car.type}</p>
              </div>

              <div className="space-y-2 text-sm border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Tanggal Ambil:</span>
                  <span className="font-semibold">{pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal Kembali:</span>
                  <span className="font-semibold">{returnDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lokasi:</span>
                  <span className="font-semibold">{pickupLocation}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-blue-600 mb-6">
                <span>Total</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={bookingLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center gap-2"
              >
                {bookingLoading ? 'Memproses...' : (
                  <>
                    <CheckCircle className="w-5 h-5" /> Bayar Sekarang
                  </>
                )}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;