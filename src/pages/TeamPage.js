/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Header from './Header';
import HeroTeam from './HeroTeam';
import AllTeam from './AllTeam';
import Footer from './Footer';

import Data from '.././json/landingPage.json';

export default class TeamPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        <HeroTeam {...this.props} />
        <AllTeam data={Data.team} />
        <Footer />
      </>
    );
  }
}
