import { AuthProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Identifiants incorrects');
    }

    const { token, admin } = await res.json();
    localStorage.setItem('eventsync_token', token);
    localStorage.setItem('eventsync_admin', JSON.stringify(admin));
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem('eventsync_token');
    localStorage.removeItem('eventsync_admin');
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('eventsync_token')
      ? Promise.resolve()
      : Promise.reject();
  },

  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('eventsync_token');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const admin = localStorage.getItem('eventsync_admin');
    if (!admin) return Promise.reject();
    const { id, name, email } = JSON.parse(admin);
    return Promise.resolve({ id, fullName: name, email });
  },

  getPermissions: () => Promise.resolve('admin'),
};
