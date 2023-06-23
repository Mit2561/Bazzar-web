import { createContext } from "react";
 
export const AuthProvider= createContext({ token: null, addToken: () => {} });
