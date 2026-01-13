import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { PostCard } from './PostCard';
import type { Post } from '@/types/post.types';
import { PostStatus } from '@/types/post.types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

type StatusFilter = 'ALL' | 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';

interface PostListProps {
  refreshTrigger?: number;
}

export const PostList: React.FC<PostListProps> = ({ refreshTrigger }) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error, refetch } = useQuery<Post[]>({
    queryKey: ['posts', statusFilter],
    queryFn: async () => {
      // Build query params
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') {
        params.append('status', statusFilter);
      }

      const queryString = params.toString();
      const url = queryString ? `/posts?${queryString}` : '/posts';

      const response = await api.get(url);
      const postsData = response.data.data?.posts || [];

      // Client-side filtering as backup
      if (statusFilter === 'ALL') {
        return postsData;
      }

      return postsData.filter((post: Post) => post.status === statusFilter);
    },
  });

  // Refetch when refreshTrigger changes
  React.useEffect(() => {
    if (refreshTrigger) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => api.delete(`/posts/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteMutation.mutateAsync(postId);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

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

  return (
    <div className="space-y-4">
      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={statusFilter === 'ALL' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('ALL')}
        >
          All Posts
        </Button>
        <Button
          size="sm"
          variant={statusFilter === 'DRAFT' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('DRAFT')}
        >
          Drafts
        </Button>
        <Button
          size="sm"
          variant={statusFilter === 'SCHEDULED' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('SCHEDULED')}
        >
          Scheduled
        </Button>
        <Button
          size="sm"
          variant={statusFilter === 'PUBLISHED' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('PUBLISHED')}
        >
          Published
        </Button>
        <Button
          size="sm"
          variant={statusFilter === 'FAILED' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('FAILED')}
        >
          Failed
        </Button>
      </div>

      {/* Posts List */}
      {!posts || posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            {statusFilter === 'ALL'
              ? 'No posts yet. Create your first post!'
              : `No ${statusFilter.toLowerCase()} posts.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {posts.map((post) => (
            <div key={post.id} className="relative">
              <PostCard post={post} />
              {(post.status === PostStatus.DRAFT || post.status === PostStatus.SCHEDULED) && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => handleDelete(post.id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};