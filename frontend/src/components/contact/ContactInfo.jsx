import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="w-1/2 p-4">
      <h2 className="text-2xl mb-4 text-fyporange font-Poppins">Address</h2>
      <p><FaMapMarkerAlt className="text-fypgreen" /> 123 Main Street, City, Country</p>
      <h2 className="text-2xl mb-4 mt-6 text-fyporange font-Poppins">Email</h2>
      <p><FaEnvelope className="text-fypgreen" /> contact@yourdomain.com</p>
      <h2 className="text-2xl mb-4 mt-6 text-fyporange font-Poppins">Phone</h2>
      <p><FaPhone className="text-fypgreen" /> +123 456 7890</p>
    </div>
  );
};

export default ContactInfo;
