import styled from "styled-components";

export const GroupWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 50px;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    div {
      width: 80%;
      display: flex;
      flex-direction: column;
      row-gap: 20px;

      @media only screen and (max-width: 768px) {
        width: 70%;
      }
    }

    button {
      width: 18%;
      align-self: stretch;
      font-size: 22px;

      @media only screen and (max-width: 768px) {
        width: 25%;
      }
    }
  }

  & > label {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #3081d0;

    @media only screen and (max-width: 768px) {
      font-size: 16px;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 20px;
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

export const Articles = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  row-gap: 50px;
  margin-block: 25px;
  overflow: auto;
  overflow-x: hidden;
`;