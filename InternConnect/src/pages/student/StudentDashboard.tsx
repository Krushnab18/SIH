import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, FileText, TrendingUp, Award, ArrowRight, Sparkles, Eye, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockListings, mockApplications } from '@/data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const myApplications = mockApplications.filter(app => app.studentId === user?.id);
  const recommendedInternship = mockListings[0];
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
      applied: 'secondary',
      shortlisted: 'warning',
      'interview-scheduled': 'warning',
      offered: 'success',
      accepted: 'success',
      rejected: 'default',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">{user?.institution}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myApplications.length}</div>
            <p className="text-xs text-muted-foreground">Track your progress</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logbook Entries</CardTitle>
            <FileText className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Total entries logged</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Verified</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Python, API Design +2</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <CardTitle>AI Recommended for You</CardTitle>
            </div>
            <CardDescription>Based on your profile and interests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">{recommendedInternship.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{recommendedInternship.company}</p>
              <p className="text-sm mb-3">{recommendedInternship.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recommendedInternship.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{recommendedInternship.title}</DialogTitle>
                      <DialogDescription className="text-lg">{recommendedInternship.company}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-muted-foreground">{recommendedInternship.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendedInternship.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Location</h4>
                        <p className="text-muted-foreground">{recommendedInternship.location}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Duration</h4>
                        <p className="text-muted-foreground">{recommendedInternship.duration}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Link to="/student/applications" className="flex-1">
                  <Button className="w-full">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track your internship applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myApplications.length > 0 ? (
              myApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{app.listingTitle}</h4>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                  </div>
                  <Badge variant={getStatusBadge(app.status)}>
                    {app.status.replace('-', ' ')}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No applications yet</p>
            )}
            <Link to="/student/applications">
              <Button variant="outline" className="w-full">
                View All Applications
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/student/logbook">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <FileText className="h-8 w-8 text-success mb-2" />
              <CardTitle>Digital Logbook</CardTitle>
              <CardDescription>Log your daily activities and learnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Open Logbook
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/student/reports">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Weekly Reports</CardTitle>
              <CardDescription>Submit reports and view mentor feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/student/profile">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <Award className="h-8 w-8 text-accent mb-2" />
              <CardTitle>My Profile</CardTitle>
              <CardDescription>View your skills and verified experience</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/student/communication">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full border-primary/30">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Mentor Communication</CardTitle>
              <CardDescription>Chat with faculty and industry mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Open Messages
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/student/prep">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <Briefcase className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Internship Preparation</CardTitle>
              <CardDescription>Master interviews, resumes, and professional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/student/mentor">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <Sparkles className="h-8 w-8 text-accent mb-2" />
              <CardTitle>AI Soft Skills Mentor</CardTitle>
              <CardDescription>Get personalized guidance on professional development</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Chat with Mentor
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
