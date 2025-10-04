import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Video, Calendar as CalendarIcon, Send, User, Check, X, Bell } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'student' | 'faculty';
  senderName: string;
  message: string;
  timestamp: string;
}

interface Student {
  id: string;
  name: string;
  company: string;
}

interface MeetingRequest {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  date: string;
  time: string;
  agenda: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function FacultyMentorChat() {
    const students = [
    { id: '1', name: 'Krushna Bankar', company: 'TechCorp Solutions' },
    { id: '2', name: 'Akanksha Patil', company: 'TechCorp Solutions' },
    { id: '3', name: 'Mruganksha Kudake', company: 'WebTech Innovations' },
    { id: '4', name: 'Shantanu Benake', company: 'CloudScale Systems' },
    { id: '5', name: 'Rohit Chavan', company: 'DataInsights Inc' },
  ];

  const [selectedStudent, setSelectedStudent] = useState<string>(students[0].id);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1',
        sender: 'student',
        senderName: 'Krushna',
        message: 'Good morning Professor! I have a question about this week\'s report.',
        timestamp: '2025-10-03 10:30',
      },
      {
        id: '2',
        sender: 'faculty',
        senderName: 'You',
        message: 'Good morning Krushna! Sure, what would you like to discuss?',
        timestamp: '2025-10-03 11:15',
      },
      {
        id: '3',
        sender: 'student',
        senderName: 'Krushna',
        message: 'I wanted to clarify the requirements for the technical documentation section.',
        timestamp: '2025-10-03 11:20',
      },
    ],
    '2': [
      {
        id: '1',
        sender: 'student',
        senderName: 'Akanksha',
        message: 'Hi Professor! I need some guidance on my project.',
        timestamp: '2025-10-02 14:20',
      },
      {
        id: '2',
        sender: 'student',
        senderName: 'Akanksha',
        message: 'Could we schedule a meeting to discuss the architecture?',
        timestamp: '2025-10-02 14:25',
      },
    ],
    '3': [
      {
        id: '1',
        sender: 'student',
        senderName: 'Mruganksha',
        message: 'Hello Professor! Could you review my weekly report?',
        timestamp: '2025-10-01 11:00',
      },
    ],
    '4': [
      {
        id: '1',
        sender: 'faculty',
        senderName: 'You',
        message: 'Hi Shantanu! How is your internship going?',
        timestamp: '2025-09-30 16:30',
      },
    ],
    '5': [],
  });

  // Track unread message counts
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({
    '1': 1,
    '2': 2,
    '3': 1,
    '4': 0,
    '5': 0,
  });

  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([
    {
      id: '1',
      studentId: '1',
      studentName: 'Krushna Bankar',
      title: 'Weekly Progress Review',
      date: '2025-10-05',
      time: '10:00 AM',
      agenda: 'Discuss progress on API integration project and next steps',
      status: 'pending',
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'Akanksha Patil',
      title: 'Project Guidance',
      date: '2025-10-06',
      time: '2:00 PM',
      agenda: 'Need help with React component architecture for my project',
      status: 'pending',
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Mruganksha Kudake',
      title: 'Report Review',
      date: '2025-10-07',
      time: '11:00 AM',
      agenda: 'Review and feedback on Week 4 report submission',
      status: 'pending',
    },
    {
      id: '4',
      studentId: '4',
      studentName: 'Shantanu Benake',
      title: 'Career Discussion',
      date: '2025-10-08',
      time: '3:30 PM',
      agenda: 'Discuss career opportunities and higher education options',
      status: 'approved',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const currentStudent = students.find(s => s.id === selectedStudent);
  const currentMessages = messages[selectedStudent] || [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'faculty',
      senderName: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setMessages({
      ...messages,
      [selectedStudent]: [...currentMessages, message],
    });
    setNewMessage('');
    toast.success('Message sent to student');
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
    // Clear unread count when opening chat
    setUnreadCounts({
      ...unreadCounts,
      [studentId]: 0,
    });
  };

  const getLastMessage = (studentId: string) => {
    const studentMessages = messages[studentId] || [];
    if (studentMessages.length === 0) return 'No messages yet';
    const lastMsg = studentMessages[studentMessages.length - 1];
    return lastMsg.message.length > 50 
      ? lastMsg.message.substring(0, 50) + '...'
      : lastMsg.message;
  };

  const getLastMessageTime = (studentId: string) => {
    const studentMessages = messages[studentId] || [];
    if (studentMessages.length === 0) return '';
    const lastMsg = studentMessages[studentMessages.length - 1];
    const timestamp = new Date(lastMsg.timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  // Count pending meeting requests
  const pendingMeetingsCount = meetingRequests.filter(r => r.status === 'pending').length;

  const handleApproveMeeting = (requestId: string) => {
    setMeetingRequests(
      meetingRequests.map(req =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );
    toast.success('Meeting request approved! Meeting link will be sent to student.');
  };

  const handleRejectMeeting = (requestId: string) => {
    setMeetingRequests(
      meetingRequests.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
    toast.success('Meeting request rejected.');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Communications</h1>
        <p className="text-muted-foreground">Chat with your mentees and manage meeting requests</p>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages" className="relative">
            Messages
            {Object.values(unreadCounts).reduce((a, b) => a + b, 0) > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="meetings" className="relative">
            Meeting Requests
            {pendingMeetingsCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {pendingMeetingsCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="mt-6">
          <div className="grid md:grid-cols-3 gap-4 h-[600px]">
            {/* Student List - WhatsApp style */}
            <Card className="md:col-span-1 shadow-lg overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg">Students</CardTitle>
              </CardHeader>
              <ScrollArea className="h-[520px]">
                <div className="space-y-1">
                  {students.map((student) => {
                    const unread = unreadCounts[student.id] || 0;
                    const isActive = selectedStudent === student.id;
                    
                    return (
                      <div
                        key={student.id}
                        onClick={() => handleStudentSelect(student.id)}
                        className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-accent ${
                          isActive ? 'bg-accent' : ''
                        }`}
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium truncate ${unread > 0 ? 'font-bold' : ''}`}>
                              {student.name}
                            </h4>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {getLastMessageTime(student.id)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className={`text-xs truncate ${unread > 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                              {getLastMessage(student.id)}
                            </p>
                            {unread > 0 && (
                              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs flex-shrink-0">
                                {unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </Card>

            {/* Chat Area - WhatsApp style */}
            <Card className="md:col-span-2 shadow-lg flex flex-col">
              <CardHeader className="pb-3 border-b">
                {currentStudent && (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{currentStudent.name}</CardTitle>
                      <CardDescription className="text-xs">{currentStudent.company}</CardDescription>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-16">
                        <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No messages yet. Start a conversation!</p>
                      </div>
                    ) : (
                      currentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'faculty' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[75%] rounded-lg p-3 ${
                              msg.sender === 'faculty'
                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                : 'bg-muted rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'faculty' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-background">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4 mt-6">
          {meetingRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <CardTitle className="mb-2">No Meeting Requests</CardTitle>
              <CardDescription>
                Meeting requests from students will appear here
              </CardDescription>
            </Card>
          ) : (
            meetingRequests.map((request) => (
              <Card key={request.id} className="shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{request.title}</h3>
                        <Badge
                          variant={
                            request.status === 'approved'
                              ? 'success'
                              : request.status === 'rejected'
                              ? 'destructive'
                              : 'warning'
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>Student: {request.studentName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            Requested: {new Date(request.date).toLocaleDateString()} at {request.time}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="font-medium text-foreground">Agenda:</p>
                          <p className="text-muted-foreground">{request.agenda}</p>
                        </div>
                      </div>
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-success/10 hover:bg-success/20"
                          onClick={() => handleApproveMeeting(request.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-destructive/10 hover:bg-destructive/20"
                          onClick={() => handleRejectMeeting(request.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
