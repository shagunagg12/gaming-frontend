import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Example data for the games
const games = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: 'path/to/game1.jpg',
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: 'path/to/game2.jpg',
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: 'path/to/game3.jpg',
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img: 'path/to/game1.jpg',
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: 'path/to/game2.jpg',
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: 'path/to/game3.jpg',
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: 'path/to/game1.jpg',
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: 'path/to/game2.jpg',
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img: 'path/to/game3.jpg',
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: 'path/to/game4.jpg',
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: 'path/to/game1.jpg',
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: 'path/to/game2.jpg',
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img: 'path/to/game3.jpg',
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: 'path/to/game1.jpg',
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img: 'path/to/game2.jpg',
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img: 'path/to/game3.jpg',
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: 'path/to/game1.jpg',
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: 'path/to/game2.jpg',
  },
  {
    title: 'Game 19',
    description: 'Description for Game 3',
    img: 'path/to/game3.jpg',
  },
  {
    title: 'Game 20',
    description: 'Description for Game 4',
    img: 'path/to/game4.jpg',
  },
];

export default function GameCardSlider() {



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>   
    <div className='text-lg font-bold p-4'>Lobby</div>
      <Slider {...settings}>
 
        {games.map((game, index) => (
          <div key={index} className="p-2">
            
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-300 hover:-translate-y-3 ">
              <img
                src={game.img}
                alt={game.title}
                className="rounded-t-lg w-full h-32 object-cover"
              />
              <div className="mt-2 text-white">
                <h3 className="text-lg font-bold">{game.title}</h3>
                <p className="text-sm">{game.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}