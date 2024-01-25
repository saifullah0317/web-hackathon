import React from 'react'

export default function Viewpost({title, content, image, username, profileimage}) {
  const noImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  return (
    <div className='p-5 shadow-lg flex flex-col space-y-4 w-fit mx-auto'>
      <div className='flex items-center justify-start space-x-5'>
        <img className='h-8 w-8 rounded-full' src={profileimage?profileimage:noImage} alt="image" />
        <span className='font-medium'>{username}</span>
      </div>
      <span className='font-medium'>{title}</span>
      <span>{content}</span>
      <div>
        <img className='h-96 w-96' src={image?image:noImage} alt="post image" />
      </div>
    </div>
  )
}
