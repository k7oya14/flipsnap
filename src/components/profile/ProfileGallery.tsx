"use client";

import ReactCardFlip from "react-card-flip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Post, UserInfo } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { useCursorById } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { fetchMoreUserPostsById } from "@/lib/fetch";
import Loading from "../Loading";
import ProfileImageFront from "./ProfileImageFront";
import ProfileImageBack from "./ProfileImageBack";

type Props = {
  flip: string;
  firstPosts: Post[];
  userInfo: UserInfo;
  myId: string | undefined;
};

export function ProfileGallery(props: Props) {
  const { flip, firstPosts, userInfo, myId } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const { cursorById } = useCursorById();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [cursorPostId, setCursorPostId] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    setPosts(firstPosts);
    if (firstPosts.length == 0) {
      setPostLimit(true);
    } else {
      setCursorPostId(cursorById(firstPosts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        const data = await fetchMoreUserPostsById(
          userInfo.id!,
          6,
          cursorPostId
        );
        if (data.length == 0) {
          setPostLimit(true);
          return;
        }
        setPosts((prevPosts) => [...prevPosts, ...data]);
        const newCursorId = cursorById(data);
        setCursorPostId(newCursorId);
      };
      fetchMorePosts();
    }
  }, [inView, loading, postLimit]);

  const handleFront = (flipId: string) => {
    params.set("flip", flipId.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    params.delete("flip");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 px-1 gap-4 mt-8">
      {loading && <Loading />}
      {posts.map((post, index) => (
        <ReactCardFlip
          key={index}
          isFlipped={flip === post.id}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.6}
          flipSpeedFrontToBack={0.6}
          infinite={true}
        >
          <ProfileImageFront
            index={index}
            src={post.imgFront}
            postId={post.id}
            handleClick={handleFront}
          />
          <ProfileImageBack
            src={post.imgBack}
            handleClick={handleBack}
            userId={post.authorId}
            myId={myId}
            relationship={userInfo.relationship!}
          />
        </ReactCardFlip>
      ))}
      <div ref={ref}></div>
    </div>
  );
}
