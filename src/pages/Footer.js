/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import BrandIcon from './BrandIcon';
import Button from './elements/Button';

export default function Footer() {
  return (
    <div className="bg-black border-t border-black-200 pb-6">
      <div className="container flex-col mx-auto">
        <div className="flex flex-col sm:flex-row mt-8 justify-center">
          <div className="w-1/3 flex-col ml-16 mr-8">
            <BrandIcon />
            <p className="w-full text-lg text-gray-400 font-light">
              Growing Your Business
              {' '}
              <br />
              Is Our Calling
            </p>
          </div>
          <div className="class_office w-1/3 mt-0 ml-16 mr-0 sm:ml-0 sm:mr-5">
            <h1 className="text-lg text-theme-red pt-4 pb-2">Office</h1>
            <p className="text-md text-gray-400 font-light">anandmundhava1975@gmail.com</p>
            <p className="text-md text-gray-400 font-light">Klaten, Central Java, Indonesia</p>
          </div>
          <div className="class_social w-1/3 ml-16 sm:ml-0 mt-0">
            <h1 className="text-lg text-theme-red pt-4 pb-2">Social</h1>
            <Button 
              href="https://www.instagram.com/racmathafidz/" 
              type="link" 
              target="_blank" 
              className="flex text-lg text-gray-400 font-light hover:underline" 
              isExternal
            >
              Instagram
            </Button>
            <Button 
              href="https://www.linkedin.com/in/racmat-hafidz-89982a156/" 
              type="link" 
              target="_blank" 
              className="flex text-lg text-gray-400 font-light hover:underline" 
              isExternal
            >
              LinkedIn
            </Button>
            <Button 
              href="https://github.com/racmathafidz" 
              type="link" 
              target="_blank" 
              className="flex text-lg text-gray-400 font-light hover:underline" 
              isExternal
            >
              Github
            </Button>
          </div>
        </div>
        <div className="flex-col text-center mt-7">
          <p className="text-lg text-gray-400 font-light">
            Copyright 2024 - All rights reserved - 360 Gifts
          </p>
          <div className="flex-row">
            <p className="inline-block text-lg text-gray-400 font-light">
              Made with &#x2764; by&nbsp;
            </p>
            <Button 
              href="https://santcorporation.com/" 
              type="link" 
              target="_blank" 
              className="text-lg text-theme-red font-light" 
              isExternal
            >
              Santsai Corporation Ltd. Pvt.
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
