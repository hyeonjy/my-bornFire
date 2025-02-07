import Comment from "./Comment";

async function getComments(placeId: string) {
  // temporary data
  // need to grab it from supabase
  return [
    { id: 1, nickname: '사용자1', content: '댓글이 나오는 부분입니다.' },
    { id: 2, nickname: '사용자2', content: '두 번째 댓글입니다.' },
  ];
}

const Comments = async ({ placeId }: { placeId: string }) => {
  const comments = await getComments(placeId);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}

export default Comments
