export const API_BASE_URL = 'http://localhost:5000/api';

const USE_MOCK = true; // Toggle this to false when backend is running

export const fetchApi = async (endpoint, options = {}) => {
  if (USE_MOCK) {
    console.log(`[MOCK API] ${options.method || 'GET'} ${endpoint}`, options.body);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (endpoint === '/auth/otp/request') {
      return { message: 'OTP sent successfully' };
    }
    
    if (endpoint === '/auth/otp/verify') {
      return {
        token: 'mock-jwt-token-123',
        user: { _id: 'u1', phone: '1234567890', name: 'Citizen Demo', role: 'citizen', karmaTotal: 42 }
      };
    }
    
    if (endpoint === '/auth/me') {
      return { _id: 'u1', phone: '1234567890', name: 'Citizen Demo', role: 'citizen', karmaTotal: 42 };
    }
    
    if (endpoint === '/problems/mine') {
      return [
        { _id: 'p1', title: 'Pothole on Main St', problemIdReadable: 'NRV-2026-000001', category: 'Urban Development', status: 'verified' },
        { _id: 'p2', title: 'Water contamination', problemIdReadable: 'NRV-2026-000002', category: 'Water Resources', status: 'deployed' }
      ];
    }
    
    if (endpoint === '/karma/mine') {
      return { total: 42, ledger: [] };
    }
    
    if (endpoint === '/problems' && options.method === 'POST') {
      return { _id: 'p3', problemIdReadable: 'NRV-2026-000003', status: 'submitted' };
    }
    
    return {};
  }

  // Real implementation below
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
