"use client";
import MainPages from "@/app/components/MainPages";
import Image from "next/image";
import React from "react";
import profileImg from "@/public/profile.jpg";
import VideoCard from "@/app/components/VideoCard/VideoCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

function Profile({}: Props) {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign");
    },
  });
  return (
    <MainPages>
      <div>
        <div className="flex gap-5 justify-center items-center">
          {/* Profile Image */}

          <Image
            src={profileImg}
            alt="Profile"
            height={150}
            width={150}
            className="rounded-full w-[80px] h-[80px] sm:w-[150px] sm:h-[150px]"
          />
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl font-normal">Sairaj Aftab</h2>
            <p className="text-[#aaa] text-sm font-normal">
              345435 subscribers . 23 videos
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7 mt-5">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </MainPages>
  );
}

export default Profile;
