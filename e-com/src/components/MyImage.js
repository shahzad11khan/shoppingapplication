import React from "react";
import styled from "styled-components";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  return (
    <Wrapper>
      <div className="main-screen">
        <img src={imgs[0].url} alt={imgs[0].filename} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main-screen {
    display: grid;
    place-items: center;

    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
`;

export default MyImage;
