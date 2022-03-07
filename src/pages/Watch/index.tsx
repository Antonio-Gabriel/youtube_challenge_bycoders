import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { Header } from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { IVideoPropsState } from "../../types/IVideoPropsState";
import {
  Channel,
  CurrentVideo,
  RelatedCourses,
  Title,
  WatchContent,
} from "./styles";
import { getRelatedVideosActions } from "../../redux/actions/getRelatedVideosAction";
import { SmallVideo } from "../../components/SmallVideo";

export function Watch() {
  const { id } = useParams();
  const watchVideoUrl = `https://www.youtube.com/embed/${id}`;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRelatedVideosActions(id));
  }, [dispatch]);

  const { videos, nextPageToken } = useSelector<IVideoPropsState>(
    (state) => state.videos
  ) as any;

  return (
    <>
      <Header />

      <WatchContent>
        <section className="container">
          <div className="row">
            <div className="col-lg-8">
              <CurrentVideo>
                <iframe
                  src={watchVideoUrl}
                  frameBorder={0}
                  title="video title"
                  allowFullScreen
                ></iframe>

                <Title>
                  <article>
                    <h5>
                      Amapiano Quarantine Mix 2020 ( DJ Maphorisa | Kabza De
                      Small | JazziDisciples | MFR Souls)
                    </h5>
                    <span>215 mil visualizações</span>
                  </article>

                  <ul>
                    <li>
                      <AiFillLike />
                      200
                    </li>

                    <li>
                      <AiFillDislike />2
                    </li>
                  </ul>
                </Title>

                <Channel>
                  <div className="subscription">
                    <article>
                      <img
                        src="/src/assets/channels4_profile.jpg"
                        alt="channel logo"
                      />
                      <div className="name">
                        <strong>Freshly Baked</strong>
                        <span>0.9980k Subscribers</span>
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
                    ut labore et dolore magna amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam,ut labore et dolore magna
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam Ut enim ad minim veniam
                  </ShowMoreText>
                </Channel>
              </CurrentVideo>
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

                  {/* {videos.map((video: any) => (
                    <div className="col-lg-12">
                      <div className="video-card">
                        <img
                          src={video.snippet?.thumbnails.medium.url}
                          alt={video.snippet?.title}
                        />
                        <p>{video.snippet?.title}</p>
                      </div>
                    </div>
                  ))} */}
                </div>
              </RelatedCourses>
            </div>
          </div>
        </section>
      </WatchContent>
    </>
  );
}
