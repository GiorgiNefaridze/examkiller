import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

import InputLabel from "../../components/InputLabel/InputLabel";
import Stepper from "../../components/Stepper";
import Role from "../../components/Role/Role";
import { Routes } from "../../../Routes";
import { roles, emailPattern } from "../../../constants";
import { validateText } from "../../helpers/validateText";
import { Toast } from "../../helpers/Toast";
import { useRegister } from "../../hooks/useRegister";

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
export type FormType = Record<Field, string>;

const BUTTON_STEPS = ["Next", "Sumbit"];

const Register = () => {
  const [index, setIndex] = useState<number>(0);
  const [complete, setComplete] = useState<number>(0);
  const [role, setRole] = useState<string>(roles[0].name); //Default role = Student

  const { data, error, mutateAsync: SignUp } = useRegister();

  useEffect(() => {
    if (error?.message || data?.response) {
      Toast(error?.message, data?.response);
    }
  }, [error?.message, data?.response]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: { Role: role },
  });

  const navigate = useNavigate();

  const reset = () => {
    setIndex(0);
    setComplete(0);
    setValue("Email", "");
    setValue("Nickname", "");
    setValue("Password", "");
  };

  const getFormFields = (field: Field) => ({
    ...register(field, {
      pattern: field === "Email" && {
        value: emailPattern.pattern,
        message: emailPattern.message,
      },
      required: { value: true, message: "Please fill the following field" },
    }),
  });

  const SubmitClick = handleSubmit(async (data) => {
    const { Role, ...rest } = data;

    if (index < 1 && validateText(rest)) {
      setIndex((idx) => idx + 1);
      setComplete((prev) => prev + 1);
    }

    if (index >= 1 && validateText(data)) {
      await SignUp(data);
      reset();
    }
  });

  return (
    <Wrapper>
      <Form>
        <FormGroup>
          <Stepper index={index} complete={complete} />
          {!complete ? (
            <>
              <h1>Register account</h1>
              <form>
                <InputLabel
                  label="Nickname"
                  type="text"
                  register={{ ...getFormFields("Nickname") }}
                  errors={errors}
                />
                <InputLabel
                  label="Email"
                  type="email"
                  register={{ ...getFormFields("Email") }}
                  errors={errors}
                />
                <InputLabel
                  label="Password"
                  type="password"
                  register={{ ...getFormFields("Password") }}
                  errors={errors}
                />
              </form>
            </>
          ) : (
            <RoleWrapper>
              <h1>Which are you</h1>
              <RoleContent>
                {roles.map((_, idx) => (
                  <Role
                    key={idx}
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
      <Toaster closeButton richColors />
    </Wrapper>
  );
};

export default memo(Register);
