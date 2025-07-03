import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 400 }
      );
    }
    const { prompt }: { prompt: string } = await request.json();
    const CLOUDFLARE_ID = process.env.CLOUDFLARE_ID;
    const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY;
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.success) {
      return NextResponse.json(
        { error: "Cloudflare API returned an error" },
        { status: 500 }
      );
    }

    const base64Image = response.data.result.image;
    const photoUrl = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`
    );
    return NextResponse.json(
      {
        photo: photoUrl.secure_url,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error generating image:", error);

    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
