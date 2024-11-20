import { Link } from "react-router-dom";

export const PageHeader = () => (
  <header>
    <div className="aura-logo">
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "images/AURAS.webp"}
          alt="AURAS.png"
        />
      </Link>
    </div>
    <div className="aspire-logo">
      <a
        href="https://www.aspiresys.com/retail/digital-commerce-services"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={process.env.PUBLIC_URL + "images/logo_002.webp"}
          alt="logo.png"
        />
      </a>
    </div>
  </header>
);
