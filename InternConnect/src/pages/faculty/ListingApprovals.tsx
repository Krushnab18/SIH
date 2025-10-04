import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Building, MapPin, Calendar, Award } from 'lucide-react';
import { toast } from 'sonner';

export default function ListingApprovals() {
  const [listings, setListings] = useState([
    {
      id: 'listing-1',
      title: 'Software Intern',
      company: 'Main Flow Services and Technologies Pvt. Ltd.',
      location: 'Pune, Maharashtra',
      duration: 'Jun 2025 - Aug 2025',
      description: 'Join our dynamic team to work on cutting-edge software development projects. You will gain hands-on experience with Python, API development, and modern data structures.',
      requirements: [
        'Currently pursuing B.Tech in Computer Science or related field',
        'Strong foundation in programming fundamentals',
        'Enthusiasm to learn and adapt',
        'Good communication skills'
      ],
      skills: ['Python', 'API Design', 'Data Structures', 'Teamwork'],
      status: 'pending',
      postedBy: 'Kavita Singh',
      postedDate: '2025-01-15',
    },
  ]);

  const handleApprove = (id: string) => {
    setListings(listings.map(l => l.id === id ? { ...l, status: 'approved' } : l));
    toast.success('Listing approved successfully!');
  };

  const handleReject = (id: string) => {
    toast.error('Listing rejected');
    setListings(listings.filter(l => l.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Listing Approvals</h1>
        <p className="text-muted-foreground">Review and approve internship postings from companies</p>
      </div>

      <div className="space-y-4">
        {listings.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="h-16 w-16 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No pending listings to review</p>
            </CardContent>
          </Card>
        ) : (
          listings.map((listing) => (
            <Card key={listing.id} className="shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-2xl">{listing.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center space-x-2 text-base">
                        <Building className="h-4 w-4" />
                        <span>{listing.company}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {listing.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {listing.duration}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge variant={listing.status === 'approved' ? 'success' : 'warning'}>
                    {listing.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {listing.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold">Skills Required</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {listing.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    Posted by {listing.postedBy} on {new Date(listing.postedDate).toLocaleDateString()}
                  </p>
                  {listing.status === 'pending' && (
                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => handleApprove(listing.id)}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Listing
                      </Button>
                      <Button 
                        onClick={() => handleReject(listing.id)}
                        variant="destructive"
                        className="flex-1"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {listing.status === 'approved' && (
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center text-success">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        <span className="font-medium">This listing has been approved and is now live!</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
