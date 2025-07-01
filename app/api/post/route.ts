import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/databse";
import Post from "@/model/post";
import { NextRequest, NextResponse } from "next/server";

// GET all posts
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const posts = await Post.find({});
    return NextResponse.json(
      {
        success: true,
        data: posts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch posts.",
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}

// CREATE a post
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { name, prompt, photo } = await request.json();
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    return NextResponse.json(
      {
        success: true,
        data: newPost,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create post.",
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
