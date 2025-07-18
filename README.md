# 📋 Internal Audit System

A comprehensive React Native mobile application designed for internal auditing processes. This app provides **role-based access control** and **streamlined audit management** capabilities for organizations.

---

## 🚀 Features

### 🔐 Role-Based Access Control
- **Admin**: Full access — view, create, and delete audits  
- **Auditor**: Create and submit audit reports  
- **Viewer**: View-only access to audit reports  

### 📋 Audit Management
- Multi-step audit form with validation  
- Compliance checklist tracking  
- Overall rating system (1–5 scale)  
- Key findings and recommendations documentation  
- Image attachment support  
- Audit history with search and filtering  

### 📱 User Experience
- Intuitive tab-based navigation  
- Step-by-step audit creation process  
- Real-time form validation  
- Responsive design for various screen sizes  
- Clean, professional UI with consistent styling  

### 📄 Policy Integration
- Built-in policy manual viewer  
- PDF document support via WebView  
- Easy access to organizational policies and procedures  

---

## ⚙️ Installation

### Prerequisites
- Node.js (v14 or higher)  
- React Native CLI environment  
- Xcode (for iOS development)  
- Android Studio (for Android development)  
- iOS Simulator or Android Emulator  

### Setup Instructions

```bash
# Clone the repository
git clone <repository-url>
cd AuditApp

# Install dependencies
npm install
# or
yarn install

# (iOS only) Install CocoaPods dependencies
cd ios && pod install && cd ..

# Start Metro Bundler
npm start
# or
yarn start



🛠 Technologies Used
React Native – Cross-platform mobile development

React Navigation – Navigation between screens

Context API – State and role management

TypeScript – Type-safe development

React Native WebView – PDF viewer for policies

React Native Image Picker – For image uploads

📦 Key Dependencies
@react-navigation/native

@react-navigation/bottom-tabs

@react-navigation/native-stack

react-native-webview

react-native-image-picker

⚙️ Configuration
Environment
No special environment variables required

Customization Options
Colors: Update styles in individual screen components

Policy PDF: Modify the URL in PolicyViewerScreen.tsx

Audit Fields: Extend AuditData in AuditContext.tsx



📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

# Run the app on iOS
npm run ios
# or
yarn ios

# Run the app on Android
npm run android
# or
yarn android




📱 Usage
Getting Started
Launch the app and select your role: Admin, Auditor, or Viewer

Navigate between Audits and Policies tabs

View or create audits based on your role

Creating an Audit
Tap New Audit from the Audit History screen

Follow the 3-step form process:

Step 1: Basic Info (Title, Department, Date)

Step 2: Assessment & Compliance Checklist

Step 3: Key Findings, Recommendations, Image Uploads

Review and submit the audit

View the generated audit summary

Managing Audits
View: All roles can view audit history and details

Create: Auditors and Admins can create audits

Delete: Only Admins can delete existing audits



📁 Project Structure
graphql
Copy
Edit
src/
├── context/
│   ├── AuditContext.tsx          # Manages audit data
│   └── RoleContext.tsx           # Manages user roles
├── navigation/
│   └── MainTabNavigator.tsx      # Bottom tab navigation
├── screens/
│   ├── LoginScreen.tsx           # Role selection screen
│   ├── AuditHistoryScreen.tsx    # Lists and manages audits
│   ├── AuditFormScreen.tsx       # Multi-step audit form
│   ├── AuditSummaryScreen.tsx    # Shows submitted audit
│   └── PolicyViewerScreen.tsx    # Displays PDF via WebView
└── App.tsx                       # Main app entry point
