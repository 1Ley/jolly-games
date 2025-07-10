'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Globe, GamepadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const countries = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'ES', name: 'España' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'OTHER', name: 'Otro país' }
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: '',
    minecraftNick: '',
    email: '',
    country: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasNumber && hasSpecialChar;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      setErrors(prev => ({ ...prev, password: 'La contraseña no cumple los requisitos.' }));
      return;
    }
    // Lógica de registro aquí
    console.log('Register form submitted:', form);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/images/fondohome.gif"
        alt="Jolly Games background"
        layout="fill"
        objectFit="cover"
        quality={100}
        unoptimized
        className="absolute inset-0 z-0 opacity-30"
      />
      <div className="absolute inset-0 z-0 bg-black/70" />

      <main className="relative z-10 flex items-center justify-center min-h-screen py-16">
        <motion.div 
          className="bento-item max-w-md w-full mx-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Crear una Cuenta</h1>
            <p className="text-gray-300">Únete a la comunidad de JollyGames</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos del formulario */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Nombre de Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20" placeholder="Elige tu nombre de usuario" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Nick de Minecraft</label>
              <div className="relative">
                <GamepadIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" name="minecraftNick" value={form.minecraftNick} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20" placeholder="Tu nick para jugar" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20" placeholder="tu@email.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">País</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select name="country" value={form.country} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 appearance-none" required>
                  <option value="" className="bg-gray-800">Selecciona tu país</option>
                  {countries.map(c => <option key={c.code} value={c.code} className="bg-gray-800">{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} className="w-full pl-10 pr-12 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20" placeholder="Crea una contraseña segura" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="text-xs text-gray-400 space-y-1 pt-1">
                <p className={form.password.length >= 8 ? 'text-green-400' : ''}>Mínimo 8 caracteres</p>
                <p className={/\d/.test(form.password) ? 'text-green-400' : ''}>Al menos un número</p>
                <p className={/[!@#$%^&*(),.?":{}|<>]/.test(form.password) ? 'text-green-400' : ''}>Al menos un símbolo especial</p>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold shadow-lg shadow-green-500/30">
              Registrarse
            </Button>

            <div className="min-h-[2rem]">{/* Espacio para mensajes del servidor */}</div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/auth/login" className="font-semibold text-blue-400 hover:text-blue-300">
                Inicia sesión
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}