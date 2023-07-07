import React from "react";
import "./footer.css";
import github from "../../../assets/github-mark.png";
const Footer = ({ ...props }) => (
  <section className="footer_wrapper">
    <footer>
      <nav className="copyright">
        <p>
          Copyright &copy; Geoffrey Langeberg, Elissa Maine, Zachary Lyski, Seth
          Leininger, Andrew Muhn --
          {new Date().getFullYear()}{" "}
          <a href="https://github.com/sethleininger/dopamine-box">
            <img
              src={github}
              alt="github mark"
              style={{ height: 25, width: 25 }}
            ></img>
          </a>
        </p>
      </nav>
    </footer>
  </section>
);

export default Footer;
