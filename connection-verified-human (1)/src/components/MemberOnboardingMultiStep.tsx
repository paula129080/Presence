import { useState } from 'react';
import { PhoneVerificationStep } from './PhoneVerificationStep';
import { MemberProfilePhotoStep } from './MemberProfilePhotoStep';
import { MemberOnboardingForm } from './MemberOnboardingForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { airtableService } from '@/lib/airtable';
import { useNavigate } from 'react-router-dom';

const AGE_RANGES = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
const PERSONALITY_TAGS = ['Calm', 'Outgoing', 'Empathetic', 'Analytical', 'Funny', 'Motivator', 'Listener'];

export function MemberOnboardingMultiStep() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneVerified = (phone: string) => {
    setPhoneNumber(phone);
    setStep(2);
  };

  const handlePhotoSelected = (url: string) => {
    setPhotoUrl(url);
    setStep(3);
  };

  const handleFormSubmit = async (formData: any) => {
    setLoading(true);
    
    try {
      const memberData = {
        'Full Name': formData.fullName,
        'Email': formData.email,
        'Mobile Number': phoneNumber,
        'Profile Photo / AI Image': photoUrl,
        'About You': formData.aboutYou,
        'Country': formData.country,
        'Time Zone': formData.timeZone,
        'Language Preference': formData.language,
        'Gender (Optional)': formData.gender,
        'Interests': formData.interests,
        'Member Age Group': formData.ageRange,
        'Personality Tags': formData.personalityTags || [],
        'Community Pledge Signed': formData.communityPledge,
        'Member Agreement Accepted': formData.memberAgreement,
        'Verification Status': 'Verified',
        'Status': 'Active',
        'Referral Source': formData.referralSource
      };

      await airtableService.createRecord('Members', memberData);
      navigate('/member-dashboard');
    } catch (err) {
      console.error('Failed to create member:', err);
      alert('Failed to complete signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Member Onboarding</CardTitle>
          <Progress value={progress} className="mt-2" />
          <p className="text-sm text-gray-600 mt-2">Step {step} of 3</p>
        </CardHeader>
        <CardContent>
          {step === 1 && <PhoneVerificationStep onVerified={handlePhoneVerified} />}
          {step === 2 && <MemberProfilePhotoStep onPhotoSelected={handlePhotoSelected} />}
          {step === 3 && (
            <MemberOnboardingForm
              onSubmit={handleFormSubmit}
              initialData={{}}
              ageRanges={AGE_RANGES}
              personalityTags={PERSONALITY_TAGS}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
