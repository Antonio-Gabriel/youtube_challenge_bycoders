import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDuration } from "../../utils/formatDuration";
import { IVideoPropsState } from "../../types/IVideoPropsState";
import { getVideoActions } from "../../redux/actions/getVideoAction";

import moment from "moment";
import numeral from "numeral";
import InfiniteScroll from "react-infinite-scroll-component";

import { Content } from "./styles";
import { Header } from "../../components/Header";
import { SmallVideo } from "../../components/SmallVideo";
import { getVideoServices } from "../../services/getVideosService";
import { getUniqueElementsFromList } from "../../utils/getUniqueIdFromList";

import "./styles.scss";

export function Home() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [valueList, setValueList] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // useEffect(() => {
  //   dispatch(getVideoActions());
  // }, [dispatch]);

  const { totalResult, nextPageToken } = useSelector<IVideoPropsState>(
    (state) => state.videos
  ) as any;

  // useEffect(() => {
  //   getVideoServices(nextPageToken).then((res) => setValueList(res.items));
  // }, []);

  async function handleCarriesNextVideos() {
    dispatch(getVideoActions());

    const response = await getVideoServices(nextPageToken);

    const margeVideoList = [...valueList, ...response.items];

    setValueList([...getUniqueElementsFromList(margeVideoList, "id")]);

    if (valueList.length === totalResult) {
      setHasMore(false);
    }
  }

  function handleWatchingVideo(id: string) {
    navigateTo(`/watch/${id}`);
  }

  return (
    <>
      <Header />

      <Content>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 pupular-videos">
              <h4>Popular Videos</h4>
            </div>
          </div>

          <div className="col-lg-12">
            <InfiniteScroll
              dataLength={valueList.length}
              next={handleCarriesNextVideos}
              hasMore={hasMore}
              loader={
                <div className="spinner-border text-danger d-block mx-auto text-center"></div>
              }
              endMessage={<span>Reload the page</span>}
              className="videos"
            >
              <div className="row">
                {valueList.map((video: any) => (
                  <div
                    className="col-lg-3 mb-4"
                    key={video.id}
                    onClick={() => handleWatchingVideo(video.id)}
                  >
                    <SmallVideo
                      thumbnail={video.snippet.thumbnails.medium.url}
                      duraction={formatDuration(video.contentDetails.duration)}
                      title={video.snippet.title}
                      views={numeral(video.statistics.viewCount).format("0.a")}
                      publishedAt={moment(video.snippet.publishedAt).fromNow()}
                      channelName="Freshly Baked"
                      channelThumbnail="/src/assets/channels4_profile.jpg"
                      width={260}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </Content>
    </>
  );
}
