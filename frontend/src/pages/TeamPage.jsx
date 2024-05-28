import React from 'react';
import TeamMember from '../components/Team/TeamMember';
import Header from '../components/Layout/Header';
import Footer from "../components/Layout/Footer";



const teamMembers = [
  {
    name: "Muhammad Abubakar Siddique",
    position: "Developer",
    image: "https://i.ibb.co/Nx5HHCT/atdoorz-fav.png",
    social: [
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "Twitter", url: "https://twitter.com" },
    ],
  },
  {
    name: "Naila Shafique",
    position: "Documentation",
    image: "https://i.ibb.co/Nx5HHCT/atdoorz-fav.png",
    social: [
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "Twitter", url: "https://twitter.com" },
    ],
  },
  {
    name: "Saud Ahmad",
    position: "Graphic Designer",
    image: "https://i.ibb.co/Nx5HHCT/atdoorz-fav.png",
    social: [
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "Twitter", url: "https://twitter.com" },
    ],
  },
];

const Team = () => {
  return (
    <>
    <Header activeHeading={6} />
    <div className="container mx-auto p-4">
      <section className="flex flex-col md:flex-row gap-8">
        <h1 className="text-3xl uppercase font-bold">Team Members</h1>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </section>
      
    </div>
    <Footer />
    </>
  );
};

export default Team;
