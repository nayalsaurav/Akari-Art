"use client";
import React from "react";
import Link from "next/link";
import { Pen } from "lucide-react";
import { Button } from "./ui/button";
import { AvatarWithLogOut } from "./AvatarWithLogOut";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="fixed z-50 top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-3/4 px-6 py-3 flex justify-between items-center border border-white/20 rounded-xl bg-white/5 backdrop-blur-lg shadow-md">
      {/* Logo (Link to Home) */}
      <Link href="/" className="flex items-center gap-2">
        <Pen className="text-white w-5 h-5" />
        <span className="text-white font-semibold text-lg">Akari Art</span>
      </Link>

      {/* Call-to-Action Button */}
      {session?.user ? (
        <AvatarWithLogOut />
      ) : (
        <Button
          variant="secondary"
          className="rounded-full px-5 py-2 text-sm font-medium cursor-pointer"
          onClick={() => router.push("/signin")}
        >
          Get Started
        </Button>
      )}
    </nav>
  );
};
