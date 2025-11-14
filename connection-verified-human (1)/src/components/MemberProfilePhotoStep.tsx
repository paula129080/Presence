import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Props {
  onPhotoSelected: (photoUrl: string) => void;
}

export function MemberProfilePhotoStep({ onPhotoSelected }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  const [method, setMethod] = useState<'upload' | 'ai' | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      setMethod('upload');
      setError('');
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadToSupabase = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    setError('');
    
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('member-photos')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('member-photos')
        .getPublicUrl(filePath);

      onPhotoSelected(publicUrl);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const generateAI = async () => {
    setGenerating(true);
    setError('');
    try {
      const mockUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now();
      setPreview(mockUrl);
      setMethod('ai');
      onPhotoSelected(mockUrl);
    } catch (err) {
      setError('AI generation failed');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Profile Photo *</Label>
        <p className="text-sm text-gray-600 mb-4">Choose how you'd like to create your profile photo</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Card className={`p-6 cursor-pointer border-2 ${method === 'upload' ? 'border-[#4285B9]' : 'border-gray-200'}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer block text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <h3 className="font-semibold mb-2">Upload Photo</h3>
            <p className="text-sm text-gray-600">Use your own photo (max 5MB)</p>
          </label>
        </Card>

        <Card className={`p-6 cursor-pointer border-2 ${method === 'ai' ? 'border-[#4285B9]' : 'border-gray-200'}`} onClick={generateAI}>
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto text-purple-500 mb-3" />
            <h3 className="font-semibold mb-2">Generate AI Avatar</h3>
            <p className="text-sm text-gray-600">Create a unique avatar</p>
          </div>
        </Card>
      </div>

      {preview && method === 'upload' && (
        <div className="text-center">
          <img src={preview} alt="Preview" className="w-32 h-32 rounded-full mx-auto object-cover mb-4" />
          <Button onClick={uploadToSupabase} disabled={uploading} className="bg-[#4285B9]">
            {uploading ? 'Uploading...' : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Photo
              </>
            )}
          </Button>
        </div>
      )}

      {preview && method === 'ai' && (
        <div className="text-center">
          <img src={preview} alt="AI Avatar" className="w-32 h-32 rounded-full mx-auto object-cover" />
        </div>
      )}

      {generating && <p className="text-center text-gray-600">Generating your avatar...</p>}
    </div>
  );
}
