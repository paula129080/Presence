import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PhoneVerification } from '@/components/PhoneVerification';
import { MemberOnboardingForm } from '@/components/MemberOnboardingForm';
import HostOnboardingForm from '@/components/HostOnboardingForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { airtableService } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'member';
  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setStep('verify');
  };

  const handlePhoneVerified = async (phoneNumber: string) => {
    try {
      setLoading(true);
      
      if (userType === 'member') {
        const fields: any = {
          'Full Name': formData.fullName,
          'Email': formData.email,
          'Mobile Number': phoneNumber,
          'Country': formData.country,
          'Time Zone': formData.timeZone,
          'Language Preference': formData.language,
          'Gender (Optional)': formData.gender || 'Prefer not to say',
          'Interests': formData.interests,
          'About You': formData.aboutYou,
          'Referral Source': formData.referralSource,
          'Community Pledge Signed': formData.communityPledge,
          'Member Agreement Accepted': formData.memberAgreement,
          'Verification Status': 'Verified',
          'Member Type': 'Member',
          'Status': 'Active'
        };
        const response = await airtableService.createRecord('Members', fields);
        if (response.error) throw new Error(response.error);
        toast({ title: 'Success!', description: 'Your member account is verified and active.' });
        setTimeout(() => navigate('/member-dashboard'), 1500);
      } else {
        const fields: any = {
          'Full Name': formData.fullName,
          'Email': formData.email,
          'Mobile Number': phoneNumber,
          'About You (Host Bio)': formData.bio,
          'Languages Spoken': formData.languages,
          'Country / Time Zone': formData.timezone,
          'Personality Tags': formData.personalityTags,
          'Availability (Hours per Week)': parseInt(formData.hoursPerWeek) || 0,
          'Community Pledge Signed': formData.pledgeSigned,
          'Verification Status': 'Pending',
          'Status': 'Inactive'
        };
        const response = await airtableService.createRecord('Hosts', fields);
        if (response.error) throw new Error(response.error);
        toast({ title: 'Success!', description: 'Host application submitted for verification.' });
        setTimeout(() => navigate('/host-dashboard'), 1500);
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              {step === 'verify' && (
                <Button variant="ghost" size="sm" onClick={() => setStep('details')}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <CardTitle>
                {userType === 'member' ? 'Join as Member' : 'Become a Host'}
              </CardTitle>
            </div>
            <CardDescription>
              {userType === 'member' 
                ? 'Start connecting with verified hosts' 
                : 'Share your time and earn income'}
            </CardDescription>
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
              <Link 
                to={`/signup?type=${userType === 'member' ? 'host' : 'member'}`}
                className="text-base font-bold text-[#2563EB] hover:text-[#1d4ed8] hover:underline transition-colors block text-center"
              >
                {userType === 'member' 
                  ? '→ Want to become a host instead?' 
                  : '→ Want to join as a member instead?'}
              </Link>
            </div>

          </CardHeader>
          <CardContent>
            {step === 'details' ? (
              userType === 'member' ? (
                <MemberOnboardingForm onSubmit={handleFormSubmit} />
              ) : (
                <HostOnboardingForm onSubmit={handleFormSubmit} loading={loading} />
              )
            ) : (
              <PhoneVerification onVerified={handlePhoneVerified} userType={userType} />
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
