import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Video, Calendar as CalendarIcon, Send, Clock, User, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'student' | 'faculty' | 'industry';
  senderName: string;
  message: string;
  timestamp: string;
}

interface Meeting {
  id: string;
  title: string;
  with: 'faculty' | 'industry';
  mentorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export default function MentorCommunication() {
  const [facultyMessages, setFacultyMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'faculty',
      senderName: 'Harish Gadade',
      message: 'How is your internship going? Any challenges?',
      timestamp: '2025-10-03 10:30',
    },
    {
      id: '2',
      sender: 'student',
      senderName: 'You',
      message: 'Going well! Working on API integration this week.',
      timestamp: '2025-10-03 11:15',
    },
  ]);

  const [industryMessages, setIndustryMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'industry',
      senderName: 'Archit Shelar',
      message: 'Great progress on the last task. Ready for the next challenge?',
      timestamp: '2025-10-03 14:20',
    },
    {
      id: '2',
      sender: 'student',
      senderName: 'You',
      message: 'Yes, excited to learn more!',
      timestamp: '2025-10-03 14:45',
    },
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Weekly Progress Review',
      with: 'faculty',
      mentorName: 'Harish Gadade',
      date: '2025-10-05',
      time: '10:00 AM',
      status: 'scheduled',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: '2',
      title: 'Technical Discussion',
      with: 'industry',
      mentorName: 'Archit Shelar',
      date: '2025-10-06',
      time: '3:00 PM',
      status: 'scheduled',
      meetingLink: 'https://zoom.us/j/123456789',
    },
  ]);

  const [newFacultyMessage, setNewFacultyMessage] = useState('');
  const [newIndustryMessage, setNewIndustryMessage] = useState('');
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [selectedMentorType, setSelectedMentorType] = useState<'faculty' | 'industry'>('faculty');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSendFacultyMessage = () => {
    if (!newFacultyMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'student',
      senderName: 'You',
      message: newFacultyMessage,
      timestamp: new Date().toLocaleString(),
    };
    
    setFacultyMessages([...facultyMessages, message]);
    setNewFacultyMessage('');
    toast.success('Message sent to faculty mentor');
  };

  const handleSendIndustryMessage = () => {
    if (!newIndustryMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'student',
      senderName: 'You',
      message: newIndustryMessage,
      timestamp: new Date().toLocaleString(),
    };
    
    setIndustryMessages([...industryMessages, message]);
    setNewIndustryMessage('');
    toast.success('Message sent to industry mentor');
  };

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Meeting request sent to mentor!');
    setShowMeetingDialog(false);
  };

  // Check if student is onboarded (has an active internship)
  const isOnboarded = true; // This would come from your auth/application context

  if (!isOnboarded) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto text-center p-12">
          <CardHeader>
            <CardTitle className="text-2xl">Mentor Communication</CardTitle>
            <CardDescription>
              This feature is available once you are onboarded to an internship
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <MessageCircle className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Complete your application process and get accepted to access mentor communication features.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mentor Communication</h1>
          <p className="text-muted-foreground">Chat with your mentors and schedule meetings</p>
        </div>
        <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule a Meeting</DialogTitle>
              <DialogDescription>
                Request a meeting with your faculty or industry mentor
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleScheduleMeeting} className="space-y-4">
              <div className="space-y-2">
                <Label>Mentor Type</Label>
                <Select value={selectedMentorType} onValueChange={(value: 'faculty' | 'industry') => setSelectedMentorType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faculty">Faculty Mentor</SelectItem>
                    <SelectItem value="industry">Industry Mentor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Meeting Title</Label>
                <Input placeholder="e.g., Weekly Progress Discussion" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Agenda / Purpose</Label>
                <Textarea 
                  placeholder="Briefly describe what you'd like to discuss..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowMeetingDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Request</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="mt-6">
          <Tabs defaultValue="faculty" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="faculty" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Faculty Mentor</span>
              </TabsTrigger>
              <TabsTrigger value="industry" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Industry Mentor</span>
              </TabsTrigger>
            </TabsList>

            {/* Faculty Mentor Chat */}
            <TabsContent value="faculty">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Faculty Mentor</CardTitle>
                      <CardDescription>Prof. Harish Gadade</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {facultyMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.sender === 'student'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newFacultyMessage}
                      onChange={(e) => setNewFacultyMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendFacultyMessage()}
                    />
                    <Button onClick={handleSendFacultyMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Industry Mentor Chat */}
            <TabsContent value="industry">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle>Industry Mentor</CardTitle>
                      <CardDescription>Archit Shelar - Main Flow Services</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {industryMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.sender === 'student'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newIndustryMessage}
                      onChange={(e) => setNewIndustryMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendIndustryMessage()}
                    />
                    <Button onClick={handleSendIndustryMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{meeting.title}</h3>
                        <Badge variant={meeting.status === 'scheduled' ? 'default' : 'secondary'}>
                          {meeting.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          {meeting.with === 'faculty' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Briefcase className="h-4 w-4" />
                          )}
                          <span>
                            {meeting.with === 'faculty' ? 'Faculty Mentor' : 'Industry Mentor'}: {meeting.mentorName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{new Date(meeting.date).toLocaleDateString()} at {meeting.time}</span>
                        </div>
                      </div>
                    </div>
                    {meeting.status === 'scheduled' && meeting.meetingLink && (
                      <Button asChild>
                        <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                          <Video className="mr-2 h-4 w-4" />
                          Join Meeting
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
