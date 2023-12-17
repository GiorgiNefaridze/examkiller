import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { type RoleOptionType } from "../../constants";

export type ResponseType = { errorMessage: string } | { response: string };

type UserModelType = {
  Nickname: string;
  Email: string;
  Password: string;
  Role: RoleOptionType;
};

const DTOMapper = (request) => {
  return {
    Nickname: request.Nickname,
    Email: request.Email,
    Password: request.Password,
    Role: request.Role,
  };
};

const useRegister = () => {
  const register = async (userModel: UserModelType) => {
    try {
      const { data } = await networkClient.post<ResponseType>(
        "/User/Create",
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
