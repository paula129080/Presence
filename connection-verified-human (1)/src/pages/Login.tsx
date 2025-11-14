import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (type: 'member' | 'host') => {
    if (email && password) {
      navigate(type === 'member' ? '/member-dashboard' : '/host-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <Tabs defaultValue="member">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="member">Member</TabsTrigger>
            <TabsTrigger value="host">Host</TabsTrigger>
          </TabsList>

          <TabsContent value="member">
            <Card>
              <CardHeader>
                <CardTitle>Member Login</CardTitle>
                <CardDescription>Access your booking dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email-member">Email</Label>
                  <Input id="email-member" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="password-member">Password</Label>
                  <Input id="password-member" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={() => handleLogin('member')} className="w-full bg-[#E53935]">
                  Continue to Dashboard
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="host">
            <Card>
              <CardHeader>
                <CardTitle>Host Login</CardTitle>
                <CardDescription>Access your host portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email-host">Email</Label>
                  <Input id="email-host" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="password-host">Password</Label>
                  <Input id="password-host" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={() => handleLogin('host')} className="w-full bg-[#E53935]">
                  Continue to Dashboard
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
