import { DataProvider, fetchUtils } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem('eventsync_token');
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, { ...options, headers });
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    let url = `${API_URL}/${resource}`;

    if (resource === 'rooms' && params.filter?.event_id) {
      url += `?event_id=${params.filter.event_id}`;
    }

    const { json } = await httpClient(url);

    let data = Array.isArray(json) ? json : [];

    if (params.filter) {
      data = data.filter((item: any) => {
        return Object.entries(params.filter).every(([key, value]) => {
          if (!value) return true;
          return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
        });
      });
    }

    const { field, order } = params.sort || { field: 'id', order: 'ASC' };
    data.sort((a: any, b: any) => {
      if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
      if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
      return 0;
    });

    const { page, perPage } = params.pagination;
    const total = data.length;
    const start = (page - 1) * perPage;
    data = data.slice(start, start + perPage);

    return { data, total };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) => httpClient(`${API_URL}/${resource}/${id}`))
    );
    return { data: responses.map((r) => r.json) };
  },

  getManyReference: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}`);
    const data = Array.isArray(json) 
      ? json.filter((item: any) => item[params.target] === params.id)
      : [];
    return { data, total: data.length };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  delete: async (resource, params) => {
  await httpClient(`${API_URL}/${resource}/${params.id}`, { method: 'DELETE' });
  return { data: (params as any).previousData ?? ({ id: params.id } as any) };
},

  deleteMany: () => Promise.resolve({ data: [] }),
  updateMany: () => Promise.resolve({ data: [] }),
};