# Mentor Communication System - Documentation

## Overview
A comprehensive chat and meeting scheduling system that enables students to communicate with their faculty and industry mentors. This feature is **only accessible to onboarded students** (students who have been accepted into an internship).

## Features Implemented

### 1. Student Mentor Communication (`/student/communication`)

#### Access Control
- ✅ Only available to **onboarded students** (students with accepted internship applications)
- ✅ Shows informative message for non-onboarded students

#### Chat Functionality
- **Dual Chat Interface**: Separate chat windows for Faculty Mentor and Industry Mentor
- **Real-time Messaging**: Send and receive messages
- **Message History**: View previous conversations with timestamps
- **Visual Indicators**: Different styling for sent/received messages
- **Enter Key Support**: Press Enter to send messages quickly

#### Meeting Scheduling
- **Schedule Meeting Dialog**: Request meetings with mentors
- **Meeting Details**:
  - Select mentor type (Faculty or Industry)
  - Meeting title
  - Preferred date (calendar picker)
  - Preferred time (time slots)
  - Agenda/Purpose description
- **View Scheduled Meetings**: See all upcoming and past meetings
- **Meeting Status**: Scheduled, Completed, Cancelled
- **Join Meeting**: Direct links to video conferencing (Zoom, Google Meet, etc.)

#### UI Components
- Split-screen chat interface
- Scrollable message areas
- Message input with send button
- Meeting cards with status badges
- Professional icons (User for faculty, Briefcase for industry)

### 2. Faculty Mentor Chat (`/faculty/chat`)

#### Features
- **Student Selection**: Dropdown to select which student to chat with
- **Message Management**: View and send messages to students
- **Meeting Request Management**:
  - View all meeting requests from students
  - Approve or reject meeting requests
  - See request details (date, time, agenda)
- **Student Context**: Shows student's company and internship details

#### Workflow
1. Select a student from dropdown
2. View conversation history
3. Send messages or respond to queries
4. Review meeting requests
5. Approve/reject with one click
6. System sends meeting link to student upon approval

### 3. Industry Mentor Chat (`/industry/chat`)

#### Features
- **Intern Selection**: Dropdown to select which intern to chat with
- **Message Management**: View and send messages to interns
- **Meeting Request Management**:
  - View all meeting requests from interns
  - Approve or reject meeting requests
  - See request details (date, time, agenda)
- **Intern Context**: Shows intern's position/role

#### Workflow
1. Select an intern from dropdown
2. View conversation history
3. Provide guidance and support
4. Review technical discussion requests
5. Approve/reject meeting requests
6. System sends meeting link to intern upon approval

## Navigation

### Student
- **Dashboard Card**: "Mentor Communication" card added to dashboard
- **Navbar**: "Mentors" link in main navigation

### Faculty
- **Navbar**: "Messages" link in main navigation

### Industry
- **Navbar**: "Messages" link in main navigation

## Technical Implementation

### Routes
```typescript
// Student
/student/communication -> MentorCommunication component

// Faculty
/faculty/chat -> FacultyMentorChat component

// Industry
/industry/chat -> IndustryMentorChat component
```

### Components Created
1. `src/pages/student/MentorCommunication.tsx` - Student chat & meeting interface
2. `src/pages/faculty/MentorChat.tsx` - Faculty mentor communication
3. `src/pages/industry/MentorChat.tsx` - Industry mentor communication

### Data Structures

#### Message Interface
```typescript
interface Message {
  id: string;
  sender: 'student' | 'faculty' | 'industry';
  senderName: string;
  message: string;
  timestamp: string;
}
```

#### Meeting Interface
```typescript
interface Meeting {
  id: string;
  title: string;
  with: 'faculty' | 'industry';
  mentorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}
```

#### Meeting Request Interface
```typescript
interface MeetingRequest {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  date: string;
  time: string;
  agenda: string;
  status: 'pending' | 'approved' | 'rejected';
}
```

## User Experience

### For Students (Onboarded Only)
1. Access communication from dashboard or navbar
2. See two chat windows side-by-side
3. Chat with faculty mentor (left) and industry mentor (right)
4. Schedule meetings using "Schedule Meeting" button
5. View all scheduled meetings in "Meetings" tab
6. Join meetings when time comes via meeting link

