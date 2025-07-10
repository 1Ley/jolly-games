'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck, LogIn } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Aquí iría la lógica de autenticación
    // Por ahora, simulamos una respuesta
    if (username && password) {
      setSuccess('Inicio de sesión exitoso. Redirigiendo...');
      // Lógica de redirección
    } else {
      setError('Por favor, completa todos los campos.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/images/fondohome.gif')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bento-item glass-card p-8 rounded-2xl border border-gray-700 bg-gray-800 bg-opacity-50 backdrop-blur-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white gradient-text">Iniciar Sesión</h1>
            <p className="text-gray-300 mt-2">Bienvenido de nuevo a JollyGames</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="username">
                Usuario o Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="TuUsuario / tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 border border-dashed border-gray-600 rounded-lg">
              <ShieldCheck className="text-gray-400 mr-2" size={20} />
              <p className="text-gray-400 text-sm">Placeholder para reCAPTCHA</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              <span>Iniciar Sesión</span>
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              ¿No tienes una cuenta?{' '}
              <Link href="/auth/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-all">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;