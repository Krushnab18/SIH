import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockWeeklyReports } from '@/data/mockData';
import { Plus, FileText, Calendar, Upload, MessageSquare, Eye, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function WeeklyReports() {
  const [reports] = useState(mockWeeklyReports);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>('');

  const handleSubmitReport = () => {
    toast.success('Weekly report submitted successfully!');
    setIsDialogOpen(false);
  };

  const handleViewReport = (fileUrl: string) => {
    setCurrentPdfUrl(fileUrl);
    setPdfViewerOpen(true);
  };

  const handleDownloadReport = (fileUrl: string, weekNumber: number) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `week${weekNumber}_report.pdf`;
    link.click();
    toast.success(`Week ${weekNumber} report downloaded!`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Weekly Reports</h1>
          <p className="text-muted-foreground">Submit and track your weekly progress reports</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Weekly Report</DialogTitle>
              <DialogDescription>
                Summarize your weekly activities and upload supporting documents
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Weekly Summary</Label>
                <Textarea 
                  id="summary" 
                  placeholder="Describe your key activities, accomplishments, and learnings this week..."
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Upload Report (PDF/PPT)</Label>
                <Input id="file" type="file" accept=".pdf,.ppt,.pptx" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitReport}>Submit Report</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="shadow hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-xl">Week {report.weekNumber}</CardTitle>
                    <Badge variant={report.status === 'graded' ? 'success' : 'secondary'}>
                      {report.status === 'graded' ? `Grade: ${report.grade}` : 'Pending Review'}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Summary
                </h4>
                <p className="text-muted-foreground">{report.summary}</p>
              </div>

              {report.facultyFeedback && (
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2 flex items-center text-primary">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Faculty Mentor Feedback
                  </h4>
                  <p className="text-foreground">{report.facultyFeedback}</p>
                </div>
              )}

              {report.industryFeedback && (
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold mb-2 flex items-center text-accent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Industry Mentor Feedback
                  </h4>
                  <p className="text-foreground">{report.industryFeedback}</p>
                </div>
              )}

              {report.status === 'pending' && !report.facultyFeedback && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ⏳ Your report has been submitted and is awaiting review from your faculty mentor.
                  </p>
                </div>
              )}

              {report.fileUrl && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewReport(report.fileUrl!)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Submitted Report
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleDownloadReport(report.fileUrl!, report.weekNumber)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PDF Viewer Dialog */}
      <Dialog open={pdfViewerOpen} onOpenChange={setPdfViewerOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Report Viewer</DialogTitle>
            <DialogDescription>
              View your submitted weekly report
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
    </div>
  );
}
