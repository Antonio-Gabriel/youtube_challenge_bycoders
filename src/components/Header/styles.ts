import styled from "styled-components";

export const HeaderContent = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  background: var(--body);
  z-index: 99;

  > .container {
    display: flex;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 18px;

    svg {
      width: 20px;
      height: 20px;
      fill: var(--white);
      transition: all 0.1s;
      cursor: pointer;

      :hover {
        fill: var(--dark-600);
      }
    }

    img {
      height: 90px;
      margin-left: -1rem;
      margin-right: 1.5rem;
    }
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
      background-color: #2c2c2c;
      border: 2px solid #373737 !important;
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

  .signIn.process {
    background-color: #373737 !important;
    cursor: not-allowed;
    filter: brightness(0.8);
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 10px;

    li {
      .history {
        a {
          color: #212529;
        }
      }

      + li {
        .dropdown {
          background: none !important;

          button {
            background: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;

            img {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }

  > a {
    color: var(--gray-100) !important;
    font-size: 1rem;
    font-weight: 500 !important;
    cursor: pointer;

    background-color: #373737;
    padding: 9px 16px;
    border-radius: 10px;

    display: inline-flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 18px;
      height: 20px !important;
    }

    transition: all 0.3s;

    :hover {
      filter: brightness(0.8);
    }
  }
`;

export const AutoComplete = styled.div`
  margin-top: 4px;
  padding: 18px 14px 4px;
  position: absolute;
  width: 100%;
  border-radius: 6px;
  background-color: #2c2c2c;
  z-index: 99;
  box-shadow: 10px 8px 10px 8px rgb(0 0 0 / 03%) !important;

  ul {
    padding-left: 0 !important;
  }

  .toComplete {
    display: flex;
    justify-content: space-between;
    color: var(--dark-400);
    border-radius: 4px;

    .delete {
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

  ul li {
    + li {
      margin-top: 4px;
      cursor: pointer;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      padding: 4px 10px;
      border-radius: 4px;
      color: var(--dark-400) !important;
      cursor: pointer;

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
