/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
//comment
import React from 'react';
import Fade from 'react-reveal/Fade';

export default function Service({ data }) {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto pt-20 pb-28">
        <div className="flex flex-col items-center">
          <Fade bottom>
            <h1 className="text-5xl text-theme-blue text-center font-bold">Suggestions</h1>
          </Fade>

          <Fade bottom>
            <p className="font-light text-lg text-gray-400 text-center mb-12">
              We are ready to suggest you in different kinds of gifts in order to simply your choice.
            </p>
          </Fade>

          <div className="grid grid-rows-3 px-10 gap-8 sm:grid-cols-3 sm:grid-rows-1 sm:gap-6 xl:gap-16">
            {data.map((item, index) => (
              <Fade bottom delay={500 * index} key={index}>
                <div>
                  <div className="bg-white group rounded-2xl shadow-2xl border border-light-theme-yellow transform transition duration-500 hover:scale-105">
                    <img src={item.imageUrl} alt="Service" className="w-full rounded-t-2xl" />
                    <h2 className="text-theme-blue text-center text-xl py-7 rounded-b-2xl">{item.title}</h2>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}