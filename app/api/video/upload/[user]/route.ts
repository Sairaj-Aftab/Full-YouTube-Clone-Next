import { writeFile } from "fs/promises";
import connectMongoDB from "@/config/database";
import User from "@/models/user";
import Video from "@/models/video";
import cloudinary from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { join } from "path";
import fs from "fs";

export async function POST(
  request: NextRequest,
  { params }: { params: { user: string } }
) {
  try {
    const dataForm = await request.formData();

    await connectMongoDB();
    const user = await User.findById(params.user);
    console.log(data);
    const title = dataForm.get("title");
    const desc = dataForm.get("desc");
    const video: File | null = dataForm.get("video") as unknown as File;
    const thumbnail: File | null = dataForm.get("thumbnail") as unknown as File;
    const vidBuffer = await video.arrayBuffer();
    const vidNodeBufferr = Buffer.from(vidBuffer, "hex");
    // console.log(vidNodeBufferr);

    const vidNodeBuffer = Buffer.from(vidBuffer, "hex");
    // console.log(vidNodeBuffer);

    const thumBuffer = await thumbnail.arrayBuffer();
    const thumNodeBuffer = Buffer.from(thumBuffer, "hex").toString("base64");

    return;

    if (!user) {
      console.log("User not found");
    }
    if (user) {
      const uploadedVideo = await cloudinary.uploader.upload(vidNodeBuffer, {
        resource_type: "video",
        folder: "youtube_clone_video",
        public_id: video.name,
      });
      const uploadedImg = await cloudinary.uploader.upload(
        `data:${thumbnail.type};base64,${thumNodeBuffer}`,
        {
          resource_type: "auto",
          folder: "youtube_thumbnail_images",
          public_id: thumbnail.name,
        }
      );
      const finalUp = await Promise.all([uploadedVideo, uploadedImg]);

      if (!finalUp) {
        console.log("Something error final uploading");
        return;
      }
      const upVid = await Video.create({
        userId: params.user,
        title,
        desc,
        video: {
          public_id: finalUp[0].public_id,
          url: finalUp[0].secure_url,
        },
        thumbnail: {
          public_id: finalUp[1].public_id,
          url: finalUp[1].secure_url,
        },
      });

      if (!upVid) {
        return NextResponse.json({ message: "Not created" });
      }

      return NextResponse.json({
        message: "Successfully uploaded",
        video: upVid,
      });
    }
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
