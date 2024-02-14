import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import networkClient from "../../../network";
import { setCookie } from "../../helpers/cookie";
import { type LoginType } from "../../pages/Login/Login";
import { Routes } from "../../../Routes";

export type UserType = {
  userId: number;
  email: string;
  nickname: string;
  password: string;
  role: "Lead" | "Student";
};

type ResponseType = { response: UserType };

const userLogin = async (userModel: LoginType) => {
  try {
    const { data } = await networkClient.get<ResponseType>(
      `/User/login?Email=${userModel.Email}&Password=${userModel.Password}`
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.errorMessage);
    }
  }
};

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: userLogin,
    onSuccess: (data) => {
      setCookie("user", data?.response);
      navigate(Routes.Dashboard.path);
    },
  });
};

export { useLogin };
