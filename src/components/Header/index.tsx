import { MdSearch } from "react-icons/md";
import { AiOutlineGoogle, AiOutlineUser } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent, useEffect, useState } from "react";
import { Actions, AutoComplete, HeaderContent } from "./styles";
import { signIn } from "../../redux/actions/authenticationAction";
import { getFilterVideosService } from "../../services/getFilterVideosService";

type IFormProps = {
  filter?: string;
};

export function Header({ filter = "" }: IFormProps) {
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
      setSearch(filter);
    }
  }, []);

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
        <Link to="/login" className="logo">
          <img
            src="/src/assets/YouTube-White-Full-Color-Logo.wine.svg"
            alt="Youtube"
          />
        </Link>

        <form className="search" autoComplete="off">
          <div className="input-group">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search"
              className="form-control"
              onChange={(e) => handleChangeFilterValue(e.target.value)}
            />
            <button className="input-group-text" onClick={handleSubmitForm}>
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
            <a className="signIn process" onClick={handleSignInWithGoogle}>
              <AiOutlineUser />
              validating...
            </a>
          ) : (
            <a className="signIn" onClick={handleSignInWithGoogle}>
              <AiOutlineGoogle />
              Sign in with google
            </a>
          )}
        </Actions>
      </div>
    </HeaderContent>
  );
}
