import React from 'react';

interface PostPreviewProps {
  content: string;
  mediaUrls?: string;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ content, mediaUrls }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-gray-50">
      <h3 className="mb-2 text-sm font-semibold text-gray-600">Preview</h3>
      <p className="mb-2">{content}</p>
      {mediaUrls && (
        <img src={mediaUrls} alt="Preview" className="max-w-full rounded" />
      )}
    </div>
  );
};