export interface LoginRequest {
    username: string;
    password: string;
  }
  
  
  export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }

  export interface ConnectingDBRequest {
    url: string;
    username: string;
    password: string;
  }