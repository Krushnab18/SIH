# Civic Issue Reporting Application - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by SeeClickFix and 311 civic engagement apps, focusing on trust-building through clean, accessible design that encourages citizen participation.

## Core Design Principles
- **Trust & Transparency**: Clean, government-friendly aesthetic that builds citizen confidence
- **Mobile-First Accessibility**: Optimized for on-the-go issue reporting
- **Action-Oriented**: Prominent CTAs that encourage civic engagement
- **Status Clarity**: Clear visual hierarchy for issue tracking and updates

## Color Palette

### Light Mode
- **Primary**: 142 69% 18% (civic green - authority and environmental focus)
- **Secondary**: 207 75% 32% (trust blue - reliability and municipal connection)
- **Background**: 0 0% 96% (light grey - clean, neutral canvas)
- **Text**: 0 0% 13% (dark grey - high readability)
- **Status Orange**: 36 100% 50% (progress indicator)
- **Success Green**: 122 39% 49% (resolved status)

### Dark Mode
- **Primary**: 142 50% 25% (muted civic green)
- **Secondary**: 207 60% 40% (softer trust blue)
- **Background**: 0 0% 12% (dark surface)
- **Text**: 0 0% 90% (light text)
- Maintain status colors with adjusted saturation for dark backgrounds

## Typography
- **Primary**: Roboto (Google Fonts) - clean, government-friendly
- **Fallback**: Open Sans - accessible alternative
- **Hierarchy**: Bold headings (24px-32px), body text (16px), captions (14px)

## Layout System
**Tailwind Spacing**: Consistent use of units 2, 4, 8, and 16
- `p-4`: Standard card padding
- `m-8`: Section margins  
- `gap-2`: Tight element spacing
- `space-y-4`: Vertical component spacing

## Component Library

### Navigation
- Fixed bottom navigation for mobile (Report, Home, My Reports, Profile)
- Clean header with location indicator and search
- Breadcrumb navigation for issue details

### Forms & Actions
- **Report Button**: Large, rounded primary green button with location icon
- **Photo Upload**: Drag-and-drop zone with camera integration
- **Category Chips**: Rounded selection buttons (Potholes, Garbage, Infrastructure, etc.)
- **Location Input**: GPS-enabled with manual override option

### Data Displays
- **Issue Cards**: White cards with photo thumbnails, category badges, and status indicators
- **Status Badges**: Color-coded pills (orange=in-progress, green=resolved, grey=submitted)
- **Map Integration**: Interactive map with issue clustering and location markers
- **Timeline**: Vertical progress indicator showing issue lifecycle

### Overlays
- **Issue Detail Modal**: Full-screen overlay with image gallery and status history
- **Photo Viewer**: Swipeable image carousel with zoom capability
- **Location Picker**: Map overlay for precise issue positioning

## Visual Treatments
- **Card Shadows**: Subtle elevation with `shadow-sm` for depth
- **Rounded Corners**: Consistent `rounded-lg` for modern feel
- **Status Indicators**: Colored left borders on issue cards
- **Photo Grids**: 2-column responsive grid with aspect ratio preservation
- **Loading States**: Skeleton screens and progress indicators

## Responsive Behavior
- **Mobile**: Single column, thumb-friendly touch targets (min 44px)
- **Tablet**: Two-column issue grid, expanded map view
- **Desktop**: Three-column layout with persistent sidebar navigation
- **Breakpoints**: Mobile-first with tablet (768px) and desktop (1024px) adaptations

## Accessibility Features
- High contrast ratios (4.5:1 minimum)
- Screen reader friendly status announcements
- Keyboard navigation support
- Touch-friendly interactive elements
- Alternative text for all issue photos

This design system creates a trustworthy, efficient platform that encourages civic participation while maintaining the professional aesthetic expected from government-adjacent services.