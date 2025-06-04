import axios from "axios";

const API_BASE_URL = "https://e-commerce-16de.onrender.com/api";

class ApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to include auth token if available
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
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
      const response = await this.axios.post("/auth/login", credentials);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async Register(userData) {
    try {
      return await this.axios.post("/auth/register", userData);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async Logout() {
    try {
      const response = await this.axios.get("/auth/logout");
      localStorage.removeItem("token");
      return response;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  // Product methods
  async getAllProducts(params = {}) {
    try {
      const { page = 0, size = 10, sortField = 'id', sortDirection = 'desc' } = params;
      const response = await this.axios.get("/products/all", {
        params: {
          page,
          size,
          sortField,
          sortDirection
        }
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }

  async filterProducts(filterDTO) {
    try {
      const response = await this.axios.post("/products/filter", {
        ...filterDTO,
        sortField: filterDTO.sortField || 'id',
        sortDirection: filterDTO.sortDirection || 'desc'
      });
      return response.data.data;
    } catch (error) {
      console.error("Error filtering products:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await this.axios.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  }

  // Category methods
  async getAllCategories() {
    try {
      const response = await this.axios.get("/categories/all");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Cart methods
  async getCart(page = 0) {
    try {
      const response = await this.axios.get(`/cart?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  async addToCart(productInfo) {
    try {
      const response = await this.axios.post("/cart", productInfo);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  async removeFromCart(productLineId) {
    try {
      const response = await this.axios.delete(`/cart/${productLineId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  }

  async updateCartQuantity(productLineId, quantity) {
    try {
      const response = await this.axios.patch(`/cart/${productLineId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  }

  async checkout(checkoutInfo) {
    try {
      const response = await this.axios.post("/cart/checkout", checkoutInfo);
      return response.data;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    }
  }

  // Order methods
  async getUserOrders(accountId, page = 0) {
    try {
      const response = await this.axios.get(
        `/orders/get-user-orders?accountId=${accountId}&page=${page}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const response = await this.axios.get(`/orders/get-order/${orderId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const response = await this.axios.delete(
        `/orders/delete-order/${orderId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  // Payment methods
  async getPayment(orderId) {
    try {
      const response = await this.axios.get(
        `/payment/get-payment?orderId=${orderId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching payment:", error);
      throw error;
    }
  }

  async createPayment(paymentInfo) {
    try {
      const response = await this.axios.post("/payment/create", paymentInfo);
      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  }

  async checkPaymentStatus(orderId) {
    try {
      const response = await this.axios.get(`/payment/check/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error checking payment status:", error);
      throw error;
    }
  }

  // Promotion methods
  async getAllPromotions() {
    try {
      const response = await this.axios.get("/promotions/all");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching promotions:", error);
      throw error;
    }
  }

  async getActivePromotions() {
    try {
      const response = await this.axios.get("/promotions/onDate");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching active promotions:", error);
      throw error;
    }
  }

  async getProductImages(productLineId) {
    try {
      const response = await this.axios.get(`/images/product-line/${productLineId}`);
      return response.data.data; // This will return array of image objects
    } catch (error) {
      console.error(`Error fetching images for product ${productLineId}:`, error);
      throw error;
    }
  }

  async getAllBrands() {
    try {
      const response = await this.axios.get("/products/all"); // Lấy tất cả sản phẩm
      const products = response.data.data.content;
      // Lọc ra các brand duy nhất
      const uniqueBrands = [...new Set(products.map(product => product.brand))].filter(Boolean);
      return uniqueBrands;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }
  
  // Thêm hoặc cập nhật phương thức filterByBrand
  async filterByBrand(brand) {
    try {
      const response = await this.axios.post("/products/filter", {
        brand: brand
      });
      return response.data.data;
    } catch (error) {
      console.error("Error filtering by brand:", error);
      throw error;
    }
  }
}

const Api = new ApiService();
export default Api;
