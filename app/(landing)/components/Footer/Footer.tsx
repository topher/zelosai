"use client"
import Link from "next/link";
import "./footer.css";
import { Link as RNLink } from "react-router-dom";

export const Footer = () => (
  <div className="footer-container container">
    <div className="left-content">
      <div className="logo">
        {/* <BrandLogo /> */}
      </div>
      {/* <ul className="navbar-nav d-none d-sm-flex">
        <li className="nav-item">
          <Link
            spy={true}
            smooth={true}
            duration={500}
            className="nav-link me-4 fs-6 pointer"
            aria-current="page"
            to="home"
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link me-4 fs-6 pointer"
            to="problem"
            spy={true}
            smooth={true}
            duration={500}
          >
            Problem
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link me-4 fs-6 pointer"
            to="solution"
            spy={true}
            smooth={true}
            duration={500}
          >
            Solution
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link me-4 fs-6 pointer"
            to="working"
            spy={true}
            smooth={true}
            duration={500}
          >
            How it works
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link me-4 fs-6 pointer"
            to="team"
            spy={true}
            smooth={true}
            duration={500}
          >
            Team
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link me-4 fs-6 pointer"
            to="expert"
            spy={true}
            smooth={true}
            duration={500}
          >
            Experts
          </Link>
        </li>
      </ul> */}
      <ul className="navbar-nav d-sm-flex">
        <Link
          target="_blank"
          className="nav-link fs-6 me-4 pointer active"
          href="https://app.termly.io/document/privacy-policy/b4f9f1c1-a729-4a08-8adb-dba43f6604a7"
          rel="noreferrer"
        >
          Privacy
        </Link>
        <Link className="nav-link fs-6 pointer me-4" href="/termsOfUse">
          Terms of Use
        </Link>
      </ul>
    </div>
    <div className="right-content">
      <div className="copyright">©</div>
      Zelos Inc. 2024
    </div>
  </div>
);
