"use client";

import React from "react";


const OverallRating = () => {
    const ratingCategories = [
        { name: "Facilities", score: 4.4 },
        { name: "Cleanliness", score: 4.7 },
        { name: "Services", score: 4.6 },
        { name: "Comfort", score: 4.8 },
        { name: "Location", score: 4.5 },
    ];

    return (
        <div className=" bg-white space-y-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Overall Rating</h2>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                        />
                    </svg>
                </button>
            </div>

            {/* Rating Section */}
            <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center bg-[#FFEFE6] rounded-md p-4 w-20 h-20">
                    <h1 className="text-2xl font-bold text-gray-800">4.6</h1>
                    <p className="text-sm text-gray-600">/5</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-800">Impressive</p>
                    <p className="text-sm text-gray-500">from 2546 reviews</p>
                </div>
            </div>

            {/* Rating Categories */}
            <div className="space-y-2">
                {ratingCategories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">{category.name}</p>
                        <div className="flex items-center w-2/3 space-x-2">
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-orange-500 rounded-full"
                                    style={{ width: `${(category.score / 5) * 100}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600">{category.score}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverallRating;
