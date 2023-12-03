import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import { getURLandredirect } from "../helper/api";
import "../css/splash.css";
import logo from "../assets/logo.png";
import new_logo from "../assets/Omni-logo.png";
import deetmelogo from "../assets/deet-me-logo.png";
import DeetLogo from "../assets/deet-logo.png";
import AdUI from "../assets/ui.png";
import deetbg from "../assets/deet.png";
import appopener_text from "../assets/ac.png";
import GoogleAd from "../components/GoogleAd";
import O from "../assets/O.png";
import P from "../assets/P.png";
import SaveUserCredentials from "../components/SaveUserCredentials";
//import splash_adv from "../assets/splash/splash_adv.png";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { intentvalue: "", original_url: "", ostype: "" };
  }

  componentDidMount() {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    getURLandredirect(apptag, shortstring).then((res) => {
      this.setState({ intentvalue: res.data.app_intend });
      this.setState({ original_url: res.data.originalURL });
      this.setState({ ostype: res.data.os_type });
      let app_intend = this.state.intentvalue;
      let originalURL = this.state.original_url;

      const click_link = document.getElementById("abcd");
      console.log(app_intend);
      if (app_intend === "Desktop" || app_intend === "Mobile") {
        app_intend = originalURL;
      }
      if (this.state.ostype == "windows") {
        click_link.setAttribute("href", app_intend);
        click_link.click();
        //console.log("hello")
      } else {
        click_link.setAttribute("href", app_intend);
        window.location.assign(app_intend);
      }
    });
  }

  render() {
    return (
      // <div className={classes.mainContainer}>

      //     {/* <h1>Splash page - {this.props.match.params.apptype}</h1>
      //     <a href={this.state.intentvalue}>{this.state.intentvalue}</a> */}

      //     <div className = 'heading'>
      //         <a href="https://midas.appopener.com/">
      //             <img src={new_logo} style={{"width": "210px"}} alt="AppOpener" />
      //         </a>
      //     </div>
      //     <div className= 'heading'>
      //         <h1 style={{color:"#fd5331", "margin-top": "1px"}}>Name is verse, Omniverse!</h1>
      //     </div>
      //     <div className='heading'>
      //         <p className="title-text" style={{fontFamily:"monospace",fontSize:"17px", "margin-top": ".05px"}}>Building towards Web 3.0</p>
      //     </div>

      //     <center style={{"margin-top": "22px"}}>
      //     <a id="abcd" target="_blank" style={{"text-decoration": "none", "font-size": "30px", "font-family": "monospace","backgroundColor":"#ffc107","padding":"10px 20px 10px 20px"}}>Continue</a>
      //     </center>
      //     <center style={{"margin-top": "33px"}}>
      //         {/* <a href="https://www.appopener.com/open">
      //             <img class="rotate" id="sticker" src={appopener_text} alt="AppOpener" />
      //             </a> */}

      //         <p style={{fontFamily:"monospace",fontSize:"16px"}}>"Genie, You are free!"<br/>Date: 27.12.2022<br/>Time: 12:29:29 - 0:00:00<br/>Speed: 90000 sec/day</p>
      //         <br/>

      //         <p style={{fontFamily:"monospace",fontSize:"15px"}}>Click below for more!</p>
      //         <a href="https://deet.me/dheet">
      //             <img src={deetmelogo} style={{"width": "180px"}} alt="AppOpener" />
      //         </a>
      //         <br/>
      //         <h1 style={{color:"#fd5331"}}>deet.me for ढीट</h1>

      //     </center>

      //     {/* <center>
      //         <p class="text" style={{"margin-top": "50px"}}>Boosting Your Link ....</p>
      //         </center> */}

      //     {/* <div className="poster_container">
      //         <center>
      //         <a href="https://yellowdiary.appopener.com/" target="_blank">
      //                 <img class="splash_poster img-responsive" src={splash_adv} alt="AppOpener" />
      //             </a>
      //             </center>
      //         </div> */}

      //     {/* <center>
      //         <p class="footer">
      //             <br /><br/>
      //             <p style={{"float":"left","marginLeft":"10px",fontFamily:"monospace",fontSize:"15px"}}>Click here -></p>
      //         </p>
      //     </center> */}

      // </div>

      // </>
      <div className={classes.mainContainer}>
        <div className="App">
          <GoogleAd slot="6552881547" googleAdId="ca-pub-5645705217995911" />

          <div className="container-1">
            {/* <img src={DeetLogo} alt="deet" />
            <span>{`deet.me`}</span>
            <a href="https://www.deet.me" target="_blank">
                {`Claim your free deetname now! ➟`}
            </a>
            <br/> */}
            <a id="abcd" target="_blank">
              <button>{`Continue to the Link`}</button>
            </a>
          </div>
          <h4 style={{ padding: "50px", fontSize: "3rem", lineHeight: 1 }}>
            OR
          </h4>
          <div className="container-1">
            <a
              href="https://dmonecloud.com/book-a-demo/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={O} style={{ width: "180px" }} alt="AppOpener" />
            </a>
            <a
              href="https://www.producthunt.com/posts/appyhigh-prime"
              target="_blank"
              rel="noreferrer"
            >
              <img src={P} style={{ width: "180px" }} alt="AppOpener" />
            </a>
          </div>
          <div className="container-1">
            <p
              style={{ padding: "1px", fontSize: "3rem", lineHeight: 1 }}
            >{`Choose`}</p>
          </div>

          {/* <SaveUserCredentials /> */}

          <GoogleAd slot="4955640795" googleAdId="ca-pub-5645705217995911" />

          <div className="container-2">
            {/* <a
                href="https://www.instagram.com/er.dheet/"
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <img
                src={deetpng}
                alt="Win an iPhone14 Pro in just ₹150"
                style={{ width: "100%", height: "100%" }}
                />
            </a> */}
            <div>
              {/* <iframe width="360" height="270" src="https://www.youtube-nocookie.com/embed/zm6xa3ggt5A?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="363" height="271" src="https://www.youtube.com/embed/zm6xa3ggt5A?autoplay=1" title="BB Ki Vines Productions- Taaza Khabar | Hotstar Specials | Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="360" height="270" src="https://www.youtube.com/embed/zm6xa3ggt5A?controls=0&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="420" height="315" src="https://www.youtube.com/embed/1k3HXPRDvCo?autoplay=1&mute=1"></iframe> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
