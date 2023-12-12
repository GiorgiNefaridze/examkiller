import styled from "styled-components";

type PropType = {
  isSelected: boolean;
};

export const RoleContainer = styled.div<PropType | HTMLDivElement>`
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
  }

  p {
    font-weight: 500;
    color: ${({ isSelected }) => (isSelected ? "#3081d0" : "black")};
  }
`;
