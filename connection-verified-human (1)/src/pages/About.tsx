import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-6">About Presence</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-3xl font-bold mb-4">Where Human Connection Meets Technology</h2>
          <p className="text-xl text-gray-700 mb-8">
            Presence exists to solve one of the largest human challenges of our time:
          </p>
          
          <p className="text-xl font-semibold text-gray-800 mb-8">
            People are more connected than ever — yet lonelier than ever.
          </p>
          
          <p className="text-gray-700 mb-6">
            We created Presence to bring humanity back into everyday life through real, verified, 10-minute conversations with real people.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-lg text-gray-700 text-center">
              Not therapy.<br />
              Not dating.<br />
              Not AI.<br />
              <span className="font-semibold">Just human presence.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To make meaningful, human connection:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>accessible,</li>
            <li>safe,</li>
            <li>affordable,</li>
            <li>global,</li>
            <li>and stigma-free.</li>
          </ul>

          <p className="text-xl text-gray-800 italic mb-8">
            Presence is built on a simple belief: Sometimes the most powerful thing you can give someone is your presence.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How Presence Works</h2>
          <p className="text-gray-700 mb-4">Each session is:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>10 minutes</li>
            <li>fully private</li>
            <li>end-to-end encrypted</li>
            <li>between two verified humans</li>
          </ul>
        </div>
      </div>


      <Footer />
    </div>
  );
}
