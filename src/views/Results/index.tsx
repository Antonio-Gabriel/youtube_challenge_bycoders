import ShowMoreText from "react-show-more-text";
import { Container, Video, VideoContent } from "./styles";

export function Results() {
  return (
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 results-header">
            <h4>Filters</h4>
            <span>
              results:
              <strong> 00</strong>
            </span>
          </div>
          <div className="col-lg-12 results">
            <Video>
              <div className="image">
                <img src="/src/assets/video.webp" alt="image name" />
                <div className="duraction">
                  <span>13:21</span>
                </div>
              </div>
              <VideoContent>
                <div className="title">
                  <h5>
                    Amapiano Quarantine Mix 2020 ( DJ Maphorisa | Kabza De Small
                    | JazziDisciples | MFR Souls)
                  </h5>

                  <article>
                    215 mil visualizações <strong></strong> há 1 ano
                  </article>
                </div>

                <div className="channel">
                  <img
                    src="/src/assets/channels4_profile.jpg"
                    alt="channel image"
                  />
                  <a href={`/results?search_query=`}>Freshly Baked</a>
                </div>

                <ShowMoreText
                  className="description"
                  lines={1}
                  more=""
                  less=""
                  width={600}
                >
                  ut labore et dolore magna amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam,
                </ShowMoreText>
              </VideoContent>
            </Video>
            <Video>
              <div className="image">
                <img src="/src/assets/video.webp" alt="image name" />
                <div className="duraction">
                  <span>13:21</span>
                </div>
              </div>
              <VideoContent>
                <div className="title">
                  <h5>
                    Amapiano Quarantine Mix 2020 ( DJ Maphorisa | Kabza De Small
                    | JazziDisciples | MFR Souls)
                  </h5>

                  <article>
                    215 mil visualizações <strong></strong> há 1 ano
                  </article>
                </div>

                <div className="channel">
                  <img
                    src="/src/assets/channels4_profile.jpg"
                    alt="channel image"
                  />
                  <a href={`/results?search_query=`}>Freshly Baked</a>
                </div>

                <ShowMoreText
                  className="description"
                  lines={1}
                  more=""
                  less=""
                  width={600}
                >
                  ut labore et dolore magna amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam,
                </ShowMoreText>
              </VideoContent>
            </Video>
          </div>
        </div>
      </div>
    </Container>
  );
}
