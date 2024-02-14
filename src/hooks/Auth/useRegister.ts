import { useMutation } from "@tanstack/react-query";

import networkClient from "../../../network";
import { type FormType } from "../../pages/Register/Register";

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
  const { data } = await networkClient.post<ResponseType>(
    "/User",
    responseDtoMapper(userModel)
  );

  return data;
};

const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: userRegister,
  });
};

export { useRegister };
