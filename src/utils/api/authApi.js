import api from './axiosConfig';

export const login = async (data) => {
  const res = await api.post('/auth', data);
  console.log(res);
  return res.data;
}

export const checkAuth = async () => {
  const res = await api.get('/auth/status');
  return res;
}

export const logout = async () => {
  const res = await api.post('auth/logout');
  return res;
}