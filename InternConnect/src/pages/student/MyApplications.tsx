import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockApplications, mockListings } from '@/data/mockData';
import { CheckCircle, Clock, Calendar, Award, Building } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function MyApplications() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showSlotDialog, setShowSlotDialog] = useState(false);
  const myApplications = mockApplications;
  const currentListing = mockListings[0];

  const handleConfirmSlot = () => {
    if (selectedSlot) {
      toast.success('Interview slot confirmed!');
      setShowSlotDialog(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'shortlisted':
        return <Award className="h-5 w-5 text-warning" />;
      case 'interview-scheduled':
        return <Calendar className="h-5 w-5 text-primary" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
        <p className="text-muted-foreground">Track and manage your internship applications</p>
      </div>

      <div className="space-y-4">
        {myApplications.map((app) => (
          <Card key={app.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{app.listingTitle}</span>
                    {getStatusIcon(app.status)}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>{app.company}</span>
                  </CardDescription>
                </div>
                <Badge 
                  variant={app.status === 'accepted' ? 'success' : 'secondary'}
                  className="capitalize"
                >
                  {app.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Applied Date:</span>
                  <p className="font-medium">{new Date(app.appliedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-medium capitalize">{app.status.replace('-', ' ')}</p>
                </div>
              </div>

              {app.status === 'shortlisted' && app.interviewSlots && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Action Required: Confirm Interview Slot
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    The company has proposed interview slots. Please select your preferred time.
                  </p>
                  <Button onClick={() => setShowSlotDialog(true)}>
                    Select Interview Slot
                  </Button>
                </div>
              )}

              {app.status === 'interview-scheduled' && app.selectedSlot && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Interview Scheduled
                  </h4>
                  <p className="text-sm">
                    Your interview is scheduled for: <span className="font-medium">{app.selectedSlot}</span>
                  </p>
                </div>
              )}

              {app.status === 'offered' && (
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center text-success">
                    <Award className="mr-2 h-4 w-4" />
                    Offer Received!
                  </h4>
                  <p className="text-sm mb-3">Congratulations! You've been offered this position.</p>
                  <div className="flex space-x-2">
                    <Button className="bg-success hover:bg-success/90">Accept Offer</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              )}

              {app.status === 'accepted' && (
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center text-success">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Offer Accepted
                  </h4>
                  <p className="text-sm">
                    You've accepted this position. Your internship will begin on {currentListing.duration.split(' - ')[0]}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showSlotDialog} onOpenChange={setShowSlotDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Interview Slot</DialogTitle>
            <DialogDescription>
              Choose your preferred time slot for the interview
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={selectedSlot} onValueChange={setSelectedSlot}>
            {myApplications[0]?.interviewSlots?.map((slot, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 transition-smooth">
                <RadioGroupItem value={slot} id={`slot-${index}`} />
                <Label htmlFor={`slot-${index}`} className="flex-1 cursor-pointer">
                  {slot}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowSlotDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmSlot} disabled={!selectedSlot}>Confirm Slot</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
