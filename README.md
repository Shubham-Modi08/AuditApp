# 📋 Internal Audit System

A comprehensive React Native mobile application designed for internal auditing processes. This app provides **role-based access control** and **streamlined audit management** capabilities for organizations.

---

## ✨ Features

### 🔐 Role-Based Access Control
- **Admin**: Full access – view, create, and delete audits  
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
- iOS Simulator or Android Emulator
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup Instructions

#### 1. Clone the repository
```bash
git clone <repository-url>
cd AuditApp
2. Install dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Install iOS dependencies (iOS only)
bash
Copy
Edit
cd ios && pod install && cd ..
4. Start the Metro bundler
bash
Copy
Edit
npm start
# or
yarn start
5. Run the application
For iOS:
bash
Copy
Edit
npm run ios
# or
yarn ios
For Android:
bash
Copy
Edit
npm run android
# or
yarn android
🚀 Usage
Getting Started
Launch the app and select your role: Admin, Auditor, or Viewer

Navigate through main tabs: Audits and Policies

Create new audits (Admin/Auditor only) or view existing ones

Creating an Audit
Tap New Audit from the Audit History screen

Complete the 3-step form:

Step 1: Title, Department, Date

Step 2: Assessment and Compliance Checklist

Step 3: Findings, Recommendations, and Image Uploads

Submit to generate audit summary

Managing Audits
View: All roles can view audit history and details

Create: Auditors and Admins can create audits

Delete: Only Admins can delete existing audits

🧱 Project Structure
bash
Copy
Edit
src/
├── context/
│   ├── AuditContext.tsx        # Audit data management
│   └── RoleContext.tsx         # User role management
├── navigation/
│   └── MainTabNavigator.tsx    # Tab navigation setup
├── screens/
│   ├── LoginScreen.tsx         # Role selection screen
│   ├── AuditHistoryScreen.tsx  # Audit list and management
│   ├── AuditFormScreen.tsx     # Multi-step audit creation
│   ├── AuditSummaryScreen.tsx  # Audit submission confirmation
│   └── PolicyViewerScreen.tsx  # PDF policy viewer
└── App.tsx                     # Main app component
🛠 Technologies Used
React Native – Cross-platform mobile development

React Navigation – Navigation and routing

React Context API – Global state management

TypeScript – Strongly typed JavaScript

React Native WebView – PDF & web document viewing

React Native Image Picker – Image attachment & upload

📦 Key Dependencies
@react-navigation/native – Navigation core

@react-navigation/bottom-tabs – Bottom tab navigator

@react-navigation/native-stack – Stack navigation

react-native-webview – Web content/PDF rendering

react-native-image-picker – Image capture/selection

⚙️ Configuration
Environment Setup
No extra environment variables required for base functionality.

Customization
Colors: Modify screen stylesheets

Policy Document: Change the PDF URL in PolicyViewerScreen.tsx

Audit Fields: Extend AuditData type in AuditContext.tsx

🔍 Feature Details
✅ Form Validation
Mandatory field checks at each step

Instant error feedback

Progress saved between steps

🖼 Image Handling
Multiple images supported

Image preview and delete option

Optimized for performance

📊 Compliance Tracker
Fully configurable checklist

Pass/Fail visual indicators

Automated compliance score

👨‍💻 Development
Start Development Server
bash
Copy
Edit
npm start
Build for Production
iOS
bash
Copy
Edit
npm run build:ios
Android
bash
Copy
Edit
npm run build:android
✅ Testing
bash
Copy
Edit
npm test
🤝 Contributing
Fork this repository

Create your feature branch

bash
Copy
Edit
git checkout -b feature/your-feature
Commit your changes

bash
Copy
Edit
git commit -am "Add new feature"
Push your branch

bash
Copy
Edit
git push origin feature/your-feature
Open a pull request 🚀

📄 License
This project is licensed under the MIT License.
