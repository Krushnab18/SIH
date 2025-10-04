import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  UserCheck, Calendar, Award, Star, Send, GraduationCap, 
  ClipboardList, Video, Clock, Eye, Download, CheckCircle, 
  XCircle, Mail, Phone, Code, Briefcase
} from 'lucide-react';
import { toast } from 'sonner';

interface Applicant {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  institution: string;
  listingTitle: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'test-assigned' | 'test-completed' | 'interview-scheduled' | 'interviewed' | 'accepted' | 'rejected';
  resumeUrl?: string;
  skills: string[];
  testScore?: number;
  testStatus?: 'pending' | 'completed' | 'passed' | 'failed';
  interviewDate?: string;
  interviewFeedback?: string;
  finalEvaluation?: {
    technical: number;
    communication: number;
    teamwork: number;
    problemSolving: number;
    comments: string;
  };
}

export default function ApplicantViewer() {
  const [filter, setFilter] = useState<string>('all');
  const [showShortlistDialog, setShowShortlistDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [currentResumeUrl, setCurrentResumeUrl] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState(['', '', '']);
  
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    duration: '60',
    deadline: '',
    testLink: ''
  });

  const [evaluation, setEvaluation] = useState({
    technical: 5,
    communication: 5,
    teamwork: 5,
    problemSolving: 5,
    comments: ''
  });

  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 'app-001',
      studentName: 'Krushna Bankar',
      email: 'krushna@example.com',
      phone: '+91 9876543210',
      institution: 'COEP Technological University',
      listingTitle: 'Software Development Intern',
      appliedDate: '2024-01-15',
      status: 'applied',
      resumeUrl: '/sample-resume.html',
      skills: ['Python', 'Java', 'React', 'Data Structures']
    },
    {
      id: 'app-002',
      studentName: 'Akansha Patil',
      email: 'akansha@example.com',
      phone: '+91 9876543211',
      institution: 'COEP Technological University',
      listingTitle: 'Software Development Intern',
      appliedDate: '2024-01-16',
      status: 'shortlisted',
      resumeUrl: '/sample-resume.html',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js']
    },
    {
      id: 'app-003',
      studentName: 'Shantanu Benake',
      email: 'shantanu@example.com',
      phone: '+91 9876543212',
      institution: 'COEP Technological University',
      listingTitle: 'Frontend Developer Intern',
      appliedDate: '2024-01-17',
      status: 'test-assigned',
      resumeUrl: '/sample-resume.html',
      skills: ['React', 'CSS', 'Tailwind', 'JavaScript'],
      testStatus: 'pending'
    },
    {
      id: 'app-004',
      studentName: 'Rohit Chavan',
      email: 'rohit@example.com',
      phone: '+91 9876543213',
      institution: 'COEP Technological University',
      listingTitle: 'Software Development Intern',
      appliedDate: '2024-01-18',
      status: 'test-completed',
      resumeUrl: '/sample-resume.html',
      skills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
      testScore: 85,
      testStatus: 'passed'
    },
    {
      id: 'app-005',
      studentName: 'Mruganksha Kudake',
      email: 'mruganksha@example.com',
      phone: '+91 9876543214',
      institution: 'COEP Technological University',
      listingTitle: 'Data Analytics Intern',
      appliedDate: '2024-01-19',
      status: 'interview-scheduled',
      resumeUrl: '/sample-resume.html',
      skills: ['Python', 'Pandas', 'SQL', 'Power BI'],
      testScore: 92,
      testStatus: 'passed',
      interviewDate: '2024-01-25 10:00 AM'
    }
  ]);

  const filteredApplicants = applicants.filter(app => filter === 'all' || app.status === filter);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; label: string }> = {
      'applied': { variant: 'secondary', label: 'Applied' },
      'shortlisted': { variant: 'warning', label: 'Shortlisted' },
      'test-assigned': { variant: 'default', label: 'Test Assigned' },
      'test-completed': { variant: 'default', label: 'Test Completed' },
      'interview-scheduled': { variant: 'default', label: 'Interview Scheduled' },
      'interviewed': { variant: 'default', label: 'Interviewed' },
      'accepted': { variant: 'success', label: 'Accepted' },
      'rejected': { variant: 'destructive', label: 'Rejected' }
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleShortlist = (applicant: Applicant) => {
    setApplicants(prev => prev.map(app => 
      app.id === applicant.id ? { ...app, status: 'shortlisted' as const } : app
    ));
    toast.success(`${applicant.studentName} has been shortlisted!`);
    setShowShortlistDialog(false);
  };

  const handleAssignTest = () => {
    if (!selectedApplicant) return;
    setApplicants(prev => prev.map(app => 
      app.id === selectedApplicant.id 
        ? { ...app, status: 'test-assigned' as const, testStatus: 'pending' as const } 
        : app
    ));
    toast.success(`Test assigned to ${selectedApplicant.studentName}!`);
    setShowTestDialog(false);
    setTestDetails({ title: '', description: '', duration: '60', deadline: '', testLink: '' });
  };

  const handleScheduleInterview = () => {
    if (!selectedApplicant) return;
    setApplicants(prev => prev.map(app => 
      app.id === selectedApplicant.id 
        ? { ...app, status: 'interview-scheduled' as const, interviewDate: timeSlots[0] } 
        : app
    ));
    toast.success(`Interview scheduled with ${selectedApplicant.studentName}!`);
    setShowInterviewDialog(false);
    setTimeSlots(['', '', '']);
  };

  const handleSubmitEvaluation = () => {
    if (!selectedApplicant) return;
    setApplicants(prev => prev.map(app => 
      app.id === selectedApplicant.id 
        ? { ...app, status: 'accepted' as const, finalEvaluation: evaluation } 
        : app
    ));
    toast.success(`Evaluation submitted for ${selectedApplicant.studentName}!`);
    setShowEvaluationDialog(false);
    setEvaluation({ technical: 5, communication: 5, teamwork: 5, problemSolving: 5, comments: '' });
  };

  const handleReject = (applicant: Applicant) => {
    setApplicants(prev => prev.map(app => 
      app.id === applicant.id ? { ...app, status: 'rejected' as const } : app
    ));
    toast.error(`${applicant.studentName} has been rejected.`);
  };

  const getNextAction = (applicant: Applicant) => {
    switch (applicant.status) {
      case 'applied':
        return (
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => { setSelectedApplicant(applicant); setShowShortlistDialog(true); }}
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Shortlist Candidate
            </Button>
            <Button variant="destructive" onClick={() => handleReject(applicant)}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        );
      
      case 'shortlisted':
        return (
          <div className="space-y-3">
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="font-medium mb-1">✅ Candidate Shortlisted</p>
              <p className="text-sm text-muted-foreground">Next: Assign a technical test</p>
            </div>
            <Button 
              className="w-full"
              onClick={() => { setSelectedApplicant(applicant); setShowTestDialog(true); }}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Assign Technical Test
            </Button>
          </div>
        );
      
      case 'test-assigned':
        return (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium mb-1 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              Test Assigned - Waiting for Completion
            </p>
            <p className="text-sm text-muted-foreground">The candidate has been notified about the test.</p>
          </div>
        );
      
      case 'test-completed':
        return (
          <div className="space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium mb-1 flex items-center text-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Test Completed - Score: {applicant.testScore}%
              </p>
              <p className="text-sm text-muted-foreground">
                {applicant.testStatus === 'passed' ? '✅ Passed - Ready for interview' : '❌ Failed to meet threshold'}
              </p>
            </div>
            {applicant.testStatus === 'passed' && (
              <Button 
                className="w-full"
                onClick={() => { setSelectedApplicant(applicant); setShowInterviewDialog(true); }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
            )}
          </div>
        );
      
      case 'interview-scheduled':
        return (
          <div className="space-y-3">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="font-medium mb-1 flex items-center">
                <Video className="mr-2 h-4 w-4 text-primary" />
                Interview Scheduled
              </p>
              <p className="text-sm"><span className="font-medium">Date & Time:</span> {applicant.interviewDate}</p>
            </div>
            <Button 
              className="w-full"
              onClick={() => {
                setApplicants(prev => prev.map(app => 
                  app.id === applicant.id ? { ...app, status: 'interviewed' as const } : app
                ));
                toast.success('Interview marked as completed!');
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark Interview as Completed
            </Button>
          </div>
        );
      
      case 'interviewed':
        return (
          <div className="space-y-3">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="font-medium mb-1 text-purple-700">Interview Completed</p>
              {applicant.interviewFeedback && (
                <p className="text-sm text-muted-foreground mt-2">{applicant.interviewFeedback}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-success hover:bg-success/90"
                onClick={() => { setSelectedApplicant(applicant); setShowEvaluationDialog(true); }}
              >
                <Award className="mr-2 h-4 w-4" />
                Accept & Evaluate
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleReject(applicant)}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          </div>
        );
      
      case 'accepted':
        return (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="font-medium mb-1 flex items-center text-success">
              <Award className="mr-2 h-4 w-4" />
              Onboarded Successfully
            </p>
            {applicant.finalEvaluation && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs font-medium mb-2">Final Evaluation:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Technical: {applicant.finalEvaluation.technical}/5 ⭐</div>
                  <div>Communication: {applicant.finalEvaluation.communication}/5 ⭐</div>
                  <div>Teamwork: {applicant.finalEvaluation.teamwork}/5 ⭐</div>
                  <div>Problem Solving: {applicant.finalEvaluation.problemSolving}/5 ⭐</div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'rejected':
        return (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="font-medium flex items-center text-destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Application Rejected
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Applicant Management</h1>
        <p className="text-muted-foreground">Complete hiring workflow from application to onboarding</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="all">All ({applicants.length})</TabsTrigger>
              <TabsTrigger value="applied">Applied ({applicants.filter(a => a.status === 'applied').length})</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted ({applicants.filter(a => a.status === 'shortlisted').length})</TabsTrigger>
              <TabsTrigger value="test-assigned">Test Assigned</TabsTrigger>
              <TabsTrigger value="test-completed">Test Done</TabsTrigger>
              <TabsTrigger value="interview-scheduled">Interview</TabsTrigger>
              <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredApplicants.map((applicant) => (
          <Card key={applicant.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{applicant.studentName}</CardTitle>
                    {getStatusBadge(applicant.status)}
                  </div>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Applied for: {applicant.listingTitle}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {applicant.institution}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {applicant.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {applicant.phone}
                      </div>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      <Code className="mr-1 h-3 w-3" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {applicant.resumeUrl && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => { setCurrentResumeUrl(applicant.resumeUrl!); setShowResumeViewer(true); }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Resume
                  </Button>
                  <Button variant="outline" onClick={() => toast.success('Resume downloaded!')}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {getNextAction(applicant)}
            </CardContent>
          </Card>
        ))}

        {filteredApplicants.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No applicants in this category
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <Dialog open={showShortlistDialog} onOpenChange={setShowShortlistDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Shortlisting</DialogTitle>
            <DialogDescription>Are you sure you want to shortlist {selectedApplicant?.studentName}?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">After shortlisting, you'll be able to assign a technical test.</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowShortlistDialog(false)}>Cancel</Button>
              <Button onClick={() => selectedApplicant && handleShortlist(selectedApplicant)}>
                <UserCheck className="mr-2 h-4 w-4" />
                Confirm Shortlist
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Technical Test</DialogTitle>
            <DialogDescription>Create and assign a test to {selectedApplicant?.studentName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Test Title</Label>
              <Input 
                placeholder="e.g., React Developer Assessment"
                value={testDetails.title}
                onChange={(e) => setTestDetails({...testDetails, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Describe the test..."
                rows={3}
                value={testDetails.description}
                onChange={(e) => setTestDetails({...testDetails, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input 
                  type="number"
                  placeholder="60"
                  value={testDetails.duration}
                  onChange={(e) => setTestDetails({...testDetails, duration: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input 
                  type="datetime-local"
                  value={testDetails.deadline}
                  onChange={(e) => setTestDetails({...testDetails, deadline: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Test Link (Optional)</Label>
              <Input 
                placeholder="https://testplatform.com/test/123"
                value={testDetails.testLink}
                onChange={(e) => setTestDetails({...testDetails, testLink: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowTestDialog(false)}>Cancel</Button>
              <Button onClick={handleAssignTest}>
                <ClipboardList className="mr-2 h-4 w-4" />
                Assign Test
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showInterviewDialog} onOpenChange={setShowInterviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>Propose three time slots for {selectedApplicant?.studentName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {timeSlots.map((slot, index) => (
              <div key={index} className="space-y-2">
                <Label>Time Slot {index + 1}</Label>
                <Input
                  type="datetime-local"
                  value={slot}
                  onChange={(e) => {
                    const newSlots = [...timeSlots];
                    newSlots[index] = e.target.value;
                    setTimeSlots(newSlots);
                  }}
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowInterviewDialog(false)}>Cancel</Button>
              <Button onClick={handleScheduleInterview}>
                <Send className="mr-2 h-4 w-4" />
                Send to Candidate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEvaluationDialog} onOpenChange={setShowEvaluationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Final Evaluation & Offer</DialogTitle>
            <DialogDescription>Provide evaluation for {selectedApplicant?.studentName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {(['technical', 'communication', 'teamwork', 'problemSolving'] as const).map((field) => (
                <div key={field} className="space-y-2">
                  <Label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} (1-5 ⭐)</Label>
                  <Select 
                    value={evaluation[field].toString()}
                    onValueChange={(value) => setEvaluation({...evaluation, [field]: parseInt(value)})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} {'⭐'.repeat(num)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Overall Comments</Label>
              <Textarea 
                placeholder="Provide feedback..."
                rows={5}
                value={evaluation.comments}
                onChange={(e) => setEvaluation({...evaluation, comments: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEvaluationDialog(false)}>Cancel</Button>
              <Button onClick={handleSubmitEvaluation} className="bg-success hover:bg-success/90">
                <Award className="mr-2 h-4 w-4" />
                Accept & Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showResumeViewer} onOpenChange={setShowResumeViewer}>
        <DialogContent className="max-w-4xl h-[85vh]">
          <DialogHeader>
            <DialogTitle>Resume Viewer</DialogTitle>
            <DialogDescription>
              Review the candidate's resume and qualifications
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden rounded-md border bg-white" style={{ height: 'calc(85vh - 120px)' }}>
            {currentResumeUrl && (
              <iframe
                src={currentResumeUrl}
                className="w-full h-full"
                title="Resume Viewer"
                style={{ border: 'none' }}
              />
            )}
          </div>
          <div className="flex justify-between items-center pt-2">
            <a 
              href={currentResumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <Eye className="h-4 w-4" />
              Open in New Tab
            </a>
            <Button variant="outline" onClick={() => setShowResumeViewer(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
