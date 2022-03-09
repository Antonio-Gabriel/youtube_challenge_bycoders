import { HiMenu } from "react-icons/hi";
import { OffCanvas } from "../OffCanvas";
import { MdSearch } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent, useEffect, useState } from "react";
import { Actions, AutoComplete, HeaderContent } from "./styles";
import { AiOutlineGoogle, AiOutlineUser } from "react-icons/ai";
import { signIn, signOut } from "../../redux/actions/authenticationAction";
import { getFilterVideosService } from "../../services/getFilterVideosService";
import { deleteSelectedCache } from "../../services/caching/deleteSelectedCache";
import { getAllCachesInMemory } from "../../services/caching/getAllCachesInMemory";
import { saveFilterHistoryInMemoryCache } from "../../services/caching/saveFilterHistoryInMemoryCache";

type IFormProps = {
  filter?: string;
};

import "./styles.scss";

export function Header({ filter = "" }: IFormProps) {
  const [search, setSearch] = useState("");
  const [sugestions, setSugestions] = useState([]);
  const [openOffCanvas, setOpenOffCanvas] = useState(false);
  const [sugestionsInCache, setSugestionsInCache] = useState([]) as any;
  const [openSugestionsModal, setOpenSugestionsModal] = useState(false);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading } = useSelector<any>((state) => state.auth) as any;

  const user = JSON.parse(localStorage.getItem("bycoders-user") as any);
  const accessToken = localStorage.getItem("bycoders-accessToken") ?? false;

  function handleSignInWithGoogle() {
    dispatch(signIn());
  }

  function handleCloseOffCanvas() {
    setOpenOffCanvas(false);
  }

  function handleLogout() {
    dispatch(signOut());

    navigateTo("/");
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

        setSugestionsInCache([]);
        setOpenSugestionsModal(false);
      });
    }
  }, [window]);

  async function handleChangeFilterValue(filterValue: string) {
    setSearch(filterValue);

    if (search) {
      const filterValues = await getFilterVideosService(search);

      setSugestionsInCache([]);
      setOpenSugestionsModal(true);
      setSugestions(filterValues.items);
    }
  }

  function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault();

    if (search) {
      if (accessToken) {
        saveFilterHistoryInMemoryCache({
          search,
        });
      }

      navigateTo(`/results?search_query=${search}`);
    }
  }

  function handleCarriesDefaultHistories(event: SyntheticEvent) {
    event.preventDefault();

    if (!search) {
      if (accessToken) {
        getAllCachesInMemory().then((res) => {
          const caches = res.filter((cache: any) => {
            if (cache.userId === user.id) {
              return cache;
            }
          });

          setSugestionsInCache(caches);
        });
      }
    }
  }

  function handleRemoveHistory(id: number) {
    deleteSelectedCache(id);
  }

  return (
    <>
      <HeaderContent>
        <div className="container">
          <div className="logo">
            <HiMenu onClick={() => setOpenOffCanvas(true)} />
            <Link to="/home">
              <img
                src="/src/assets/YouTube-White-Full-Color-Logo.wine.svg"
                alt="Youtube"
              />
            </Link>
          </div>

          <form className="search" autoComplete="off">
            <div className="input-group">
              <input
                type="text"
                name="search"
                value={search}
                placeholder="Search"
                className="form-control"
                onClick={handleCarriesDefaultHistories}
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
                        href="#"
                        onClick={() => {
                          navigateTo(
                            `/results?search_query=${suggestion.snippet?.title}`
                          );
                        }}
                      >
                        {suggestion.snippet?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </AutoComplete>
            )}

            {!!sugestionsInCache.length && (
              <AutoComplete>
                <ul>
                  {sugestionsInCache.map((suggestion: any, index: number) => (
                    <li key={index} className="toComplete">
                      <a
                        href="#"
                        onClick={() => {
                          navigateTo(
                            `/results?search_query=${suggestion.filterName}`
                          );
                        }}
                      >
                        {suggestion.filterName}
                      </a>
                      <a
                        href="#"
                        onClick={() => handleRemoveHistory(suggestion.id)}
                        className="delete"
                      >
                        Remove
                      </a>
                    </li>
                  ))}
                </ul>
              </AutoComplete>
            )}
          </form>

          <Actions>
            {!accessToken ? (
              loading ? (
                <a className="signIn process" onClick={handleSignInWithGoogle}>
                  <AiOutlineUser />
                  validating...
                </a>
              ) : (
                <a className="signIn" onClick={handleSignInWithGoogle}>
                  <AiOutlineGoogle />
                  Sign in with google
                </a>
              )
            ) : (
              <ul className="profile">
                <li></li>
                <li>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <img src={user?.photo} alt={user?.name} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item className="history">
                        <Link to="/histories">History</Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            )}
          </Actions>
        </div>
      </HeaderContent>

      <OffCanvas
        show={openOffCanvas}
        handleCloseOffcanvas={handleCloseOffCanvas}
      />
    </>
  );
}
