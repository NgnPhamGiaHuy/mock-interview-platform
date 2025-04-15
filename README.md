# MockInter - AI-Powered Mock Interview Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.6.0-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)

MockInter is an innovative platform that leverages artificial intelligence to provide realistic mock interview experiences. It helps users prepare for technical interviews by simulating real-world interview scenarios with AI-powered interviewers.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#️-tech-stack)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Development Workflow](#-development-workflow)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Performance Optimization](#-performance-optimization)
- [Security Considerations](#-security-considerations)
- [Project Structure](#️-project-structure)
- [Acknowledgments](#-acknowledgments)

## 🚀 Features

- 🤖 **AI-Powered Interviews**: Real-time interview simulations with intelligent AI interviewers using Google AI and Vapi integration
- 🎯 **Personalized Experience**: Customizable interview scenarios based on technology stacks, seniority levels, and job positions
- 📊 **Real-time Feedback**: Instant feedback and analysis of interview performance with AI-generated improvement suggestions
- 🔒 **Secure Authentication**: Robust user authentication and session management via Firebase
- 🎨 **Modern UI**: Clean, responsive interface with dark/light mode support using TailwindCSS and Radix UI
- 📱 **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- 🔔 **Real-time Notifications**: Stay updated with interview status and feedback using Sonner toast notifications
- 📝 **Interview History**: Track progress and review past interviews with detailed analytics
- 🌐 **Multiple Technology Tracks**: Support for various programming languages and frameworks
- 🔄 **Resume Parsing**: AI-powered resume analysis to customize interview questions

## 🏛 Architecture

MockInter follows a modern web application architecture:

### Frontend

- **Next.js App Router**: Page routing and server components
- **React**: Component-based UI development
- **Client-side State Management**: React hooks for local state
- **Form Management**: React Hook Form with Zod validation

### Backend

- **Firebase Authentication**: User authentication and session management
- **Firebase Firestore**: NoSQL database for storing user data and interview sessions
- **Firebase Cloud Functions**: Serverless functions for backend logic
- **Vapi AI Integration**: Handles AI-powered interview simulations
- **Google AI SDK**: Powers advanced language processing capabilities

### Data Flow

1. User authentication via Firebase Auth
2. Interview configuration stored in Firestore
3. Real-time interview simulation via Vapi AI
4. Results and feedback stored back to Firestore
5. Notifications delivered through Sonner

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**: React framework for server-rendered applications
- **React 19**: UI component library with latest features
- **TypeScript**: Static type checking
- **TailwindCSS 4**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI components
- **React Hook Form**: Form state management
- **Zod**: TypeScript-first schema validation
- **Sonner**: Toast notifications
- **next-themes**: Theme switching functionality
- **clsx/tailwind-merge**: Conditional class utilities
- **Lucide React**: Icon library
- **Day.js**: Date manipulation

### Backend & AI

- **Firebase Authentication**: User management
- **Firebase Admin SDK**: Server-side Firebase operations
- **Vapi AI SDK**: Conversational AI framework
- **Google AI SDK**: Advanced AI capabilities
- **Next.js API Routes**: Backend endpoints

### Development Tools

- **ESLint 9**: Code linting
- **TypeScript 5**: Type checking
- **PostCSS**: CSS preprocessing
- **Turbopack**: Next.js bundler for fast development

## 💻 System Requirements

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Operating System**: Windows 10+, macOS 12+, or Linux
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 1GB available space
- **Browser**: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+

## 📦 Installation

### Prerequisites

- Node.js (v18+)
- Git
- Firebase account
- Vapi AI account
- Google Cloud account with AI API access

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/Mock-Interview-Platform.git
cd Mock-Interview-Platform
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# AI API Keys
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_key
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
```

### Step 4: Set up Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google)
3. Create a Firestore database
4. Generate service account credentials for Admin SDK

### Step 5: Run the development server

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser.

## 🔄 Development Workflow

### Branch Strategy

We follow a simple branching strategy:

- `main`: Production-ready code
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent production fixes

### Code Style

We enforce code style with ESLint and TypeScript:

```bash
# Check code style
npm run lint

# Type checking
tsc --noEmit
```

### Development Best Practices

1. **Component Structure**: Follow atomic design principles
2. **State Management**: Prefer React hooks for local state
3. **Performance**: Implement code-splitting and lazy loading
4. **Accessibility**: Ensure all components meet WCAG 2.1 AA standards

## 📚 API Documentation

### Authentication

Firebase Authentication is used for user management. The application uses Firebase's client SDK for authentication flows.

### Interview API

The application uses Vapi AI for interview simulations through a custom wrapper:

```typescript
// src/lib/vapi.sdk.ts
import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
```

In components, the Vapi SDK is used like this:

```typescript
// src/components/Agent.tsx
import { vapi } from "@/lib/vapi.sdk";

// Start an interview session
await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
  variableValues: {
    username: userName,
    userid: userId,
  },
});
```

### API Endpoints

The application has the following API routes:

```
/api/vapi/generate
```

## 🚢 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

### Deployment Options

#### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with default settings

#### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy --only hosting`

## 🚀 Performance Optimization

### Frontend Performance

- **Code Splitting**: Implemented via Next.js dynamic imports
- **Image Optimization**: Using Next.js Image component
- **Critical CSS**: Inlined critical styles for fast rendering
- **Lazy Loading**: Components and resources loaded as needed

### Backend Performance

- **Serverless Functions**: API routes designed for optimal performance
- **Edge Caching**: Leverage CDN capabilities for static assets

## 🔒 Security Considerations

### Authentication Security

- Firebase Authentication for secure user management
- Protected routes using authentication state

### Data Security

- Data validation with Zod
- Secure environment variables configuration
- Firebase security rules for data access control

## 🏗️ Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── (auth)/         # Authentication pages
│   ├── (root)/         # Main application pages
│   │   └── interview/  # Interview experience
│   └── api/            # API routes
│       └── vapi/       # Vapi AI integration
├── components/         # React components
│   ├── ui/             # UI components
│   ├── Agent.tsx       # AI Agent component
│   ├── AuthForm.tsx    # Authentication form
│   ├── InterviewCard   # Interview card component
│   └── FormField.tsx   # Form field component
├── firebase/           # Firebase configuration
│   ├── client.ts       # Client-side Firebase
│   └── admin.ts        # Server-side Firebase Admin
├── lib/                # Utility functions
│   └── vapi.sdk.ts     # Vapi SDK wrapper
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── public/             # Static assets
```

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [Vapi AI](https://vapi.ai/) - Conversational AI platform
- [Google AI](https://ai.google.dev/) - Advanced AI capabilities
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI component primitives
- [Vercel](https://vercel.com/) - Deployment platform