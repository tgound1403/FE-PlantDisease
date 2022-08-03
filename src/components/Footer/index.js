import { Link } from "react-router-dom";

import "./index.css";

export const Footer = ({ bgImage }) => {
  return (
    <footer
      className="footer"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="container wrap-footer">
        <div className="footer__column footer__wrap-social">
          <a
            href="https://www.google.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram footer__link-icon"></i>
          </a>
          <a
            href="https://www.google.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f footer__link-icon"></i>
          </a>
          <a
            href="https://www.google.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter footer__link-icon"></i>
          </a>
        </div>

        <div className="footer__column">
          <h4 className="footer__column__title">ABOUT US</h4>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Our Mission
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Our Team
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Media Center
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h4 className="footer__column__title">OUR PROGRAMS</h4>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Plant Disease Forum
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Plant Disease
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Alternative Break
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h4 className="footer__column__title">SUPPORT TRAILS</h4>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Donate
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Individual Membership
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Gift Membership
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/" className="footer__item-link">
                Plant Disease
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
