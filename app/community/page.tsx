import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Post {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

export const metadata: Metadata = {
  title: "Akari Art | Community",
  description:
    "Generate stunning visuals using Akari AI or explore community creations.",
};

const RenderPosts = ({ data, title }: { data: Post[]; title: string }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Community(props: { searchParams: SearchParams }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  const searchParams = await props.searchParams;
  const search = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search ?? "";

  let posts: Post[] = [];
  try {
    const res = await fetch("http://localhost:3000/api/post", {
      cache: "no-store",
    });
    const data = await res.json();
    posts = data.data?.reverse();
    if (search) {
      posts = posts.filter(
        (post) =>
          post.name.toLowerCase().includes(search) ||
          post.prompt.toLowerCase().includes(search)
      );
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
  }

  return (
    <section className="mt-32 relative z-7 min-h-screen pb-10 flex flex-col px-6 lg:px-10 gap-12 max-w-[1240px] mx-auto">
      <div>
        <h1 className="text-5xl font-bold text-balance">
          The Community Showcase
        </h1>
        <p className="text-balance">
          Browse through the collection of imaginative and creative posts from
          the community.
        </p>
      </div>

      {/* Search Form */}
      <form
        className="flex dark w-full items-center mx-auto gap-2"
        action="/community"
        method="GET"
      >
        <Input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full"
          defaultValue={search}
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      <div className="mt-10">
        {search && (
          <h2 className="font-medium text-[#666e75] text-xl mb-3">
            Search results for <span className="text-[#222328]">{search}</span>
          </h2>
        )}

        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-5">
          <RenderPosts
            data={posts}
            title={search ? "No results found" : "No posts found"}
          />
        </div>
      </div>
    </section>
  );
}
