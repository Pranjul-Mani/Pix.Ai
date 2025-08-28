// import React from 'react'
// import { assets} from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='flex justify-between items-center gap-4 py-3 mt-20'>
//       <img src={assets.logo} alt="" width={150} />
//      <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden '>Copyright @imagify.com | All right reserved.</p>

//      <div className='flex gap-2.5'>
//         <img src={assets.facebook_icon} alt="" width={35} />
//         <img src={assets.twitter_icon} alt="" width={35} />
//         <img src={assets.instagram_icon} alt="" width={35} />
//      </div>
//     </div>
//   )
// }

// export default Footer


import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-black-300 mt-20 px-6 py-8 text-sm text-gray-600">
      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* Logo and Description */}
        <div className="flex flex-col items-start gap-3">
          <img src={assets.logo} alt="logo" width={150} />
          <p className="max-w-xs">
            Imagify is your AI-powered creativity partner. Generate, design, and imagine – all in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800">Quick Links</h3>
          <a href="/about" className="hover:text-black">About Us</a>
          <a href="/contact" className="hover:text-black">Contact</a>
          <a href="/terms" className="hover:text-black">Terms of Service</a>
          <a href="/privacy" className="hover:text-black">Privacy Policy</a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800">Contact</h3>
          <p>Email: support@imagify.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123 AI Street, New Delhi, India</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800">Follow Us</h3>
          <div className="flex gap-3 mt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" width={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" width={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram_icon} alt="Instagram" width={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider and Bottom Note */}
      <hr className="my-6 border-gray-300" />
      <p className="text-center text-xs">&copy; 2025 imagify.com | All rights reserved.</p>
    </footer>
  );
};

export default Footer;
