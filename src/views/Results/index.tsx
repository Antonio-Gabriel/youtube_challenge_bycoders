import { Container } from "./styles";
import { Video } from "../../components/Video";

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
            <Video
              title="Amapiano Quarantine Mix 2020 ( DJ Maphorisa | Kabza De Small
                | JazziDisciples | MFR Souls)"
              duration="13:21"
              thumbnail="/src/assets/video.webp"
              views="215 mil"
              publishedAt="há um ano"
              channelName="Freshly Baked"
              channelThumbnail="/src/assets/channels4_profile.jpg"
              description="ut labore et dolore magna amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam,"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
