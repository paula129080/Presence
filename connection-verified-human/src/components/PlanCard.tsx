import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface PlanCardProps {
  name: string;
  price: number;
  chats: number;
  hosts: string;
  hostSplit: number;
  platformSplit: number;
  onSelect: () => void;
}

export default function PlanCard({ name, price, chats, hosts, hostSplit, platformSplit, onSelect }: PlanCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="text-3xl font-bold text-[#E53935]">${price}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <Check className="w-5 h-5 text-[#4285B9]" />
          <span>{chats} {chats === 1 ? 'chat' : 'chats'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="w-5 h-5 text-[#4285B9]" />
          <span>{hosts}</span>
        </div>
        {/* Revenue split details hidden per request */}
        {/* <div className="text-xs text-gray-500 pt-2">
          <div>Host: {hostSplit}%</div>
          <div>Platform: {platformSplit}%</div>
        </div> */}

      </CardContent>
      <CardFooter>
        <Button onClick={onSelect} className="w-full bg-[#E53935] hover:bg-[#c62828]">
          Select Plan
        </Button>

      </CardFooter>
    </Card>
  );
}
