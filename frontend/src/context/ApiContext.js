import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor to include auth token if available
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Authentication methods
  async Login(credentials) {
    
    try {
      const response = await this.axios.post('/auth/login', credentials);
      if (response.status === 200) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async Register(userData) {
    try {
      console.log(userData);
      return await this.axios.post('/auth/register', userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // async Logout() {
  //   try {
  //     const response = await this.axios.get('/auth/logout');
  //     // Remove token from localStorage
  //     localStorage.removeItem('token');
  //     return response;
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     throw error;
  //   }
  // }

  // Add more API methods as needed
}

const Api = new ApiService();
export default Api;