import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Building2, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  MessageSquare,
  BarChart3
} from "lucide-react";

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Seamless Connection",
      description: "Connect students, faculty, and industry professionals in one unified platform."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Digital Logbook",
      description: "Track internship progress with comprehensive digital logbooks and reporting."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Skill Development",
      description: "AI-powered mentoring and skill verification for career advancement."
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: "Secure Platform",
      description: "Enterprise-grade security ensuring safe data handling and privacy."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      title: "Analytics & Reports",
      description: "Comprehensive analytics for tracking progress and performance insights."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-indigo-600" />,
      title: "Real-time Communication",
      description: "Built-in messaging system for seamless mentor-student interaction."
    }
  ];

  const userTypes = [
    {
      type: "Students",
      icon: <GraduationCap className="h-12 w-12 text-blue-600" />,
      description: "Discover internships, track progress, and develop skills",
      features: ["Find Perfect Internships", "Digital Logbook", "AI Mentoring", "Skill Verification"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      type: "Faculty",
      icon: <Users className="h-12 w-12 text-green-600" />,
      description: "Monitor student progress and approve opportunities",
      features: ["Student Monitoring", "Approval System", "Progress Analytics", "Communication Hub"],
      color: "bg-green-50 border-green-200"
    },
    {
      type: "Industry",
      icon: <Building2 className="h-12 w-12 text-purple-600" />,
      description: "Post opportunities and evaluate talented candidates",
      features: ["Post Internships", "Evaluate Applications", "Track Performance", "Direct Communication"],
      color: "bg-purple-50 border-purple-200"
    }
  ];

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to continue your {user?.role} journey?
            </p>
            <Link to={`/${user?.role}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">InternConnect</span>
            </div>
            <Link to="/login">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">
              🚀 Revolutionizing Internship Management
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Connect. Learn. <span className="text-blue-600">Grow.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              InternConnect is the ultimate platform bridging students, educational institutions, 
              and industry partners for seamless internship management and career development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Built for Everyone in the Ecosystem
            </h2>
            <p className="text-lg text-gray-600">
              Tailored experiences for students, faculty, and industry professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <Card key={index} className={`${userType.color} hover:shadow-lg transition-shadow duration-300`}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {userType.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{userType.type}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {userType.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {userType.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Success
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage internships effectively
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How InternConnect Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to transform your internship experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account as a student, faculty, or industry partner</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Find the perfect match between students and opportunities</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor internship journey with digital tools and analytics</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Succeed</h3>
              <p className="text-gray-600">Achieve career goals with verified skills and experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Internship Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students, faculty, and industry professionals already using InternConnect
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Start Your Journey Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">InternConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              Unified Internship Management Platform
            </p>
            <p className="text-sm text-gray-500">
              © 2025 InternConnect. Built for Smart India Hackathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
