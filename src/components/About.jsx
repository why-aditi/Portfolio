import React from 'react';
import AboutImg from "../assets/AboutImg.jpg";
import { ABOUT_TEXT } from '../constants';

export default function About() {
  return (
    <div className='border-b border-neutral-900'>
      <h2 className='my-16 text-center text-4xl'>About Me</h2>
      <div className="flex flex-wrap mb-8">
        <div className="w-full lg:w-1/2 lg:p-4">
          <div className="flex items-center justify-center">
            <img 
              src={AboutImg} 
              alt="About Me" 
              className="rounded-lg shadow-lg w-3/5 h-auto object-cover md:my-2 sm:my-2"
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <div className="flex justify-center lg:justify-start">
            <p className='text-justify my-2 max-w-xl' dangerouslySetInnerHTML={{ __html: ABOUT_TEXT }} />
          </div>
        </div>
      </div>
    </div>
  );
}