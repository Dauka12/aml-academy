# Webinars Feature

This directory contains the webinar management feature, which allows users to browse, register for, and attend webinars, and administrators to create and manage webinars.

## Directory Structure

```
webinars/
├── api/                    # API service functions
│   └── webinarApi.ts       # Webinar API client
├── components/             # Reusable UI components
│   ├── cards/              # Card components
│   │   └── WebinarCard.tsx # Webinar card component
│   ├── forms/              # Form components
│   │   └── WebinarForm.tsx # Webinar form component
│   └── shared/             # Shared components
│       ├── WebinarFilter.tsx  # Filter component
│       └── WebinarsList.tsx   # List component
├── hooks/                  # Custom React hooks
│   └── useWebinarManager.ts # Main webinar management hook
├── pages/                  # Page components
│   ├── WebinarLanding.tsx  # Landing page
│   ├── WebinarDetails.tsx  # Webinar details page
│   └── ...                 # Other page components
├── types/                  # TypeScript type definitions
│   ├── webinar.ts          # Webinar type definitions
│   └── webinarSignup.ts    # Webinar signup type definitions
├── utils/                  # Utility functions
│   ├── webinarHelpers.ts   # Helper functions for webinars
│   └── validation.ts       # Form validation utilities
├── WebinarRoutes.tsx       # Route definitions for the feature
└── index.ts                # Public API for the feature
```

## Main Components

- `WebinarRoutes`: Defines the routes for the webinar feature
- `WebinarLanding`: Landing page for webinars
- `WebinarDetails`: Details page for a specific webinar
- `WebinarManager`: Admin interface for managing webinars
- `WebinarRegistration`: Registration page for a webinar

## Usage

Import components from the feature:

```jsx
import { 
  WebinarRoutes, 
  WebinarCardComponent, 
  WebinarFormComponent 
} from 'features/webinars';
```

## API Usage

```jsx
import { webinarApi } from 'features/webinars';

// Get all webinars
const webinars = await webinarApi.getAllWebinars();

// Create a webinar
const newWebinar = await webinarApi.createWebinar({
  title: 'My Webinar',
  description: 'A great webinar',
  startDate: '2023-06-15T14:00:00Z',
  isActive: true
});
```

## Utility Functions

```jsx
import { 
  formatDateTime, 
  sortWebinarsByDateDesc, 
  filterUpcomingWebinars 
} from 'features/webinars';

// Format date
const formattedDate = formatDateTime(webinar.startDate);

// Sort webinars
const sortedWebinars = sortWebinarsByDateDesc(webinars);

// Filter webinars
const upcomingWebinars = filterUpcomingWebinars(webinars);
```
