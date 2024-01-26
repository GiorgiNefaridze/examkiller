import styled from "styled-components";
import { AiFillLike } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";

export const ArticleWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  background-color: #3081d0;
  border-radius: 10px;
  color: white;
  margin-right: 1.2%;
  position: relative;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 30px;
  }

  h1 {
    font-size: 20px;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const GroupContent = styled.div`
  flex: 1;
  display: flex;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    row-gap: 15px;
  }
`;

export const GroupInfo = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;

  form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  @media only screen and (max-width: 900px) {
    width: 100%;
    height: auto;
    row-gap: 10px;
  }
`;

export const GroupInfoDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    width: 50%;
    font-size: 18px;
    font-weight: 500;
    font-family: "Roboto";

    &:last-child {
      text-align: right;
    }
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(15%, -50%);
  column-gap: 8px !important;

  @media only screen and (max-width: 1200px) {
    transform: translate(0%, -50%);
  }
`;

export const Like = styled(AiFillLike)<{ isLiked: boolean }>`
  font-size: 30px;
  background-color: white;
  border-radius: 50%;
  color: ${({ isLiked }) => (isLiked ? "#3081d0" : "grey")};
  border: 1px solid #3081d0;
  padding: 5px;
  cursor: pointer;
`;

// export const See = styled(FaEye)`
//   font-size: 30px;
//   background-color: white;
//   border-radius: 50%;
//   color: #3081d0;
//   border: 1px solid #3081d0;
//   padding: 5px;
//   cursor: pointer;
// `;

export const More = styled(HiDotsVertical)`
  font-size: 30px;
  background-color: white;
  border-radius: 50%;
  color: #3081d0;
  border: 1px solid #3081d0;
  padding: 5px;
  cursor: pointer;
`;
