// frontend/src/components/contact/ContactForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { server } from "../../server";
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}/contact`, formData); // Ensure this matches your backend route
      toast.success('Message sent successfully'); 
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('There was an error sending the message!');
      console.error('There was an error sending the message!', error);
    }
  };

  return (
    <div className="w-1/2 p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-fyporange hover:bg-fypgreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"><FaPaperPlane /> Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
