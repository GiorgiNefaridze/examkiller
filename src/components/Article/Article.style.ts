import styled from "styled-components";

export const ArticleWrapper = styled.div`
  width: 15%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  background-color: #3081d0;
  border-radius: 10px;
  color: white;
  margin-inline: 3%;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 30px;
  }

  &:nth-child(5n) {
    margin-inline: 0px;
  }
`;
