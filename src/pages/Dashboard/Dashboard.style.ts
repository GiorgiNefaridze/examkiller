import styled from "styled-components";

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
`;

export const DashboarContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1.5rem;

  h1 {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #3081d0;
    font-family: "Roboto";
  }
`;
