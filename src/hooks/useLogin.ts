import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import networkClient from "../../network";
import { setCookie } from "../helpers/cookie";
import { type LoginType } from "../pages/Login/Login";
import { Routes } from "../../Routes";

export type UserType = {
  userId: number;
  email: string;
  nickname: string;
  password: string;
  role: "Lead" | "Student";
};

type ResponseType = { response: UserType };

const DTOMapper = (request) => {
  return {
    Email: request.Email,
    Password: request.Password,
  };
};

const useLogin = () => {
  const navigate = useNavigate();
  const login = async (userModel: LoginType) => {
    try {
      const { data } = await networkClient.post<ResponseType>(
        "/User/Get",
        DTOMapper(userModel)
      );

      setCookie("user", data.response);

      navigate(Routes.Dashboard.path);
      return data;
    } catch (error) {
      throw new Error(error.response?.data.errorMessage);
    }
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};

export { useLogin };
