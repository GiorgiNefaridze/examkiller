import styled from "styled-components";

export const GroupWrapper = styled.div`
  flex: 1;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    row-gap: 10px;

    div {
      width: 80%;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }

    button {
      width: 18%;
      align-self: stretch;
      font-size: 22px;
    }
  }

  padding: 50px;

  & > label {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #3081d0;
  }
`;

export const GroupInput = styled.input`
  width: 100%;
  padding: 13px;
  border: 1px solid #3081d0;
  border-radius: 10px;
  outline: none;

  &::placeholder {
    color: #3081d0;
  }
`;
