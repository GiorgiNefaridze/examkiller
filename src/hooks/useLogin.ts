import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { setCookie } from "../helpers/cookie";
import { type ResponseType } from "./useRegister";
import { type LoginType } from "../pages/Login/Login";

const DTOMapper = (request) => {
  return {
    Email: request.Email,
    Password: request.Password,
  };
};

const useLogin = () => {
  const login = async (userModel: LoginType) => {
    try {
      const { data } = await networkClient.post<ResponseType>(
        "/User/Get",
        DTOMapper(userModel)
      );

      setCookie("user", data.response);

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
