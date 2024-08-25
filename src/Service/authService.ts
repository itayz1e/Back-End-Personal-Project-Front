import { serverApi } from "./api";
import { LoginRequest, RegisterRequest } from "./interface";



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

export interface Message {
  type: "user" | "chatgpt";
  content: string;
  timestamp: string;
}

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
    setLoading(false); // בצע עדכון לסטטוס טעינה גם במקרה של שגיאה
  }
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
  token: string
) => {
  try {
    const response = await serverApi.post(
      "http://localhost:8080/api/connect-db",
      {
        url,
        username,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

      localStorage.setItem("dbToken", JSON.stringify(tokenData));
    }
    return response;
  } catch (error) {
    throw new Error(`Error connecting to database`);
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
