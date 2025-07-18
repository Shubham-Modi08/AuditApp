Internal Audit System
A comprehensive React Native mobile application designed for internal auditing processes. This app provides role-based access control and streamlined audit management capabilities for organizations.

Features
🔐 Role-Based Access Control
Admin: Full access - view, create, and delete audits
Auditor: Create and submit audit reports
Viewer: View-only access to audit reports
📋 Audit Management
Multi-step audit form with validation
Compliance checklist tracking
Overall rating system (1-5 scale)
Key findings and recommendations documentation
Image attachment support
Audit history with search and filtering
📱 User Experience
Intuitive tab-based navigation
Step-by-step audit creation process
Real-time form validation
Responsive design for various screen sizes
Clean, professional UI with consistent styling
📄 Policy Integration
Built-in policy manual viewer
PDF document support via WebView
Easy access to organizational policies and procedures
Installation
Prerequisites
Node.js (v14 or higher)
React Native development environment
iOS Simulator or Android Emulator
Xcode (for iOS development)
Android Studio (for Android development)
Setup Instructions
Clone the repository

git clone <repository-url>
cd AuditApp
Install dependencies

npm install
# or
yarn install
Install iOS dependencies (iOS only)

cd ios && pod install && cd ..
Start the Metro bundler

npm start
# or
yarn start
Run the application

For iOS:

npm run ios
# or
yarn ios
For Android:

npm run android
# or
yarn android
Usage
Getting Started
Launch the app and select your role (Admin, Auditor, or Viewer)
Navigate through the main tabs: Audits and Policies
Create new audits (Admin/Auditor only) or view existing ones
Creating an Audit
Tap "New Audit" from the Audit History screen
Complete the 3-step process:
Step 1: Basic information (title, department, date)
Step 2: Assessment and compliance checks
Step 3: Findings, recommendations, and supporting images
Review and submit the audit
View the generated audit summary
Managing Audits
View: All roles can view audit history and details
Create: Auditors and Admins can create new audits
Delete: Only Admins can delete existing audits
Project Structure
src/
├── context/
│   ├── AuditContext.tsx      # Audit data management
│   └── RoleContext.tsx       # User role management
├── navigation/
│   └── MainTabNavigator.tsx  # Tab navigation setup
├── screens/
│   ├── LoginScreen.tsx       # Role selection screen
│   ├── AuditHistoryScreen.tsx # Audit list and management
│   ├── AuditFormScreen.tsx   # Multi-step audit creation
│   ├── AuditSummaryScreen.tsx # Audit submission confirmation
│   └── PolicyViewerScreen.tsx # PDF policy viewer
└── App.tsx                   # Main app component
Technologies Used
React Native: Cross-platform mobile development
React Navigation: Navigation and routing
React Context API: State management
TypeScript: Type safety and better development experience
React Native WebView: PDF document viewing
React Native Image Picker: Image attachment functionality
Key Dependencies
@react-navigation/native: Navigation framework
@react-navigation/bottom-tabs: Tab navigation
@react-navigation/native-stack: Stack navigation
react-native-webview: WebView component for PDF viewing
react-native-image-picker: Image selection functionality
Configuration
Environment Setup
The app uses standard React Native configuration. No additional environment variables are required for basic functionality.

Customization
Colors: Update the color scheme in individual screen stylesheets
Policies: Modify the PDF URL in PolicyViewerScreen.tsx
Audit Fields: Extend the AuditData interface in AuditContext.tsx
Features in Detail
Audit Form Validation
Required field validation on each step
