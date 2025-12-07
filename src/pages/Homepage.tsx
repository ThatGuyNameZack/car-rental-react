import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Car, Star, TrendingUp, LogIn, UserPlus } from 'lucide-react';
import { useFeaturedCars } from '../hooks/useCars';
import { useAuthAndProfile } from '../hooks/useUser';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const { firebaseUser, loading: loadingAuth } = useAuthAndProfile();
  const { cars: featuredCars, loading: loadingCars } = useFeaturedCars();

  const stats = [
    { label: 'Mobil Tersedia', value: '500+', icon: Car },
    { label: 'Pelanggan Puas', value: '10K+', icon: Star },
    { label: 'Rating Rata-rata', value: '4.8', icon: TrendingUp }
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (pickupDate) params.append('pickupDate', pickupDate);
    if (returnDate) params.append('returnDate', returnDate);
    
    navigate(`/listing?${params.toString()}`);
  };

  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Car className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RentalMobil.id</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Beranda
              </button>

              {!loadingAuth && (
                <>
                  {firebaseUser ? (
                    <>
                      <button 
                        onClick={() => navigate('/history')}
                        className="text-gray-600 hover:text-blue-600 font-medium transition"
                      >
                        Riwayat
                      </button>
                      <button 
                        onClick={() => navigate('/profile')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2"
                      >
                        <span>Akun Saya</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => navigate('/login')}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium transition px-4 py-2"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Masuk</span>
                      </button>
                      <button 
                        onClick={() => navigate('/register')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2 shadow-lg shadow-blue-200"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Daftar</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {firebaseUser 
                ? `Halo, Selamat Datang Kembali!` 
                : "Sewa Mobil Mudah & Terpercaya"
              }
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Temukan mobil impian Anda dengan harga terbaik. Ribuan pilihan mobil dari berbagai merek dan tipe.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pilih lokasi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Ambil</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kembali</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Cari Mobil</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Mobil Favorit Anda</h2>
          <p className="text-gray-600">Koleksi mobil terbaik dengan harga terjangkau</p>
        </div>

        {loadingCars && (
          <div className="text-center py-10 text-gray-600">Memuat data mobil...</div>
        )}

        {!loadingCars && featuredCars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div 
                key={car.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => handleCarClick(car.id)}
              >
                <div className="relative">
                  <img
                    src={car.image_urls[0]}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {car.type}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{car.brand}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{car.rating}</span>
                      <span className="text-gray-500 text-sm">({car.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{car.model}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        Rp {car.price_per_day.toLocaleString('id-ID')}
                      </span>
                      <span className="text-gray-500 text-sm">/hari</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCarClick(car.id);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Sewa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;