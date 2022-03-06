import styled from "styled-components";

export const Content = styled.section`
  .text-content {
    display: flex;
    flex-direction: column;

    margin-top: 5rem;

    img {
      width: 120px;
      height: 120px;
    }

    span {
      font-weight: 900;
      color: var(--red);

      margin-bottom: 0.6rem;
    }

    h1 {
      margin: 0;
      padding: 0;
      font-size: 2.6rem;
      font-weight: 900;
      max-width: 35rem;

      margin-bottom: 1.2rem;
    }

    button {
      font-family: "Roboto", sans-serif !important;
      font-weight: 500;
      padding: 14px 40px;
      color: var(--white);

      border: none;
      background-color: #00bd4e;
      border-radius: 8px;

      margin-bottom: 6rem;
      transition: filter 0.4s;

      :hover {
        filter: brightness(0.8);
      }
    }

    p {
      max-width: 32rem;

      color: var(--dark-600);
    }
  }
`;
