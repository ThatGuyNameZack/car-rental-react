import gopayLogo from '../assets/Gopay.png';
import ovoLogo from '../assets/Ovo.png';
import qrisLogo from '../assets/QRIS.png';
import shopeeLogo from '../assets/Shopee.png';
import bcaLogo from '../assets/BCA.png';
import mandiriLogo from '../assets/MANDIRI.png';
import bniLogo from '../assets/BNI.png';
import briLogo from '../assets/BRI.png';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building2, Smartphone, Lock, CheckCircle, Calendar, MapPin, User, AlertCircle } from 'lucide-react';

type PaymentMethod = 'card' | 'va' | 'ewallet';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEwallet, setSelectedEwallet] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const orderDetails = {
    car: {
      brand: 'Toyota',
      model: 'Avanza',
      type: 'MPV',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      plate: 'B 1234 XYZ'
    },
    rental: {
      pickupDate: '2024-12-01',
      returnDate: '2024-12-05',
      location: 'Jakarta Pusat',
      days: 4
    },
    pricing: {
      basePrice: 350000,
      days: 4,
      insurance: 200000,
      serviceFee: 50000
    }
  };

  const total = (orderDetails.pricing.basePrice * orderDetails.pricing.days) + 
                orderDetails.pricing.insurance + 
                orderDetails.pricing.serviceFee;

  const savedCards = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/25' },
    { id: '2', type: 'Mastercard', last4: '8888', expiry: '09/26' }
  ];

  const banks = [
    { id: 'bca', name: 'BCA', logo: bcaLogo },
    { id: 'mandiri', name: 'Mandiri', logo: mandiriLogo },
    { id: 'bni', name: 'BNI', logo: bniLogo },
    { id: 'bri', name: 'BRI', logo: briLogo }
  ];

  const ewallets = [
    { id: 'gopay', name: 'GoPay', logo: gopayLogo },
    { id: 'ovo', name: 'OVO', logo: ovoLogo },
    { id: 'QRIS', name: 'QRIS', logo: qrisLogo },
    { id: 'shopeepay', name: 'ShopeePay', logo: shopeeLogo }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Pembayaran</h1>
          <p className="text-gray-600 mt-1">Selesaikan pembayaran untuk konfirmasi pesanan Anda</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="flex-1">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                    paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div className="font-semibold text-center">Kartu Kredit/Debit</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('va')}
                  className={`p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'va'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building2 className={`w-8 h-8 mx-auto mb-2 ${
                    paymentMethod === 'va' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div className="font-semibold text-center">Virtual Account</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('ewallet')}
                  className={`p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'ewallet'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className={`w-8 h-8 mx-auto mb-2 ${
                    paymentMethod === 'ewallet' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div className="font-semibold text-center">E-Wallet</div>
                </button>
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Detail Kartu</h3>

                {/* Saved Cards */}
                {savedCards.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Kartu Tersimpan</label>
                    <div className="space-y-2">
                      {savedCards.map(card => (
                        <label key={card.id} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition">
                          <input type="radio" name="saved-card" className="w-4 h-4 text-blue-600" />
                          <div className="ml-3 flex-1">
                            <div className="font-semibold">{card.type} •••• {card.last4}</div>
                            <div className="text-sm text-gray-600">Exp: {card.expiry}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 text-center">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        + Gunakan kartu baru
                      </button>
                    </div>
                  </div>
                )}

                {/* New Card Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Kartu</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pemegang Kartu</label>
                    <input
                      type="text"
                      placeholder="JOHN DOE"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kadaluarsa</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Simpan kartu untuk pembayaran selanjutnya</span>
                  </label>
                </div>
              </div>
            )}

            {/* Virtual Account */}
            {paymentMethod === 'va' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Pilih Bank</h3>
                <div className="grid grid-cols-2 gap-4">
                  {banks.map(bank => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-4 border-2 rounded-lg transition flex items-center space-x-3 ${
                        selectedBank === bank.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={bank.logo} alt={bank.name} className="w-10 h-10 object-contain" />
                      <div className="font-semibold">{bank.name}</div>
                    </button>
                  ))}
                </div>
                {selectedBank && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <div className="font-semibold mb-1">Instruksi Pembayaran</div>
                        <div>Setelah konfirmasi, Anda akan menerima nomor Virtual Account untuk melakukan pembayaran melalui ATM, mobile banking, atau internet banking.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* E-Wallet */}
            {paymentMethod === 'ewallet' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Pilih E-Wallet</h3>
                <div className="grid grid-cols-2 gap-4">
                  {ewallets.map(wallet => (
                    <button
                      key={wallet.id}
                      onClick={() => setSelectedEwallet(wallet.id)}
                      className={`p-4 border-2 rounded-lg transition flex items-center space-x-3 ${
                        selectedEwallet === wallet.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={wallet.logo} alt={wallet.name} className="w-10 h-10 object-contain" />
                      <div className="font-semibold">{wallet.name}</div>
                    </button>
                  ))}
                </div>
                {selectedEwallet && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <div className="font-semibold mb-1">Cara Pembayaran</div>
                        <div>Anda akan diarahkan ke aplikasi {ewallets.find(w => w.id === selectedEwallet)?.name} untuk menyelesaikan pembayaran.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-6">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Pembayaran Aman:</span> Semua transaksi dilindungi dengan enkripsi SSL 256-bit dan sesuai standar PCI DSS.
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Ringkasan Pesanan</h3>

              {/* Car Info */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <img
                  src={orderDetails.car.image}
                  alt={`${orderDetails.car.brand} ${orderDetails.car.model}`}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{orderDetails.car.brand} {orderDetails.car.model}</h4>
                    <p className="text-sm text-gray-600">{orderDetails.car.type}</p>
                    <p className="text-sm text-gray-600">Plat: {orderDetails.car.plate}</p>
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Ambil:</span>
                  <span className="font-semibold">{new Date(orderDetails.rental.pickupDate).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Kembali:</span>
                  <span className="font-semibold">{new Date(orderDetails.rental.returnDate).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Lokasi:</span>
                  <span className="font-semibold">{orderDetails.rental.location}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga Sewa ({orderDetails.rental.days} hari)</span>
                  <span className="font-semibold">Rp {(orderDetails.pricing.basePrice * orderDetails.pricing.days).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Asuransi</span>
                  <span className="font-semibold">Rp {orderDetails.pricing.insurance.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span className="font-semibold">Rp {orderDetails.pricing.serviceFee.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                <span className="text-2xl font-bold text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>

              {/* Payment Button */}
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span>Bayar Sekarang</span>
              </button>

              <p className="text-xs text-gray-500 text-center">
                Dengan melanjutkan, Anda menyetujui <a href="#" className="text-blue-600 hover:underline">syarat dan ketentuan</a> kami
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;