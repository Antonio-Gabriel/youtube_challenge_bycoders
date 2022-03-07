import styled from "styled-components";

export const Video = styled.a`
  color: var(--white) !important;

  .image {
    position: relative;
    margin-bottom: 0.6rem;

    cursor: pointer;
    img {
      max-width: 360px;
      min-width: 240px;
      border-radius: 6px;
    }

    .duraction {
      position: absolute;
      bottom: 10px;
      right: 25px;
      margin: 4px;
      height: 12px;

      span {
        font-size: 12px;
        padding: 3px 4px;
        background: rgb(4, 4, 4, 0.8);
        border-radius: 2px;
      }
    }
  }

  :hover {
    filter: brightness(0.8);
  }
`;

export const VideoContent = styled.div`
  cursor: pointer;

  .title {
    margin-bottom: 0.5rem;

    .h5 {
      font-size: 0.9rem;
      line-height: 1.2rem;
      margin-bottom: 2px !important;
    }
    article {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--dark-400);

      strong {
        margin-right: 4px;
      }
    }
  }

  .channel {
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 6px;
    }

    a {
      font-size: 12px;
      color: var(--dark-400);
    }
  }
`;
