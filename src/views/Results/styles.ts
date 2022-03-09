import styled from "styled-components";

export const Container = styled.section`
  margin-top: 6.6rem;

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .results-header {
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

    span {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--gray-800);
    }
  }

  .results {
    padding: 2px 0;

    margin-top: 0.6rem;

    .videos {
      overflow: hidden !important;
    }
  }
`;
