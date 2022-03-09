import styled from "styled-components";

export const WatchContent = styled.section`
  margin-top: 6.8rem;

  .container {
    max-width: 1100px;
    margin: 0 auto;
  }

  iframe {
    width: 100%;
    height: 420px;
    border-radius: 8px;
  }
`;

export const CurrentVideo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 12px;
  border-bottom: 1px solid #373737;

  article {
    display: flex;
    flex-direction: column;

    h5 {
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 24px;
      max-width: 90%;
    }

    span {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--gray-800);
    }
  }

  ul {
    margin-top: 3rem !important;
    padding: 0;
    display: flex;
    align-self: flex-end;
    gap: 20px;

    li {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

export const Channel = styled.div`
  padding: 12px 0 3rem;

  display: flex;
  flex-direction: column;

  .subscription {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    article {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        border-radius: 50%;
      }

      .name {
        display: flex;
        flex-direction: column;

        span {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--gray-800);
        }
      }
    }

    button {
      width: 140px;
      height: 42px;
      border: none;
      background: transparent;
      border-radius: 12px;
      border: 2px solid var(--red);
      color: var(--white);
      font-weight: 500;
      font-size: 0.9rem;

      transition: all 0.3s;

      :hover {
        background-color: var(--red);
      }
    }
  }

  .description {
    span {
      width: 800px !important;
      font-size: 0.9rem;

      a {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--gray-800);
      }
    }
  }
`;

export const RelatedCourses = styled.div`
  .related-videos {
    margin-bottom: 1rem;
    span {
      padding: 10px 4px;
      font-weight: 700;
    }

    .videos {
      overflow: hidden !important;
    }
  }
`;
