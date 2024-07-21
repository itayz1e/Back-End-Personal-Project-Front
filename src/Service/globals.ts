export class Globals {
    public static VITE_SOME_KEY: string;
    public static VITE_AUTHORIZATION: string;
  
    public static initialize() {
      Globals.VITE_SOME_KEY = import.meta.env.VITE_SOME_KEY || "";
      Globals.VITE_AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION || "";
    }
  
  }
  
  Globals.initialize();
  