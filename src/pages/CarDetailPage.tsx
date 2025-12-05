import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Settings, Fuel, MapPin, Shield, Calendar, Clock, Check, ChevronLeft, ChevronRight, ArrowLeft, Home } from 'lucide-react';

const CarDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [rentalDays, setRentalDays] = useState(1);

  const car = {
    brand: 'Toyota',
    model: 'Avanza',
    type: 'MPV',
    rating: 4.5,
    reviews: 128,
    price: 350000,
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
    ],
    specs: {
      seats: 7,
      transmission: 'Manual',
      fuel: 'Bensin',
      year: 2023,
      luggage: '3 koper besar'
    },
    features: [
      'AC',
      'Audio System',
      'Power Steering',
      'Power Window',
      'Central Lock',
      'Airbag',
      'ABS',
      'USB Charger'
    ],
    description: 'Toyota Avanza adalah mobil MPV yang sempurna untuk keluarga atau perjalanan grup. Dengan kapasitas 7 penumpang dan kabin yang luas, mobil ini memberikan kenyamanan maksimal untuk perjalanan jauh maupun dalam kota.'
  };

  const calculateTotal = () => {
    const basePrice = car.price * rentalDays;
    const insurance = 50000 * rentalDays;
    const total = basePrice + insurance;
    return { basePrice, insurance, total };
  };

  const { basePrice, insurance, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Kembali</span>
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={car.images[selectedImage]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : car.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => (prev < car.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4 flex gap-2 overflow-x-auto">
                {car.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition ${
                      selectedImage === idx ? 'ring-2 ring-blue-600' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Car Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-2">
                    {car.type}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {car.brand} {car.model}
                  </h1>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{car.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{car.reviews} ulasan</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    Rp {car.price.toLocaleString('id-ID')}
                  </div>
                  <div className="text-gray-500">per hari</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{car.description}</p>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Kapasitas</div>
                    <div className="font-semibold">{car.specs.seats} Orang</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Transmisi</div>
                    <div className="font-semibold">{car.specs.transmission}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Bahan Bakar</div>
                    <div className="font-semibold">{car.specs.fuel}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Tahun</div>
                    <div className="font-semibold">{car.specs.year}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Fitur Mobil</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {car.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rental Terms */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Syarat & Ketentuan</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Wajib memiliki SIM A yang masih berlaku</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>KTP asli untuk verifikasi identitas</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Deposit Rp 500.000 (dikembalikan setelah pengembalian mobil)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Bahan bakar dikembalikan sesuai saat pengambilan</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Booking Sidebar - Sticky */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Form Pemesanan</h3>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Tanggal Ambil
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Tanggal Kembali
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Durasi Sewa
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-500 mt-1 block">{rentalDays} hari</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Lokasi Pengambilan
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Jakarta Pusat</option>
                    <option>Jakarta Selatan</option>
                    <option>Jakarta Utara</option>
                    <option>Bandung</option>
                    <option>Surabaya</option>
                  </select>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Harga Sewa ({rentalDays} hari)</span>
                    <span>Rp {basePrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Asuransi</span>
                    <span>Rp {insurance.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Insurance Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <div className="font-semibold mb-1">Termasuk Asuransi</div>
                    <div>Perlindungan terhadap kerusakan dan kehilangan</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/payment', { state: { car, pickupDate, returnDate, rentalDays, total } })}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3"
              >
                Pesan Sekarang
              </button>

              <p className="text-xs text-gray-500 text-center">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;