import styled from "styled-components";

export const GroupWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 50px;
  overflow: hidden;

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
      align-self: stretch;
      font-size: 22px;
      font-family: "Roboto";

      &#leave {
        background-color: red;
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
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding-inline: 50px;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #3081d0;
    border-radius: 10px;
  }

  @media only screen and (max-width: 900px) {
    padding-inline: 0px;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
`;
