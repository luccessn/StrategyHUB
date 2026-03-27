import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";

export const UserDrawer = () => {
  const [openDraw, setopenDraw] = useState(false);
  return (
    <div>
      <button
        className="cursor-target p-2"
        onClick={() => setopenDraw((prev) => !prev)}
      >
        <FaRegUser className="text-white text-xl font-bold " />
      </button>
      {openDraw && (
        <div className="flex flex-col float-left absolute bg-red-400 p-4 pl-6 pr-6 left-4 top-12  gap-4">
          <h1>My Profile</h1>
          <div className="flex flex-col gap-2">
            <button className="hover:bg-red-500 p-2 rounded">Profile</button>
            <button className="hover:bg-red-500 p-2 rounded">Settings</button>
            <button className="hover:bg-red-500 p-2 rounded">Billing</button>
            <button className="hover:bg-red-500 p-2 rounded">
              Notifications
            </button>
          </div>
          <button className="hover:bg-red-500 p-2 rounded">Log Out</button>
        </div>
      )}
    </div>
  );
};
// <FaRegUser className="text-white text-xl font-bold " />
