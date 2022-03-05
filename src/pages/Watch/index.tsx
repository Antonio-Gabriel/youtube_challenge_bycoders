import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IVideoPropsState } from "../../types/IVideoPropsState";
import { getRelatedVideosActions } from "../../redux/actions/getRelatedVideosAction";

export function Watch() {
  const { id } = useParams();
  const watchVideoUrl = `https://www.youtube.com/embed/${id}`;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRelatedVideosActions(id));
  }, [dispatch]);

  const { videos, loading, totalResult, nextPageToken } =
    useSelector<IVideoPropsState>((state) => state.videos) as any;

  return (
    <section className="container">
      <div className="row">
        <div className="col-lg-8">
          <iframe
            style={{
              width: "100%",
              height: "400px !important",
            }}
            src={watchVideoUrl}
            frameBorder={0}
            title="video title"
            allowFullScreen
            width="1"
          ></iframe>
        </div>
        <div className="col-lg-4">
          <div className="related-videos">
            <div className="row">
              {videos.map((video: any) => (
                <div className="col-lg-12">
                  <div className="video-card">
                    <img
                      src={video.snippet?.thumbnails.medium.url}
                      alt={video.snippet?.title}
                    />
                    <p>{video.snippet?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
