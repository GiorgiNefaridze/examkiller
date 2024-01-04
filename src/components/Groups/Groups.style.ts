import styled from "styled-components";

export const GroupWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 50px;

  h1 {
    font-size: 18px;
    font-family: "Roboto";
    font-weight: 600;
    text-transform: uppercase;
    color: #3081d0;
    letter-spacing: 0.5px;
  }

  @media only screen and (max-width: 1024px) {
    padding-inline: 3%;
  }
`;
