import { serverApi } from "./api";


export const login = async (username: string, password: string) => {
  try {
    const response = await serverApi.post('http://localhost:8080/api/login', {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    
    return token;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
        throw new Error('Username already exists');
    }
    throw error;
  }
};



export const register = async (email: string, username: string, password: string) => {
    try {
        const response = await serverApi.post('http://localhost:8080/api/register', {
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



export interface Message {
  type: 'user' | 'chatgpt';
  content: string;
  timestamp: string;
}

export const askChatGPT = async (userInput: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await serverApi.get('http://localhost:8080/Ask/askChatGPT', {
      params: { userInput },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const chatGPTMessage: Message = {
      type: 'chatgpt',
      content: response.data,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prevMessages => [...prevMessages, chatGPTMessage]);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    const errorMessage: Message = {
      type: 'chatgpt',
      content: "An error occurred while fetching data.",
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prevMessages => [...prevMessages, errorMessage]);
  }
  setLoading(false);
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
  localStorage.removeItem('authToken');
};


export const connectToDatabase = async (url: string, username: string, password: string, token: string) => {
  try {
    const response = await serverApi.post(
      "http://localhost:8080/api/connect-db",
      {
        url,
        username,
        password
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    );
    const dbToken = response.data.token;

    if (dbToken) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3);
      const tokenData = {
        token: dbToken,
        expiry: expiryDate.toISOString(),
      };

      localStorage.setItem('dbToken', JSON.stringify(tokenData));
    }
    return response;
  } catch (error) {
    throw new Error(`Error connecting to database`);
  }
};


export const isTokenValid = (): boolean => {
  const tokenData = localStorage.getItem('dbToken');
  
  if (!tokenData) {
    return false;
  }

  const { token, expiry } = JSON.parse(tokenData);
  const currentDate = new Date();
  const expiryDate = new Date(expiry);

  return currentDate < expiryDate;
};
