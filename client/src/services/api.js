import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Property API functions
export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.type && filters.type !== 'all') {
    params.append('type', filters.type);
  }
  
  if (filters.search) {
    params.append('search', filters.search);
  }
  
  const queryString = params.toString();
  const url = queryString ? `/properties?${queryString}` : '/properties';
  
  return api.get(url);
};

export const getProperty = async (id) => {
  return api.get(`/properties/${id}`);
};

export const createProperty = async (propertyData) => {
  return api.post('/properties', propertyData);
};

export const updateProperty = async (id, propertyData) => {
  return api.put(`/properties/${id}`, propertyData);
};

export const deleteProperty = async (id) => {
  return api.delete(`/properties/${id}`);
};

// Health check
export const healthCheck = async () => {
  return api.get('/health');
};
