import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
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

    return NextResponse.json(
      {
        photo: `data:image/png;base64,${base64Image}`,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error generating image:", error?.message || error);

    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
