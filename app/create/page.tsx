import { ImageGenerator } from "@/components/ImageGenerator";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Akari Art | Create",
  description:
    "Generate stunning visuals using Akari AI or explore community creations.",
};

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <section className="mt-30 relative z-7">
      <ImageGenerator />
    </section>
  );
};

export default page;
