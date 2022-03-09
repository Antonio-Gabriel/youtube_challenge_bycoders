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
import { ENUMS } from "../../redux/actions/types/types";
import { SmallVideo } from "../../components/SmallVideo";
import { getVideoServices } from "../../services/getVideosService";
import { getChannelByIdService } from "../../services/getChannelById";
import { getUniqueElementsFromList } from "../../utils/getUniqueIdFromList";

import "./styles.scss";

export function Home() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [valueList, setValueList] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const accessToken = localStorage.getItem("bycoders-accessToken") ?? "";

  useEffect(() => {
    dispatch(getVideoActions());
  }, [dispatch]);

  const { totalResult, nextPageToken } = useSelector<IVideoPropsState>(
    (state) => state.videos
  ) as any;

  useEffect(() => {
    if (!accessToken) {
      dispatch({
        type: ENUMS.FAIL,
        error: "Error",
      });
    }
  }, []);

  useEffect(() => {
    getVideoServices(nextPageToken).then((res) => {
      const joinVideoByChannelResponse = res.items.map(async (video: any) => {
        const channelData = await getChannelByIdService(
          video.snippet.channelId
        );

        return {
          id: video.id,
          thumbnail: video.snippet.thumbnails.medium.url,
          duraction: video.contentDetails.duration,
          title: video.snippet.title,
          views: video.statistics.viewCount,
          publishedAt: video.snippet.publishedAt,
          channelName: channelData.items[0].snippet.title,
          channelThumbnail: channelData.items[0].snippet.thumbnails.default,
        };
      });

      Promise.all(joinVideoByChannelResponse).then((res) => setValueList(res));
    });
  }, []);

  async function handleCarriesNextVideos() {
    dispatch(getVideoActions());

    const response = await getVideoServices(nextPageToken);
    const joinVideoByChannelResponse = await response.items.map(
      async (video: any) => {
        const channelData = await getChannelByIdService(
          video.snippet.channelId
        );

        return {
          id: video.id,
          thumbnail: video.snippet.thumbnails.medium.url,
          duraction: video.contentDetails.duration,
          title: video.snippet.title,
          views: video.statistics.viewCount,
          publishedAt: video.snippet.publishedAt,
          channelName: channelData.items[0].snippet.title,
          channelThumbnail: channelData.items[0].snippet.thumbnails.default,
        };
      }
    );

    const nextPage = await Promise.all(joinVideoByChannelResponse).then(
      (res) => res
    );

    const margeVideoList = [...valueList, ...nextPage];

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
              endMessage={
                <span className="mt-2 text-center">
                  Final popular videos, search new videos
                </span>
              }
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
                      thumbnail={video.thumbnail}
                      duraction={formatDuration(video.duraction)}
                      title={video.title}
                      views={numeral(video.views).format("0.a")}
                      publishedAt={moment(video.publishedAt).fromNow()}
                      channelName={video.channelName}
                      channelThumbnail={video.channelThumbnail.url}
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
