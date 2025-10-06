# SafePath - Emergency Response System

A comprehensive healthcare emergency response web application built with React. SafePath provides a complete solution for emergency reporting, medical assistance, and emergency service location.

## 🚀 Features

### 🏠 Homepage
- **Emergency Contact Buttons**: Quick access to Ambulance, Police, and Fire Department (911)
- **Main Action Cards**: 
  - Report an Accident
  - Get Assistance
  - Emergency Locator
- **Recent Reports**: View past incident reports
- **Safety Tips**: Important safety information and guidelines

### 📝 4-Step Accident Reporting System
1. **Incident Details**: Location, time, and severity selection
2. **Evidence Collection**: Photo upload and description
3. **Injury Assessment**: Injury details and witness information
4. **Review & Submit**: Complete report review before submission

### 🏥 Get Assistance
- **Medical Categories**: 
  - Immediate Care
  - Minor Injuries
  - Mental Health
  - Chronic Conditions
  - Pediatric Care
  - Geriatric Care
- **Available Doctors**: Real-time doctor listings with ratings and contact options
- **Emergency Contacts**: Direct access to emergency services and poison control

### 📍 Emergency Locator
- **Service Filtering**: Filter by hospitals, police stations, fire stations, pharmacies
- **Nearby Services**: Location-based service discovery
- **Service Details**: Ratings, hours, distance, and contact information
- **Quick Actions**: Call and directions buttons

### 🎨 Professional Design
- **Modern UI**: Clean, professional interface with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Color-coded Severity**: Visual severity indicators (Low/Medium/High)
- **Interactive Elements**: Hover effects and smooth transitions

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1
- **Routing**: React Router DOM 7.8.2
- **Styling**: Custom CSS with modern design principles
- **Icons**: Unicode emojis for cross-platform compatibility
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Pages and Routes

- `/` - Homepage with emergency services overview
- `/report` - 4-step accident reporting form
- `/assistance` - Medical assistance and doctor listings
- `/locator` - Emergency service locator
- `/register` - User registration and login

## 🎯 Key Components

### Report System
- `ReportPage.js` - Main report container with step management
- `Step1IncidentDetails.js` - Incident information collection
- `Step2EvidenceCollection.js` - Photo upload and description
- `Step3InjuryAssessment.js` - Injury details and witness management
- `Step4ReviewSubmit.js` - Final review and submission

### Main Pages
- `HomePage.js` - Landing page with emergency services
- `GetAssistancePage.js` - Medical assistance and doctor listings
- `EmergencyLocatorPage.js` - Service locator with filtering
- `RegistrationPage.js` - User registration form

## 🎨 Design Features

- **Color Scheme**: Professional red (#dc2626) and pink (#ec4899) accents
- **Typography**: Inter font family for modern readability
- **Layout**: Grid-based responsive design
- **Animations**: Smooth hover effects and transitions
- **Accessibility**: High contrast colors and clear navigation

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with side-by-side layouts
- **Tablet**: Adapted grid layouts and touch-friendly buttons
- **Mobile**: Single-column layouts with optimized touch targets

## 🔧 Customization

### Adding New Emergency Services
1. Update the `nearbyServices` array in `EmergencyLocatorPage.js`
2. Add corresponding icons and styling

### Modifying Medical Categories
1. Edit the `medicalCategories` array in `GetAssistancePage.js`
2. Update the CSS classes for new category colors

### Styling Changes
- Main styles are in `src/App.css`
- Component-specific styles are co-located with components
- Color variables can be updated for theme changes

## 🚀 Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your preferred hosting service:
   - Netlify
   - Vercel
   - AWS S3
   - GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Emergency Contacts

- **Ambulance**: 911
- **Police**: 911
- **Fire Department**: 911
- **Poison Control**: +91 1002356498

## 📞 Support

For technical support or questions about the application:
- Email: support@safepath.com
- Phone: +1 (555) 123-4567

---

**SafePath** - Your trusted emergency response system. We're here for you 24/7.