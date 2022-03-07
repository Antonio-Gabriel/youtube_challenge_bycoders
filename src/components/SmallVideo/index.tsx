import { Video, VideoContent } from "./styles";
import ShowMoreText from "react-show-more-text";

type IVideoProps = {
  href?: string;
  title: string;
  views: string;
  thumbnail: string;
  duraction: string;
  publishedAt: string;
  channelThumbnail: string;
  channelName: string;
  width?: number;
};

export function SmallVideo({
  href,
  title,
  channelName,
  channelThumbnail,
  views,
  duraction,
  publishedAt,
  thumbnail,
  width = 310,
}: IVideoProps) {
  return (
    <Video href={href}>
      <div className="image">
        <img src={thumbnail} alt={title} />
        <div className="duraction">
          <span>{duraction}</span>
        </div>
      </div>

      <VideoContent>
        <div className="title">
          <ShowMoreText className="h5" lines={2} more="" less="" width={width}>
            {title}
          </ShowMoreText>

          <article>
            {views} views <strong></strong> {publishedAt}
          </article>
        </div>

        <div className="channel">
          <img src={channelThumbnail} alt={channelName} />
          <a>{channelName}</a>
        </div>
      </VideoContent>
    </Video>
  );
}
