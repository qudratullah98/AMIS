import React, { useState } from 'react';
import BASE_URL from '@/BaseUrl';
import { X } from 'lucide-react'; // You can use any icon or emoji as well

const ImageWithFallback = ({ src, alt,  size = 'small' }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sizeClasses = {
    small: "w-12",
    medium: "w-32",
    large: "w-48",
  };

  const imageSizeClass = sizeClasses[size] || sizeClasses.small;

  return (
    <>
      <img
  src={BASE_URL + imageSrc}
  alt={alt}
  onClick={handleImageClick}
  className={`
    w-28 
    h-28 
    object-cover 
    rounded-2xl 
    shadow-xl 
    cursor-pointer 
    transition-transform 
    duration-500 
    ease-in-out 
    border-4 
    border-gradient-to-r 
    from-purple-400 
    via-pink-500 
    to-yellow-400
    hover:scale-110  
    hover:shadow-2xl 
    hover:brightness-105
  `}
/>



{isModalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
    onClick={handleCloseModal}
  >
    {/* Image Preview Container */}
    <div
      className="relative rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
      onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
    >
      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
      >
        <X size={20} />
      </button>

      {/* Image */}
      <img
        src={BASE_URL + imageSrc}
        alt={alt}
        className="max-w-[80vw] max-h-[80vh] object-contain rounded-2xl"
      />
    </div>
  </div>
)}

    </>
  );
};

export default ImageWithFallback;
