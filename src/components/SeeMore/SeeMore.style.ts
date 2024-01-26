import styled from "styled-components";

export const SeeMoreWrapper = styled.div`
  width: 105px;
  height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 15px;
  padding: 10px 5px;
  background-color: white;
  border: 1px solid grey;
  position: absolute;
  border-radius: 10px;
  top: 35px;
  right: 0px;
`;

export const Option = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #3081d0;
  padding: 5px;
  border-radius: 8px;

  p {
    font-weight: 500;
    font-family: "Roboto";
  }

  &:hover {
    transition: All 0.2s ease-in-out;
    background-color: #5fa6eb;
  }
`;
