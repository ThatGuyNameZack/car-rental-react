import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Star, FileText, MessageCircle, XCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TabType = 'upcoming' | 'active' | 'completed';

interface Rental {
  id: string;
  car: {
    brand: string;
    model: string;
    image: string;
    plate: string;
  };
  pickupDate: string;
  returnDate: string;
  location: string;
  totalPrice: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  rating?: number;
}

const RentalHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const rentals: Rental[] = [
    {
      id: 'RNT-001',
      car: {
        brand: 'Toyota',
        model: 'Avanza',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
        plate: 'B 1234 XYZ'
      },
      pickupDate: '2024-12-01',
      returnDate: '2024-12-05',
      location: 'Jakarta Pusat',
      totalPrice: 1750000,
      status: 'upcoming'
    },
    {
      id: 'RNT-002',
      car: {
        brand: 'Honda',
        model: 'CR-V',
        image: 'https://images.unsplash.com/photo-1511527844068-006b95d162c2?w=400',
        plate: 'B 5678 ABC'
      },
      pickupDate: '2024-11-28',
      returnDate: '2024-12-02',
      location: 'Jakarta Selatan',
      totalPrice: 2600000,
      status: 'active'
    },
    {
      id: 'RNT-003',
      car: {
        brand: 'Mitsubishi',
        model: 'Xpander',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
        plate: 'B 9012 DEF'
      },
      pickupDate: '2024-11-20',
      returnDate: '2024-11-23',
      location: 'Bandung',
      totalPrice: 1200000,
      status: 'completed',
      rating: 5
    },
    {
      id: 'RNT-004',
      car: {
        brand: 'Toyota',
        model: 'Fortuner',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
        plate: 'B 3456 GHI'
      },
      pickupDate: '2024-11-10',
      returnDate: '2024-11-15',
      location: 'Surabaya',
      totalPrice: 3750000,
      status: 'completed',
      rating: 4
    }
  ];

  const getStatusBadge = (status: "upcoming" | "active" | "completed" | "cancelled") => {
    const badges = {
      upcoming: 'bg-blue-100 text-blue-700',
      active: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    const labels: Record<"upcoming" | "active" | "completed" | "cancelled", string> = {
      upcoming: 'Akan Datang',
      active: 'Aktif',
      completed: 'Selesai',
      cancelled: 'Dibatalkan'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredRentals = rentals.filter(rental => {
    if (activeTab === 'upcoming') return rental.status === 'upcoming';
    if (activeTab === 'active') return rental.status === 'active';
    if (activeTab === 'completed') return rental.status === 'completed';
    return false;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Riwayat Sewa</h1>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </button>
          </div>
          <p className="text-gray-600">Kelola dan pantau semua pesanan Anda</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-6 py-4 text-center font-medium transition ${
                activeTab === 'upcoming'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Akan Datang</span>
              </div>
              <div className="text-xs mt-1 text-gray-500">
                {rentals.filter(r => r.status === 'upcoming').length} pesanan
              </div>
            </button>

            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 px-6 py-4 text-center font-medium transition ${
                activeTab === 'active'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Sedang Aktif</span>
              </div>
              <div className="text-xs mt-1 text-gray-500">
                {rentals.filter(r => r.status === 'active').length} pesanan
              </div>
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 px-6 py-4 text-center font-medium transition ${
                activeTab === 'completed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Riwayat</span>
              </div>
              <div className="text-xs mt-1 text-gray-500">
                {rentals.filter(r => r.status === 'completed').length} pesanan
              </div>
            </button>
          </div>
        </div>

        {/* Rental Cards */}
        <div className="space-y-4">
          {filteredRentals.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak Ada Pesanan
              </h3>
              <p className="text-gray-600">
                Anda belum memiliki pesanan di kategori ini
              </p>
            </div>
          ) : (
            filteredRentals.map(rental => (
              <div key={rental.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Car Image */}
                    <div className="lg:w-64 flex-shrink-0">
                      <img
                        src={rental.car.image}
                        alt={`${rental.car.brand} ${rental.car.model}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>

                    {/* Rental Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {rental.car.brand} {rental.car.model}
                            </h3>
                            {getStatusBadge(rental.status)}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>No. Pesanan: <span className="font-semibold">{rental.id}</span></div>
                            <div>No. Plat: <span className="font-semibold">{rental.car.plate}</span></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            Rp {rental.totalPrice.toLocaleString('id-ID')}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">Tanggal Ambil</div>
                            <div className="font-semibold">{new Date(rental.pickupDate).toLocaleDateString('id-ID')}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">Tanggal Kembali</div>
                            <div className="font-semibold">{new Date(rental.returnDate).toLocaleDateString('id-ID')}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">Lokasi</div>
                            <div className="font-semibold">{rental.location}</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {rental.status === 'upcoming' && (
                          <>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                              <FileText className="w-4 h-4" />
                              <span>Lihat Detail</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                              <MessageCircle className="w-4 h-4" />
                              <span>Hubungi Pemilik</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
                              <XCircle className="w-4 h-4" />
                              <span>Batalkan</span>
                            </button>
                          </>
                        )}

                        {rental.status === 'active' && (
                          <>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                              <MapPin className="w-4 h-4" />
                              <span>Lacak Lokasi</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                              <MessageCircle className="w-4 h-4" />
                              <span>Hubungi Support</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                              <Calendar className="w-4 h-4" />
                              <span>Perpanjang Sewa</span>
                            </button>
                          </>
                        )}

                        {rental.status === 'completed' && (
                          <>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                              <FileText className="w-4 h-4" />
                              <span>Unduh Invoice</span>
                            </button>
                            {rental.rating ? (
                              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-yellow-700 font-medium">Rating: {rental.rating}/5</span>
                              </div>
                            ) : (
                              <button className="flex items-center space-x-2 px-4 py-2 border border-yellow-400 text-yellow-700 rounded-lg hover:bg-yellow-50 transition">
                                <Star className="w-4 h-4" />
                                <span>Beri Rating</span>
                              </button>
                            )}
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                              <Calendar className="w-4 h-4" />
                              <span>Pesan Lagi</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalHistory;