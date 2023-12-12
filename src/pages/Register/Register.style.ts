import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 25px;
`;

export const FormGroup = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 15px;

  h1 {
    font-family: sans-serif;
    font-weight: bold;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 25px;
  }
`;

export const SideBar = styled.div`
  width: 35%;
  height: 100%;
  background-color: #3081d0;
  display: flex;
  align-items: center;

  img {
    transform: translateX(-30%);
  }
`;

export const Button = styled.button`
  width: 100%;
  text-align: center;
  border-radius: 8px;
  padding: 10px;
  color: white;
  background-color: #3081d0;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 18px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(48, 129, 208, 0.8);
    transition: background-color 0.5s ease;
  }
`;

export const HaveAccount = styled.p`
  color: #3081d0;
  font-weight: 400;
  cursor: pointer;
`;

export const RoleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
  margin-block: 10px;

  h1 {
    font-weight: 700;
  }
`;

export const RoleContent = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
`;
