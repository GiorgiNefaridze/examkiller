import {
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
  memo,
} from "react";
import { UseFormSetValue } from "react-hook-form";
import { Tooltip } from "@chakra-ui/react";
import { FaCircleExclamation } from "react-icons/fa6";

import { RoleType } from "../../../constants";
import { FormType } from "../../pages/Register/Register";

import { AboutRole, RoleContainer } from "./Role.style";

type RolePropType = RoleType & {
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<FormType>;
};

const roleDetail = (role: string): string => {
  if (role == "Student") {
    return "Student can join different groups based on their need and acquire some information from mates";
  }

  return "Lead can create some groups,be part of a group, and make an appropriate environment for group members";
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
      <AboutRole>
        <Tooltip label={roleDetail(name)} placement="top">
          <div>
            <FaCircleExclamation color="#3081d0" size={20} />
          </div>
        </Tooltip>
      </AboutRole>
      <img src={img} />
      <p>{name}</p>
    </RoleContainer>
  );
};

export default memo(Role);
