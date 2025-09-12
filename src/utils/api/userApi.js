import api from './axiosConfig';

export const createUser = async (data) => {
  const res = await api.post('/users', data);
  return res.data;
}