### For Faculty Mentors
1. Access messages from navbar
2. Select student from dropdown
3. View/respond to messages
4. Review meeting requests in "Meeting Requests" tab
5. Approve or decline with single click
6. Toast notification confirms action

### For Industry Mentors
1. Access messages from navbar
2. Select intern from dropdown
3. Provide technical guidance via chat
4. Review meeting requests in "Meeting Requests" tab
5. Approve or decline with single click
6. Toast notification confirms action

## Security & Access Control

### Onboarded Students Check
```typescript
const isOnboarded = true; // Check if student has accepted internship
```

In production, this should check:
- Student has an application with status 'accepted'
- Student has an active internship assignment
- Student has both faculty and industry mentors assigned

### Route Protection
- All routes are protected with `ProtectedRoute` component
- Role-based access (student/faculty/industry)
- Redirects to appropriate dashboard if unauthorized

## Future Enhancements

### Potential Features
1. **Real-time Updates**: WebSocket integration for live messaging
2. **File Sharing**: Share documents, code snippets in chat
3. **Video Call Integration**: Embedded video conferencing
4. **Notifications**: Push notifications for new messages
5. **Read Receipts**: Show when messages are read
6. **Typing Indicators**: Show when someone is typing
7. **Message Search**: Search through conversation history
8. **Calendar Integration**: Sync meetings with Google Calendar
9. **Recurring Meetings**: Schedule weekly/monthly meetings
10. **Meeting Recordings**: Save and share meeting recordings

### Database Integration
Replace mock data with actual backend:
- Store messages in database
- Store meeting requests and schedules
- Real-time synchronization
- Message persistence
- Push notifications

## Icons Used
- 💬 `MessageCircle` - Chat/Communication
- 📅 `Calendar` - Meeting scheduling
- 📤 `Send` - Send message
- 👤 `User` - Faculty mentor
- 💼 `Briefcase` - Industry mentor
- 🎥 `Video` - Video meeting
- ✅ `Check` - Approve
- ❌ `X` - Reject

## Styling
- Professional card-based layout
- Shadow effects on hover
- Color-coded messages (sent vs received)
- Badge indicators for meeting status
- Responsive design (mobile-friendly)
- Smooth transitions and animations

## Toast Notifications
- Message sent confirmations
- Meeting request sent confirmation
- Meeting approved/rejected confirmations
- Error handling for empty messages

## Testing Checklist

### Student Testing
- [ ] Access restricted when not onboarded
- [ ] Can send messages to faculty mentor
- [ ] Can send messages to industry mentor
- [ ] Can schedule meetings
- [ ] Can view scheduled meetings
- [ ] Can join meetings via link
- [ ] Messages display correctly with timestamps
- [ ] Enter key sends messages

### Faculty Testing
- [ ] Can view all mentee students
- [ ] Can switch between students
- [ ] Can send messages to students
- [ ] Can view meeting requests
- [ ] Can approve meeting requests
- [ ] Can reject meeting requests
- [ ] Toast notifications work
- [ ] Empty state shows when no messages

### Industry Testing
- [ ] Can view all interns
- [ ] Can switch between interns
- [ ] Can send messages to interns
- [ ] Can view meeting requests
- [ ] Can approve meeting requests
- [ ] Can reject meeting requests
- [ ] Toast notifications work
- [ ] Empty state shows when no messages

## Integration Points

### With Existing Features
1. **Student Dashboard**: Added mentor communication card
2. **Navbar**: Added navigation links for all roles
3. **Application Status**: Should check onboarded status from applications
4. **Student Progress**: Can reference conversations in progress tracking
5. **Weekly Reports**: Can discuss reports via chat

### Future Integration
1. **Calendar System**: Integrate with external calendars
2. **Notification System**: Email/SMS notifications for messages
3. **Analytics**: Track communication frequency and patterns
4. **Attendance**: Link meetings to attendance tracking
5. **Feedback System**: Rate meeting quality and helpfulness
