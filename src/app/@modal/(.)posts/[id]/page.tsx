import { PostDetail } from "@/components/detail/PostDetail";
import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { fetchPost } from "@/lib/fetch";
import { SpDetailPost } from "@/components/smartphone/SpDetailPost";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const postId = params.id;
  const postData = await fetchPost(postId, session?.user.id);
  return (
    <Dialog open>
      <DialogOverlay>
        <InterceptedDialogContent className="rounded-lg w-[90%] sm:max-h-[95%] max-h-[90%] overflow-hidden">
          <div className="hidden sm:block max-w-5xl mx-auto w-[90%] relative">
            <PostDetail post={postData} myId={session?.user.id} />
          </div>
          <div className="sm:hidden flex flex-col dialog-scroll overflow-y-scroll">
            <SpDetailPost post={postData} />
          </div>
        </InterceptedDialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
