import styled from "styled-components";

export const HeaderContent = styled.header`
  > .container {
    display: flex;
    align-items: center;
  }

  .logo img {
    height: 90px;
    margin-left: -1rem;
    margin-right: 1.5rem;
  }

  .search {
    width: 50%;

    position: relative;

    input {
      font-family: "Roboto", sans-serif !important;
      font-size: 13px;
      font-weight: 500;

      height: 42px;

      color: var(--dark-400) !important;
      background-color: #2c2c2c;

      border: 2px solid #373737;
      border-radius: 10px;
      box-shadow: none;

      padding-left: 1.2rem;

      ::placeholder {
        color: var(--dark-600) !important;
      }
    }

    .input-group-text {
      background-color: var(--dark-600) !important;
      padding: 0.375rem 1.8rem;
      border-radius: 10px;
      border: none;

      svg {
        width: 20px;
        height: 20px !important;

        fill: var(--dark-400) !important;
      }
    }
  }
`;

export const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;

  > a {
    color: var(--gray-100) !important;
    font-size: 1rem;
    font-weight: 500 !important;
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 18px;
      height: 20px !important;
    }

    transition: all 0.3s;

    :hover {
      color: var(--dark-400) !important;
    }
  }
`;

export const AutoComplete = styled.div`
  margin-top: 4px;
  padding: 18px 10px 4px;
  position: absolute;
  width: 100%;
  border-radius: 6px;
  background-color: #2c2c2c;
  z-index: 99;
  box-shadow: 10px 8px 10px 8px rgb(0 0 0 / 03%) !important;

  ul li {
    + li {
      margin-top: 4px;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      padding: 4px 10px;
      border-radius: 4px;
      color: var(--dark-400) !important;

      a {
        font-size: 12px;
        text-decoration: underline;

        :hover {
          color: var(--red) !important;
        }
      }

      :hover {
        background-color: var(--body);
      }
    }
  }
`;
