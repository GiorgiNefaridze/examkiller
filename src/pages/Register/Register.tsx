import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import InputLabel from "../../components/InputLabel/InputLabel";
import Stepper from "../../components/Stepper";
import Role from "../../components/Role/Role";
import { Routes } from "../../../Routes";
import { roles } from "../../../constants";

import Laptop from "../../assets/laptop.png";
import {
  Wrapper,
  Form,
  SideBar,
  Button,
  HaveAccount,
  RoleWrapper,
  FormGroup,
  RoleContent,
} from "./Register.style";

type Field = "Nickname" | "Email" | "Password" | "Role";
export type FormType = {
  Nickname: string;
  Email: string;
  Password: string;
  Role: string;
};

const BUTTON_STEPS = ["Next", "Sumbit"];

const Register = () => {
  const [index, setIndex] = useState<number>(0);
  const [complete, setComplete] = useState<number>(0);
  const [role, setRole] = useState<string>(roles[0].name); //Default role == Student

  const { register, watch, setValue } = useForm<FormType>({
    defaultValues: { Role: role },
  });

  const navigate = useNavigate();

  const getFormFields = (field: Field) => ({
    ...register(field),
  });

  const SubmitClick = () => {
    if (index < 1) {
      setIndex((idx) => idx + 1);
      setComplete((prev) => prev + 1);
    }

    console.log(watch());
  };

  return (
    <Wrapper>
      <Form>
        <FormGroup>
          <Stepper index={index} complete={complete} />
          {!complete ? (
            <>
              <h1>Register account 🚀</h1>
              <form>
                <InputLabel
                  label="Nickname"
                  type="text"
                  register={{ ...getFormFields("Nickname") }}
                />
                <InputLabel
                  label="Email"
                  type="email"
                  register={{ ...getFormFields("Email") }}
                />
                <InputLabel
                  label="Password"
                  type="password"
                  register={{ ...getFormFields("Password") }}
                />
              </form>
            </>
          ) : (
            <RoleWrapper>
              <h1>Which are you</h1>
              <RoleContent>
                {roles.map((_) => (
                  <Role
                    role={role}
                    setRole={setRole}
                    setValue={setValue}
                    {..._}
                  />
                ))}
              </RoleContent>
            </RoleWrapper>
          )}
          <Button type="submit" onClick={SubmitClick}>
            {BUTTON_STEPS[index]}
          </Button>
          <HaveAccount onClick={() => navigate(Routes.Login.path)}>
            Already have an account?
          </HaveAccount>
        </FormGroup>
      </Form>
      <SideBar>
        <img src={Laptop} />
      </SideBar>
    </Wrapper>
  );
};

export default memo(Register);
