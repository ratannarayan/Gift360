/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Fade from 'react-reveal/Fade';

import Button from './elements/Button';

import BuildWebsite from '.././assets/images/yellow_gift.png';

export default function Hero() {
  return (
    <section className="hero">
      <Fade bottom>
        <div className="w-full lg:w-1/2 xl:pl-12 sm:pr-2 mt-8">
          <h2 className="text-5xl sm:text-6xl text-black text-opacity-100 font-bold leading-tight mb-5">
            Gifts that Delight,
            {' '}
            <br />
            Moments that Last
          </h2>

          <p className="font-light text-xl text-gray-400 leading-relaxed mb-16">A thoughtful gift is a powerful way to show someone you care. It's not about the price tag, but the love and effort behind it. Choose a gift that resonates with their personality and brings a smile to their face, creating a cherished memory that lasts a lifetime.</p>

          <Button href="/project" type="link" className="flex w-71 h-18 items-center px-14 py-5 text-white text-xl bg-theme-yellow rounded-lg shadow-2xl hover:bg-dark-theme-yellow transition duration-200">
            See Our Work
            <svg className="ml-2 w-7 h-7 text-white animate-bounce-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </Fade>
      <div class="bouncy-castle">
        <div class="ball-shadow"></div>
        <div class="ball"></div>
      </div>
      <div class="bouncy-castle2">
        <div class="ball-shadow2"></div>
        <div class="ball2"></div>
      </div>
      <div class="bouncy-castle3">
        <div class="ball-shadow3"></div>
        <div class="ball3"></div>
      </div>
      <Fade bottom>
        <div className="flex pt-5 w-full justify-center items-center order-first md:w-full lg:order-last lg:w-1/2">
          <img className="" src={BuildWebsite} alt="Build Website" />
        </div>
      </Fade>
    </section>
  );
}
