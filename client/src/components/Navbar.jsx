import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 sm:px-20 xl:px-32">
      {/* Logo + Project Name */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          src={assets.favicon} // favicon.svg used as symbol
          alt="Genie AI logo"
          className="w-8 sm:w-10"
        />
        <span className="font-bold text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Genie.AI
        </span>
      </div>

      {/* Right side (Auth buttons) */}
      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        >
          Get started <ArrowRight />
        </button>
      )}
    </div>
  );
};

export default Navbar;
