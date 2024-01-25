"use client";
import React, { useState } from "react";
import Head from "next/head";

export default function Uploader({ setImage }) {
  const [imageSrc, setImageSrc] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  async function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = async function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);

      const formData = new FormData();
      formData.append("file", changeEvent.target.files[0]);
      formData.append("upload_preset", "hassan-uploads");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setImageSrc(data.secure_url);
        setImage(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <div className="mt-4">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLineCap="round"
              strokeLineJoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG, or GIF (MAX. 800x400px)
          </p>
        </div>
        <Head>
          <title>Image Uploader</title>
          <meta name="description" content="Upload your image to Cloudinary!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <p className="">Upload your image to Cloudinary!</p>

        <form className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2" method="post" onChange={handleOnChange}>
          <p>
            <input
              id="dropzone-file"
              type="file"
              name="file"
              className="hidden"
            />
          </p>
          <div>
          <img
          className=""
            src={imageSrc}
            
          />
</div>
        </form>
      </label>
    </div>
  );
}
