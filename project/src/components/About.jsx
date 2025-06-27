import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-green-50 to-white p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full border border-green-100">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">About GH Burger</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Welcome to <span className="font-semibold text-green-800">GH Burger</span>!<br/>
          We are passionate about serving the freshest burgers, crispy fries, and refreshing drinks in a cozy, family-friendly atmosphere. Our menu is crafted with quality ingredients and a love for great food.
        </p>
        <p className="text-md text-gray-600 text-center">
          Whether you're craving a classic burger, loaded fries, or just a place to relax with friends, GH Burger is your go-to spot. Thank you for choosing us and being part of our story!
        </p>
      </div>
      <div className="mt-8">
        <div className="bg-green-100 border border-green-200 rounded-lg px-6 py-3 shadow text-center text-green-800 text-sm font-medium">
          Created by <span className="font-bold">Moamen Alghareeb</span><br/>
          <span className="text-green-700">Powered by ITI</span>
        </div>
      </div>
    </div>
  );
}
