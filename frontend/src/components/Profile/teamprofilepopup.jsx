import React from 'react';
import PropTypes from 'prop-types';

const ProfilePopup = ({ name, position, onClose }) => {
  return (
    <div className="profile-popup">
      <div className="profile-popup-content">
        <h2>{name}</h2>
        <p>{position}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

ProfilePopup.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfilePopup;
