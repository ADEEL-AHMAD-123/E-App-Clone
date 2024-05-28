import React from 'react';
import Header from '../components/Layout/Header';
import HeaderSection from '../components/contact/HeaderSection';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import Footer from '../components/Layout/Footer';

const ContactUs = () => {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center bg-gray-100 p-8">
        
      <div className="w-full flex flex-col items-center py-8"></div>
      <HeaderSection />
      <div className="flex w-full mt-8">
        <ContactInfo />
        <ContactForm />
      </div>

    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
