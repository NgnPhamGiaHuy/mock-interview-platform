# 🎯 MockInter - AI-Powered Interview Practice Platform

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-11.6.0-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-06B6D4)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)

## 📝 Description

MockInter is an AI-powered platform that helps users prepare for job interviews through realistic practice sessions. The platform utilizes voice interaction with AI interviewers, providing real-time feedback and assessment on interview performance.

Users can practice various interview scenarios, from technical to behavioral questions, receive instant feedback, and track their progress over time to improve their interview skills.

## ✨ Features

- Conducts voice-based mock interviews with AI interviewer
- Offers multiple interview types (technical, behavioral, mixed)
- Provides instant feedback and performance assessment
- Tracks interview history and progress
- Supports various technology roles and stacks
- Implements secure user authentication
- Features a modern, responsive UI design

## 🖼️ Demo / Screenshots

![Demo Screenshot](./src/public/robot.png)

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/NgnPhamGiaHuy/mock-interview-platform.git
cd mock-interview-platform

# Install dependencies
cd src
npm install

# Set up environment variables
# Create a .env.local file based on env.example

# Start development server
npm run dev
```

## 🚀 Usage

```bash
# Start development server with turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Access the application at http://localhost:3000

## 🔧 Configuration

Create a `.env.local` file with the following variables:

```
# Firebase Admin SDK configuration (server-side)
FIREBASE_PROJECT_ID= # Your Firebase project identifier
FIREBASE_PRIVATE_KEY= # Private key for Firebase Admin SDK authentication
FIREBASE_CLIENT_EMAIL= # Service account email for Firebase Admin SDK
GOOGLE_GENERATIVE_AI_API_KEY= # API key for Google's Generative AI services

# Vapi AI voice interaction configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN= # Authentication token for Vapi voice AI service
NEXT_PUBLIC_VAPI_WORKFLOW_ID= # Workflow identifier for the voice interview experience

# Firebase client configuration (browser-side)
NEXT_PUBLIC_FIREBASE_API_KEY= # Firebase API key for client-side authentication
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= # Firebase authentication domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID= # Firebase project identifier for client-side
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= # Firebase storage bucket URL
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= # Firebase messaging sender ID for notifications
NEXT_PUBLIC_FIREBASE_APP_ID= # Firebase application identifier
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID= # Google Analytics measurement ID for Firebase
```

## 🗂️ Folder Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (root)/          # Main application pages
│   ├── (auth)/          # Authentication pages
│   └── api/             # API routes
├── components/          # React components
│   └── ui/              # UI components (buttons, forms, etc.)
├── firebase/            # Firebase configuration and utilities
├── lib/                 # Utility functions and shared logic
├── constants/           # Constants and configuration values
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

```bash
git checkout -b feature/my-feature
git commit -m "Add new feature"
git push origin feature/my-feature
```

## 📄 License

Licensed under the MIT License. See [LICENSE](./LICENSE) for more information.

## 🙏 Acknowledgements

- Built with Next.js 15 and React 19
- Voice interaction powered by Vapi.ai
- UI components styled with TailwindCSS
- Authentication and database by Firebase
- Icons from Lucide React 