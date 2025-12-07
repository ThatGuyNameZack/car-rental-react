import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, UserPlus, AlertCircle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak sama.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: '',
        totalRentals: 0,
        totalSpent: 0,
        verificationStatus: { ktp: 'pending', sim: 'pending', face: 'pending' },
        createdAt: new Date().toISOString()
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate('/login');

    } catch (err: any) {
      console.error("Registration Error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Email ini sudah terdaftar.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Format email tidak valid.");
      } else {
        setError("Gagal mendaftar: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Buat Akun Baru</h2>
          <p className="mt-2 text-sm text-gray-600">
            Daftar untuk mulai menyewa mobil
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="rounded-md -space-y-px">
            <div className="relative mb-4">
              <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="fullName"
                  type="text"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative mb-4">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative mb-4">
              <label className="text-sm font-medium text-gray-700">No. Telepon</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                  placeholder="0812..."
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative mb-4">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                  placeholder="******"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

             <div className="relative mb-4">
              <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                  placeholder="******"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Masuk di sini
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;