import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRelatedVideosActions } from "../../redux/actions/getRelatedVideosAction";
import { IVideoPropsState } from "../../types/IVideoPropsState";

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
      {console.log(videos)}

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
        <div className="col-lg-4"></div>
      </div>
    </section>
  );
}
