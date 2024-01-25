import React from 'react'

export default function Writepost({loggedUser}) {
    const noImage =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  return (
    <div className="w-fit mx-auto p-5 border border-gray-300 rounded-lg space-y-5 shadow-lg">
      <span className="text-gray-500 font-medium">Write post</span>
      <div className=" flex items-center justify-between space-x-5">
        <img
          className="h-10 w-10 rounded-full"
          src={loggedUser.image ? loggedUser.image : noImage}
          alt="image"
        />
        <button className="py-2 px-5 rounded-full bg-gray-200 text-gray-500">
          What{"'"}s on your mind, {loggedUser.name}?
        </button>
      </div>
    </div>
  )
}
