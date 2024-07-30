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


interface TokenData {
  token: string;
  expiry: number;
}

export const getTokens = (): { token: string | null; dbToken: string | null } | null => {
  const itemStr = localStorage.getItem('user');
  const itemSec = localStorage.getItem('dbToken');

  if (!itemStr && !itemSec) return null;

  let item1: TokenData | null = null;
  let item2: TokenData | null = null;

  try {
    if (itemStr) {
      item1 = JSON.parse(itemStr);
    }
    if (itemSec) {
      item2 = JSON.parse(itemSec);
    }
  } catch (e) {
    console.error('Failed to parse tokens from localStorage:', e);
    localStorage.removeItem('user');
    localStorage.removeItem('dbToken');
    return null;
  }

  const now = new Date().getTime();
  if ((item1 && now > item1.expiry) || (item2 && now > item2.expiry)) {
    localStorage.removeItem('user');
    localStorage.removeItem('dbToken');
    return null;
  }

  return {
    token: item1 ? item1.token : null,
    dbToken: item2 ? item2.token : null,
  };
};

export const isAuthenticated = (): boolean => {
  const tokens = getTokens();
  return tokens !== null && tokens.token !== null && tokens.dbToken !== null;
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

  const { expiry } = JSON.parse(tokenData);
  const currentDate = new Date();
  const expiryDate = new Date(expiry);

  return currentDate < expiryDate;
};
