// Import Axios
import axios from 'axios';

// Create Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'https://dahua.metcfire.com.tw/api/CRUDTest',
});

export type User = {
  id?: string;
  name: string;
  age: number;
};

// API functions
const api = {
  // GET Request: Fetch all items
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/a');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  // POST Request: Create a new item
  create: async (user: User) => {
    try {
      const response = await axiosInstance.post('', user);
      return response.data;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  },

  // PATCH Request: Update an existing item
  update: async (user: User) => {
    try {
      const response = await axiosInstance.patch('', user);
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },

  // DELETE Request: Remove an item by ID
  delete: async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  },
};

export default api;
