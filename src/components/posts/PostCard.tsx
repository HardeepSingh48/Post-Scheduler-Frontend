import React from 'react';
import type { Post } from '../../types/post.types';
import { formatDateInTimezone } from '../../utils/timezone';
import { useTimezone } from '../../hooks/useTimezone';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const timezone = useTimezone();

  const formattedDate = post.scheduledAt
    ? `Scheduled for: ${formatDateInTimezone(post.scheduledAt, timezone)}`
    : 'Draft';

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="font-semibold">{post.user.username || post.user.email}</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <p className="mt-4">{post.content}</p>
      {post.imageUrl && (
        <div className="mt-4">
          <img src={post.imageUrl} alt="Post media" className="max-w-full rounded" />
        </div>
      )}
      <div className="text-xs text-gray-400">
        Status: {post.status} | Created: {formatDateInTimezone(post.createdAt, timezone)}
      </div>
    </div>
  );
};