import { Container } from "./styles";
import { useEffect, useState } from "react";
import { Video } from "../../components/Video";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../../services/getVideoById";
import { IVideoPropsState } from "../../types/IVideoPropsState";
import { getResultsService } from "../../services/getResultsService";
import { getChannelByIdService } from "../../services/getChannelById";
import { getResultsActions } from "../../redux/actions/getResultsAction";

import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { ENUMS } from "../../redux/actions/types/types";
import { formatDuration } from "../../utils/formatDuration";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUniqueElementsFromList } from "../../utils/getUniqueIdFromList";

type IFilterProps = {
  filter: string;
};

export function Results({ filter }: IFilterProps) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [valueList, setValueList] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const accessToken = localStorage.getItem("bycoders-accessToken") ?? "";

  useEffect(() => {
    dispatch(getResultsActions(filter));
  }, [filter, dispatch]);

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
    getResultsService(filter, nextPageToken).then((res) => {
      const getAllPropertiesOfVideo = res.items.map(async (video: any) => {
        const videoById = await getVideoById(video.id.videoId);
        const channelData = await getChannelByIdService(
          video.snippet.channelId
        );

        return {
          id: videoById.items[0].id,
          thumbnail: videoById.items[0].snippet.thumbnails.medium.url,
          duraction: videoById.items[0].contentDetails.duration,
          title: videoById.items[0].snippet.title,
          views: videoById.items[0].statistics.viewCount,
          publishedAt: videoById.items[0].snippet.publishedAt,
          channelName: channelData.items[0].snippet.title,
          channelThumbnail: channelData.items[0].snippet.thumbnails.default,
          description: video.snippet.description,
        };
      });
      Promise.all(getAllPropertiesOfVideo).then((res) => setValueList(res));
    });
  }, []);

  async function handleCarriesNextVideos() {
    dispatch(getResultsActions(filter));
    const response = await getResultsService(filter, nextPageToken);

    const getAllPropertiesOfVideo = response.items.map(async (video: any) => {
      const videoById = await getVideoById(video.id.videoId);
      const channelData = await getChannelByIdService(video.snippet.channelId);

      return {
        id: videoById.items[0].id,
        thumbnail: videoById.items[0].snippet.thumbnails.medium.url,
        duraction: videoById.items[0].contentDetails.duration,
        title: videoById.items[0].snippet.title,
        views: videoById.items[0].statistics.viewCount,
        publishedAt: videoById.items[0].snippet.publishedAt,
        channelName: channelData.items[0].snippet.title,
        channelThumbnail: channelData.items[0].snippet.thumbnails.default,
        description: video.snippet.description,
      };
    });

    const nextPage = await Promise.all(getAllPropertiesOfVideo).then(
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
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 results-header">
            <h4>Filters</h4>
            {/* <span>
              results:
              <strong> 00</strong>
            </span> */}
          </div>
          <div className="col-lg-12 results">
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
                    key={video.id}
                    onClick={() => handleWatchingVideo(video.id)}
                  >
                    <Video
                      title={video.title}
                      duration={formatDuration(video.duraction)}
                      thumbnail={video.thumbnail}
                      views={numeral(video.views).format("0.a")}
                      publishedAt={moment(video.publishedAt).fromNow()}
                      channelName={video.channelName}
                      channelThumbnail={video.channelThumbnail.url}
                      description={video.description}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Container>
  );
}
