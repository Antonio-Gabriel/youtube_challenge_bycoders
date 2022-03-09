import { useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Header } from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IVideoPropsState } from "../../types/IVideoPropsState";

import {
  Channel,
  CurrentVideo,
  RelatedCourses,
  Title,
  WatchContent,
} from "./styles";

import moment from "moment";
import numeral from "numeral";
import InfiniteScroll from "react-infinite-scroll-component";

import { ENUMS } from "../../redux/actions/types/types";
import { SmallVideo } from "../../components/SmallVideo";
import { getVideoById } from "../../services/getVideoById";
import { formatDuration } from "../../utils/formatDuration";
import { getChannelByIdService } from "../../services/getChannelById";
import { getUniqueElementsFromList } from "../../utils/getUniqueIdFromList";
import { getRelatedVideosService } from "../../services/getRelatedVideosService";
import { getRelatedVideosActions } from "../../redux/actions/getRelatedVideosAction";

export function Watch() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [valueList, setValueList] = useState([]) as any;
  const [videoToWatch, setVideoToWatch] = useState([]) as any;

  const accessToken = localStorage.getItem("bycoders-accessToken") ?? "";

  useEffect(() => {
    dispatch(getRelatedVideosActions(id));
  }, [dispatch]);

  const { nextPageToken, totalResult } = useSelector<IVideoPropsState>(
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
    getVideoById(id ?? "").then((res) => {
      const joinVideoByChannelResponse = res.items.map(async (video: any) => {
        const channelData = await getChannelByIdService(
          video.snippet.channelId
        );

        return {
          id: video.id,
          duraction: video.contentDetails.duration,
          title: video.snippet.title,
          views: video.statistics.viewCount,
          publishedAt: video.snippet.publishedAt,
          description: video.snippet.description,
          channelName: channelData.items[0].snippet.title,
          channelThumbnail: channelData.items[0].snippet.thumbnails.default,
        };
      });

      Promise.all(joinVideoByChannelResponse).then((res) =>
        setVideoToWatch(res)
      );
    });

    getRelatedVideosService(nextPageToken, id).then((res) => {
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
    dispatch(getRelatedVideosActions(id));

    const response = await getRelatedVideosService(nextPageToken, id);
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

      <WatchContent>
        <section className="container">
          <div className="row">
            <div className="col-lg-8">
              {videoToWatch.map((video: any) => (
                <CurrentVideo key={video.id}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    frameBorder={0}
                    title={video.title}
                    allowFullScreen
                  ></iframe>

                  <Title>
                    <article>
                      <h5>{video.title}</h5>
                      <span>{numeral(video.views).format("0.a")} viws</span>
                    </article>
                  </Title>

                  <Channel>
                    <div className="subscription">
                      <article>
                        <img
                          src={video.channelThumbnail.url}
                          alt={video.channelName}
                        />
                        <div className="name">
                          <strong>{video.channelName}</strong>
                          <span>Subscribers</span>
                        </div>
                      </article>

                      <button>Subscribe</button>
                    </div>

                    <ShowMoreText
                      className="description"
                      lines={3}
                      more="Show more"
                      less="Show less"
                      width={700}
                    >
                      {video.description}
                    </ShowMoreText>
                  </Channel>
                </CurrentVideo>
              ))}
            </div>
            <div className="col-lg-4">
              <RelatedCourses>
                <div className="row">
                  <div className="col-lg-12 related-videos">
                    <span>Related Videos</span>
                  </div>

                  <div className="col-lg-12 filtered-videos">
                    <InfiniteScroll
                      dataLength={valueList.length}
                      next={handleCarriesNextVideos}
                      hasMore={hasMore}
                      loader={
                        <div className="spinner-border text-danger d-block mx-auto text-center"></div>
                      }
                      endMessage={
                        <span className="mt-2 text-center">
                          Final related videos, search new videos
                        </span>
                      }
                      className="videos"
                    >
                      <div className="row">
                        {valueList.map((video: any) => (
                          <div
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
                              // width={260}
                            />
                          </div>
                        ))}
                      </div>
                    </InfiniteScroll>
                  </div>
                </div>
              </RelatedCourses>
            </div>
          </div>
        </section>
      </WatchContent>
    </>
  );
}
