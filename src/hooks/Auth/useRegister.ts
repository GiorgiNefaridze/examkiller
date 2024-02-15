import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import networkClient from "../../../network";
import { type FormType } from "../../pages/Register/Register";
import { Routes } from "../../../Routes";

export type ResponseType = { response: string };

const responseDtoMapper = (request) => {
  return {
    Nickname: request.Nickname,
    Email: request.Email,
    Password: request.Password,
    Role: request.Role,
  };
};

const userRegister = async (userModel: FormType) => {
  try {
    const { data } = await networkClient.post<ResponseType>(
      "/User",
      responseDtoMapper(userModel)
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.errorMessage);
    }
  }
};

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: userRegister,
    onSuccess: (data) => {
      if (data) {
        navigate(Routes.Login.path);
      }
    },
  });
};

export { useRegister };
