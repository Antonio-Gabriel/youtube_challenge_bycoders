import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/actions/authenticationAction";
import { getVideoActions } from "../../redux/actions/getVideoAction";
import { IVideoPropsState } from "../../types/IVideoPropsState";

import { formatDuration } from "../../utils/formatDuration";

import "./styles.css";

export function Home() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { videos, loading, totalResult } = useSelector<IVideoPropsState>(
    (state) => state.videos
  ) as any;

  useEffect(() => {
    dispatch(getVideoActions());
  }, [dispatch]);

  function handleLogout() {
    dispatch(signOut());

    navigateTo("/login");
  }

  function handlePreviewVideoDetails(id: string) {
    navigateTo(`/video-details/${id}`);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Home</h2>
      <span>
        <strong>Total Results: </strong> {totalResult}
      </span>

      <ul className="videos">
        {videos.map((video: any) => (
          <li
            key={video.id}
            onClick={() => handlePreviewVideoDetails(video.id)}
          >
            <img src={video.snippet.thumbnails.medium.url} />
            <span>{video.snippet.title}</span>
            <strong>{formatDuration(video.contentDetails.duration)}</strong>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
