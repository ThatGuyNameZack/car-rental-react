import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Car, Download, Home, ArrowRight } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const bookingDetails = {
    bookingId: 'RNT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    car: {
      brand: 'Toyota',
      model: 'Avanza',
      type: 'MPV',
      plate: 'B 1234 XYZ',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
    },
    rental: {
      pickupDate: '2024-12-10',
      returnDate: '2024-12-15',
      location: 'Jakarta Pusat',
      days: 5
    },
    payment: {
      method: 'Kartu Kredit',
      amount: 1950000,
      transactionId: 'TRX-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
      paidAt: new Date().toLocaleString('id-ID')
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">RentalMobil.id</span>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Beranda</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Success Icon */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-4 sm:mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Pembayaran Berhasil!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Terima kasih! Pesanan Anda telah dikonfirmasi. Kami akan mengirimkan detail pemesanan ke email Anda.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-6 sm:mb-8">
          {/* Booking ID Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm mb-1">Nomor Pemesanan</p>
                <p className="text-white text-xl sm:text-2xl font-bold">{bookingDetails.bookingId}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg">
                <p className="text-white text-xs sm:text-sm font-semibold">Status: Terkonfirmasi</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Car Info */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
              <img
                src={bookingDetails.car.image}
                alt={`${bookingDetails.car.brand} ${bookingDetails.car.model}`}
                className="w-full sm:w-48 h-32 sm:h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                      {bookingDetails.car.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {bookingDetails.car.brand} {bookingDetails.car.model}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">Plat: {bookingDetails.car.plate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Tanggal Pengambilan</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {new Date(bookingDetails.rental.pickupDate).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Tanggal Pengembalian</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {new Date(bookingDetails.rental.returnDate).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Lokasi Pengambilan</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{bookingDetails.rental.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Durasi Sewa</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{bookingDetails.rental.days} Hari</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="font-bold text-gray-900 mb-4 text-base sm:text-lg">Detail Pembayaran</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Metode Pembayaran</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.payment.method}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">ID Transaksi</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.payment.transactionId}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Waktu Pembayaran</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.payment.paidAt}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total Dibayar</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    Rp {bookingDetails.payment.amount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button 
                onClick={() => navigate('/history')}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Lihat Riwayat Pesanan</span>
              </button>
              <button className="flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition text-sm sm:text-base">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Unduh Invoice</span>
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Langkah Selanjutnya</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Cek Email Anda</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Kami telah mengirimkan konfirmasi pemesanan dan voucher ke email Anda.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Siapkan Dokumen</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Bawa KTP, SIM A, dan voucher pemesanan saat pengambilan mobil.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Ambil Mobil</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Datang ke lokasi pengambilan sesuai tanggal dan waktu yang telah ditentukan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-4 sm:px-6 py-3 text-sm sm:text-base">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <span className="text-blue-900">
              Anda akan diarahkan ke beranda dalam <strong>{countdown}</strong> detik
            </span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium underline text-sm sm:text-base"
          >
            Kembali ke Beranda Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
