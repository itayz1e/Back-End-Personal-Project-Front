import axios from 'axios';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', {
      username,
      password,
    });
    return response.data.token
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
        throw new Error('Username already exists');
    }
    throw error;
}
};



export const register = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/api/register', {
            email,
            username,
            password
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
            throw new Error('Username already exists');
        }
        throw error;
   }
};


export const setTokenWithExpiry = (token: string, expiry: number) => {
  const now = new Date();
  const item = { token, expiry: now.getTime() + expiry };
  localStorage.setItem('user', JSON.stringify(item));
};


export const getToken = () => {
  const itemStr = localStorage.getItem('user');
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('user');
    return null;
  }
  return item.token;
};

export const isAuthenticated = () => {
  return getToken() != null;
};


export const logout = () => {
  localStorage.removeItem('user');
};