import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Post, { IPost } from "@/model/post";
import { RenderPosts } from "@/components/RenderPosts";
import { dbConnect } from "@/lib/database";

export const metadata: Metadata = {
  title: "Akari Art | Community",
  description:
    "Generate stunning visuals using Akari AI or explore community creations.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type SafePost = Omit<IPost, "_id"> & { _id: string };
export default async function Community(props: { searchParams: SearchParams }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/signin");
  }
  const searchParams = await props.searchParams;
  const search = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search ?? "";

  let posts: SafePost[] = [];
  try {
    await dbConnect();
    posts = (await Post.find({}).lean()).map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
    posts = posts.reverse();
    console.log(posts);
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
