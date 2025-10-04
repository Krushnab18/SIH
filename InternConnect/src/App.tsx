import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyApplications from "./pages/student/MyApplications";
import Logbook from "./pages/student/Logbook";
import Profile from "./pages/student/Profile";
import WeeklyReports from "./pages/student/WeeklyReports";
import InternshipPrep from "./pages/student/InternshipPrep";
import SoftSkillsMentor from "./pages/student/SoftSkillsMentor";
import MentorCommunication from "./pages/student/MentorCommunication";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import ListingApprovals from "./pages/faculty/ListingApprovals";
import StudentProgress from "./pages/faculty/StudentProgress";
import ReportsAnalytics from "./pages/faculty/ReportsAnalytics";
import FacultyMentorChat from "./pages/faculty/MentorChat";
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import IndustryListings from "./pages/industry/IndustryListings";
import ApplicantViewer from "./pages/industry/ApplicantViewer";
import Evaluations from "./pages/industry/Evaluations";
import IndustryMentorChat from "./pages/industry/MentorChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole?: string }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={`/${user?.role}`} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to={`/${useAuth().user?.role}`} replace /> : <Login />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/applications" element={<ProtectedRoute allowedRole="student"><MyApplications /></ProtectedRoute>} />
        <Route path="/student/logbook" element={<ProtectedRoute allowedRole="student"><Logbook /></ProtectedRoute>} />
        <Route path="/student/reports" element={<ProtectedRoute allowedRole="student"><WeeklyReports /></ProtectedRoute>} />
        <Route path="/student/prep" element={<ProtectedRoute allowedRole="student"><InternshipPrep /></ProtectedRoute>} />
        <Route path="/student/mentor" element={<ProtectedRoute allowedRole="student"><SoftSkillsMentor /></ProtectedRoute>} />
        <Route path="/student/communication" element={<ProtectedRoute allowedRole="student"><MentorCommunication /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRole="student"><Profile /></ProtectedRoute>} />
        
        {/* Faculty Routes */}
        <Route path="/faculty" element={<ProtectedRoute allowedRole="faculty"><FacultyDashboard /></ProtectedRoute>} />
        <Route path="/faculty/listings" element={<ProtectedRoute allowedRole="faculty"><ListingApprovals /></ProtectedRoute>} />
        <Route path="/faculty/students" element={<ProtectedRoute allowedRole="faculty"><StudentProgress /></ProtectedRoute>} />
        <Route path="/faculty/reports" element={<ProtectedRoute allowedRole="faculty"><ReportsAnalytics /></ProtectedRoute>} />
        <Route path="/faculty/chat" element={<ProtectedRoute allowedRole="faculty"><FacultyMentorChat /></ProtectedRoute>} />
        
        {/* Industry Routes */}
        <Route path="/industry" element={<ProtectedRoute allowedRole="industry"><IndustryDashboard /></ProtectedRoute>} />
        <Route path="/industry/listings" element={<ProtectedRoute allowedRole="industry"><IndustryListings /></ProtectedRoute>} />
        <Route path="/industry/applicants" element={<ProtectedRoute allowedRole="industry"><ApplicantViewer /></ProtectedRoute>} />
        <Route path="/industry/evaluations" element={<ProtectedRoute allowedRole="industry"><Evaluations /></ProtectedRoute>} />
        <Route path="/industry/chat" element={<ProtectedRoute allowedRole="industry"><IndustryMentorChat /></ProtectedRoute>} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
