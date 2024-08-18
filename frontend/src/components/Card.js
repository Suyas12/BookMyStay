import React from 'react';

function Card({ title, description, imgSrc }) {
  return (
    <div className="bg-gray-800 border border-gray-500 rounded-lg bg-opacity-70   p-4">
      {imgSrc && (
        <div className="relative w-full h-32">
          <img
            src={imgSrc}
            alt={title}
            className="absolute inset-0 h-full object-cover rounded-t-lg"
          />
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="mt-2 text-gray-400">{description}</div>
      </div>
    </div>
  );
}

export default Card;
