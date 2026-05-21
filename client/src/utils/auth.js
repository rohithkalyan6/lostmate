export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export const getToken = () => localStorage.getItem('token');

export const getDashboardPath = (role) => {
  if (role === 'admin') return '/admin-dashboard';
  return '/dashboard';
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
