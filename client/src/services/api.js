export const API_BASE_URL = 'http://localhost:5000';
export const ITEMS_API_URL = `${API_BASE_URL}/api/items`;

export const normalizeItem = (item) => {
  if (!item) return item;

  const image = item.image || item.imageUrl || '';

  return {
    ...item,
    image,
  };
};

export const normalizeItems = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeItem);
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;

  const normalizedPath = imagePath.replaceAll('\\', '/');
  const uploadsIndex = normalizedPath.indexOf('/uploads/');

  if (uploadsIndex !== -1) {
    return `${API_BASE_URL}${normalizedPath.slice(uploadsIndex)}`;
  }

  return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};
