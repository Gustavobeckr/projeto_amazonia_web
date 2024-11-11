"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  LoginFormData,
  loginFormSchema,
} from "./components/Form/login/ValidacaoLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./components/Form";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const { handleSubmit } = loginForm;

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white ">
      <FormProvider {...loginForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center bg-zinc-200 shadow-lg m-4 w-full sm:w-2/3 md:w-2/3  lg:w-2/5 h-auto rounded-md p-11 gap-3"
        >
          <Form.Label className="text-emerald-800 font-semibold text-5xl py-3">
            AmazonDex
          </Form.Label>
          <Form.Field>
            <Form.Label
              htmlFor="login"
              className="flex font-semibold text-justify items-center text-xl px-1"
            >
              Usuário
            </Form.Label>
            <Form.Input name="login" type="text" />

            <Form.ErrorMessage field="login" />
          </Form.Field>
          <Form.Field>
            <Form.Label
              htmlFor="senha"
              className="flex font-semibold text-justify items-center text-xl px-1"
            >
              Senha
            </Form.Label>
            <Form.Input name="senha" type="text" />
            <Form.ErrorMessage field="senha" />
          </Form.Field>
          {error && (
            <span className="text-lg font-semibold text-red-500 ">
              Usuário ou senha inválidos!
            </span>
          )}
          <button
            type="submit"
            className="flex m-2 p-2 bg-emerald-400 rounded-md w-2/3 shadow-md hover:bg-emerald-500 justify-center self-center"
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
