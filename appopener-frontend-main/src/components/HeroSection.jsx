import React from "react";
import classes from "./Styles.module.css";
import {
  generateOpenShortLink,
  generateUserLink,
  checkIfUserExist,
} from "../helper/api";
import {
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Header from "./Header";
import Login from "../components/login";
import FacebookLoginButton from "./fbLogin";
import Logout from "../components/logout";
import { Component } from "react";
import {
  FaAndroid,
  FaCircleNotch,
  FaClosedCaptioning,
  FaCopy,
  FaGlobe,
  FaGooglePay,
  FaGooglePlay,
  FaLinkedin,
  FaSleigh,
  FaSpinner,
  FaSpotify,
  FaTelegram,
  FaTimesCircle,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { get_Tag, validURL } from "../helper/helperfn";
import Modal from "react-awesome-modal";
import ShareButton from "react-web-share-button";
import ShareButtons from "../components/share";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../css/profile.css";
import InApp from "detect-inapp";

import logo from "../assets/logo.avif";
import helmetLogo from "../assets/helmet.avif";
import transparentBg from "../assets/bg.svg";

class HeroSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      appname: "",
      old_original_url: "",
      errortext: "",
      loadingicon: false,
      urlexist: false,
      errortext_url: "",
      captchadone: false,
      copied: false,
      generatedlink: "",
      isLogin: false,
      googleuserID: "",
      GoogleAuthToken: "",
      displayemail: "",
      displayImage: "",
      displayname: "",
      fbLogin: false,
      fbEmail: "",
      fbImageUrl: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLoginDetails = this.getLoginDetails.bind(this);
    this.getFacebookDetails = this.getFacebookDetails.bind(this);
  }
  componentDidMount() {
    // this.getLoginDetails()
  }

  getLoginDetails(val) {
    // alert("hi");
    // do not forget to bind getData in constructor
    //console.log("hello - ",val);
    //console.log("userID herosection - ", val.googleId);
    // console.log("email herosection - ",val.profileObj.email);
    if (val.googleId) {
      this.setState({
        googleuserID: val.googleId,
        isLogin: true,
        displayemail: val.profileObj.email,
        displayImage: val.profileObj.imageUrl,
        displayname: val.profileObj.name,
        GoogleAuthToken: val.tokenObj.id_token,
      });
    }
  }

  getFacebookDetails = (val) => {
    console.log('fb detals run');
    // if (val.usedID) {
    this.setState({
      fbLogin: true,
      fbEmail: val.email,
      fbImageUrl: val.picture.data.url
    });
    console.log("facebook login", this.state.fbLogin);
    console.log("facebook email", this.state.fbEmail);
    
  }


  handleChange(event) {
    this.setState({ value: event.target.value });

    let appnames = "";
    appnames = get_Tag(event.target.value);
    this.setState({ appname: appnames });
  }
  handleSubmit(event) {
    if (this.state.value == "") {
      this.setState({ errortext_url: "Please enter your link" });
    } else if (this.state.appname == "" || this.state.appname == " ") {
      this.setState({ errortext_url: "Invalid Link" });
    } else {
      this.setState({ urlexist: true, errortext_url: "" });
      if (this.state.isLogin) {
        //user is loginned then no captcha
        this.openModal();
      } else {
        this.openCaptchaModal();
      }
    }

    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  openModal() {
    this.setState({ visible: true, loadingicon: true });

    //check if same link is clicked again & again
    let appopener_app_url = "https://appopener-diwali.vercel.app/"; // process.env.REACT_APP_opnr_app_url;
    console.log(appopener_app_url);
    if (this.state.value === this.state.old_original_url) {
      this.setState({
        loadingicon: false,
        generatedlink: this.state.generatedlink,
      });
    } else {
      //check if user is login or not
      if (this.state.isLogin) {
        this.setState({ generatedlink: "", copied: false });
        //check first whether to create new user account or not
        checkIfUserExist(
          this.state.displayname,
          this.state.displayemail,
          this.state.googleuserID
        );

        generateUserLink(
          this.state.appname,
          this.state.value,
          this.state.GoogleAuthToken
        ).then((res) => {
          //console.log("status");
          //console.log(res.status);
          if (res.status == 401) {
            alert("Invalid Token Please try again");
            window.location.reload();
            return;
          }
          let tag = res.data.tag.toLowerCase();
          //console.log(tag);
          let original_url = res.data.originalURL;

          if (tag === "youtube") {
            tag = "yt";
          } else if (tag === "instagram") {
            tag = "ig";
          } else if (tag === "spotify") {
            tag = "sp";
          } else if (tag === "telegram") {
            tag = "tg";
          } else if (tag === "twitter") {
            tag = "tw";
          } else if (tag === "linkedin") {
            tag = "lk";
          } else if (tag === "playstore") {
            tag = "ps";
          } else {
            tag = "web";
          }
          let generated_url = appopener_app_url + tag + "/" + res.data.shortid;
          this.setState({
            loadingicon: false,
            old_original_url: original_url,
            generatedlink: generated_url,
          });
        });
      } else {
        this.setState({ generatedlink: "" });
        generateOpenShortLink(this.state.appname, this.state.value).then(
          (res) => {
            //console.log(res);
            let tag = res.data.tag.toLowerCase();
            if (tag === "youtube") {
              tag = "yt";
            } else if (tag === "instagram") {
              tag = "ig";
            } else if (tag === "spotify") {
              tag = "sp";
            } else if (tag === "telegram") {
              tag = "tg";
            } else if (tag === "twitter") {
              tag = "tw";
            } else if (tag === "linkedin") {
              tag = "lk";
            } else if (tag === "playstore") {
              tag = "ps";
            } else {
              tag = "web";
            }
            let original_url = res.data.originalURL;
            let generated_url =
              appopener_app_url + tag + "/" + res.data.shortid;
            //this.setState({intentvalue : res.data.app_intend});
            this.setState({
              loadingicon: false,
              old_original_url: original_url,
              generatedlink: generated_url,
            });
          }
        );
      }
    }
  }

  async timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async openCaptchaModal() {
    this.setState({
      visible_captcha: true,
      errortext: "",
      loadingicon: false,
    });
    await this.timeout(100);
    loadCaptchaEnginge(4, "black", "white");
  }
  closeCaptchaModal() {
    this.setState({
      visible_captcha: false,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
    this.closeCaptchaModal();
  }

  verifyCaptcha = () => {
    this.setState({
      errortext: "",
      loadingicon: false,
    });
    let user_captcha = document.getElementById("user_captcha_input").value;
    if (user_captcha === "" || user_captcha === " ") {
      this.setState({
        errortext: "Please enter captcha value",
      });
    } else {
      if (validateCaptcha(user_captcha) == true) {
        this.setState({
          errortext: "Verified Please wait ... ",
          loadingicon: true,
        });
        loadCaptchaEnginge(4, "black", "white");
        document.getElementById("user_captcha_input").value = "";

        this.openModal();
      } else {
        this.setState({
          errortext: "Captcha not matched, Plz try again",
        });
        document.getElementById("user_captcha_input").value = "";
      }
    }
  };

  render() {
    const useragent = navigator.userAgent || navigator.vendor || window.opera;
    const inapp = new InApp(useragent);

    const handleCLick = (event) => {
      this.setState({ value: "" });
    };

    let modal_captcha = <div></div>;

    if (this.state.visible_captcha) {
      modal_captcha = (
        <Modal
          style={{ position: "absolute" }}
          visible={this.state.visible_captcha}
          width="500"
          height="300"
          effect="fadeInDown"
          position="absolute"
          onClickAway={() => this.closeCaptchaModal()}
        >
          <div className="modal-content" style={{ border: "0" }}>
            <div className="modal-header text-center">
              <h5 className="modal-title">Captcha verification</h5>
              <a
                href="javascript:void(0);"
                onClick={() => this.closeCaptchaModal()}
              >
                <FaTimesCircle size="25px" />
              </a>
            </div>
            <div className="modal-body">
              <center>
                <div>
                  {" "}
                  <LoadCanvasTemplate
                    reloadText="Reload Captcha"
                    reloadColor="green"
                  />
                  <input
                    placeholder="Enter Captcha Value"
                    id="user_captcha_input"
                    className="form-control"
                    name="user_captcha_input"
                    type="text"
                  ></input>
                  <p className="text-danger">{this.state.errortext}</p>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.verifyCaptcha}
                  >
                    Verify
                    {this.state.loadingicon ? (
                      <FaCircleNotch className={classes.spinner} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
                <br></br>
                <i>To avoid Captcha Please Login..</i>
              </center>
            </div>
          </div>
        </Modal>
      );
    } else {
      modal_captcha = <div></div>;
    }
    let modal_generatelink = <div></div>;
    if (this.state.visible) {
      modal_generatelink = (
        <Modal
          style={{ position: "absolute" }}
          visible={this.state.visible}
          width="90%"
          height="50%"
          effect="fadeInDown"
          position="absolute"
          onClickAway={() => this.closeModal()}
        >
          <div className="modal-content" style={{ border: "0" }}>
            <div className="modal-header text-center">
              <h5 className="modal-title">Smarten your Links</h5>
              <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                <FaTimesCircle size="25px" />
              </a>
            </div>
            <div className="modal-body">
              <div className="input-group mt-3">
                <button
                  className="btn btn-secondary"
                  disabled={true}
                  type="button"
                  style={{ padding: "10px" }}
                  onClick={handleCLick}
                >
                  <FaLink size="20px" />
                </button>
                <input
                  type="text"
                  className="form-control"
                  style={{ padding: "10px" }}
                  value={this.state.generatedlink}
                  disabled={true}
                />
                <div className="input-group-append">
                  {this.state.loadingicon ? (
                    <>
                      {" "}
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ padding: "11px" }}
                      >
                        <FaCircleNotch className={classes.spinner} /> Please
                        wait
                      </button>
                    </>
                  ) : (
                    <>
                      <CopyToClipboard
                        text={this.state.generatedlink}
                        onCopy={() => this.setState({ copied: true })}
                      >
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{ padding: "11px" }}
                        >
                          <FaCopy size="25px" /> Copy Link
                        </button>
                      </CopyToClipboard>
                    </>
                  )}
                </div>
              </div>
              {this.state.copied ? (
                <p style={{ color: "red", padding: "5px" }}>link copied</p>
              ) : (
                ""
              )}

              <hr />
            </div>
            <div
              className="modal-footer"
              style={{ display: "block", borderTop: "0" }}
            >
              {inapp.isMobile ? (
                <ShareButton
                  className=""
                  title="AppOpener Smartlink"
                  url={this.state.generatedlink}
                />
              ) : (
                <>
                  <center>
                    <ShareButtons
                      title="AppOpener Smartlink"
                      url={this.state.generatedlink}
                      tags="#appopener"
                    />
                  </center>
                </>
              )}
            </div>
          </div>
        </Modal>
      );
    } else {
      modal_generatelink = <div></div>;
    }
    return (
      <>
        <div className={classes.heroBanner}>
          <div className={classes.overflowHidden}>
            <div className={classes.topHeader}>
              <div className="header">
                <Navbar
                  expand="lg"
                  className={this.state.click ? classes.active : "navbar-dark"}
                >
                  <Container>
                    <div className="d-flex justify-content-start">
                      <Navbar.Brand href="#home" className="navbar-logo">
                        <img className={classes.logo} src={logo} alt="Logo" />
                      </Navbar.Brand>

                      <a
                        className="navbar-brand d-none d-lg-block"
                        href="#"
                        style={{
                          fontFamily: "Montserrat Alternates",
                          fontWeight: 600,
                          marginTop: "23px",
                          fontSize: "23px",
                          color: "white",
                        }}
                      >
                        APPOPENER
                      </a>
                    </div>
                    
                    <div className="d-flex justify-content-start">
                      {this.state.isLogin ? (
                        <Nav.Link
                          href="/dashboard"
                          style={{
                            color: "white",
                            "font-family": "Montserrat Alternates",
                            "font-weight": "800",
                            "font-size": "16px",
                          }}
                        >
                          Dashboard
                        </Nav.Link>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className={classes.loginsNav}>
                        <Form>
                          {this.state.isLogin || this.state.fbLogin ? (<></>):(<>
                        <div className={classes.loginWith}>
                          Login with
                        </div>
                          </>)}
                        
                        </Form>
                        <Form style={{ width: "100%" }}>
                          <div className={classes.btnSignGrp}>
                            {this.state.isLogin ? (
                              <>
                                <div className="container d-flex flex-row">
                                  <div className="top-container">
                                    <img
                                      className="img-responsive img-fluid profile-image"
                                      src={this.state.displayImage}
                                      width="70"
                                      alt=""
                                    />
                                    <div className="">
                                      <p className="name d-none d-lg-block">
                                        {this.state.displayemail}
                                      </p>
                                      <div className="mail">
                                        <Logout />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                              {this.state.fbLogin ? (<></>):(<>
                              <center>
                                <Login sendData={this.getLoginDetails} />
                              </center>
                              </>)}
                              </>
                              
                            )}
                          </div>
                        </Form>
                        <Form style={{ width: "100%" }}>
                        <div className={classes.btnSignGrp}>
                          {this.state.fbLogin ? (
                              <>
                              
                             
                              <div className="container d-flex flex-row">
                                  <div className="top-container">
                                    <img
                                      className="img-responsive img-fluid profile-image"
                                      src={this.state.fbImage}
                                      width="70"
                                      alt=""
                                    />
                                    <div className="">
                                      <p className="name d-none d-lg-block">
                                        {this.state.fbEmail}
                                      </p>
                                      <div className="mail">
                                        <input type="button" value={"Logout"} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              
                              </>
                          ) : (
                            <>
                            {this.state.isLogin ? (<></>):(<>
                              <FacebookLoginButton sendData={this.getFacebookDetails} />
                            </>)}
                            </>
                            )}
                        </div>                        
                        </Form>
                      </div>
                    </div>
                  </Container>
                </Navbar>
              </div>
            </div>
            <div>
              {/* < img src={require("../assets/vector-1.avif").default}
                      style={{
                        zIndex:'-1'
                      }}                    
                    /> */}
              <div className={classes.stars}></div>
              <div className={classes.stars2}></div>
              <div className={classes.stars3}></div>
            </div>

            <div className={classes.innerContent}>
              <Container>
                <Row>
                  <Col xs={12} md={12} lg={6}>
                    <h1 className={classes.title}>Smart Link</h1>
                    <p
                      className={classes.subTitle}
                      style={{ fontFamily: "Montserrat Alternates" }}
                    >
                      Create SmartLinks to open desired apps from url without
                      login
                    </p>
                    <Form
                      className={classes.signupForm}
                      style={{ marginBottom: "0px" }}
                    >
                      <div
                        className="input-group mt-3"
                        style={{ marginBottom: "0px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="paste your link here"
                          style={{ padding: "10px" }}
                          value={this.state.value}
                          onChange={this.handleChange}
                        />

                        <div className="input-group-append">
                          <button
                            className="btn btn-primary"
                            type="button"
                            style={{ padding: "11px" }}
                            onClick={handleCLick}
                          >
                            {this.state.appname === "Youtube" ? (
                              <FaYoutube size="25px" />
                            ) : this.state.appname === "Instagram" ? (
                              <FaInstagram size="25px" />
                            ) : this.state.appname === "Spotify" ? (
                              <FaSpotify size="25px" />
                            ) : this.state.appname === "Telegram" ? (
                              <FaTelegram size="25px" />
                            ) : this.state.appname === "Twitter" ? (
                              <FaTwitter size="25px" />
                            ) : this.state.appname === "Linkedin" ? (
                              <FaLinkedin size="25px" />
                            ) : this.state.appname === "Playstore" ? (
                              <FaGooglePlay size="25px" />
                            ) : (
                              <FaLink size="25px" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="mt-3" style={{ marginLeft: "10px" }}>
                        <Button
                          className={classes.btnSignUp}
                          variant="primary"
                          type="submit"
                          onClick={this.handleSubmit}
                        >
                          Smarten Link
                        </Button>
                      </div>
                    </Form>

                    <div>
                      <p style={{ color: "red", paddingLeft: "10px" }}>
                        {this.state.errortext_url}
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontFamily: "Montserrat Alternates",
                          fontSize: "15.38px",
                        }}
                      >
                        Login to view analytics
                      </p>
                    </div>

                    <div style={{ marginTop: "-20px" }}>
                      <br />

                      <FaYoutube
                        size="30px"
                        style={{ color: "#F20200", marginRight: "15px" }}
                      />
                      <FaInstagram
                        size="30px"
                        style={{ color: "#C42D8F", marginRight: "15px" }}
                      />
                      <FaSpotify
                        size="30px"
                        style={{ color: "#1BCC5A", marginRight: "15px" }}
                      />
                      <FaTwitter
                        size="30px"
                        style={{ color: "#1B99E5", marginRight: "15px" }}
                      />
                      <FaTelegram
                        size="30px"
                        style={{ color: "#2394CC", marginRight: "15px" }}
                      />
                      <FaLinkedin
                        size="30px"
                        style={{ color: "#0C61B8", marginRight: "15px" }}
                      />
                      <FaGooglePlay
                        size="30px"
                        style={{ color: "white", marginRight: "15px" }}
                      />
                      <FaGlobe
                        size="30px"
                        style={{ color: "#5BCEF2", marginRight: "15px" }}
                      />
                      <span style={{ color: "white" }}>& more to come...</span>

                      {/* -----Modal for Captcha---------- */}
                      {modal_captcha}
                      {/* -----Modal for Captcha---END------- */}
                      {modal_generatelink}
                    </div>
                  </Col>
                  <Col xs={12} md={12} lg={6} className="d-none d-lg-block">
                    <img
                      className={classes.helmetanimate}
                      style={{
                        width: "350px",
                        right: "-24%",
                        bottom: "-12%",
                        position: "relative",
                      }}
                      src={helmetLogo}
                      alt="company Logo"
                    />
                  </Col>
                </Row>
              </Container>
            </div>
            <div className={classes.totalCount}>
              <Container>
                <div className={classes.separator}></div>
                <Row className="mt-3">
                  <Col xs={12} md={12} lg={7}>
                    <Row className="justify-content-center">
                      <Col xs={6} md={3} lg={3}>
                        <h3 className={classes.h3}>
                          200<span className="text-white-fade">+</span> thousand
                        </h3>
                        <p>Links</p>
                      </Col>
                      <Col xs={6} md={3} lg={3}>
                        <h3 className={classes.h3}>
                          100<span className="text-white-fade">+</span> thousand
                        </h3>
                        <p>Creators</p>
                      </Col>
                      <Col xs={6} md={3} lg={3} className={classes.xsNone}>
                        <h3 className={classes.h3}>
                          200<span className="text-white-fade">+</span> million
                        </h3>
                        <p>Clicks</p>
                      </Col>
                      <Col xs={6} md={3} lg={3} className={classes.xsNone}>
                        <h3 className={classes.h3}>
                          99.9<span className="text-white-fade">%</span>
                        </h3>
                        <p>Uptime</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={12} lg={5}></Col>
                </Row>
              </Container>
            </div>
            <div className={classes.displayFlex}>
              <img
                className={classes.bgImg}
                src={transparentBg}
                alt="bg transparent"
              />
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1680 40"
              className="position-absolute width-full z-1"
            >
              <path
                d="M0 40h1680V30S1340 0 840 0 0 30 0 30z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </div>
        <div></div>
        {/* --------Calling Login component just to get state value google obj.profile----------- */}
        {/* <div style={{border:'1px dotted black '}}/> */}
        {/* <div style={{ display: "none" }}></div> */}
      </>
    );
  }
}

export default HeroSection;
