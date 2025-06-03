import { api } from '../utils/axiosConfig';

const CLIENTS_URL = '/clients';

export const clientApi = {
  getClients: async (page = 1) => {
    const res = await api.get(`${CLIENTS_URL}?page=${page}`);
    return res.data;
  },

  getClientById: async (id) => {
    const res = await api.get(`${CLIENTS_URL}/${id}`);
    return res.data;
  },

  createClient: async (data) => {
    if (!data.name || !data.email || !data.phone) {
        data.error = 'Preencha os campos obrigatórios';
        return data;
    }

    const res = await api.post(CLIENTS_URL, {
        name: data.name,
        email: data.email,
        phone: data.phone || null
      });
      return res.data;
  },

  updateClient: async (id, data) => {
    if (!data.name || !data.email || !data.phone) {
        data.error = 'Preencha os campos obrigatórios';
        return data;
    }

    const res = await api.put(`${CLIENTS_URL}/${id}`, {
      name: data.name,
      email: data.email,
      phone: data.phone || null
    });
    return res.data;
  },

  deleteClient: async (id) => {
    const res = await api.delete(`${CLIENTS_URL}/${id}`);
    return res.data;
  },
};
