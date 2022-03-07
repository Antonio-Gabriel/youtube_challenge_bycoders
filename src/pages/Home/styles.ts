import styled from "styled-components";

export const Content = styled.section`
  margin-top: 6.6rem;

  .container {
    max-width: 1200px !important;
    margin: 0 auto !important;
  }

  .videos {
    overflow: hidden !important;

    .image {
      img {
        width: 100%;
      }

      .duraction {
        right: 5px !important;
        bottom: 12px !important;
      }
    }

    .ciYeds {
      img {
        width: 100% !important;
        transition: color 2s;
      }

      .fuHQxX {
        transition: color 2s;

        :hover {
          filter: brightness(0.8);
        }
      }

      .fuHQxX .channel img {
        width: 24px !important;
        height: 24px !important;
        object-fit: cover !important;
        border-radius: 50% !important;
        margin-right: 6px !important;
      }
    }
  }

  .pupular-videos {
    margin-bottom: 1.2rem;

    h4 {
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--dark-400);
    }
  }
`;
