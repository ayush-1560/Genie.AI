import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const brandLogos = [
    'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png'
  ];

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full
      justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat
      min-h-screen'>

      {/* Inject keyframes directly */}
      <style>
        {`
          @keyframes scroll-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Heading */}
      <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
          Create Amazing content <br /> with <span className='text-primary'>AI tools</span>
        </h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto 
          max-sm:text-xs text-gray-600'>
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button
          onClick={() => navigate('/ai')}
          className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>
          Start Creating now
        </button>
      </div>

      {/* Trusted by */}
      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
        <img src={assets.user_group} alt="" className='h-8' />
        Trusted by 10k+ people
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden mt-12">
        <div
          className="flex gap-16 w-max"
          style={{
            animation: 'scroll-marquee 25s linear infinite'
          }}
        >
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="brand"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
