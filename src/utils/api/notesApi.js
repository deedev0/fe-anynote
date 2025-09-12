import api from './axiosConfig';

export const getNotes = async () => {
  const res = await api.get('/notes');
  return res.data;
}

export const addNote = async (data) => {
  const res = await api.post('/notes', data);
  return res.data;
}

export const toggleArchice = async (id, archive) => {
  const res = await api.patch(`/notes/${id}`, { isArchived: archive });
  return res;
}

export const togglePin = async (id, pin) => {
  const res = await api.patch(`/notes/${id}`, { isPinned: pin });
  return res;
}

export const editNote = async (id, data) => {
  console.log(data);
  const res = await api.patch(`/notes/${id}`, data);
  return res;
}

export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`);
  return res;
}

export const getNote = async (id) => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
}
