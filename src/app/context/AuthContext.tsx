"use client";
import { createContext, useState } from "react";
import { LoginFormData } from "../components/Form/login/ValidacaoLogin";
import { setCookie } from "nookies";
import { loginRequest } from "@/service/Usuario";
import { useRouter } from "next/navigation";
import { axiosRequest } from "@/lib/axios";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
};
type User = {
  login: string;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  async function login({ login, senha }: LoginFormData) {
    const response = await loginRequest(login, senha);
    setCookie(undefined, "AMAZONDEX_TOKEN", response.token, {
      maxAge: 60 * 60 * 24,
    });
    axiosRequest.defaults.headers["Authorization"] = `Bearer ${response.token}`;
    setUser({ login: response.login });
    router.replace("/home");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}
