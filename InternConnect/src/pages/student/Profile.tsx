import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, Download, FileText, Award, Briefcase, GraduationCap, Github, Linkedin, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export default function Profile() {
  const { user } = useAuth();
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const verifiedSkills = ['Python', 'API Design', 'Data Structures', 'Teamwork'];
  const internshipExperience = {
    title: 'Software Intern',
    company: 'Main Flow Services and Technologies Pvt. Ltd.',
    location: 'Pune, Maharashtra',
    duration: 'Jun 2025 - Aug 2025',
    achievements: [
      'Developed proficiency in Python, including command-line usage and exploration of advanced data structures',
      'Built a mini tool to fetch and display data from public APIs, focusing on parsing complex JSON responses and handling edge cases',
    ],
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/sample-resume.pdf';
    link.download = `${user?.name.replace(/\s+/g, '_')}_Resume.pdf`;
    link.click();
  };

  const handleViewResume = () => {
    setShowPdfViewer(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">View your professional profile and generate resume</p>
        </div>
        <Button onClick={() => setShowResumeDialog(true)} className="bg-gradient-primary">
          <FileText className="mr-2 h-4 w-4" />
          Create Resume
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">Computer Engineering Student</p>
                <p className="text-xs text-muted-foreground">{user?.institution}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                <span>linkedin.com/in/krushna-bankar</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Github className="h-4 w-4 text-muted-foreground" />
                <span>github.com/krushna-bankar</span>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Award className="mr-2 h-4 w-4 text-accent" />
                Verified Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {verifiedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center">
                    <CheckCircle className="mr-1 h-3 w-3 text-success" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">COEP Technological University, Pune</h3>
                <p className="text-muted-foreground">B.Tech in Computer Engineering</p>
                <p className="text-sm text-muted-foreground">Expected Graduation: 2027</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Class XII (MSBSHSE, 2023)</p>
                  <p className="font-semibold">84.83%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Class X (MSBSHSE, 2021)</p>
                  <p className="font-semibold">93.60%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-success" />
                Internship Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{internshipExperience.title}</h3>
                    <p className="text-muted-foreground">{internshipExperience.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {internshipExperience.location} | {internshipExperience.duration}
                    </p>
                  </div>
                  <Badge variant="success">Completed</Badge>
                </div>
                <ul className="space-y-2 mt-3">
                  {internshipExperience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Verified Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {verifiedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center">
                        <CheckCircle className="mr-1 h-3 w-3 text-success" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Order Matching Engine - DSA</h3>
                <ul className="space-y-1 mt-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Developed a high-performance order matching engine simulating stock exchange operations with a FIFO algorithm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Processed over 1 million trading orders with microsecond-precision</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
            <DialogDescription>
              Your professional resume with verified internship experience
            </DialogDescription>
          </DialogHeader>
          <div className="bg-white text-black p-8 space-y-4 font-sans">
            <div className="text-center border-b-2 border-black pb-4">
              <h1 className="text-2xl font-bold">KRUSHNA LAHANUBHAU BANKAR</h1>
              <p className="text-sm">
                Pune, Maharashtra | krushna.bankar@email.com | linkedin.com/in/krushna-bankar | github.com/krushna-bankar
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold border-b border-black mb-2">EDUCATION</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-semibold">COEP Technological University, Pune — B.Tech in Computer Engineering</p>
                  <p>Expected Graduation: 2027</p>
                </div>
                <p>Class XII: 84.83% (MSBSHSE, 2023)</p>
                <p>Class X: 93.60% (MSBSHSE, 2021)</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold border-b border-black mb-2">INTERNSHIPS</h2>
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-semibold">Software Intern | Main Flow Services and Technologies Pvt. Ltd. (via InternConnect Platform)</p>
                  <p className="italic">Pune, Maharashtra | Jun 2025 - Aug 2025</p>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Developed proficiency in Python, including command-line usage and exploration of advanced data structures</li>
                  <li>Built a mini tool to fetch and display data from public APIs, focusing on parsing complex JSON responses and handling edge cases</li>
                </ul>
                <p className="font-semibold">Verified Skills: Python, API Design, Data Structures, Teamwork</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold border-b border-black mb-2">TECHNICAL SKILLS</h2>
              <div className="text-sm space-y-1">
                <p><span className="font-semibold">Languages:</span> Java, Python, JavaScript, C, C++</p>
                <p><span className="font-semibold">Web Technologies:</span> HTML, CSS, Django</p>
                <p><span className="font-semibold">Tools & Platforms:</span> Git, GitHub</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold border-b border-black mb-2">PROJECTS</h2>
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-semibold">Order Matching Engine - DSA</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Developed a high-performance order matching engine simulating stock exchange operations with a FIFO algorithm</li>
                    <li>Processed over 1 million trading orders with microsecond-precision, handling partial fills and maintaining price-time priority</li>
                    <li>Built the complete trading workflow, including CSV data parsing, real-time matching, and transaction recording</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold border-b border-black mb-2">ACHIEVEMENTS</h2>
              <div className="text-sm space-y-1">
                <p>Scholarship: Cummins Scholar (Nov 2024)</p>
                <p>Test Scores: MHT-CET: 99.87 Percentile | JEE: 95.39 Percentile</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowResumeDialog(false)}>Close</Button>
            <Button variant="outline" onClick={handleViewResume}>
              <FileText className="mr-2 h-4 w-4" />
              View as PDF
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Viewer Dialog */}
      <Dialog open={showPdfViewer} onOpenChange={setShowPdfViewer}>
        <DialogContent className="max-w-4xl h-[85vh]">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
            <DialogDescription>
              Preview your resume before downloading
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden rounded-md border">
            <iframe
              src="/sample-resume.pdf"
              className="w-full h-full"
              title="Resume PDF Viewer"
              style={{ minHeight: '650px' }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowPdfViewer(false)}>Close</Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
