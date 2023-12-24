import styled from "styled-components";

export const NavWrapper = styled.nav`
  width: 100%;
  padding: 5px 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 250px;
    cursor: pointer;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 20px;
`;

export const Button = styled.button`
  border: 1px solid #3081d0;
  padding: 8px 10px;
  border-radius: 10px;
  color: #3081d0;
  font-weight: 500;
  cursor: pointer;
`;
