import React, { useState } from 'react';

export default function Model() {
  const [model, setModel] = useState({
    backgroundImage: 'https://v5.airtableusercontent.com/v1/19/19/1692396000000/HqevsW4WnN6-EWUqG4Zi9Q/WdKGg_FfmaupujAvi2otEAqF6m1Rjy_Bv6x8Coo6l5NNVYp_vq9iT-TGXtMtlE-qqzKDdkFHmHGLQ9mDiw5r1UleY_YycMasY7KidjqMZx2N2qU32q5XtcbPnuHBVL6l/X9_fZDd7x6dqFLE6m9LeSAg5gkIIg583PgIr_pLfQW0',
    profileImage: 'https://v5.airtableusercontent.com/v1/19/19/1692396000000/G1VgNXAyblzf6wWtsAGRVw/8Tc71ISz8ipxgRWgILpAFropNMZPMlXyvJFFxNZIhepdflV-AhZ-x4wMaaMQSwZeAVlU_P9VXC9ZJAYwpFEEOiRVpkcq7MPtRsZ0B6Z6L5lvR0SjtXWm8XxvVmTi0Qq_/Sc64sqHHhimLNc0a0Atd8nBtsIeGdRlgMOGMqBGb-GQ',
    name: 'MissJaneDoe',
    age: 25,
    price: '$2.00/min',
    country: 'Romania',
    country_emoji: '🇷🇴',
    skypeLink: 'skype:jane_doe',
    ljLink: 'http://example.com/lj',
    csLink: 'http://example.com/cs',
    tags: ['CEI', 'JOI', 'Humilliation'],
    bio: 'This is a short bio about the model...',
  });

  return (
    <div className="m-0 p-0">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${model.backgroundImage})` }}>
        
        {/* Profile Picture and Information */}
        <div className="absolute inset-0 bottom-0 left-0 right-0 text-center p-10 flex flex-col justify-center items-center">
          <img src={model.profileImage} alt={`${model.name}'s Profile`} className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full mx-auto mb-8" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{model.name}</h1>
          <p className="text-xl md:text-lg text-white mb-5">{model.country_emoji} {model.country} | {model.age}</p>

          {/* Skype Button */}
          <a href={model.skypeLink} className="mb-6 inline-block mx-2 px-8 py-3 text-lg text-white bg-blue-600 rounded-full">{model.price} | Skype Profile</a>

          {/* Other Cams Section */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl text-white mb-4">Live Cams</h3>
            <a href={model.ljLink} className="inline-block mx-2 px-5 py-2 text-white bg-red-500 rounded-full">LiveJasmin</a>
            <a href={model.csLink} className="inline-block mx-2 px-5 py-2 text-white bg-pink-500 rounded-full">CamSoda</a>
          </div>
        </div>
      </div>

      {/* White Background Section */}
      <div className="bg-white mt-10 p-10 max-w-3xl mx-auto rounded-lg">
        {/* Country, Emoji, Age, Tags and Bio */}
        <div className="mb-5">
          {/* Tags */}
          <div className="flex flex-wrap justify-center mb-5">
            {model.tags.map((tag, index) => (
              <span key={index} className="m-2 px-4 py-1 bg-gray-200 rounded-full">{tag}</span>
            ))}
          </div>
          
          {/* Bio */}
          <h2 className="text-2xl font-semibold mb-4">Bio</h2>
          <p>{model.bio}</p>
        </div>
      </div>
    </div>
  );
}
