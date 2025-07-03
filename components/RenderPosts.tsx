import { IPost } from "@/model/post";
import Card from "./Card";
type SafePost = Omit<IPost, "_id"> & { _id: string };
export const RenderPosts = ({
  data,
  title,
}: {
  data: SafePost[];
  title: string;
}) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};
