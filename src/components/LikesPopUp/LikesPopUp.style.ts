import styled from "styled-components";

export const LikesPopUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 60%;
  border-radius: 10px;
  border: 1px solid #3081d0;
  background-color: white;
  box-shadow: 0px 0px 0px 10000px rgba(0, 0, 0, 0.6);
  z-index: 20;
  overflow: hidden;
`;

export const LikesPopUpHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid #3081d0;
`;

export const LikesPopUpContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export const Likes = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  border-bottom: 1px solid #3081d0;
  cursor: pointer;

  p {
    font-family: "Roboto", "Helvetica";
    font-weight: 500;
    &:first-child {
      text-transform: uppercase;
    }
  }
`;
