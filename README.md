Internal Audit App
A React Native mobile application for managing internal audits with role-based access control.

Features
Role-based authentication (Admin, Auditor, Viewer)
Multi-step audit creation with validation
Audit history and management
Policy document viewer
Image attachments for audit evidence
Compliance tracking and ratings
Screenshots
Add screenshots here

Installation
Clone the repository
git clone <your-repo-url>
cd AuditApp
Install dependencies
npm install
cd ios && pod install && cd .. # iOS only
Run the app
# iOS
npm run ios

# Android
npm run android
Usage
Select your role (Admin/Auditor/Viewer)
View audit history or create new audits
Complete the 3-step audit process
Access policy documents from the Policies tab
Tech Stack
React Native
TypeScript
React Navigation
React Context API
React Native WebView
Project Structure
src/
├── context/          # State management
├── navigation/       # App navigation
├── screens/         # App screens
└── App.tsx          # Main component
Contributing
Fork the project
Create your feature branch
Commit your changes
Push to the branch
Open a Pull Request
License
MIT License
