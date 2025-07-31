import React, { useState } from 'react';
import { login, register } from '../utils/userData';
import { useNavigate } from 'react-router-dom';

const ACTIVITIES = [
  'RUNNING',
  'WALKING',
  'CYCLING',
  'WEIGHT_TRAINING',
  'YOGA',
  'HIIT',
  'CARDIO',
  'STRETCHING',
  'OTHER',
];


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await login({ email, password });
      console.log(res);
      setMessage('Login successful!');
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      navigate('/create-activity'); // Redirect to create activity page
      // Optionally reset fields or redirect
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 min-w-[250px] animate-fade-in text-white" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        required
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Logging In...' : 'Login'}
      </button>
      {message && <div className="text-green-400 text-center text-sm mt-2">{message}</div>}
      {error && <div className="text-red-400 text-center text-sm mt-2">{error}</div>}
    </form>
  );
}

// ...existing code...

function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await register({ firstName, lastName, email, password });
      console.log(res);
      // setMessage('Registration successful!');
      // setFirstName('');
      // setLastName('');
      // setEmail('');
      // setPassword('');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 min-w-[250px] animate-fade-in text-white" onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" required className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" required className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80" value={lastName} onChange={e => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" required className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" required className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
      {message && <div className="text-green-400 text-center text-sm mt-2">{message}</div>}
      {error && <div className="text-red-400 text-center text-sm mt-2">{error}</div>}
    </form>
  );
}

export default function LandingPage() {
  const [tab, setTab] = useState('login');

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="relative max-w-md w-full mx-4 p-8 bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-md border border-white/30 dark:border-gray-700 mt-10 animate-fade-in">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-2">
            <span className="text-5xl drop-shadow-md animate-bounce">💪</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-blue-700 dark:text-blue-400 tracking-tight drop-shadow">Welcome to <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">FitLife</span></h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Your personalized fitness activity tracker and recommender.</p>
        </header>
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-gray-200">Track activities like:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {ACTIVITIES.map((act, i) => (
              <span
                className="bg-gradient-to-r from-blue-500 to-indigo-400 text-white rounded-full px-4 py-1 text-sm font-medium shadow-md animate-fade-in-up hover:scale-110 transition-transform duration-200 cursor-pointer"
                key={act}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {act.replace('_', ' ')}
              </span>
            ))}
          </div>
        </section>
        <section>
          <div className="flex justify-center gap-4 mb-4">
            <button
              className={`px-4 py-2 font-semibold rounded-t-xl transition-all duration-200 border-b-4 focus:outline-none ${tab === 'login' ? 'border-blue-600 text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 shadow' : 'border-transparent text-gray-500 dark:text-gray-400 bg-transparent'}`}
              onClick={() => setTab('login')}
              type="button"
            >
              Login
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-t-xl transition-all duration-200 border-b-4 focus:outline-none ${tab === 'signup' ? 'border-blue-600 text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 shadow' : 'border-transparent text-gray-500 dark:text-gray-400 bg-transparent'}`}
              onClick={() => setTab('signup')}
              type="button"
            >
              Sign Up
            </button>
          </div>
          <div className="flex justify-center min-h-[240px]">
            {tab === 'login' ? <LoginForm /> : <SignupForm />}
          </div>
        </section>
      </div>
      {/* Animations for fade-in and fade-in-up */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 