import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { 
  Brain, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, 
  MessageSquare, Lightbulb, Target, Zap, ArrowUp, ArrowDown, ArrowRight,
  Building2, GraduationCap, Send, Eye
} from 'lucide-react';
import { mockCurriculumFeedback, mockSkillAnalytics, mockCurriculumInsights } from '@/data/mockData';
import { toast } from 'sonner';

export default function ReportsAnalytics() {
  const [selectedInsight, setSelectedInsight] = useState(mockCurriculumInsights[0]);
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<typeof mockCurriculumFeedback[0] | null>(null);
  const [responseText, setResponseText] = useState('');
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);

  const filteredFeedback = mockCurriculumFeedback.filter(feedback => 
    feedbackFilter === 'all' || feedback.status === feedbackFilter
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (trendDirection: string) => {
    switch (trendDirection) {
      case 'increasing': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'decreasing': return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <ArrowRight className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const handleViewFeedback = (feedback: typeof mockCurriculumFeedback[0]) => {
    setSelectedFeedback(feedback);
    setResponseText('');
    setResponseDialogOpen(true);
  };

  const handleRespondToFeedback = () => {
    if (!responseText.trim()) {
      toast.error('Please provide a response');
      return;
    }
    toast.success('Response saved! Feedback marked as reviewed.');
    setResponseDialogOpen(false);
    setResponseText('');
  };

  const implementRecommendation = (insightId: string) => {
    toast.success('Recommendation marked for implementation in curriculum planning.');
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d8'];

  // Prepare chart data
  const skillGapData = mockSkillAnalytics.map(skill => ({
    name: skill.skill.length > 12 ? skill.skill.substring(0, 12) + '...' : skill.skill,
    'Student Level': skill.studentProficiency,
    'Industry Expectation': skill.industryExpectation,
  }));

  const demandTrendData = mockSkillAnalytics.map((skill, idx) => ({
    name: skill.skill.length > 10 ? skill.skill.substring(0, 10) + '...' : skill.skill,
    demand: skill.demandScore,
    proficiency: skill.studentProficiency,
    id: `skill-${idx}`
  }));

  const feedbackByType = mockCurriculumFeedback.reduce((acc, feedback) => {
    acc[feedback.feedbackType] = (acc[feedback.feedbackType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(feedbackByType).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count
  }));

  const radarData = mockSkillAnalytics.slice(0, 6).map(skill => ({
    skill: skill.skill.length > 10 ? skill.skill.substring(0, 10) + '...' : skill.skill,
    'Current': skill.studentProficiency,
    'Required': skill.industryExpectation,
  }));

  const categoryInsights = mockCurriculumInsights.reduce((acc, insight) => {
    acc[insight.category] = (acc[insight.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const insightCategoryData = Object.entries(categoryInsights).map(([category, count]) => ({
    name: category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    value: count
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">AI-powered curriculum insights and industry feedback analysis</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <Brain className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-sm font-medium">AI Analysis Active</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCurriculumFeedback.length}</div>
            <p className="text-xs text-muted-foreground">From students & industry</p>
            <Progress value={66} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCurriculumFeedback.filter(f => f.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting faculty response</p>
            <Progress 
              value={(mockCurriculumFeedback.filter(f => f.status === 'pending').length / mockCurriculumFeedback.length) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
            <Lightbulb className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCurriculumInsights.length}</div>
            <p className="text-xs text-muted-foreground">Generated recommendations</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+3 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Skill Gaps</CardTitle>
            <Target className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSkillAnalytics.filter(s => s.gapAnalysis > 30).length}
            </div>
            <p className="text-xs text-muted-foreground">Immediate attention needed</p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="ai-insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ai-insights">
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="h-4 w-4 mr-2" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="skill-analytics">
            <Target className="h-4 w-4 mr-2" />
            Skill Analytics
          </TabsTrigger>
          <TabsTrigger value="trends">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Insights List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Curriculum Insights</CardTitle>
                  <CardDescription>Recommendations based on feedback analysis and skill gaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {mockCurriculumInsights.map((insight) => (
                        <Card 
                          key={insight.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${selectedInsight.id === insight.id ? 'border-primary shadow-md' : ''}`}
                          onClick={() => setSelectedInsight(insight)}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                {insight.impact === 'high' && <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />}
                                {insight.impact === 'medium' && <Zap className="h-5 w-5 text-orange-500 mt-1" />}
                                {insight.impact === 'low' && <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />}
                                <div className="flex-1">
                                  <CardTitle className="text-base">{insight.title}</CardTitle>
                                  <CardDescription className="mt-2">{insight.description}</CardDescription>
                                </div>
                              </div>
                              <Badge variant={getPriorityColor(insight.impact)}>
                                {insight.impact}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                <span className={getImpactColor(insight.impact)}>
                                  {insight.impact} impact
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{insight.affectedStudents} students</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {insight.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Selected Insight Details */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">Insight Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Insight</h4>
                    <p className="text-sm text-muted-foreground">{selectedInsight.title}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedInsight.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">AI Recommendation</h4>
                    <p className="text-sm text-muted-foreground">{selectedInsight.aiRecommendation}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Implementation Plan</h4>
                    <ul className="space-y-2">
                      {selectedInsight.implementationPlan.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Impact Level</span>
                      <span className={`font-semibold ${getImpactColor(selectedInsight.impact)}`}>
                        {selectedInsight.impact.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Affected Students</span>
                      <span className="font-semibold">{selectedInsight.affectedStudents}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-semibold">{selectedInsight.confidence}%</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => implementRecommendation(selectedInsight.id)}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Implement Recommendation
                  </Button>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Insights by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={insightCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {insightCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="flex gap-2 mb-4">
            <Button 
              variant={feedbackFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setFeedbackFilter('all')}
            >
              All ({mockCurriculumFeedback.length})
            </Button>
            <Button 
              variant={feedbackFilter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFeedbackFilter('pending')}
            >
              Pending ({mockCurriculumFeedback.filter(f => f.status === 'pending').length})
            </Button>
            <Button 
              variant={feedbackFilter === 'reviewed' ? 'default' : 'outline'}
              onClick={() => setFeedbackFilter('reviewed')}
            >
              Reviewed ({mockCurriculumFeedback.filter(f => f.status === 'reviewed').length})
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Curriculum Feedback</CardTitle>
                  <CardDescription>From students and industry mentors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {filteredFeedback.map((feedback) => (
                        <Card key={feedback.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {feedback.submitterType === 'student' ? 
                                  <GraduationCap className="h-5 w-5 text-blue-500 mt-1" /> :
                                  <Building2 className="h-5 w-5 text-purple-500 mt-1" />
                                }
                                <div>
                                  <CardTitle className="text-base">{feedback.submittedBy}</CardTitle>
                                  <CardDescription>{feedback.submittedDate}</CardDescription>
                                </div>
                              </div>
                              <Badge variant={feedback.status === 'pending' ? 'secondary' : 'outline'}>
                                {feedback.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <Badge variant="outline" className="mb-2">
                                {feedback.feedbackType}
                              </Badge>
                              <p className="text-sm">{feedback.description}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleViewFeedback(feedback)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details & Respond
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Feedback by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Response Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Response Rate</span>
                      <span className="font-semibold">
                        {Math.round((mockCurriculumFeedback.filter(f => f.status === 'reviewed').length / mockCurriculumFeedback.length) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(mockCurriculumFeedback.filter(f => f.status === 'reviewed').length / mockCurriculumFeedback.length) * 100} 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Avg. Response Time</span>
                      <span className="font-semibold">2.3 days</span>
                    </div>
                    <Progress value={70} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Skill Analytics Tab */}
        <TabsContent value="skill-analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Analysis</CardTitle>
                <CardDescription>Student proficiency vs industry expectations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={skillGapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Student Level" fill="#82ca9d" />
                    <Bar dataKey="Industry Expectation" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Radar Overview</CardTitle>
                <CardDescription>Competency profile comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current Level" dataKey="Current" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="Required Level" dataKey="Required" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Detailed Skill Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {mockSkillAnalytics.map((skill, idx) => (
                      <Card key={`skill-${idx}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">{skill.skill}</CardTitle>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(skill.trendDirection)}
                              <Badge variant={skill.gapAnalysis > 30 ? 'destructive' : skill.gapAnalysis > 15 ? 'secondary' : 'outline'}>
                                Gap: {skill.gapAnalysis}%
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Student Proficiency</span>
                              <span className="font-medium">{skill.studentProficiency}%</span>
                            </div>
                            <Progress value={skill.studentProficiency} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Industry Expectation</span>
                              <span className="font-medium">{skill.industryExpectation}%</span>
                            </div>
                            <Progress value={skill.industryExpectation} className="h-2" />
                          </div>
                          <div className="flex items-center gap-2 text-xs pt-2">
                            <Badge variant="outline" className="text-xs">Demand: {skill.demandScore}/100</Badge>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{skill.trendDirection}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Priority Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockSkillAnalytics
                      .filter(s => s.gapAnalysis > 25)
                      .slice(0, 5)
                      .map((skill, idx) => (
                        <div key={`priority-${idx}`} className="p-3 border rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{skill.skill}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {skill.gapAnalysis}% gap needs immediate attention
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Add advanced React modules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Include Docker workshops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Expand cloud computing content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Real-world TypeScript projects</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Demand vs Proficiency Trends</CardTitle>
              <CardDescription>Industry demand compared to student proficiency levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={demandTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="demand" stroke="#8884d8" strokeWidth={2} name="Industry Demand" />
                  <Line type="monotone" dataKey="proficiency" stroke="#82ca9d" strokeWidth={2} name="Student Proficiency" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  Rising Demand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockSkillAnalytics
                    .filter(s => s.trendDirection === 'increasing')
                    .slice(0, 5)
                    .map((skill, idx) => (
                      <li key={`rising-${idx}`} className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{skill.skill}</span>
                          <span className="font-medium text-green-500">+{skill.demandScore}%</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                  Stable Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockSkillAnalytics
                    .filter(s => s.trendDirection === 'stable')
                    .slice(0, 5)
                    .map((skill, idx) => (
                      <li key={`stable-${idx}`} className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{skill.skill}</span>
                          <span className="font-medium text-gray-500">{skill.demandScore}%</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  Declining Demand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockSkillAnalytics
                    .filter(s => s.trendDirection === 'decreasing')
                    .slice(0, 5)
                    .map((skill, idx) => (
                      <li key={`declining-${idx}`} className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{skill.skill}</span>
                          <span className="font-medium text-red-500">-{skill.gapAnalysis}%</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Trend Insights</CardTitle>
              <CardDescription>Generated from industry data and feedback analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCurriculumInsights.slice(0, 3).map((insight) => (
                  <div key={insight.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{insight.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                    <Badge variant={getPriorityColor(insight.impact)}>
                      {insight.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feedback Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feedback Details & Response</DialogTitle>
            <DialogDescription>
              Review and respond to curriculum feedback
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  {selectedFeedback.submitterType === 'student' ? 
                    <GraduationCap className="h-4 w-4 text-blue-500" /> :
                    <Building2 className="h-4 w-4 text-purple-500" />
                  }
                  <span className="font-medium">{selectedFeedback.submittedBy}</span>
                  <Badge variant="outline">{selectedFeedback.feedbackType}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedFeedback.submittedDate}</p>
                <p className="text-sm">{selectedFeedback.description}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Response</label>
                <Textarea
                  placeholder="Provide your response to this feedback..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRespondToFeedback}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
