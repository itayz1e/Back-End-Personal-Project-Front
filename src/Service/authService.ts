import { serverApi } from "./api";
import { LoginRequest, Message, RegisterRequest } from "./interface";



export const login = async (data: LoginRequest): Promise<string> => {
  try {
    const response = await serverApi.post("http://localhost:8080/api/login", data);
    const { token } = response.data;
    return token;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      throw new Error("Username already exists");
    }
    throw error;
  }
};

export const register = async (data: RegisterRequest) => {
  try {
    const response = await serverApi.post(
      "http://localhost:8080/api/register",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      throw new Error("Username already exists");
    }
    throw error;
  }
};

export const askChatGPT = async (
  userInput: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await serverApi.get(
      "http://localhost:8080/Ask/askChatGPT",
      {
        params: { userInput },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }
    );
    const chatGPTMessage: Message = {
      type: "chatgpt",
      content: response.data,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, chatGPTMessage]);

  } catch (error: any) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};

export const setDbConnectedWithExpiry = (expiry: number) => {
  const now = new Date();
  const item = { 
    connected: true, 
    expiry: now.getTime() + expiry 
  };
  localStorage.setItem("dbConnected", 'true');
};



export const setTokenWithExpiry = (token: string, expiry: number) => {
  const now = new Date();
  const item = { token, expiry: now.getTime() + expiry };
  localStorage.setItem("user", JSON.stringify(item));

  setTimeout(() => {
    localStorage.removeItem("user");
    logout();
  }, expiry);
};

export const getToken = () => {
  try {
    const tokenUser = localStorage.getItem("user");

    if (tokenUser) {
      const item = JSON.parse(tokenUser);
      const now = new Date().getTime();

      if (now < item.expiry) {
        return item.token;
      } else {
        localStorage.removeItem("user");
      }
    }
  } catch (error) {
    console.error("Failed to parse token from localStorage:", error);
  }
  return null;
};


export const logout = () => {
  localStorage.removeItem("user");
};



export const connectToDatabase = async (
  url: string,
  username: string,
  password: string,
  setResult: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    setError(null);
    setResult(null);

    const token = getToken();
    const response = await serverApi.post(
      "http://localhost:8080/connect-db",
      {
        url: url,
        username: username,
        password: password,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setDbConnectedWithExpiry(86400000);
      return true;
    } else {
      setError("Error connecting to the database. Please try again.");
      return false;
    }
  } catch (error: any) {
    console.error("Error connecting to the database:", error);
    setError("Error connecting to the database. Please try again.");
    return false;
  } finally {
    setLoading(false);
  }
};


export const isTokenValid = (): boolean => {
  const tokenData = localStorage.getItem("user");

  if (!tokenData) {
    return false;
  }

  const { expiry } = JSON.parse(tokenData);
  const currentDate = new Date();
  const expiryDate = new Date(expiry);

  return currentDate < expiryDate;
};
