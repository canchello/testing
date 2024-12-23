"use client";
import React, { useState } from "react";
import RoomData from "./RoomData";

type Room = {
  _id: string; // Unique identifier for the room
  name: string;
  price: number;
  facility?: { icon: string; title: string }[]; // Facility list, optional
  numberOfBad?: number; // Optional property for bed count
  numberOfBathrooms?: number; // Optional property for bathroom count
};

type RoomDetailsProps = {
  rooms: Room[];
};

export default function RoomDetails({ rooms = [] }: RoomDetailsProps) {

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Select Your Room</h1>
      {rooms.map((item, index) => (
        <RoomData
          room={item}
          key={item._id || index}
        />
      ))}
    </div>
  );
}
