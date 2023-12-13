import styled from "styled-components";

type LabelContainerType = {
  isError: boolean;
};

export const LabelContainer = styled.label<LabelContainerType>`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  cursor: pointer;

  input {
    outline: none;
    padding: 12px;
    border-radius: 8px;
    border: ${({ isError }) => (isError ? "1px solid red" : "1px solid grey")};
    font-size: 17px;
  }
  h3 {
    font-weight: 500;
  }

  p {
    color: ${({ isError }) => (isError ? "red" : "grey")};
  }
`;
