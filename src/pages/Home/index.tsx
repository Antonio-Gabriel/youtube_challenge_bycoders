import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/actions/authenticationAction";
import { getVideoActions } from "../../redux/actions/getVideoAction";
import { IVideoPropsState } from "../../types/IVideoPropsState";

import { formatDuration } from "../../utils/formatDuration";

import numeral from "numeral";
import InfiniteScroll from "react-infinite-scroll-component";

import { getVideoServices } from "../../services/getVideosService";
import { getUniqueElementsFromList } from "../../utils/getUniqueIdFromList";

import "./styles.css";

export function Home() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [valueList, setValueList] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getVideoActions());
  }, [dispatch]);

  const { loading, totalResult, nextPageToken } = useSelector<IVideoPropsState>(
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

    console.table(valueList);
  }

  return (
    <div>
      <h2>Home</h2>
      <span>
        <strong>Total Results: </strong> {totalResult}
      </span>
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
              <img src={video.snippet.thumbnails.medium.url} />
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

      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
