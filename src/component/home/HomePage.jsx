// import React from 'react';

// function HomePage() {
//   return (
//     <div className='home'>

//         <section>
//             <header className='header-banner'>
//                 <img src="/assets/image/HomePage2.png" alt="HomePage" className='header-image' />
//                 <div className='overlay'></div>
//                 <div className='animated-texts overlay-content'>
//                     <h1>Welcome to <span className='crown-color'>Crown Hotel</span></h1><br />
//                     <h3>Step into a haven of comfort and care</h3>
//                 </div>
//             </header>
//         </section>
// {/* Search find available room section */}
//         <h4><a className='view-room-home' href="/rooms">All Rooms</a></h4>

//         <h2 className='home-service'>Service at <span className='crown-color'>Crown Hotel</span></h2>
      
      
//       {/* service Section */}
   
//     <section className='service-section'>
//         <div className='service-card'>
//             <img src="/assets/image/AirConditioner.avif" alt="Air Conditioner" />
//             <div className='service-details'>
//                 <h3 className='service-title'>Air Conditioning</h3>
//                 <p className='service-description'>Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning</p>

//             </div>
//         </div>

//         <div className='service-card'>
//             <img src="/assets/image/MinBar.webp" alt="Air Conditioner" />
//             <div className='service-details'>
//                 <h3 className='service-title'>Mini Bar</h3>
//                 <p className='service-description'>Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost </p>

//             </div>
//         </div>

//         <div className='service-card'>
//             <img src="/assets/image/parking.jpg" alt="Air Conditioner" />
//             <div className='service-details'>
//                 <h3 className='service-title'>Parking</h3>
//                 <p className='service-description'>We offer on-site parking for your convenience.Please inquire about valet parking options if available</p>

//             </div>
//         </div>

//         <div className='service-card'>
//             <img src="/assets/image/wifi.webp" alt="Air Conditioner" />
//             <div className='service-details'>
//                 <h3 className='service-title'>Air Conditioning</h3>
//                 <p className='service-description'>Stay connected throughtout your stay with complimentary high-speed Wi-fi access available in all guest rooms and public areas</p>

//             </div>
//         </div>

//     </section>
   
   
   
   
   
   
   
   
//     </div>
//   );
// }

// export default HomePage;


import React, { useState } from "react";
import RoomSearch from "../common/RoomSearch";
import RoomResult from "../common/RoomResults";

function HomePage() {

    const [roomSearchResults,setRoomSearchResults] = useState([]);

    const haddleSearchResult = (results) => {
        setRoomSearchResults(results);
    }
  return (
    <div className="home font-sans bg-white text-gray-800">
      {/* Header Section */}
      <section>
        <header className="relative w-full h-[90vh] flex items-center justify-center">
          <img
            src="/assets/image/HomePage2.png"
            alt="HomePage"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="relative text-center text-white z-10">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to{" "}
              <span className="text-yellow-400">CROWN Hotel</span>
            </h1>
            <h3 className="text-lg md:text-2xl mt-4 font-light">
              Step into a haven of comfort and care
            </h3>
          </div>
        </header>
      </section>

      {/* Link to Rooms */}
      <RoomSearch haddleSearchResult={haddleSearchResult}/>
      <RoomResult roomSearchResults ={roomSearchResults}/>
      <div className="text-center my-8">
        <a
          href="/rooms"
          className="text-orange-600 font-semibold text-lg hover:underline hover:text-orange-700 transition"
        >
          All Rooms
        </a>
      </div>

      {/* Services Header */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
        Services at{" "}
        <span className="text-yellow-500 font-bold">Crown Hotel</span>
      </h2>

      {/* Services Section */}
      <section className="grid gap-8 px-6 sm:px-10 md:px-16 lg:px-24 grid-cols-1 md:grid-cols-2">
        {/* Service Card 1 */}
        <div className="flex items-center bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img
            src="/assets/image/AirConditioner.avif"
            alt="Air Conditioning"
            className="w-32 h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-yellow-600">
              Air Conditioning
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.
            </p>
          </div>
        </div>

        {/* Service Card 2 */}
        <div className="flex items-center bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img
            src="/assets/image/MinBar.jpg"
            alt="Mini Bar"
            className="w-32 h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-yellow-600">
              Mini Bar
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.
            </p>
          </div>
        </div>

        {/* Service Card 3 */}
        <div className="flex items-center bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img
            src="/assets/image/parking.jpg"
            alt="Parking"
            className="w-32 h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-yellow-600">
              Parking
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              We offer on-site parking for your convenience. Please inquire about valet parking options if available.
            </p>
          </div>
        </div>

        {/* Service Card 4 */}
        <div className="flex items-center bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img
            src="/assets/image/wifi.avif"
            alt="Wi-Fi"
            className="w-28 h-28 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-yellow-600">
              Wi-Fi
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Stay connected throughout your stay with complimentary high-speed Wi-Fi available in all guest rooms and public areas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

