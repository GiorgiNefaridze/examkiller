import {
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
  memo,
} from "react";
import { Tooltip } from "flowbite-react";
import { UseFormSetValue } from "react-hook-form";
import { FaCircleExclamation } from "react-icons/fa6";

import { RoleType } from "../../../constants";
import { FormType } from "../../pages/Register/Register";

type RolePropType = RoleType & {
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<FormType>;
};

const roleDescription = (role: string): string => {
  if (role == "Student") {
    return "Student can join different groups based on their need and acquire some information from mates";
  }

  return "Lead can create some groups,be part of a group, and make an appropriate environment for group members";
};

const Role = ({ img, name, role, setRole, setValue }: RolePropType) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(role === name);
    setValue("Role", role);
  }, [role]);

  return (
    <div
      className="w-1/2 relative border-2 py-4 rounded-lg flex items-center justify-center flex-col gap-y-3 cursor-pointer"
      title={name}
      style={{ borderColor: isSelected ? "blue" : "grey" }}
      onClick={() => setRole(name)}
    >
      <Tooltip
        content={roleDescription(name)}
        style="light"
        className="absolute top-0 right-0"
      >
        <FaCircleExclamation
          color="blue"
          size={18}
          className="absolute top-0 translate-x-[50%] translate-y-[-50%] right-0"
          style={{ color: isSelected ? "blue" : "grey" }}
        />
      </Tooltip>
      <img className="w-1/3" src={img} />
      <p
        className="font-bold text-lg text-gray-600"
        style={{ color: isSelected ? "blue" : "grey" }}
      >
        {name}
      </p>
    </div>
  );
};

export default memo(Role);
