# Sample Resume

This directory contains a sample resume file (`sample-resume.html`) that is used throughout the InternConnect application for demonstration purposes.

## File Details

- **File Name:** `sample-resume.html`
- **File Type:** HTML Resume (can be viewed in browser)
- **Size:** ~7.7 KB
- **Student:** Krushna Bankar (Sample Profile)

## Resume Content

The sample resume includes:

### 📋 Sections
1. **Header** - Name, Contact Info, LinkedIn, GitHub
2. **Education** - COEP Technological University, B.Tech Computer Engineering
3. **Experience** - Two internship experiences:
   - Software Development Intern at TechCorp Solutions (Current)
   - Web Development Intern at StartupXYZ (Summer 2023)
4. **Projects** - Three major projects:
   - InternConnect Platform
   - E-Commerce Application
   - AI Chatbot Assistant
5. **Technical Skills** - 14+ technologies including:
   - JavaScript, TypeScript, React.js, Node.js
   - Python, Java, SQL, MongoDB, PostgreSQL
   - Git, REST APIs, Docker, AWS
6. **Achievements & Certifications** - 5 major accomplishments
7. **Extracurricular Activities** - Leadership and contributions

### 🎨 Design Features
- Professional blue color scheme (#1e40af, #2563eb)
- Clean, modern layout with proper spacing
- Responsive design (max-width: 800px)
- Organized sections with icons
- Skill tags with pill-shaped badges
- Clear hierarchy with proper typography

## Usage in Application

The resume is used in the following pages:

### Industry Dashboard - Applicant Viewer
- **Location:** `/industry/applicants`
- **Feature:** Resume viewer dialog with iframe
- **Actions:** 
  - View Resume (in-app viewer)
  - Download Resume
  - Open in New Tab

All applicants in the demo data use this sample resume file for consistency.

## Accessing the Resume

### In Development
The resume can be accessed at:
```
http://localhost:5173/sample-resume.html
```

### In the Application
The resume is displayed in an iframe within a dialog when:
1. Viewing applicant details
2. Clicking "View Resume" button
3. During the hiring process review

## File Location
```
/home/krushna/InternConnect/public/sample-resume.html
```

## Technical Details

The resume is a standalone HTML file with:
- Inline CSS styling
- No external dependencies
- Fully self-contained
- Print-friendly layout
- Accessible and semantic HTML

## Future Enhancements

To integrate real PDF resumes:
1. Replace `.html` with actual `.pdf` files
2. Update `resumeUrl` in applicant data
3. Consider using a PDF viewer library like `react-pdf`
4. Implement file upload functionality for students
5. Store resumes in cloud storage (e.g., Supabase Storage, AWS S3)

## Notes

- This is a sample/demo file for development and testing
- In production, actual student resumes should be used
- Consider implementing resume validation and virus scanning
- Ensure GDPR/privacy compliance when handling real resumes
