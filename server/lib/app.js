const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const productAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`);
    return res.json();
  },
  create: async (productData) => {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return res.json();
  },
  update: async (id, productData) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};