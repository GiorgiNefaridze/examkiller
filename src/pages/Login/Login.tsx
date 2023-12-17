import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

import InputLabel from "../../components/InputLabel/InputLabel";
import { Toast } from "../../helpers/Toast";
import { Routes } from "../../../Routes";
import { emailPattern } from "../../../constants";
import { useLogin } from "../../hooks/useLogin";

import {
  Button,
  Form,
  FormGroup,
  HaveAccount,
  SideBar,
  Wrapper,
} from "../Register/Register.style";
import Laptop from "../../assets/laptop.png";

type Field = "Email" | "Password";
export type LoginType = Record<Field, string>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const { error, mutateAsync: SignIn } = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.message) {
      Toast(error?.message);
    }
  }, [error?.message]);

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
    await SignIn(data);
  });

  return (
    <Wrapper>
      <Form>
        <FormGroup>
          <h1>Login</h1>
          <form>
            <InputLabel
              label="Email"
              type="text"
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
          <Button type="submit" onClick={SubmitClick}>
            Submit
          </Button>
          <HaveAccount onClick={() => navigate(Routes.Register.path)}>
            Don't have an account?
          </HaveAccount>
        </FormGroup>
      </Form>
      <SideBar>
        <img src={Laptop} />
      </SideBar>
      <Toaster richColors closeButton />
    </Wrapper>
  );
};

export default memo(Login);
