import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Award, Star, Send, GraduationCap, Calendar, 
  TrendingUp, CheckCircle, Clock, Edit, Eye, FileText,
  Briefcase, Mail, Phone, MapPin
} from 'lucide-react';
import { toast } from 'sonner';

interface Intern {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed';
  evaluation?: {
    technical: number;
    communication: number;
    teamwork: number;
    problemSolving: number;
    creativity: number;
    overallRating: number;
    strengths: string;
    improvements: string;
    comments: string;
    wouldHireAgain: boolean;
    submittedDate: string;
  };
}

export default function Evaluations() {
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const [evaluation, setEvaluation] = useState({
    technical: 5,
    communication: 5,
    teamwork: 5,
    problemSolving: 5,
    creativity: 5,
    strengths: '',
    improvements: '',
    comments: '',
    wouldHireAgain: true
  });

  const [interns, setInterns] = useState<Intern[]>([
    {
      id: 'intern-001',
      name: 'Krushna Bankar',
      email: 'krushna.bankar@coep.ac.in',
      phone: '+91 9876543210',
      position: 'Software Development Intern',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      status: 'completed',
      evaluation: {
        technical: 5,
        communication: 5,
        teamwork: 5,
        problemSolving: 5,
        creativity: 4,
        overallRating: 4.8,
        strengths: 'Excellent problem-solving skills, quick learner, proactive in taking initiatives. Strong technical foundation and ability to work independently.',
        improvements: 'Could improve presentation skills and public speaking. More focus on documentation practices.',
        comments: 'Krushna has been an exceptional intern. He consistently delivered high-quality work, showed great enthusiasm, and was a valuable team member. We would definitely consider him for future opportunities.',
        wouldHireAgain: true,
        submittedDate: '2024-07-20'
      }
    },
    {
      id: 'intern-002',
      name: 'Akanksha Patil',
      email: 'akanksha.patil@coep.ac.in',
      phone: '+91 9876543211',
      position: 'Frontend Developer Intern',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      status: 'completed',
      evaluation: {
        technical: 5,
        communication: 5,
        teamwork: 5,
        problemSolving: 4,
        creativity: 5,
        overallRating: 4.8,
        strengths: 'Outstanding UI/UX skills, creative problem solver, excellent communication. Great attention to detail and design aesthetics.',
        improvements: 'Backend integration knowledge could be strengthened. More exposure to system design concepts.',
        comments: 'Akanksha brought fresh perspectives to our design challenges. Her work on the user interface significantly improved user engagement.',
        wouldHireAgain: true,
        submittedDate: '2024-08-05'
      }
    },
    {
      id: 'intern-003',
      name: 'Shantanu Benake',
      email: 'shantanu.benake@coep.ac.in',
      phone: '+91 9876543212',
      position: 'Full Stack Developer Intern',
      startDate: '2024-03-01',
      status: 'active'
    },
    {
      id: 'intern-004',
      name: 'Rohit Chavan',
      email: 'rohit.chavan@coep.ac.in',
      phone: '+91 9876543213',
      position: 'Backend Developer Intern',
      startDate: '2024-03-15',
      status: 'active'
    },
    {
      id: 'intern-005',
      name: 'Mruganksha Navale',
      email: 'mruganksha.navale@coep.ac.in',
      phone: '+91 9876543214',
      position: 'Data Analytics Intern',
      startDate: '2024-01-10',
      endDate: '2024-07-10',
      status: 'completed'
    }
  ]);

  const filteredInterns = interns.filter(intern => {
    if (filter === 'all') return true;
    if (filter === 'pending') return intern.status === 'completed' && !intern.evaluation;
    if (filter === 'completed') return intern.evaluation !== undefined;
    return true;
  });

  const handleSubmitEvaluation = () => {
    if (!selectedIntern) return;

    const overallRating = (
      evaluation.technical +
      evaluation.communication +
      evaluation.teamwork +
      evaluation.problemSolving +
      evaluation.creativity
    ) / 5;

    setInterns(prev => prev.map(intern =>
      intern.id === selectedIntern.id
        ? {
            ...intern,
            evaluation: {
              ...evaluation,
              overallRating: Math.round(overallRating * 10) / 10,
              submittedDate: new Date().toISOString()
            }
          }
        : intern
    ));

    toast.success(`Evaluation submitted for ${selectedIntern.name}!`);
    setShowEvaluationDialog(false);
    resetEvaluationForm();
  };

  const resetEvaluationForm = () => {
    setEvaluation({
      technical: 5,
      communication: 5,
      teamwork: 5,
      problemSolving: 5,
      creativity: 5,
      strengths: '',
      improvements: '',
      comments: '',
      wouldHireAgain: true
    });
  };

  const getStatusBadge = (intern: Intern) => {
    if (intern.evaluation) {
      return <Badge variant="success">Evaluated</Badge>;
    }
    if (intern.status === 'completed') {
      return <Badge variant="warning">Pending Evaluation</Badge>;
    }
    return <Badge variant="secondary">Active</Badge>;
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Intern Evaluations</h1>
        <p className="text-muted-foreground">Provide feedback and evaluate intern performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interns</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Interns</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interns.filter(i => i.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Evaluations</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interns.filter(i => i.evaluation).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interns.filter(i => i.status === 'completed' && !i.evaluation).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs value={filter} onValueChange={(value: any) => setFilter(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">
                All ({interns.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({interns.filter(i => i.status === 'completed' && !i.evaluation).length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({interns.filter(i => i.evaluation).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Interns List */}
      <div className="space-y-4">
        {filteredInterns.map((intern) => (
          <Card key={intern.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{intern.name}</CardTitle>
                    {getStatusBadge(intern)}
                  </div>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{intern.position}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {intern.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {intern.phone}
                      </div>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Internship Duration */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Start: {new Date(intern.startDate).toLocaleDateString()}</span>
                </div>
                {intern.endDate && (
                  <div className="flex items-center gap-2">
                    <span>End: {new Date(intern.endDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Evaluation Preview or Action */}
              {intern.evaluation ? (
                <div className="space-y-3">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-success flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Evaluation Completed
                      </p>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="text-xl font-bold">{intern.evaluation.overallRating}/5</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Technical</p>
                        {renderStarRating(intern.evaluation.technical)}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Communication</p>
                        {renderStarRating(intern.evaluation.communication)}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Teamwork</p>
                        {renderStarRating(intern.evaluation.teamwork)}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Problem Solving</p>
                        {renderStarRating(intern.evaluation.problemSolving)}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Creativity</p>
                        {renderStarRating(intern.evaluation.creativity)}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(intern.evaluation.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedIntern(intern);
                      setShowViewDialog(true);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Evaluation
                  </Button>
                </div>
              ) : intern.status === 'completed' ? (
                <div className="space-y-3">
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="font-medium mb-1 flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-warning" />
                      Internship Completed - Evaluation Pending
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please provide feedback and evaluation for this intern's performance.
                    </p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedIntern(intern);
                      setShowEvaluationDialog(true);
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Provide Evaluation
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium mb-1 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-blue-500" />
                    Internship In Progress
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Evaluation will be available once the internship is completed.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredInterns.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No interns in this category
            </CardContent>
          </Card>
        )}
      </div>

      {/* Evaluation Form Dialog */}
      <Dialog open={showEvaluationDialog} onOpenChange={setShowEvaluationDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Performance Evaluation</DialogTitle>
            <DialogDescription>
              Provide comprehensive feedback for {selectedIntern?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Rating Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Performance Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['technical', 'communication', 'teamwork', 'problemSolving', 'creativity'] as const).map((category) => (
                  <div key={category} className="space-y-2">
                    <Label className="capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()} (1-5 ⭐)
                    </Label>
                    <Select
                      value={evaluation[category].toString()}
                      onValueChange={(value) => setEvaluation({ ...evaluation, [category]: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {'⭐'.repeat(num)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Detailed Feedback</h3>
              
              <div className="space-y-2">
                <Label>Key Strengths</Label>
                <Textarea
                  placeholder="Highlight the intern's main strengths and achievements..."
                  rows={3}
                  value={evaluation.strengths}
                  onChange={(e) => setEvaluation({ ...evaluation, strengths: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Areas for Improvement</Label>
                <Textarea
                  placeholder="Suggest areas where the intern can improve..."
                  rows={3}
                  value={evaluation.improvements}
                  onChange={(e) => setEvaluation({ ...evaluation, improvements: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Overall Comments</Label>
                <Textarea
                  placeholder="Provide comprehensive feedback about the intern's overall performance..."
                  rows={4}
                  value={evaluation.comments}
                  onChange={(e) => setEvaluation({ ...evaluation, comments: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Would you hire this intern again?</Label>
                <Select
                  value={evaluation.wouldHireAgain.toString()}
                  onValueChange={(value) => setEvaluation({ ...evaluation, wouldHireAgain: value === 'true' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">✅ Yes, definitely</SelectItem>
                    <SelectItem value="false">❌ No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowEvaluationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitEvaluation} className="bg-success hover:bg-success/90">
                <Send className="mr-2 h-4 w-4" />
                Submit Evaluation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Evaluation Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Evaluation Details</DialogTitle>
            <DialogDescription>
              Complete performance evaluation for {selectedIntern?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedIntern?.evaluation && (
            <div className="space-y-6">
              {/* Overall Rating */}
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <span className="text-4xl font-bold">{selectedIntern.evaluation.overallRating}/5</span>
                </div>
                <p className="text-sm text-muted-foreground">Overall Rating</p>
              </div>

              {/* Individual Ratings */}
              <div className="space-y-3">
                <h3 className="font-semibold">Performance Breakdown</h3>
                {[
                  { label: 'Technical Skills', value: selectedIntern.evaluation.technical },
                  { label: 'Communication', value: selectedIntern.evaluation.communication },
                  { label: 'Teamwork', value: selectedIntern.evaluation.teamwork },
                  { label: 'Problem Solving', value: selectedIntern.evaluation.problemSolving },
                  { label: 'Creativity', value: selectedIntern.evaluation.creativity }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    {renderStarRating(item.value)}
                  </div>
                ))}
              </div>

              {/* Detailed Feedback */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Strengths</h4>
                  <p className="text-sm text-muted-foreground">{selectedIntern.evaluation.strengths}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                  <p className="text-sm text-muted-foreground">{selectedIntern.evaluation.improvements}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Overall Comments</h4>
                  <p className="text-sm text-muted-foreground">{selectedIntern.evaluation.comments}</p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Would hire again:</span>
                  <Badge variant={selectedIntern.evaluation.wouldHireAgain ? 'success' : 'destructive'}>
                    {selectedIntern.evaluation.wouldHireAgain ? '✅ Yes' : '❌ No'}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground pt-2 border-t">
                  Submitted on {new Date(selectedIntern.evaluation.submittedDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
