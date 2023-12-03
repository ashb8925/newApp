import React from "react";
import classes from "../components/Styles.module.css";
import HeroSection from "../components/HeroSection";
import PageContent from "../components/PageContent";
import Footer from "../components/Footer";
import { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className={classes.mainContainer}>
          <HeroSection />
          <PageContent></PageContent>
          <Footer />
        </div>
      </>
    );
  }
}

export default Home;
