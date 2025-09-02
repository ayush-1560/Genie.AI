import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        {/* Logo + Brand Name */}
        <div
          className="md:max-w-96 flex flex-col cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-2">
            <img className="h-9" src={assets.favicon} alt="logo" />
            <span className="font-bold text-lg sm:text-xl tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Genie.AI
            </span>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Experience the power of AI with Genie.AI. <br />
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        {/* Company Links & Newsletter */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
            <div className="text-sm space-y-2">
              <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-primary cursor-pointer w-24 h-9 text-white rounded">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-500">
        Copyright 2025 © Genie.AI. All Rights Reserved.
      </p>
    </footer>
  );
}
