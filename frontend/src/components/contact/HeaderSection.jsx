import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const HeaderSection = () => {
  return (
    <div className="bg-cover bg-center w-full h-64" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
      <h1 className="text-4xl text-white text-center pt-24 font-Poppins">Contact Us</h1>
      <div className="flex justify-center mt-4">
        <a href="https://facebook.com" className="mx-2 text-white text-2xl"><FaFacebook /></a>
        <a href="https://twitter.com" className="mx-2 text-white text-2xl"><FaTwitter /></a>
        <a href="https://linkedin.com" className="mx-2 text-white text-2xl"><FaLinkedin /></a>
      </div>
    </div>
  );
};

export default HeaderSection;
