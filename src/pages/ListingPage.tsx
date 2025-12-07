import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Star, Users, Fuel, Settings, ArrowLeft, Home } from 'lucide-react';
import { useCars } from '../hooks/useCars';

const ListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { cars, loading } = useCars();
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  const availableBrands = Array.from(new Set(cars.map(c => c.brand)));

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredCars = cars.filter(car => {
    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
    const matchPrice = car.price_per_day <= priceRange[1];
    return matchBrand && matchPrice;
  });

  if (loading) return <div className="p-10 text-center">Memuat data mobil...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Pilih Mobil</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition">
                <Home className="w-5 h-5" />
                <span className="hidden md:inline">Beranda</span>
              </button>
              <span className="text-gray-600">{filteredCars.length} mobil tersedia</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter Mobil
                </h2>
                <button 
                  onClick={() => {setSelectedBrands([]); setPriceRange([0, 2000000]);}}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  Reset
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Merek</h3>
                <div className="space-y-2">
                  {availableBrands.map(brand => (
                    <label key={brand} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Harga Maksimal</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rp 0</span>
                    <span className="font-semibold text-blue-600">
                      Rp {priceRange[1].toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Car Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <div 
                  key={car.id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/car/${car.id}`)}
                >
                  <div className="relative">
                    <img
                      src={car.image_urls[0]}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {car.type}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{car.brand}</h3>
                        <p className="text-gray-600">{car.model}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{car.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{car.seats}</span>
                      </div>
                      <div className="flex items-center">
                        <Settings className="w-4 h-4 mr-1" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="w-4 h-4 mr-1" />
                        <span>{car.fuel}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xl font-bold text-blue-600">
                          Rp {car.price_per_day.toLocaleString('id-ID')}
                        </span>
                        <span className="text-gray-500 text-sm">/hari</span>
                      </div>
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        Pilih
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;