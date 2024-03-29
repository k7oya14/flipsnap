import { PostDetail } from "@/components/detail/PostDetail";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { fetchPost } from "@/lib/fetch";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const postId = params.id;
  const postData = await fetchPost(postId, session?.user.id);
  return (
    <Card className="max-w-5xl mx-auto my-4">
      <CardContent>
        <div className="max-w-5xl mx-auto relative">
          <PostDetail post={postData} myId={session?.user.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
