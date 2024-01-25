"use client";
import React, { useState } from "react";
import Uploader from "./image-uploader/Uploader";

export default function Writepost({ loggedUser }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // function handleUpload(url) {
  //   setImage(url);
  // }

  function publishPost() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title,
      content,
      image,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/socialpost`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Close the modal after successful post
        setIsModalOpen(false);
      })
      .catch((error) => console.log("error", error));
  }

  const noImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 w-full max-w-md rounded-md">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Give this post a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                rows="4"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Write your thoughts in the post"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-4">
              <Uploader setImage={setImage} />
            </div>
            <div className="mt-6">
              <button
                onClick={publishPost}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-fit mx-auto p-5 border border-gray-300 rounded-lg space-y-5 shadow-lg">
        <span className="text-gray-500 font-medium">Write post</span>
        <div className="flex items-center justify-between space-x-5">
          <img
            className="h-10 w-10 rounded-full"
            src={loggedUser.image ? loggedUser.image : noImage}
            alt="user"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-5 rounded-full bg-gray-200 text-gray-500"
          >
            Whats on your mind, {loggedUser.name}?
          </button>
        </div>
      </div>
    </>
  );
}
