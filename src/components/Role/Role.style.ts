import styled from "styled-components";

type PropType = {
  isSelected: boolean;
};

export const RoleContainer = styled.div<PropType | HTMLDivElement>`
  position: relative;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #3081d0" : "1px solid grey"};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 12rem;

    @media only screen and (max-width: 1024px) {
      width: 9rem;
    }
  }

  p {
    font-weight: 500;
    color: ${({ isSelected }) => (isSelected ? "#3081d0" : "black")};
  }

  @media only screen and (max-width: 1024px) {
    padding: 0;
  }
`;

export const AboutRole = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
`;
