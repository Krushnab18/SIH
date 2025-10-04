import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { mockStudentProgress } from '@/data/mockData';
import { Star, FileText, Calendar, Award, TrendingUp, Eye, Download, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentProgress() {
  const students = [
    { id: '1', name: 'Krushna Bankar', company: 'TechCorp Solutions', position: 'Software Intern', grade: 'A+', mentor: 'Archit Shelar' },
    { id: '2', name: 'Akanksha Patil', company: 'TechCorp Solutions', position: 'Frontend Developer', grade: 'A', mentor: 'Archit Shelar' },
    { id: '3', name: 'Mruganksha Kudake', company: 'WebTech Innovations', position: 'UI/UX Designer', grade: 'A+', mentor: 'Archit Shelar' },
    { id: '4', name: 'Shantanu Benake', company: 'CloudScale Systems', position: 'DevOps Intern', grade: 'A', mentor: 'Archit Shelar' },
    { id: '5', name: 'Rohit Chavan', company: 'DataInsights Inc', position: 'Data Analyst', grade: 'B+', mentor: 'Archit Shelar' },
  ];

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const student = mockStudentProgress; // Use mock data for the detailed view
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>('');
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [currentReportId, setCurrentReportId] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [finalGradeDialogOpen, setFinalGradeDialogOpen] = useState(false);
  const [finalGrade, setFinalGrade] = useState<string>('');
  const [finalComments, setFinalComments] = useState<string>('');

  const handleViewReport = (fileUrl: string) => {
    setCurrentPdfUrl(fileUrl);
    setPdfViewerOpen(true);
  };

  const handleDownloadReport = (fileUrl: string, weekNumber: number) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `student_week${weekNumber}_report.pdf`;
    link.click();
    toast.success(`Week ${weekNumber} report downloaded!`);
  };

  const handleViewDetails = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  const handleBackToList = () => {
    setSelectedStudentId(null);
  };

  const handleOpenFeedbackDialog = (reportId: string) => {
    setCurrentReportId(reportId);
    setFeedback('');
    setGrade('');
    setFeedbackDialogOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (!feedback.trim() || !grade) {
      toast.error('Please provide both feedback and grade');
      return;
    }

    // Here you would typically update the backend
    toast.success('Feedback and grade submitted successfully!');
    setFeedbackDialogOpen(false);
    setFeedback('');
    setGrade('');
  };

  const handleOpenFinalGradeDialog = () => {
    setFinalGrade(selectedStudent?.grade || '');
    setFinalComments('');
    setFinalGradeDialogOpen(true);
  };

  const handleSubmitFinalGrade = () => {
    if (!finalGrade || !finalComments.trim()) {
      toast.error('Please provide both final grade and comments');
      return;
    }

    // Here you would typically update the backend
    toast.success('Final grade updated successfully!');
    setFinalGradeDialogOpen(false);
    setFinalGrade('');
    setFinalComments('');
  };

  // Show student list view
  if (!selectedStudentId) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Progress</h1>
          <p className="text-muted-foreground">Monitor and evaluate student internship performance</p>
        </div>

        <div className="grid gap-4">
          {students.map((s) => (
            <Card key={s.id} className="shadow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{s.name}</h3>
                      <p className="text-sm text-muted-foreground">{s.position} at {s.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">Industry Mentor: {s.mentor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Current Grade</p>
                      <Badge variant="success" className="text-base px-3 py-1">
                        {s.grade}
                      </Badge>
                    </div>
                    <Button onClick={() => handleViewDetails(s.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Show detailed student view
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={handleBackToList}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Progress</h1>
          <p className="text-muted-foreground">Detailed view of student performance</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{selectedStudent?.name}</CardTitle>
              <CardDescription className="space-y-1 mt-2">
                <p className="text-base">{selectedStudent?.position} at {selectedStudent?.company}</p>
                <p className="text-sm">Industry Mentor: {selectedStudent?.mentor}</p>
              </CardDescription>
            </div>
            <Badge variant="success" className="text-lg px-4 py-2">
              Grade: {selectedStudent?.grade}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Weekly Reports</TabsTrigger>
          <TabsTrigger value="logbook">Logbook</TabsTrigger>
          <TabsTrigger value="evaluation">Final Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4 mt-6">
          {student.weeklyReports.map((report) => (
            <Card key={report.id} className="shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Week {report.weekNumber}</CardTitle>
                    <CardDescription>
                      <Calendar className="inline mr-1 h-4 w-4" />
                      {report.startDate} to {report.endDate}
                    </CardDescription>
                  </div>
                  <Badge variant={report.status === 'graded' ? 'success' : 'warning'}>
                    {report.status === 'graded' ? `Grade: ${report.grade}` : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Summary</h4>
                  <p className="text-sm text-muted-foreground">{report.summary}</p>
                </div>
                {report.facultyFeedback && (
                  <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                    <h4 className="font-semibold mb-2 text-primary">Faculty Feedback</h4>
                    <p className="text-sm">{report.facultyFeedback}</p>
                  </div>
                )}
                {report.industryFeedback && (
                  <div className="p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                    <h4 className="font-semibold mb-2 text-accent">Industry Mentor Feedback</h4>
                    <p className="text-sm">{report.industryFeedback}</p>
                  </div>
                )}
                {report.status === 'pending' && !report.facultyFeedback && (
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm font-medium text-warning-foreground">
                      📝 This report is awaiting your review and feedback.
                    </p>
                  </div>
                )}
                <div className="flex gap-2">
                  {report.fileUrl && (
                    <>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewReport(report.fileUrl!)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Report
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleDownloadReport(report.fileUrl!, report.weekNumber)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {report.status === 'pending' && !report.facultyFeedback && (
                    <Button 
                      onClick={() => handleOpenFeedbackDialog(report.id)}
                      className="flex-1"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Provide Feedback & Grade
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="logbook" className="space-y-4 mt-6">
          {student.logbookEntries.map((entry) => (
            <Card key={entry.id} className="shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <CardDescription>
                      {new Date(entry.date).toLocaleDateString()} • {entry.hours} hours
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{entry.description}</p>
                <div>
                  <p className="text-sm font-medium mb-2">Skills Practiced:</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6 mt-6">
          {student.finalEvaluation && (
            <>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-accent" />
                    Industry Evaluation
                  </CardTitle>
                  <CardDescription>Performance assessment by {student.mentor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Technical Skills</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < student.finalEvaluation!.technical
                                  ? 'fill-accent text-accent'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Communication</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < student.finalEvaluation!.communication
                                  ? 'fill-accent text-accent'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Teamwork</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < student.finalEvaluation!.teamwork
                                  ? 'fill-accent text-accent'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < student.finalEvaluation!.problemSolving
                                  ? 'fill-accent text-accent'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Overall Comments</h4>
                    <p className="text-sm">{student.finalEvaluation.comments}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-success" />
                        Final Faculty Grade
                      </CardTitle>
                      <CardDescription>Overall assessment and grade assignment</CardDescription>
                    </div>
                    <Button onClick={handleOpenFinalGradeDialog} size="sm">
                      Update Grade
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 bg-success/10 border border-success/20 rounded-lg text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <TrendingUp className="h-6 w-6 text-success" />
                      <span className="text-3xl font-bold text-success">{student.overallGrade}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Outstanding Performance</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center justify-between">
                      <span>Weekly Report Average:</span>
                      <span className="font-medium">A+</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Industry Evaluation:</span>
                      <span className="font-medium">5/5 ⭐</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Logbook Consistency:</span>
                      <span className="font-medium">Excellent</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* PDF Viewer Dialog */}
      <Dialog open={pdfViewerOpen} onOpenChange={setPdfViewerOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Student Report Viewer</DialogTitle>
            <DialogDescription>
              View student's submitted weekly report
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden rounded-md border">
            {currentPdfUrl && (
              <iframe
                src={currentPdfUrl}
                className="w-full h-full"
                title="PDF Viewer"
                style={{ minHeight: '600px' }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Provide Feedback and Grade</DialogTitle>
            <DialogDescription>
              Review the student's weekly report and provide constructive feedback along with a grade
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select a grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+ (Outstanding)</SelectItem>
                  <SelectItem value="A">A (Excellent)</SelectItem>
                  <SelectItem value="B+">B+ (Very Good)</SelectItem>
                  <SelectItem value="B">B (Good)</SelectItem>
                  <SelectItem value="C+">C+ (Satisfactory)</SelectItem>
                  <SelectItem value="C">C (Fair)</SelectItem>
                  <SelectItem value="D">D (Poor)</SelectItem>
                  <SelectItem value="F">F (Fail)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Faculty Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Provide detailed feedback on the student's work, progress, and areas for improvement..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Be constructive and specific in your feedback to help the student improve.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Submit Feedback & Grade
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Final Grade Dialog */}
      <Dialog open={finalGradeDialogOpen} onOpenChange={setFinalGradeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Final Grade</DialogTitle>
            <DialogDescription>
              Provide or update the final grade and overall assessment for the student's internship performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="finalGrade">Final Grade</Label>
              <Select value={finalGrade} onValueChange={setFinalGrade}>
                <SelectTrigger id="finalGrade">
                  <SelectValue placeholder="Select final grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+ (Outstanding - 90-100%)</SelectItem>
                  <SelectItem value="A">A (Excellent - 80-89%)</SelectItem>
                  <SelectItem value="B+">B+ (Very Good - 75-79%)</SelectItem>
                  <SelectItem value="B">B (Good - 70-74%)</SelectItem>
                  <SelectItem value="C+">C+ (Satisfactory - 65-69%)</SelectItem>
                  <SelectItem value="C">C (Fair - 60-64%)</SelectItem>
                  <SelectItem value="D">D (Poor - 50-59%)</SelectItem>
                  <SelectItem value="F">F (Fail - Below 50%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalComments">Overall Assessment Comments</Label>
              <Textarea
                id="finalComments"
                placeholder="Provide a comprehensive assessment of the student's overall internship performance, including strengths, areas for improvement, and future recommendations..."
                value={finalComments}
                onChange={(e) => setFinalComments(e.target.value)}
                rows={10}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This assessment will be part of the student's official internship record.
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Grade Calculation Reference:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Weekly Reports: 40% (Average of all weekly grades)</li>
                <li>• Industry Evaluation: 30% (Based on mentor's assessment)</li>
                <li>• Logbook & Attendance: 15% (Consistency and quality)</li>
                <li>• Final Project/Presentation: 15%</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setFinalGradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFinalGrade}>
              <Award className="mr-2 h-4 w-4" />
              Update Final Grade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
