import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { Header } from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { IVideoPropsState } from "../../types/IVideoPropsState";

import {
  Channel,
  CurrentVideo,
  RelatedCourses,
  Title,
  WatchContent,
} from "./styles";

import numeral from "numeral";

import { ENUMS } from "../../redux/actions/types/types";
import { SmallVideo } from "../../components/SmallVideo";
import { getVideoById } from "../../services/getVideoById";
import { getChannelByIdService } from "../../services/getChannelById";
import { getRelatedVideosActions } from "../../redux/actions/getRelatedVideosAction";

export function Watch() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [videoToWatch, setVideoToWatch] = useState([]) as any;

  const accessToken = localStorage.getItem("bycoders-accessToken") ?? "";

  useEffect(() => {
    dispatch(getRelatedVideosActions(id));
  }, [dispatch]);

  const { videos, nextPageToken } = useSelector<IVideoPropsState>(
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
  }, []);

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
                    <SmallVideo
                      thumbnail="/src/assets/video.webp"
                      duraction="13:21"
                      title="Amapiano Quarantine Mix 2020 ( DJ Maphorisa | Kabza De
                        Small | JazziDisciples | MFR Souls)"
                      views="215 mil"
                      publishedAt="há 1 ano"
                      channelName="Freshly Baked"
                      channelThumbnail="/src/assets/channels4_profile.jpg"
                    />
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
