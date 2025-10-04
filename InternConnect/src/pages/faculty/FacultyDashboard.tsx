import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileCheck, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">{user?.designation} at {user?.institution}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Internship listings</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Currently mentoring</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports to Grade</CardTitle>
            <FileCheck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Weekly reports pending</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">Excellent overall</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-success/10">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <h4 className="font-medium">All caught up!</h4>
                  <p className="text-sm text-muted-foreground">No pending actions at the moment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>My Students</CardTitle>
            <CardDescription>Currently mentoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">Krushna Bankar</h4>
                <p className="text-sm text-muted-foreground">TechCorp Solutions • Software Intern</p>
              </div>
              <Badge variant="success">A+</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">Shantanu Benake</h4>
                <p className="text-sm text-muted-foreground">TechCorp Solutions • Frontend Developer</p>
              </div>
              <Badge variant="success">A</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">Rohit Chavan</h4>
                <p className="text-sm text-muted-foreground">WebTech Innovations • UI/UX Designer</p>
              </div>
              <Badge variant="success">A+</Badge>
            </div>
            <Link to="/faculty/students">
              <Button variant="outline" className="w-full">
                View All Students
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/faculty/listings">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <FileCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Listing Approvals</CardTitle>
              <CardDescription>Review and approve internship postings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Listings
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/faculty/students">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <Users className="h-8 w-8 text-success mb-2" />
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Monitor and grade student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Students
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/faculty/reports">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>View program statistics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
