import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Users, Settings, Fuel, Calendar, Check, ChevronLeft, ChevronRight, ArrowLeft, Home } from 'lucide-react';
import { useCarDetail } from '../hooks/useCars';

const CarDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { car, loading } = useCarDetail(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [rentalDays, setRentalDays] = useState(1);
  const [location, setLocation] = useState('Jakarta Pusat');

  if (loading) return <div className="p-10 text-center">Memuat detail mobil...</div>;
  if (!car) return <div className="p-10 text-center">Mobil tidak ditemukan.</div>;

  const calculateTotal = () => {
    const basePrice = car.price_per_day * rentalDays;
    const insurance = 50000 * rentalDays;
    const total = basePrice + insurance;
    return { basePrice, insurance, total };
  };

  const { basePrice, insurance, total } = calculateTotal();

  const handleBooking = () => {
    if (!pickupDate || !returnDate) {
      alert("Mohon pilih tanggal sewa");
      return;
    }

    navigate('/payment', { 
      state: { 
        car, 
        pickupDate, 
        returnDate, 
        rentalDays, 
        location,
        total,
        insurance 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition">
              <ArrowLeft className="w-6 h-6" />
              <span>Kembali</span>
            </button>
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition">
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={car.image_urls[selectedImage]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-96 object-cover"
                />
                {car.image_urls.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : car.image_urls.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => (prev < car.image_urls.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              
              <div className="p-4 flex gap-2 overflow-x-auto">
                {car.image_urls.map((img, idx) => (
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
                    Rp {car.price_per_day.toLocaleString('id-ID')}
                  </div>
                  <div className="text-gray-500">per hari</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{car.description || 'Tidak ada deskripsi tersedia.'}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Kapasitas</div>
                    <div className="font-semibold">{car.seats} Orang</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Transmisi</div>
                    <div className="font-semibold">{car.transmission}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Bahan Bakar</div>
                    <div className="font-semibold">{car.fuel}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Tahun</div>
                    <div className="font-semibold">{car.year}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Fitur Mobil</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {car.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Form Pemesanan</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Ambil</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kembali</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durasi (Hari)</label>
                  <input
                    type="number"
                    min="1"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Jakarta Pusat</option>
                    <option>Bandung</option>
                    <option>Surabaya</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Harga Sewa</span>
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

              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3"
              >
                Pesan Sekarang
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;