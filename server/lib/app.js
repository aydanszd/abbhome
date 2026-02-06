const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const productAPI = {
  // Bütün məhsulları gətir
  getAll: async () => {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },
  
  // ID-yə görə məhsul gətir
  getById: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`);
    return res.json();
  },
  
  // Yeni məhsul əlavə et
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
  
  // Məhsulu yenilə
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
  
  // Məhsulu sil
  delete: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};