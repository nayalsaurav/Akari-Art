import { dbConnect } from "@/lib/database";
import Post from "@/model/post";
import { NextRequest, NextResponse } from "next/server";

// GET all posts
export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).lean();
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch posts.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// CREATE a post
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { name, prompt, photo } = await request.json();

    if (!name || !prompt || !photo) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, prompt, or photo.",
        },
        { status: 400 }
      );
    }

    const newPost = await Post.create({
      name: name.trim(),
      prompt: prompt.trim(),
      photo,
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create post.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
