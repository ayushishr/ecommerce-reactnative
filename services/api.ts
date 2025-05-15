import { Product } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};