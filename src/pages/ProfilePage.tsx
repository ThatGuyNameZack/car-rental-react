import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 
import { auth } from '../firebaseConfig';
import { User, CreditCard, Shield, Lock, CheckCircle, AlertCircle, Eye, EyeOff, Plus, Trash2, Edit2, Home, LogOut } from 'lucide-react';
import { useAuthAndProfile, useSavedCards } from '../hooks/useUser';

type TabType = 'personal' | 'cards' | 'verification' | 'security';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [showPassword, setShowPassword] = useState(false);

  const { firebaseUser, userProfile, loading: loadingAuth } = useAuthAndProfile();
  const { cards: savedCards, loading: loadingCards } = useSavedCards(firebaseUser?.uid);

  const [localProfile, setLocalProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dob: ''
  });

  useEffect(() => {
    if (userProfile) {
      setLocalProfile({
        fullName: userProfile.fullName || 'N/A',
        email: userProfile.email || 'N/A',
        phoneNumber: userProfile.phoneNumber || '',
        address: (userProfile as any).address || '',
        dob: (userProfile as any).date_of_birth || ''
      });
    }
  }, [userProfile]);

  const handleSaveProfile = () => {
    if (!firebaseUser) return;
    console.log("Saving profile changes:", localProfile);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  if (loadingAuth || loadingCards) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Memuat Profil...</div>;
  }

  if (!firebaseUser || !userProfile) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Anda harus login untuk melihat halaman ini.</div>;
  }

  const displayEmail = firebaseUser.email || 'N/A';
  const displayFullName = userProfile.fullName || 'Pengguna';
  const userStats = {
    totalRentals: userProfile.totalRentals,
    totalSpent: userProfile.totalSpent
  };
  const isVerified = (userProfile.verificationStatus as any)?.ktp === 'verified';
  const verificationStatus = userProfile.verificationStatus || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </button>
            <button 
              onClick={handleLogout}
              className="md:hidden text-red-600 font-medium text-sm"
            >
              Keluar
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {displayFullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{displayFullName}</h1>
              <p className="text-gray-600">{displayEmail}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="text-gray-600">
                  <strong>{userStats.totalRentals}</strong> Total Sewa
                </span>
                <span className="text-gray-400">•</span>
                <span className={`font-semibold ${isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isVerified ? 'Member Verified' : 'Perlu Verifikasi'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setActiveTab('personal')}
                className={`w-full flex items-center space-x-3 px-6 py-4 transition ${
                  activeTab === 'personal'
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Informasi Pribadi</span>
              </button>

              <button
                onClick={() => setActiveTab('cards')}
                className={`w-full flex items-center space-x-3 px-6 py-4 transition ${
                  activeTab === 'cards'
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Kartu Tersimpan</span>
              </button>

              <button
                onClick={() => setActiveTab('verification')}
                className={`w-full flex items-center space-x-3 px-6 py-4 transition ${
                  activeTab === 'verification'
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Verifikasi Data</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center space-x-3 px-6 py-4 transition ${
                  activeTab === 'security'
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Keamanan</span>
              </button>
              <div className="border-t border-gray-100 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-6 py-4 text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar Akun</span>
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white mt-6">
              <h3 className="font-semibold mb-4">Statistik Akun</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold">{userStats.totalRentals}</div>
                  <div className="text-blue-100 text-sm">Total Penyewaan</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Personal Information */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Pribadi</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={localProfile.fullName}
                      onChange={(e) => setLocalProfile({...localProfile, fullName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={localProfile.email}
                      onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                    <input
                      type="tel"
                      value={localProfile.phoneNumber}
                      onChange={(e) => setLocalProfile({...localProfile, phoneNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                    <input
                      type="date"
                      value={localProfile.dob}
                      onChange={(e) => setLocalProfile({...localProfile, dob: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                    <textarea
                      rows={3}
                      value={localProfile.address}
                      onChange={(e) => setLocalProfile({...localProfile, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {/* Saved Cards */}
            {activeTab === 'cards' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Kartu Tersimpan</h2>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <Plus className="w-5 h-5" />
                    <span>Tambah Kartu</span>
                  </button>
                </div>

                {loadingCards ? (
                  <div className="text-center py-4 text-gray-600">Memuat kartu...</div>
                ) : savedCards.length === 0 ? (
                  <div className="text-center py-4 text-gray-600">Anda belum menyimpan kartu.</div>
                ) : (
                  <div className="space-y-4">
                    {savedCards.map(card => (
                      <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                              {card.type === 'Visa' ? 'V' : 'M'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {card.type} •••• {card.last4}
                              </div>
                              <div className="text-sm text-gray-600">Berlaku hingga {card.expiry}</div>
                            </div>
                            {card.isDefault && (
                              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}


                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <div className="font-semibold mb-1">Informasi Aman</div>
                      <div>Data kartu Anda dienkripsi dan disimpan dengan aman sesuai standar PCI DSS.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                {/* KTP Verification */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        (verificationStatus.ktp === 'verified') ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {(verificationStatus.ktp === 'verified') ? 
                          <CheckCircle className="w-6 h-6 text-green-600" /> : 
                          <AlertCircle className="w-6 h-6 text-yellow-600" />
                        }
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">KTP</h3>
                        <p className={`text-sm ${
                          (verificationStatus.ktp === 'verified') ? 'text-green-600' : 'text-yellow-600'
                        }`}>{(verificationStatus.ktp === 'verified') ? 'Terverifikasi' : 'Belum Terverifikasi'}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Lihat Detail
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-700">
                      <div>No. KTP: {(verificationStatus.ktp === 'verified') ? '3175••••••••1234' : 'N/A'}</div>
                      <div className="text-gray-500 mt-1">Diverifikasi pada 15 Nov 2024</div>
                    </div>
                  </div>
                </div>

                {/* SIM Verification */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        (verificationStatus.sim === 'verified') ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {(verificationStatus.sim === 'verified') ? 
                          <CheckCircle className="w-6 h-6 text-green-600" /> : 
                          <AlertCircle className="w-6 h-6 text-yellow-600" />
                        }
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">SIM A</h3>
                        <p className={`text-sm ${
                          (verificationStatus.sim === 'verified') ? 'text-green-600' : 'text-yellow-600'
                        }`}>{(verificationStatus.sim === 'verified') ? 'Terverifikasi' : 'Belum Terverifikasi'}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Lihat Detail
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-700">
                      <div>No. SIM: {(verificationStatus.sim === 'verified') ? '1234567890123456' : 'N/A'}</div>
                      <div className="text-gray-500 mt-1">Berlaku hingga 20 Jan 2027</div>
                    </div>
                  </div>
                </div>

                {/* Selfie Verification */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        (verificationStatus.face === 'verified') ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {(verificationStatus.face === 'verified') ? 
                          <CheckCircle className="w-6 h-6 text-green-600" /> : 
                          <AlertCircle className="w-6 h-6 text-yellow-600" />
                        }
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Verifikasi Wajah</h3>
                        <p className={`text-sm ${
                          (verificationStatus.face === 'verified') ? 'text-green-600' : 'text-yellow-600'
                        }`}>{(verificationStatus.face === 'verified') ? 'Terverifikasi' : 'Menunggu Verifikasi'}</p>
                      </div>
                    </div>
                    {(verificationStatus.face !== 'verified') && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        Upload Foto
                      </button>
                    )}
                  </div>
                  <div className={`rounded-lg p-4 ${
                    (verificationStatus.face !== 'verified') ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'
                  }`}>
                    <p className={`text-sm ${
                      (verificationStatus.face !== 'verified') ? 'text-yellow-800' : 'text-green-800'
                    }`}>
                      {(verificationStatus.face !== 'verified') ? 
                        'Verifikasi wajah diperlukan untuk meningkatkan keamanan akun Anda. Proses ini memakan waktu 1-2 hari kerja.' :
                        'Verifikasi wajah Anda telah berhasil.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ubah Password</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Update Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Autentikasi Dua Faktor (2FA)</h3>
                      <p className="text-sm text-gray-600">Tambahkan lapisan keamanan ekstra ke akun Anda</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      Saat diaktifkan, Anda akan diminta memasukkan kode verifikasi setiap kali login dari perangkat baru.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;