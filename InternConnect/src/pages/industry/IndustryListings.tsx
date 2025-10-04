import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Briefcase, MapPin, DollarSign, Calendar, Users, Edit, Trash2, 
  Plus, Eye, Clock, CheckCircle, XCircle 
} from 'lucide-react';
import { toast } from 'sonner';

interface Listing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  postedDate: string;
  status: 'active' | 'inactive' | 'pending' | 'closed';
  applicationsCount: number;
}

export default function IndustryListings() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const [listings] = useState<Listing[]>([
    {
      id: 'listing-001',
      title: 'Software Development Intern',
      company: 'TechCorp Solutions',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      duration: '6 months',
      stipend: '₹15,000 - ₹20,000/month',
      description: 'Looking for a passionate software development intern to join our dynamic team. You will work on real-world projects using modern technologies.',
      requirements: [
        'Strong knowledge of Java/Python',
        'Understanding of Data Structures and Algorithms',
        'Good problem-solving skills',
        'Team player with good communication'
      ],
      postedDate: '2024-01-15',
      status: 'active',
      applicationsCount: 12
    },
    {
      id: 'listing-002',
      title: 'Frontend Developer Intern',
      company: 'TechCorp Solutions',
      location: 'Remote',
      type: 'Part-time',
      duration: '3 months',
      stipend: '₹10,000 - ₹15,000/month',
      description: 'Join our frontend team to build modern, responsive web applications using React and TypeScript.',
      requirements: [
        'Proficiency in React.js',
        'Experience with HTML, CSS, JavaScript',
        'Knowledge of Tailwind CSS (preferred)',
        'Portfolio of previous projects'
      ],
      postedDate: '2024-01-20',
      status: 'active',
      applicationsCount: 8
    },
    {
      id: 'listing-003',
      title: 'Data Analytics Intern',
      company: 'TechCorp Solutions',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      duration: '6 months',
      stipend: '₹12,000 - ₹18,000/month',
      description: 'Work with our data team to analyze business metrics and create insightful visualizations.',
      requirements: [
        'Knowledge of Python (Pandas, NumPy)',
        'Experience with SQL',
        'Data visualization skills (Tableau/Power BI)',
        'Statistical analysis basics'
      ],
      postedDate: '2024-01-10',
      status: 'closed',
      applicationsCount: 15
    }
  ]);

  const handleCreateListing = () => {
    toast.success('Listing created and sent for faculty approval!');
    setShowCreateDialog(false);
  };

  const handleEditListing = () => {
    toast.success('Listing updated successfully!');
    setShowEditDialog(false);
  };

  const handleDeleteListing = (listingId: string) => {
    toast.success('Listing deleted successfully!');
  };

  const handleToggleStatus = (listingId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast.success(`Listing ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'pending': return 'warning';
      case 'closed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Listings</h1>
          <p className="text-muted-foreground">Manage your internship postings</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Listing
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listings.filter(l => l.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listings.reduce((acc, l) => acc + l.applicationsCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listings.filter(l => l.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listings Grid */}
      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{listing.title}</CardTitle>
                    <Badge variant={getStatusColor(listing.status)} className="capitalize">
                      {getStatusIcon(listing.status)}
                      <span className="ml-1">{listing.status}</span>
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {listing.company} • Posted on {new Date(listing.postedDate).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{listing.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{listing.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{listing.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{listing.applicationsCount} Applications</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {listing.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedListing(listing);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleToggleStatus(listing.id, listing.status)}
                  disabled={listing.status === 'pending' || listing.status === 'closed'}
                >
                  {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleDeleteListing(listing.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button className="ml-auto">
                  <Eye className="mr-2 h-4 w-4" />
                  View Applications ({listing.applicationsCount})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Listing Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
            <DialogDescription>
              Fill in the details for your new internship posting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input placeholder="e.g., Software Development Intern" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="e.g., Pune, Maharashtra" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Input placeholder="e.g., Full-time" />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input placeholder="e.g., 6 months" />
              </div>
              <div className="space-y-2">
                <Label>Stipend</Label>
                <Input placeholder="e.g., ₹15,000/month" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              <Textarea 
                placeholder="List the skills, qualifications, and requirements (one per line)..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateListing}>
                <Plus className="mr-2 h-4 w-4" />
                Create Listing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Listing Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogDescription>
              Update the details of your internship posting
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input defaultValue={selectedListing.title} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input defaultValue={selectedListing.location} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input defaultValue={selectedListing.type} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input defaultValue={selectedListing.duration} />
                </div>
                <div className="space-y-2">
                  <Label>Stipend</Label>
                  <Input defaultValue={selectedListing.stipend} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  defaultValue={selectedListing.description}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Requirements</Label>
                <Textarea 
                  defaultValue={selectedListing.requirements.join('\n')}
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditListing}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update Listing
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
