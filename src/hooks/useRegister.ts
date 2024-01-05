import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { type FormType } from "../pages/Register/Register";

export type ResponseType = { errorMessage: string } | { response: string };

const DTOMapper = (request) => {
  return {
    Nickname: request.Nickname,
    Email: request.Email,
    Password: request.Password,
    Role: request.Role,
  };
};

const useRegister = () => {
  const register = async (userModel: FormType) => {
    try {
      const { data } = await networkClient.post<ResponseType>(
        "/User",
        DTOMapper(userModel)
      );

      return data;
    } catch (error) {
      throw new Error(error.response?.data.errorMessage);
    }
  };

  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
};

export { useRegister };
