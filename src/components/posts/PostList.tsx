import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { PostCard } from './PostCard';
import type { Post } from '../../types/post.types';

export const PostList: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await api.get('/posts');
      // API returns { status: 'success', data: { posts: [...] } }
      return response.data.data?.posts || [];
    },
  });


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-muted-foreground">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
        Error loading posts. Please try again.
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};