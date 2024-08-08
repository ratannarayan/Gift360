/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Splide, SplideSlide } from '@splidejs/react-splide';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default function Testimonial({ data }) {
  return (
    <div className="flex flex-col items-center">
      <Fade bottom>
        <section className="container mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl text-theme-red text-center font-bold">Testimonials</h1>
            <p className="font-light text-lg text-gray-400 text-center mb-3 sm:mb-3 xl:mb-4">
              What they said about us.
            </p>
          <Splide
            options={{
              type: 'loop',
              autoplay: true,
            }}
          >
            {data.map((item) => (
              <SplideSlide key={item.name}>
                <div className="flex flex-col xl:w-4/5 rounded-2xl shadow-xl sm:shadow-2xl border border-light-theme-red px-8 py-6 mx-2 mb-6 mt-6 xl:mx-auto sm:mx-6 sm:mb-12">
                  <div className="flex flex-col items-center mb-5">
                    <img src={item.imageUrl} alt="Testimoni" className="w-20 h-20 rounded-full mb-3" />
                    <h2 className="text-theme-red text-2xl">{item.name}</h2>
                    <p className="font-light text-gray-400">{item.company}</p>
                  </div>
                  <p className="font-light text-2xl text-gray-400 pl-5 pt-3 pb-1 text-center">
                    {item.testimoni}
                  </p>
                </div>
              </SplideSlide>
            ))}
          </Splide>
          </div>
        </section>
      </Fade>
    </div>
  );
}