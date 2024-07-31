import axios from "axios";

const TEST_API_URL = "http://localhost:3005";
const PROD_API_URL = "https://my-first-node-web-app.azurewebsites.net";

const api = axios.create({
  baseURL: PROD_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (username, password) => {
  const response = await api.post('/auth/login', {username, password});
  return response.data;
}

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data
}

export const getCustomers = async (sortBy, order, page, limit) => {
  const queryParams = new URLSearchParams({
    sortBy,
    order,
    page: page.toString(),
    limit: limit.toString(),
  }).toString();

  const response = await api
    .get(
      `/customers/?${queryParams}`
    )
    .catch((error) => console.error("Error updating customer:", error));

  console.log(response.data);
  return response.data;
};

export const updateCustomerFirstName = async (id, firstName) => {
  const response = await api
    .put(
      `/customers/${id}`,
      { firstName }
    )
    .catch((error) => console.error("Error updating customer:", error));

  console.log(response.data);
  alert(response.data.message);
  window.location.reload();
};

export const addCustomer = async (
  firstName,
  lastName,
  company = null,
  email = null,
  phone = null,
) => {
  const response = await api
    .post(
      `/customers/`,
      { firstName, lastName, company, email, phone }
    )
    .catch((error) => console.error("Error updating customer:", error));

  console.log(response.data);
  alert(response.data.message);
  window.location.reload();
};

export const removeCustomer = async (id, firstName) => {
  const response = await api
    .delete(
      `/customers/${id}`,
      { firstName }
    )
    .catch((error) => console.error("Error updating customer:", error));

  console.log(response.data);
  alert(response.data.message);
  window.location.reload();
};

