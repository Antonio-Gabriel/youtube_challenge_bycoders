import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { MdCached } from "react-icons/md";
import { Offcanvas } from "react-bootstrap";

interface IOffCanvasProps {
  handleCloseOffcanvas: () => void;
  show: boolean;
}

export function OffCanvas({ handleCloseOffcanvas, show }: IOffCanvasProps) {
  return (
    <Offcanvas show={show} onHide={handleCloseOffcanvas} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <img
            src="/src/assets/YouTube-White-Full-Color-Logo.wine.svg"
            alt="youtube Logo"
          />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="list">
          <Link to="/">
            <BiHome />
            Home
          </Link>
          <Link to="/histories">
            <MdCached />
            History
          </Link>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
