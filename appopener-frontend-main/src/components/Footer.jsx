import React, { Component } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaMobile,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import classes from "./Styles.module.css";
// import { PrivacyPolicy } from '../pages/PrivacyPolicy';
// import { useHistory } from 'react-router-dom';
// import Home from '../pages/Home';

import slogo from "../assets/slogo.avif";

function Footer() {
  return (
    <>
      <footer
        style={{
          background: "#202124",
          color: "white",
          width: "100%",
          padding: "25px",
        }}
      >
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-1 col-md-1 mb-4" ></div> */}
            <div className="col-lg-3 col-md-4 mb-4">
              <img className={classes.logo} src={slogo} alt="Logo" />
              {/* <p className="text-muted mb-4" style={{width:"250px"}}>Loginskip . <br/>
                                </p> */}
            </div>
            <div className="col-lg-3 col-md-4 mb-4 mb-lg-0">
              <h6 className="text-uppercase font-weight-bold mb-4">Policies</h6>
              <ul className="list-unstyled mb-0">
                {/* <li className="mb-2"><FaMobile size="20px" style={{"color":"blue"}}/> <a href="#" style={{textDecoration:"none"}} className="text-muted"> +91 8882044912</a></li>
                            <li className="mb-2"><FaWhatsapp size="20px" style={{"color":"green"}}/><a href="#" style={{textDecoration:"none"}} className="text-muted"> +91 8882044912</a></li> */}
                <li className="mb-2">
                  <Link
                    to="/privacypolicy"
                    style={{
                      textDecoration: "none",
                      color: "#ccc",
                      fontFamily: "Montserrat Alternates",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 mb-4 mb-lg-0">
              <h6 className="text-uppercase font-weight-bold mb-4">
                Contact Details
              </h6>
              <ul className="list-unstyled mb-0">
                {/* <li className="mb-2"><FaMobile size="20px" style={{"color":"blue"}}/> <a href="#" style={{textDecoration:"none"}} className="text-muted"> +91 8882044912</a></li>
                            <li className="mb-2"><FaWhatsapp size="20px" style={{"color":"green"}}/><a href="#" style={{textDecoration:"none"}} className="text-muted"> +91 8882044912</a></li> */}
                <li className="mb-2">
                  <FaMailBulk size="20px" style={{ color: "#F3A33A" }} />
                  <a
                    href="mailto:contactus@appopener.com"
                    style={{
                      textDecoration: "none",
                      fontFamily: "Montserrat Alternates",
                    }}
                    className="text-muted"
                  >
                    {" "}
                    contactus@appopener.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-3 mb-4 mb-lg-0">
              <h6 className="text-uppercase font-weight-bold mb-4">
                Connect with us
              </h6>
              <ul className="list-inline mt-4">
                <li className="list-inline-item">
                  <a href="" target="_blank" title="facebook">
                    <FaFacebook style={{ color: "#ccc" }} size="32px" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="" target="_blank" title="instagram">
                    <FaInstagram style={{ color: "#ccc" }} size="32px" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="" target="_blank" title="youtube">
                    <FaYoutube style={{ color: "#ccc" }} size="32px" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="" target="_blank" title="pinterest">
                    <FaPinterest style={{ color: "#ccc" }} size="32px" />
                  </a>
                </li>
              </ul>
              {/* <i>Visioned by <a href="https://www.instagram.com/midas_sensei/" target="_blank">Midas</a> without his touch </i> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
