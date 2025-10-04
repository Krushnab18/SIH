import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Video, FileText, CheckCircle2, Lock, Play } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Resume Building',
    description: 'Learn to create a professional, ATS-friendly resume',
    progress: 100,
    status: 'completed',
    lessons: [
      { id: 1, title: 'Resume Structure & Format', duration: '15 min', completed: true },
      { id: 2, title: 'Writing Effective Bullet Points', duration: '20 min', completed: true },
      { id: 3, title: 'ATS Optimization Tips', duration: '18 min', completed: true },
    ],
  },
  {
    id: 2,
    title: 'Interview Preparation',
    description: 'Master common interview questions and techniques',
    progress: 60,
    status: 'in-progress',
    lessons: [
      { id: 1, title: 'Behavioral Interview Questions', duration: '25 min', completed: true },
      { id: 2, title: 'Technical Interview Basics', duration: '30 min', completed: true },
      { id: 3, title: 'Mock Interview Practice', duration: '45 min', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Professional Communication',
    description: 'Enhance your email and workplace communication skills',
    progress: 30,
    status: 'in-progress',
    lessons: [
      { id: 1, title: 'Email Etiquette', duration: '15 min', completed: true },
      { id: 2, title: 'Meeting Communication', duration: '20 min', completed: false },
      { id: 3, title: 'Presentation Skills', duration: '25 min', completed: false },
    ],
  },
  {
    id: 4,
    title: 'LinkedIn Profile Optimization',
    description: 'Build a compelling professional presence online',
    progress: 0,
    status: 'locked',
    lessons: [
      { id: 1, title: 'Profile Photo & Headline', duration: '10 min', completed: false },
      { id: 2, title: 'Writing Your Summary', duration: '20 min', completed: false },
      { id: 3, title: 'Networking Strategies', duration: '25 min', completed: false },
    ],
  },
];

const resources = [
  { title: 'Resume Templates', type: 'document', count: 5 },
  { title: 'Interview Question Bank', type: 'document', count: 50 },
  { title: 'Video Tutorials', type: 'video', count: 12 },
];

export default function InternshipPrep() {
  const getStatusBadge = (status: string) => {
    if (status === 'completed') return <Badge variant="success">Completed</Badge>;
    if (status === 'in-progress') return <Badge variant="secondary">In Progress</Badge>;
    return <Badge variant="default">Locked</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Internship Preparation</h1>
        <p className="text-muted-foreground">Comprehensive modules to prepare you for success</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">48%</div>
              <Progress value={48} className="h-2" />
              <p className="text-sm text-muted-foreground">6 of 12 lessons completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Modules Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-success">1</div>
              <p className="text-sm text-muted-foreground">of 4 modules finished</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">3.2h</div>
              <p className="text-sm text-muted-foreground">Total learning time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Learning Modules</h2>
        {modules.map((module) => (
          <Card key={module.id} className="shadow hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    {getStatusBadge(module.status)}
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/10 transition-smooth"
                  >
                    <div className="flex items-center space-x-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : module.status === 'locked' ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Play className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={lesson.completed ? "outline" : "default"}
                      disabled={module.status === 'locked'}
                    >
                      {lesson.completed ? 'Review' : 'Start'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Additional Resources</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {resources.map((resource, idx) => (
            <Card key={idx} className="shadow hover:shadow-lg transition-smooth cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {resource.type === 'video' ? (
                    <Video className="h-6 w-6 text-primary" />
                  ) : resource.type === 'document' ? (
                    <FileText className="h-6 w-6 text-accent" />
                  ) : (
                    <BookOpen className="h-6 w-6 text-success" />
                  )}
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{resource.count} items available</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
