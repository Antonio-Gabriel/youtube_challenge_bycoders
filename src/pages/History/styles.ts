import styled from "styled-components";

export const Container = styled.div`
  margin-top: 6.6rem;

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .histories-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #373737;
    padding: 2px 0;

    h4 {
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--dark-400);
    }
  }

  .histories-body {
    padding: 0.8rem 0;

    ul {
      padding: 0;
    }

    ul li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      padding: 4px 14px;
      border-radius: 4px;
      color: var(--dark-400) !important;
      cursor: pointer;

      + li {
        margin-top: 4px;
        cursor: pointer;
      }

      a {
        font-size: 12px;
        font-weight: 500;
        color: var(--dark-400);
        text-decoration: underline;

        :hover {
          color: var(--red) !important;
        }
      }

      :hover {
        background-color: #373737;
      }
    }
  }
`;
