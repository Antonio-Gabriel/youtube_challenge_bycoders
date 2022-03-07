import { Link } from "react-router-dom";
import { Content } from "./hero.styles";

export function HeroView() {
  return (
    <Content>
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 text-content"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <span>YouTube</span>
            <h1>
              Find all the videos to your liking and not just here.Let's ensure
              your smile.
            </h1>
            <p>
              Video sharing platform based in San Bruno, California. The service
              was created by three former PayPal employees
            </p>
            <div className="buttons">
              <Link to="/">
                <button>Start watch the videos</button>
              </Link>
            </div>

            <small>
              Hi! 👋 Here is YouTube Challenge page redesign. What do you think?
            </small>
          </div>

          <div
            className="col-lg-6 image-content"
            data-aos="fade-left"
            data-aos-duration="900"
          >
            <img src="/src/assets/person.svg" alt="illustration" />
          </div>
        </div>
      </div>
    </Content>
  );
}
