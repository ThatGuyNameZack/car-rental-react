import React, { useState } from 'react';
import { Filter, Star, Users, Fuel, Settings, ChevronDown } from 'lucide-react';

const ListingPage: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  const brands = ['Toyota', 'Honda', 'Mitsubishi', 'Daihatsu', 'Suzuki', 'Nissan'];
  const types = ['MPV', 'SUV', 'Sedan', 'Hatchback', 'Minibus'];

  const cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Avanza',
      type: 'MPV',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      rating: 4.5,
      reviews: 128,
      price: 350000,
      seats: 7,
      transmission: 'Manual',
      fuel: 'Bensin'
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Jazz',
      type: 'Hatchback',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      rating: 4.6,
      reviews: 89,
      price: 300000,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Bensin'
    },
    {
      id: 3,
      brand: 'Mitsubishi',
      model: 'Xpander',
      type: 'MPV',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
      rating: 4.7,
      reviews: 95,
      price: 400000,
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Bensin'
    },
    {
      id: 4,
      brand: 'Toyota',
      model: 'Fortuner',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      rating: 4.8,
      reviews: 156,
      price: 750000,
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Diesel'
    },
    {
      id: 5,
      brand: 'Honda',
      model: 'CR-V',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1511527844068-006b95d162c2?w=400',
      rating: 4.7,
      reviews: 142,
      price: 650000,
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Bensin'
    },
    {
      id: 6,
      brand: 'Daihatsu',
      model: 'Terios',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
      rating: 4.4,
      reviews: 78,
      price: 450000,
      seats: 7,
      transmission: 'Manual',
      fuel: 'Bensin'
    }
  ];

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Pilih Mobil</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{cars.length} mobil tersedia</span>
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
                <button className="text-blue-600 text-sm hover:text-blue-700">Reset</button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Merek</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
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

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Tipe</h3>
                <div className="space-y-2">
                  {types.map(type => (
                    <label key={type} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Harga Per Hari</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="50000"
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

              {/* Transmission */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Transmisi</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900">Manual</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900">Automatic</span>
                  </label>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Terapkan Filter
              </button>
            </div>
          </aside>

          {/* Car Grid */}
          <main className="flex-1">
            {/* Sort Options */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Urutkan berdasarkan:</span>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                  <option>Rating Tertinggi</option>
                  <option>Paling Populer</option>
                </select>
              </div>
            </div>

            {/* Car Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map(car => (
                <div key={car.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer">
                  <div className="relative">
                    <img
                      src={car.image}
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
                          Rp {car.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-gray-500 text-sm">/hari</span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
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