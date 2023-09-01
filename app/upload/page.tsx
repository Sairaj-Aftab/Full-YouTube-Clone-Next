"use client";
import {
  uploadThumbnail,
  uploadVideo,
  uploadingCancel,
} from "@/lib/uploadVideo";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { MdPhotoCameraBack } from "react-icons/md";
import { toast } from "react-toastify";
import MainPages from "../components/MainPages";
import Image from "next/image";
import thumbnail from "@/public/thumbnail.png";
import UploadProgressBar from "../components/UploadProgressBar";

function UploadFile() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign");
    },
  });

  const [loading, setLoading] = useState<number | null>(null);
  useEffect(() => {
    if (loading === 100) {
      setLoading(null);
      setFileLink(null);
    }
  }, [loading]);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [fileLink, setFileLink] = useState<string | null>(null);
  const [imgLink, setImgLink] = useState<string | null>(null);

  const [input, setInput] = useState({
    title: "",
    desc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInput((prev) => ({ ...prev, video: e.target.files?.[0] }));
    setFile(e.target.files?.[0]);
    const urlLink = URL.createObjectURL(e.target.files?.[0] as File);
    setFileLink(urlLink);
  };
  const handleChangeImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInput((prev) => ({ ...prev, thumbnail: e.target.files?.[0] }));
    setImgFile(e.target.files?.[0]);

    const urlLink = URL.createObjectURL(e.target.files?.[0] as File);
    setImgLink(urlLink);
  };

  const submitVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("desc", input.desc);
    formData.append("video", file as File);
    formData.append("thumbnail", imgFile as File);

    await uploadVideo(session?.user?.id, formData, setLoading);
  };

  const cancelUploading = () => {
    alert("Do you want to cancel ?");
    uploadingCancel();
    setInput({ title: "", desc: "" });
  };

  return (
    <MainPages>
      <form onSubmit={submitVideo}>
        {!file && !loading && (
          <div className="flex justify-center items-center h-[90vh]">
            <div className="flex flex-col gap-5 items-center justify-center border border-cyan-500 rounded-lg h-[70vh] w-1/2">
              <div className="text-5xl">
                <AiOutlineCloudUpload />
              </div>
              <h1 className="text-xl text-slate-300 font-bold">
                Upload Videos
              </h1>

              <button className="relative bg-cyan-500 py-2 px-8 cursor-pointer rounded-md text-lg font-semibold text-white">
                <input
                  name="video"
                  onChange={handleChangeFile}
                  type="file"
                  accept="video/*"
                  className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                Select Files
              </button>
            </div>
          </div>
        )}
        {!loading && file && (
          <div className="flex justify-center mb-5">
            <div className="border border-cyan-500 rounded-lg w-1/2 p-3 flex flex-col gap-3">
              <input
                className="w-full bg-transparent border border-cyan-500 rounded-md p-2 text-lg text-white font-semibold"
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                placeholder="Title..."
              />
              {fileLink ? (
                <div className="relative">
                  <video
                    className="w-full"
                    src={fileLink as string}
                    controls={true}
                    height={300}
                    width={200}
                  ></video>
                  {/* Thumbnail Image */}
                  {imgLink && (
                    <Image
                      src={imgLink ? imgLink : thumbnail}
                      alt="Thumbnail"
                      width={500}
                      height={500}
                      className="absolute top-0 left-0 object-cover w-full h-full"
                    />
                  )}
                  <div
                    onClick={() => {
                      setFileLink(null), setImgLink(null);
                    }}
                    className="absolute top-1 right-1 text-3xl rounded-full cursor-pointer text-white bg-black bg-opacity-40"
                  >
                    <IoIosClose />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5 items-center justify-center border border-cyan-500 rounded-lg h-auto py-10 w-full">
                  <div className="text-5xl">
                    <AiOutlineCloudUpload />
                  </div>
                  <h1 className="text-xl text-slate-300 font-bold">
                    Upload Videos
                  </h1>
                  <button className="relative bg-cyan-500 py-2 px-8 cursor-pointer rounded-md text-lg font-semibold text-white">
                    <input
                      name="video"
                      onChange={handleChangeFile}
                      type="file"
                      accept="video/*"
                      className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
                    />
                    Select Files
                  </button>
                </div>
              )}
              {/* Thumbnail */}

              {fileLink && (
                <div className="w-[150px] h-[100px] rounded-md relative">
                  <input
                    name="image"
                    onChange={handleChangeImgFile}
                    type="file"
                    accept="image/*"
                    className="w-full h-full absolute top-0 left-0 bottom-0 right-0 cursor-pointer opacity-0"
                  />
                  <Image
                    className="w-[150px] h-[100px] object-cover rounded-md border-2 border-yellow-400"
                    src={imgLink ? imgLink : thumbnail}
                    alt="Thumbnail"
                    width={150}
                    height={100}
                  />
                </div>
              )}
              <textarea
                className="w-full bg-transparent border border-cyan-500 rounded-md p-2 text-lg text-white font-semibold"
                rows={5}
                name="desc"
                value={input.desc}
                onChange={handleInputChange}
                placeholder="Description..."
              ></textarea>
              <input
                className="w-full bg-transparent border border-cyan-500 rounded-md p-2 text-lg text-white font-semibold"
                type="text"
                placeholder="Tags..."
              />
              <button
                type="submit"
                disabled={!input.title || !input.desc || !fileLink || !imgLink}
                className="text-lg font-bold text-white bg-blue-500 disabled:bg-[#cccccc] disabled:text-[#666666] py-1 rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </form>
      {/* Loading progress bar */}
      {loading && (
        <div className="h-[90vh] flex flex-col justify-center">
          <UploadProgressBar loading={loading as number} />
          <div className="flex gap-5 items-center justify-center mt-2">
            <span className="text-base font-semibold">{`${loading}`} %</span>{" "}
            <button
              onClick={cancelUploading}
              className="text-white text-base font-semibold bg-red-500 rounded-md py-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </MainPages>
  );
}

export default UploadFile;
