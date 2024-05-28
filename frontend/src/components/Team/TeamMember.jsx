import React from 'react';
import PropTypes from 'prop-types';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const TeamMember = ({ name, position, image, social }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6 mb-5">
      <img className="w-32 h-32 rounded-full object-cover" src={image} alt={name} />
      <h3 className="text-fyporange text-2xl font-bold mt-4">{name}</h3>
      <h4 className="text-fypgreen text-xl">{position}</h4>
      <div className="mt-4 flex space-x-4">
        {social.map((network, index) => (
          <a
            key={index}
            href={network.url}
            className="text-fypgreen flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-fypgreen hover:text-white transition duration-300"
          >
            {network.name === 'LinkedIn' && <FaLinkedin />}
            {network.name === 'Twitter' && <FaTwitter />}
          </a>
        ))}
      </div>
    </div>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default TeamMember;
