import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Share2, Copy, Mail, MessageSquare, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Social media icons (using simple SVG paths)
const socialPlatforms = [
  { name: 'TikTok', url: 'https://tiktok.com/@presence', icon: '🎵' },
  { name: 'Instagram', url: 'https://instagram.com/presencegroup', icon: '📷' },
  { name: 'Facebook', url: 'https://facebook.com/presencegroup', icon: '👥' },
  { name: 'Threads', url: 'https://threads.net/@presencegroup', icon: '🧵' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/presence', icon: '💼' },
  { name: 'YouTube', url: 'https://youtube.com/@presence', icon: '▶️' },
];

interface HostPromotionHubProps {
  hostId?: string;
  referralCount?: number;
}

export default function HostPromotionHub({ hostId = 'HST-XXXX', referralCount = 0 }: HostPromotionHubProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  const referralLink = `https://presencegroup.net/h/${hostId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({ title: t('common.copied') });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  };

  const handleShare = async () => {
    const message = t('promotion.shareMessage', { link: referralLink });
    
    if (navigator.share) {
      try {
        await navigator.share({ text: message, url: referralLink });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSMS = () => {
    const message = t('promotion.privateMessage', { link: referralLink });
    window.open(`sms:?body=${encodeURIComponent(message)}`);
  };

  const handleEmail = () => {
    const message = t('promotion.privateMessage', { link: referralLink });
    window.open(`mailto:?subject=Join me on Presence&body=${encodeURIComponent(message)}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('promotion.title')}</CardTitle>
          <CardDescription>{t('promotion.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">{t('promotion.referralCount')}</p>
            <p className="text-3xl font-bold text-blue-600">{referralCount}</p>
          </div>

          {/* Share Buttons */}
          <div className="space-y-3">
            <Button onClick={handleShare} className="w-full" size="lg">
              <Share2 className="mr-2 h-5 w-5" />
              {t('promotion.shareMyPresence')}
            </Button>
            
            <Button onClick={handleCopyLink} variant="outline" className="w-full" size="lg">
              {copied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
              {copied ? t('common.copied') : t('promotion.copyLink')}
            </Button>
          </div>

          {/* Social Follow */}
          <div>
            <h3 className="font-semibold mb-3">{t('promotion.followPresence')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="text-xs text-center">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Private Invitations */}
      <Card>
        <CardHeader>
          <CardTitle>{t('promotion.privateInvitations')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={handleSMS} variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-5 w-5" />
            {t('promotion.inviteBySMS')}
          </Button>
          
          <Button onClick={handleEmail} variant="outline" className="w-full">
            <Mail className="mr-2 h-5 w-5" />
            {t('promotion.inviteByEmail')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
