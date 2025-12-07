import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Car className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RentalMobil.id</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  isActive('/') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Beranda
              </button>
              <button 
                onClick={() => navigate('/history')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  isActive('/history') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Riwayat
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  isActive('/profile') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Profile
              </button>
            </nav>

            {/* Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Popup */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray bg-opacity-50 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 p-6">
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate('/');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      isActive('/') 
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Beranda
                  </button>
                  {/* <button
                    onClick={() => {
                      navigate('/listing');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      isActive('/listing') 
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Daftar Mobil
                  </button> */}
                  <button
                    onClick={() => {
                      navigate('/history');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      isActive('/history') 
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Riwayat Sewa
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      isActive('/profile') 
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Profile
                  </button>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center space-x-3 mb-4">
                  <Car className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-gray-900">RentalMobil.id</span>
                </div>
                <p className="text-sm text-gray-600">
                  Sewa mobil mudah & terpercaya
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
