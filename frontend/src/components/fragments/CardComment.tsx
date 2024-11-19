import { IComment } from "@/types/comment.type";

export const CardComment = ({ comment }: { comment: IComment }) => {
  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-md shadow">
      <p className="text-sm text-gray-600">
        <strong>{comment.user.username}</strong> •{" "}
        {new Date(comment.createdAt).toLocaleDateString()}
      </p>
      <p>{comment.content}</p>
    </div>
  );
};
