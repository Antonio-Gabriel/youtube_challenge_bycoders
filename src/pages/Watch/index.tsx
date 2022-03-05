import { useParams } from "react-router-dom";

export function Watch() {
  const { id } = useParams();
  const watchVideoUrl = `https://www.youtube.com/embed/${id}`;

  return (
    <section className="container">
      <div className="row">
        <div className="col-lg-8">
          <iframe
            style={{
              width: "100%",
              height: "400px !important",
            }}
            src={watchVideoUrl}
            frameBorder={0}
            title="video title"
            allowFullScreen
            width="1"
          ></iframe>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </section>
  );
}
