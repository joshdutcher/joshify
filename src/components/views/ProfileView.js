import React from 'react';
import { User, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { projects, skills } from '../../data/projects';

const ProfileView = () => (
  <div className="text-white p-4 md:p-6">
    <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-8">
      <div className="w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
        <User className="w-24 h-24 md:w-32 md:h-32 text-white" />
      </div>
      <div className="text-center md:text-left">
        <p className="text-sm font-semibold uppercase">Profile</p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">Josh Dutcher</h1>
        <p className="text-gray-400 mb-2">Software Engineer</p>
        <p className="text-gray-400">25 years experience • Wichita, KS</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-xl md:text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
          Experienced software engineer with 25 years in backend development and infrastructure,
          including high-pressure data delivery for the 2024 election cycle. Skilled in Python, AWS,
          and Snowflake, with a track record of building resilient systems that solve real-world problems.
          Recently led the technical and operational launch of a boutique law firm, demonstrating the
          ability to deliver under resource constraints and wear multiple hats in fast-moving environments.
        </p>

        <h3 className="text-lg md:text-xl font-bold mb-3">Top Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-xs md:text-sm">
              {skill}
            </span>
          ))}
        </div>

        <h3 className="text-lg md:text-xl font-bold mb-3">Education</h3>
        <p className="text-gray-300 text-sm md:text-base">Bachelor of Science in Information Systems and Technology</p>
        <p className="text-gray-400 text-sm md:text-base">University of Kansas</p>
      </div>

      <div>
        <h3 className="text-lg md:text-xl font-bold mb-4">Contact</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm md:text-base break-all">josh.dutcher@joshdutcher.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm md:text-base">(316) 461-8835</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm md:text-base">Wichita, KS</span>
          </div>
          <div className="flex items-center space-x-3">
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            <a href="https://www.linkedin.com/in/joshdutcher/" className="text-green-500 hover:text-green-400 text-sm md:text-base">
              LinkedIn Profile
            </a>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold mb-4 mt-8">Stats</h3>
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-sm">Total Projects</p>
            <p className="text-white font-semibold text-sm md:text-base">{Object.values(projects).flat().length}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Years Active</p>
            <p className="text-white font-semibold text-sm md:text-base">25 years</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Top Technologies</p>
            <p className="text-white font-semibold text-sm md:text-base">Python, AWS, Go</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileView;