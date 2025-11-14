import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const tags = ['Kind', 'Insightful', 'Comforting', 'Professional', 'Engaging', 'Helpful'];

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  hostName: string;
}

export default function RatingModal({ open, onClose, hostName }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    alert(`Rating submitted: ${rating} stars with tags: ${selectedTags.join(', ')}`);
    onClose();
  };

  const handleRebook = () => {
    window.location.href = `/plans?rebook=${hostName}`;
  };

  const handleBrowse = () => {
    window.location.href = '/plans';
  };


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Your Session</DialogTitle>
          <DialogDescription>How was your experience with {hostName}?</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {[1,2,3,4,5].map(n => (
              <Star key={n} className={`w-8 h-8 cursor-pointer ${n <= rating ? 'fill-[#2563EB] text-[#2563EB]' : 'text-gray-300'}`} onClick={() => setRating(n)} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant={selectedTags.includes(tag) ? 'default' : 'outline'} className={`cursor-pointer ${selectedTags.includes(tag) ? 'bg-[#2563EB]' : ''}`} onClick={() => toggleTag(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
          <Button onClick={handleSubmit} className="w-full bg-[#2563EB]" disabled={rating === 0}>Submit Rating</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
