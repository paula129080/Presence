import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  onVerified: (phoneNumber: string) => void;
}

export function PhoneVerificationStep({ onVerified }: Props) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const sendCode = async () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error: err } = await supabase.functions.invoke('twilio-verify-send', {
        body: { phoneNumber: phone }
      });
      
      if (err || data?.error) {
        setError(data?.error || 'Failed to send code');
      } else {
        setStep('code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!code || code.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error: err } = await supabase.functions.invoke('twilio-verify-check', {
        body: { phoneNumber: phone, code }
      });
      
      if (err || data?.error || !data?.verified) {
        setError(data?.error || 'Invalid code');
      } else {
        setVerified(true);
        setTimeout(() => onVerified(phone), 1000);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Phone Verified!</h3>
        <p className="text-gray-600">Continuing to profile setup...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {step === 'phone' ? (
        <>
          <div>
            <Label htmlFor="phone">Mobile Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+61 4XX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +61 for Australia)</p>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button onClick={sendCode} disabled={loading} className="w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Send Verification Code
          </Button>
        </>
      ) : (
        <>
          <div>
            <Label htmlFor="code">Verification Code *</Label>
            <Input
              id="code"
              type="text"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Enter the 6-digit code sent to {phone}</p>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button onClick={verifyCode} disabled={loading} className="w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Verify Code
          </Button>
          
          <Button variant="ghost" onClick={() => setStep('phone')} disabled={loading} className="w-full">
            Change Phone Number
          </Button>
        </>
      )}
    </div>
  );
}
