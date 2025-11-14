
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { DomainGuard } from "@/components/DomainGuard";

import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MemberDashboard from "./pages/MemberDashboard";
import HostDashboard from "./pages/HostDashboard";
import Chat from "./pages/Chat";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import WhatIsPresence from "./pages/WhatIsPresence";
import WhyItsSafe from "./pages/WhyItsSafe";
import WhoItsFor from "./pages/WhoItsFor";
import Learn from "./pages/Learn";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HostAgreement from "./pages/HostAgreement";
import { CommunityPledge, Contact } from "./pages/StaticPages";
import HostVerification from "./pages/HostVerification";
import AirtableAdmin from "./pages/AirtableAdmin";
import SystemStatus from "./pages/SystemStatus";
import IntegrationAdmin from "./pages/IntegrationAdmin";
import StripeTestPage from "./pages/StripeTestPage";
import HostSelection from "./pages/HostSelection";
import HostAnalytics from "./pages/HostAnalytics";
import MemberPreferences from "./pages/MemberPreferences";
import MemberProfile from "./pages/MemberProfile";
import VideoSession from "./pages/VideoSession";
import HelpDesk from "./pages/HelpDesk";
import DailyTestPage from "./pages/DailyTestPage";
import MessagingCalendarDemo from "./pages/MessagingCalendarDemo";
import AdminDashboard from "./pages/AdminDashboard";
import HostPayoutDashboard from "./pages/HostPayoutDashboard";
import RefundManagement from "./pages/RefundManagement";
import HostProfile from "./pages/HostProfile";
import MemberDiscovery from "./pages/MemberDiscovery";
import UserDemographics from "./pages/UserDemographics";
import MemberOnboarding from "./pages/MemberOnboarding";


import NotFound from "./pages/NotFound";








const queryClient = new QueryClient();
const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DomainGuard>
            <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/member-onboarding" element={<MemberOnboarding />} />
            
            {/* Member Flow */}
            <Route path="/member-preferences" element={<MemberPreferences />} />
            <Route path="/host-selection" element={<HostSelection />} />
            <Route path="/host-profile/:hostId" element={<HostProfile />} />
            <Route path="/video-session" element={<VideoSession />} />
            <Route path="/member-discovery" element={<MemberDiscovery />} />
            <Route path="/member-profile" element={<MemberProfile />} />
            <Route path="/member-dashboard" element={<MemberDashboard />} />

            
            {/* Host Flow */}
            <Route path="/host-dashboard" element={<HostDashboard />} />
            <Route path="/host-verification" element={<HostVerification />} />
            <Route path="/host-analytics" element={<HostAnalytics />} />
            <Route path="/host-payout" element={<HostPayoutDashboard />} />
            
            {/* Communication */}
            <Route path="/chat" element={<Chat />} />
            
            {/* Admin & Support */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/airtable-admin" element={<AirtableAdmin />} />
            <Route path="/integration-admin" element={<IntegrationAdmin />} />
            <Route path="/system-status" element={<SystemStatus />} />
            <Route path="/refund-management" element={<RefundManagement />} />
            <Route path="/user-demographics" element={<UserDemographics />} />
            <Route path="/help" element={<HelpDesk />} />

            
            {/* Testing & Demo */}
            <Route path="/stripe-test" element={<StripeTestPage />} />
            <Route path="/daily-test" element={<DailyTestPage />} />
            <Route path="/messaging-demo" element={<MessagingCalendarDemo />} />
            
            {/* Informational Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/what-is-presence" element={<WhatIsPresence />} />
            <Route path="/why-its-safe" element={<WhyItsSafe />} />
            <Route path="/who-its-for" element={<WhoItsFor />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/host-agreement" element={<HostAgreement />} />
            <Route path="/community-pledge" element={<CommunityPledge />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join-us" element={<Signup />} />

            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </DomainGuard>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>

);

export default App;

