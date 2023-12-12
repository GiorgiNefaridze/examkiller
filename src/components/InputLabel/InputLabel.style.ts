import styled from "styled-components";

export const LabelContainer = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  cursor: pointer;

  input {
    outline: none;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid grey;
    font-size: 17px;
  }
  h3 {
    font-weight: 500;
  }
`;
