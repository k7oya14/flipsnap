import { Expand } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import StopPropagationDiv from "../StopPropagationDiv";
import { MotionDiv } from "../MotionDiv";
import { Post } from "@/lib/definitions";
import LikePostInformation from "./LikePostInformation";

type Props = {
  index: number;
  post: Post;
};

const LikePostImageFront = (props: Props) => {
  const { index, post } = props;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={`group relative rounded-md overflow-hidden hover:cursor-pointer`}
    >
      <div
        className={
          "absolute inset-0 bg-black transition-opacity duration-300 opacity-20 group-hover:opacity-25"
        }
      />
      <Image
        priority={index < 3}
        alt=""
        className="w-full rounded"
        height="293"
        src={post.imgFront}
        style={{
          aspectRatio: "293/293",
          objectFit: "cover",
        }}
        width="293"
      />
      <div className="absolute inset-x-0 bottom-0 h-full w-full transition-opacity duration-300 sm:hover:bg-gradient-to-b from-transparent to-zinc-800 rounded-b">
        <StopPropagationDiv>
          <LikePostInformation post={post} />
          <Link
            href={`/posts/${post.id}`}
            scroll={false}
            className="absolute bottom-0 right-0 p-[6px]"
          >
            <Expand
              className={`visible sm:invisible size-6 sm:size-[28px] text-slate-200 hover:scale-110 transition duration-200 ease-in-out group-hover:visible`}
            />
          </Link>
        </StopPropagationDiv>
      </div>
    </MotionDiv>
  );
};

export default LikePostImageFront;
