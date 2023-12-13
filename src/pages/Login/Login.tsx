import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import InputLabel from "../../components/InputLabel/InputLabel";
import { Routes } from "../../../Routes";
import { emailPattern } from "../../../constants";

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
type LoginType = {
  Email: string;
  Password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const navigate = useNavigate();

  const getFormFields = (field: Field) => ({
    ...register(field, {
      pattern: field === "Email" && {
        value: emailPattern.pattern,
        message: emailPattern.message,
      },
      required: { value: true, message: "Please fill the following field" },
    }),
  });

  const SubmitClick = handleSubmit((data) => {
    //API call
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
    </Wrapper>
  );
};

export default memo(Login);
