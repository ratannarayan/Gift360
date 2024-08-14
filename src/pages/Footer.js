/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import BrandIcon from './BrandIcon';
import Button from './elements/Button';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-yellow-500 py-8">
      <div className="container mx-auto px-4">
        <div className="class_office flex flex-col md:flex-row justify-between">
          {/* Contact Information */}
          <div className="class_office mb-8 md:mb-0">
            <h1 className="text-2xl font-bold mb-4 text-gray-400 ">360Gift</h1>
            <p className="mb-2">Klaten, Central Java, Indonesia</p>
            <p className="mb-2">Email: anandmundhava1975@gmail.com</p>
            <p>Phone: +123 456 7890</p>
          </div>

          {/* Social Media Links */}
          <div className=" class_office mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-lg text-gray-400 font-light">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-yellow-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-yellow-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-yellow-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Additional Links */}
          <div className='class_office'>
            <h2 className="text-xl font-semibold mb-4 text-lg text-gray-400 font-light">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-300">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-300">Contact</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright Information */}
      <div className="mt-8 text-center">
        <p>©2024 360Gift. All rights reserved.</p>
      </div>
          <div className="flex-row">
            <p className="inline-block text-lg text-gray-400 font-light">
              Made with &#x2764; by&nbsp;
            </p>
            <a
              href="https://santcorporation.com" 
              type="link" 
              target="_blank" 
              className="text-lg text-gray-400 font-light" 
              isExternal
            >
              Santsai Corporation Ltd. Pvt.
            </a>
          </div>
    </footer>
  );
};

export default Footer;