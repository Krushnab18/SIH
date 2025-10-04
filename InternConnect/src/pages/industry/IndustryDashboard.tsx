import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IndustryDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">{user?.designation} at {user?.company}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Currently posted</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Candidates applied</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected Interns</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Currently onboarded</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/5</div>
            <p className="text-xs text-muted-foreground">Excellent rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Active Interns</CardTitle>
            <CardDescription>Currently working at your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">Krushna Bankar</h4>
                <p className="text-sm text-muted-foreground">Software Intern • COEP</p>
              </div>
              <Button variant="outline" size="sm">View Progress</Button>
            </div>
            <Link to="/industry/applicants">
              <Button variant="outline" className="w-full">
                View All Applicants
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-success mt-1.5" />
              <div>
                <p className="font-medium">Intern evaluation completed</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
              <div>
                <p className="font-medium">Offer accepted by candidate</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-accent mt-1.5" />
              <div>
                <p className="font-medium">Listing approved by faculty</p>
                <p className="text-xs text-muted-foreground">2 weeks ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/industry/listings">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <Briefcase className="h-8 w-8 text-primary mb-2" />
              <CardTitle>My Listings</CardTitle>
              <CardDescription>Manage your internship postings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Listings
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/industry/applicants">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <Users className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Applicants</CardTitle>
              <CardDescription>Review and manage applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Applicants
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/industry/evaluations">
          <Card className="shadow hover:shadow-lg transition-smooth cursor-pointer h-full">
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-success mb-2" />
              <CardTitle>Evaluations</CardTitle>
              <CardDescription>Provide feedback on interns</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Evaluations
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
