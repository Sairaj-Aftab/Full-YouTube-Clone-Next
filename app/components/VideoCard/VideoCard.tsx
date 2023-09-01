"use client";
import Image from "next/image";
import React from "react";
import { useState, useRef } from "react";
import profileImg from "@/public/profile.jpg";
import Link from "next/link";
function VideoCard() {
  const ref = useRef<HTMLVideoElement>(null);

  const [video, setVideo] = useState<boolean>(false);
  const mouseHoverPlay = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setVideo(true);
    if (ref.current) {
      ref.current.play();
    }
  };
  const mouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setVideo(false);
    if (ref.current) {
      ref.current.pause();
    }
  };
  return (
    <div
      className="cursor-pointer flex flex-col gap-3"
      onMouseEnter={mouseHoverPlay}
      onMouseLeave={mouseLeave}
    >
      <Link href="/video/jdf54">
        {video ? (
          <video ref={ref} src="./video.mp4" className="w-full h-52"></video>
        ) : (
          <Image
            src={profileImg}
            alt="Thumbnail"
            className="w-full h-52 object-cover sm:rounded-md"
          />
        )}
      </Link>

      <div className="flex gap-2 px-2 sm:px-0">
        <Link href="/profile/65645" className="w-full h-full">
          <Image
            src={profileImg}
            alt="Profile"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href="/video/fjkf5453"
            className="text-lg font-normal text-white line-clamp-2 leading-5 md:leading-6"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, quisquam placeat iusto error velit culpa ratione
            eligendi impedit dolorem! Provident corrupti necessitatibus corporis
            repellat officiis facere veritatis animi voluptatum perferendis!
          </Link>
          <Link
            href="/profile/fjke564"
            className="text-[#aaa] text-sm font-normal mt-1 sm:mt-2"
          >
            Sairaj Aftab
          </Link>
          <Link
            href="/video/456345"
            className="text-[#aaa] text-sm font-normal"
          >
            829k views . 11 months ago
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
