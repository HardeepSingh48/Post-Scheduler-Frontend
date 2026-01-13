import React, { useState } from 'react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Simulate upload - in real app, upload to server
    const formData = new FormData();
    formData.append('file', file);

    try {
      // const response = await api.post('/upload', formData);
      // onUpload(response.data.url);
      // For now, use a placeholder
      onUpload(URL.createObjectURL(file));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium">Upload Image (Optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="mt-1 block w-full"
      />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
};