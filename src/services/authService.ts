import authApi from "@/lib/authApi";

// POST /api/login
export const login = async (username: string, password: string) => {
  const response = await authApi.post('/api/login', { username, password });
  return response.data;
  // returns: { token, user, permission, status }
};

// POST /api/register
export const register = async (data: { first_name: string; last_name: string; email: string; phone1: string; password: string; flat_no: string; building: string; road: string; landmark: string; role_id: string;}) => {
  const response = await authApi.post('/api/register', data);
  return response.data;
};

// GET /api/verifytoken
export const verifyToken = async () => {
  const response = await authApi.get('/api/verifytoken');
  return response.data;
  // returns: { user, permissions, status }
};

// POST /api/forgot-password
export const forgotPassword = async (email: string) => {
  const response = await authApi.post('/api/forgot-password', { email });
  return response.data;
};