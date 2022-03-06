import { MdSearch } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent, useEffect, useState } from "react";
import { Actions, AutoComplete, HeaderContent } from "./styles";
import { signIn } from "../../redux/actions/authenticationAction";
import { getFilterVideosService } from "../../services/getFilterVideosService";

export function Header() {
  const [search, setSearch] = useState("");
  const [sugestions, setSugestions] = useState([]);
  const [openSugestionsModal, setOpenSugestionsModal] = useState(false);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading } = useSelector<any>((state) => state.auth) as any;

  function handleSignInWithGoogle() {
    dispatch(signIn());
  }

  useEffect(() => {
    if (!search) {
      setSugestions([]);
    }
  }, [search]);

  useEffect(() => {
    if (!sugestions.length) {
      window.addEventListener("click", (e) => {
        e.preventDefault();

        setOpenSugestionsModal(false);
      });
    }
  }, [window]);

  async function handleChangeFilterValue(filterValue: string) {
    setSearch(filterValue);

    if (search) {
      const filterValues = await getFilterVideosService(search);

      setOpenSugestionsModal(true);
      setSugestions(filterValues.items);
    }
  }

  function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault();

    if (search) {
      navigateTo(`/results?search_query=${search}`);
    }
  }

  return (
    <HeaderContent>
      <div className="container">
        <a href="/login" className="logo">
          <img
            src="/src/assets/YouTube-White-Full-Color-Logo.wine.svg"
            alt="Youtube"
          />
        </a>

        <form className="search" onSubmit={handleSubmitForm} autoComplete="off">
          <div className="input-group">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search"
              className="form-control"
              onChange={(e) => handleChangeFilterValue(e.target.value)}
            />
            <button className="input-group-text">
              <MdSearch />
            </button>
          </div>

          {openSugestionsModal && !!sugestions.length && (
            <AutoComplete>
              <ul>
                {sugestions.map((suggestion: any, index: number) => (
                  <li key={index}>
                    <a
                      onClick={() => {
                        navigateTo(
                          `/results?search_query=${suggestion.snippet?.title}`
                        );
                      }}
                    >
                      {suggestion.snippet?.title}
                      {/* <a href="#">Remove</a> */}
                    </a>
                  </li>
                ))}
              </ul>
            </AutoComplete>
          )}
        </form>

        <Actions>
          {loading ? (
            <span>Autenticando...</span>
          ) : (
            <a className="signIn" onClick={handleSignInWithGoogle}>
              <AiOutlineUser />
              SIGN IN
            </a>
          )}
        </Actions>
      </div>
    </HeaderContent>
  );
}
