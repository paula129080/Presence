import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { airtableService } from '@/lib/airtable';
import { toast } from 'sonner';

interface BookingCalendarProps {
  hostId: string;
  hostName: string;
  hostEmail: string;
  memberName: string;
  memberEmail: string;
  calLink?: string;
  onBookingComplete?: () => void;
}

export function BookingCalendar({ 
  hostId, 
  hostName, 
  hostEmail, 
  memberName, 
  memberEmail, 
  calLink,
  onBookingComplete 
}: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const handleBooking = async () => {
    if (!date || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    setLoading(true);
    try {
      const sessionDateTime = new Date(date);
      const [hours, minutes] = selectedTime.split(':');
      sessionDateTime.setHours(parseInt(hours), parseInt(minutes));

      const result = await airtableService.createRecord('Presence Operations', {
        'Host Name': hostName,
        'Member Name': memberName,
        'Session Date': sessionDateTime.toISOString().split('T')[0],
        'Session Time': selectedTime,
        'Session Start Time': sessionDateTime.toISOString(),
        'Session Duration (mins)': 30,
        'Booking Status': 'Pending',
        'Payment Status': 'Pending',
        'Session Type': 'Video',
        'Plan Type': 'Adhoc',
        'Cal Link': calLink || undefined
      });

      if (result.error) throw new Error(result.error);

      toast.success('Booking created successfully!');
      onBookingComplete?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  // If host has Cal Link, embed it directly
  if (calLink) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Book with {hostName}</h3>
        <iframe 
          src={calLink} 
          width="100%" 
          height="600" 
          frameBorder="0"
          className="rounded-lg"
        />
      </Card>
    );
  }

  // Otherwise show custom calendar
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Book a Session with {hostName}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </div>
        <div>
          <h4 className="font-medium mb-3">Available Times</h4>
          <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <Button className="w-full mt-6" onClick={handleBooking} disabled={loading || !date || !selectedTime}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

