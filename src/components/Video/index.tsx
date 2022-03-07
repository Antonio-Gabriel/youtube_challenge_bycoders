import ShowMoreText from "react-show-more-text";
import { VideoContainer, VideoContent } from "./styles";

type IVideoProps = {
  href?: string;
  thumbnail: string;
  duration: string;
  title: string;
  views: string;
  publishedAt: string;
  channelThumbnail?: string;
  channelName?: string;
  description?: string;
};

export function Video({
  href,
  thumbnail,
  title,
  duration,
  views,
  publishedAt,
  channelThumbnail,
  channelName,
  description,
}: IVideoProps) {
  return (
    <VideoContainer href={href}>
      <div className="image">
        <img src={thumbnail} alt={title} />
        <div className="duraction">
          <span>{duration}</span>
        </div>
      </div>
      <VideoContent>
        <div className="title">
          <h5>{title}</h5>

          <article>
            {views} views <strong></strong> {publishedAt}
          </article>
        </div>

        <div className="channel">
          <img src={channelThumbnail} alt={channelName} />
          <a>{channelName}</a>
        </div>

        <ShowMoreText
          className="description"
          lines={1}
          more=""
          less=""
          width={600}
        >
          {description}
        </ShowMoreText>
      </VideoContent>
    </VideoContainer>
  );
}
