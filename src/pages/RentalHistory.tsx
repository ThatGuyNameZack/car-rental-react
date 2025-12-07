import React, { useState } from 'react';
import { Calendar, MapPin, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMyRentals } from '../hooks/useRentals';

type TabType = 'upcoming' | 'active' | 'completed';

const RentalHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  
  const { rentals, loading } = useMyRentals();
  const getStatusBadge = (status: string) => {
    const badges: any = {
      upcoming: 'bg-blue-100 text-blue-700',
      active: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status] || 'bg-gray-100'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const filteredRentals = rentals.filter(rental => rental.status === activeTab);

  if (loading) return <div className="p-10 text-center">Memuat riwayat...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Riwayat Sewa</h1>
          <button onClick={() => navigate('/')} className="flex items-center text-gray-600 hover:text-gray-900">
            <Home className="w-5 h-5 mr-2" /> Beranda
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 flex border-b">
          {['upcoming', 'active', 'completed'].map((tab) => (
             <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`flex-1 px-6 py-4 font-medium transition capitalize ${
                activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredRentals.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-gray-500">
              Tidak ada pesanan di kategori ini.
            </div>
          ) : (
            filteredRentals.map(rental => (
              <div key={rental.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col lg:flex-row gap-6">
                <div className="lg:w-64 flex-shrink-0">
                  <img
                    src={rental.carSnapshot?.image || 'https://via.placeholder.com/400'}
                    alt="Car"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">
                        {rental.carSnapshot?.brand} {rental.carSnapshot?.model}
                      </h3>
                      {getStatusBadge(rental.status)}
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      Rp {rental.totalPrice.toLocaleString('id-ID')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">Ambil</div>
                        <b>{rental.pickupDate}</b>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">Kembali</div>
                        <b>{rental.returnDate}</b>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">Lokasi</div>
                        <b>{rental.location}</b>
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