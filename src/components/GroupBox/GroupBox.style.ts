import styled from "styled-components";

export const GroupContainer = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const GroupContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #6db0f1;
  padding: 10px;
  filter: blur(1.2px);

  & > h1 {
    color: white !important;
    font-weight: 500 !important;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  column-gap: 7px;
  background-color: #ffffff;
  color: #3081d0;
  border: 2px solid #ffffff;
  padding: 8px 18px;
  border-radius: 15px;
  font-family: "Roboto";
  letter-spacing: 0.5px;
  cursor: pointer;
  filter: blur(0.2px);

  @media only screen and (max-width: 460px) {
    padding: 8px 15px;
  }
`;

export const GroupButtons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;
