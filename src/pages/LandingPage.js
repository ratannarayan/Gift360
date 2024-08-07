/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Header from './Header';
import Hero from './Hero';
import Service from './Service';
import Portfolio from './Portfolio';
import Advantage from './Advantage';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';

import Data from '.././json/landingPage.json';

export default class LandingPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        <Hero {...this.props} />
        <Service data={Data.service} />
        <Portfolio data={Data.portfolio} />
        <Advantage data={Data.advantage} />
        <Testimonial data={Data.testimonial} />
        <Discuss />
        <Footer />
      </>
    );
  }
}
