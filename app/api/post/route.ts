import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/database";
import Post from "@/model/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET all posts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 400 }
      );
    }
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
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 400 }
      );
    }
    await dbConnect();
    const { name, prompt, photo } = await request.json();
    const newPost = await Post.create({
      name,
      prompt,
      photo,
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
