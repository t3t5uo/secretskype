import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form handling logic here, like sending the data to an API
    console.log("Form submitted");
  };

  return (
    <div className="">
      <div className="bg-white text-blue-600 p-4 flex justify-between items-center border-b border-gray-200">
        <span className="w-1/4"></span>

        <Link href="/">
          <div className="text-lg font-semibold w-1/2 text-center no-underline">
            SecretSkype
          </div>
        </Link>

        <button
          onClick={toggleMenu}
          className="w-1/4 flex justify-end items-center px-3 py-2 text-gray-600"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="mt-16 px-6">
        <Link href="/">
            <div className="block mb-4 p-2 text-lg text-blue-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600">
              Search
            </div>
          </Link>
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Keyword" className="p-2 border rounded w-full" />

            <div className="flex justify-between">
              <input type="number" placeholder="Min Age" className="p-2 border rounded w-1/2 mr-2" />
              <input type="number" placeholder="Max Age" className="p-2 border rounded w-1/2 ml-2" />
            </div>
            
            <div className="flex justify-between">
              <input type="number" placeholder="Min Price" className="p-2 border rounded w-1/2 mr-2" />
              <input type="number" placeholder="Max Price" className="p-2 border rounded w-1/2 ml-2" />
            </div>

            <select className="p-2 border rounded w-full">
              <option value="" disabled selected>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <select className="p-2 border rounded w-full">
              <option value="" disabled selected>Location</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
            </select>

            <button type="submit" className="p-2 w-full bg-blue-500 text-white rounded">
              Submit
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
}
