import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { Post, sessionUser } from "@/lib/definitions";
import HomeFlipImage from "../home/HomeFlipImage";
import SpImageFront from "./SpImageFront";

type Props = {
  timeline: boolean;
  firstPosts: Post[];
  me: sessionUser | undefined;
};

const SpHome = async (props: Props) => {
  const { timeline, firstPosts, me } = props;
  return (
    <div>
      {firstPosts.map((post: Post, index) => (
        <div key={post.id} className="rounded-3xl m-2">
          <HomeFlipImage
            post={post}
            myId={me?.id}
            containerStyle={{
              width: "100%",
              height: "auto",
            }}
            frontComponent={<SpImageFront index={index} post={post} me={me} />}
          />
        </div>
      ))}
      <SpHomeLoadMore timeline={timeline} skip={firstPosts.length} me={me} />
    </div>
  );
};

export default SpHome;
