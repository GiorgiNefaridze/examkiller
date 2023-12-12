import {
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
  memo,
} from "react";
import { UseFormSetValue } from "react-hook-form";

import { RoleType } from "../../../constants";
import { FormType } from "../../pages/Register/Register";

import { RoleContainer } from "./Role.style";

type RolePropType = RoleType & {
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<FormType>;
};

const Role = ({ img, name, role, setRole, setValue }: RolePropType) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (role === name) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
    setValue("Role", role);
  }, [role]);

  return (
    <RoleContainer isSelected={isSelected} onClick={() => setRole(name)}>
      <img src={img} />
      <p>{name}</p>
    </RoleContainer>
  );
};

export default memo(Role);
