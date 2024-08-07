/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Header from './Header';
import HeroPortfolio from './HeroPortfolio';
import Discuss from './Discuss';
import Footer from './Footer';
import AllPortfolio from './AllPortfolio';

import Data from '.././json/landingPage.json';

export default class ProjectPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        <HeroPortfolio {...this.props} />
        <AllPortfolio data={Data.portfolio} />
        <Discuss {...this.props} />
        <Footer />
      </>
    );
  }
}
