import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDuration } from "../../utils/formatDuration";
import { IVideoPropsState } from "../../types/IVideoPropsState";
import { signOut } from "../../redux/actions/authenticationAction";
import { getVideoActions } from "../../redux/actions/getVideoAction";
import { SyntheticEvent, useEffect, useState } from "react";

import numeral from "numeral";
import InfiniteScroll from "react-infinite-scroll-component";

import { getVideoServices } from "../../services/getVideosService";
import { getUniqueElementsFromList } from "../../utils/getUniqueIdFromList";
import { getFilterVideosService } from "../../services/getFilterVideosService";
import { deleteSelectedCache } from "../../services/caching/deleteSelectedCache";
import { getAllCachesInMemory } from "../../services/caching/getAllCachesInMemory";
import { saveFilterHistoryInMemoryCache } from "../../services/caching/saveFilterHistoryInMemoryCache";

import "./styles.css";

export function Home() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [search, setSearch] = useState("");
  const [sugestions, setSugestions] = useState([]);
  const [valueList, setValueList] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getVideoActions());
  }, [dispatch]);

  const { totalResult, nextPageToken } = useSelector<IVideoPropsState>(
    (state) => state.videos
  ) as any;

  useEffect(() => {
    getVideoServices(nextPageToken).then((res) => setValueList(res.items));
  }, []);

  function handleLogout() {
    dispatch(signOut());

    navigateTo("/login");
  }

  function handlePreviewVideoDetails(id: string) {
    navigateTo(`/watch/${id}`);
  }

  async function handleCarriesNextVideos() {
    dispatch(getVideoActions());

    const response = await getVideoServices(nextPageToken);

    const margeVideoList = [...valueList, ...response.items];

    setValueList([...getUniqueElementsFromList(margeVideoList, "id")]);

    if (valueList.length === totalResult) {
      setHasMore(false);
    }
  }

  async function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault();

    if (search) {
      await saveFilterHistoryInMemoryCache({
        search,
      });

      navigateTo(`/results?search_query=${search}`);
    }
  }

  async function handleChangeFilterValue(filterValue: string) {
    setSearch(filterValue);
    if (search) {
      const filterValues = await getFilterVideosService(search);
      setSugestions(filterValues.items);
    } else {
      setSugestions([]);
    }
  }

  return (
    <div>
      <h2>Home</h2>
      <span>
        <strong>Total Results: </strong> {totalResult}
        <button onClick={handleLogout}>logout</button>
      </span>

      <form onSubmit={handleSubmitForm}>
        <div className="search">
          <input
            type="text"
            value={search}
            onChange={(e) => handleChangeFilterValue(e.target.value)}
          />

          <div className="autoCompleteSugestions">
            <ul>
              {sugestions.map((suggestion: any, index: number) => (
                <li key={index}>{suggestion.snippet?.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </form>

      <ul className="videos">
        <InfiniteScroll
          dataLength={valueList.length}
          next={handleCarriesNextVideos}
          hasMore={hasMore}
          loader={
            <div className="spinner-border text-danger d-block mx-auto"></div>
          }
          endMessage={<h1>Final list</h1>}
          className="videos"
        >
          {valueList.map((video: any) => (
            <li
              key={video.id}
              onClick={() => handlePreviewVideoDetails(video.id)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
              <span>{video.snippet.title}</span>
              <div className="video-footer">
                <strong>{formatDuration(video.contentDetails.duration)}</strong>
                <span>
                  {numeral(video.statistics.viewCount).format("0.a")} views
                </span>
              </div>
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
}
