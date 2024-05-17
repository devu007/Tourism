import React, { useState, useEffect } from 'react';
import Places from './Places';
import data from '../../Data/Data.json'

const Explore = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.destinations.length);
    }, 5000); // Change image every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredPlaces = selectedFilter ? Places[selectedFilter] : [];

  return (
    <section className="flex flex-col justify-center items-center h-screen mt-[500px] md:mt-8">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${data.destinations[currentIndex]?.image[0]})` }}
      >
      </div>
      <div className="max-w-screen-lg w-full">
        <h2 className="text-2xl text-center font-semibold mb-4 relative z-10">Explore</h2>
      </div>
      <div className="max-w-screen-lg w-full mb-4 relative z-10">
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
        >
          <option value="">Select Category</option>
          <option value="Historical">Historical</option>
          <option value="Thriller">Thriller</option>
          <option value="Calmer">Calmer</option>
        </select>
      </div>
      <div className="max-w-screen-lg w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPlaces.map((place, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <img
              src={place.img}
              alt={place.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{place.title}</h3>
            <p className="text-gray-600">{place.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;