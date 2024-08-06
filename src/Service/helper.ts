export interface LoginRequest {
    username: string;
    password: string;
  }
  
  
  export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    url: string;
    usernameDB: string;
    passwordDB: string;
  }