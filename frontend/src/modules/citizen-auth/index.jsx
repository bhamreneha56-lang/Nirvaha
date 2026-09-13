import React, { useState } from 'react';
import { fetchApi } from '../../shared/api-client';
import { theme } from '../../shared/theme';

export default function CitizenAuth({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request'); // 'request' | 'verify'
  const [error, setError] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await fetchApi('/auth/otp/request', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });
      setStep('verify');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await fetchApi('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ phone, otp }),
      });
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: theme.gradients.tricolor }}>
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: theme.colors.textNavy }}>
          Citizen Portal Login
        </h2>
        
        {error && <div className="bg-orange-100 text-orange-700 p-3 rounded mb-4">{error}</div>}

        {step === 'request' ? (
          <form onSubmit={handleRequestOtp}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="+91 "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded"
              style={{ backgroundColor: theme.colors.accent }}
            >
              Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="123456"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded"
              style={{ backgroundColor: theme.colors.accent }}
            >
              Verify & Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
