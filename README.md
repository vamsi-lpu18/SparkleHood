# SparkleHood - AI Safety Incident Dashboard

A modern web application for tracking and managing AI safety incidents, built with React, TypeScript, and Vite.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-SparkleHood-blue)](https://sparkle-hood.netlify.app/)

## 🚀 Features

- **Incident Management**: Track AI safety incidents with details like title, description, severity, and status
- **Filtering & Sorting**: Filter incidents by severity and sort by date or severity
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations and transitions
- **Form Validation**: Ensures data integrity with proper input validation

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with modern features (Flexbox, Grid, Transitions)
- **State Management**: React Hooks (useState)
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/vamsi-lpu18/SparkleHood.git
   cd SparkleHood/sparkle-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Development: `http://localhost:5173`
   - Production: [https://sparkle-hood.netlify.app/](https://sparkle-hood.netlify.app/)

## 🏗️ Project Structure

```
sparkle-project/
├── src/
│   ├── App.tsx         # Main application component
│   ├── App.css         # Main styles
│   ├── main.tsx        # Application entry point
│   └── assets/         # Static assets
├── public/             # Public assets
├── package.json        # Project dependencies
└── vite.config.ts      # Vite configuration
```

## 🎨 Design Decisions

1. **Component Architecture**
   - Single-page application design for better user experience
   - Modular components for maintainability
   - Reusable UI components for consistency

2. **State Management**
   - Used React's useState for local state management
   - Implemented controlled components for form handling
   - Efficient state updates with proper immutability

3. **Styling Approach**
   - CSS-first approach for better performance
   - Responsive design using Flexbox and Grid
   - Smooth transitions and animations for better UX
   - Consistent color scheme and typography

4. **Form Handling**
   - Real-time validation
   - Clear error messaging
   - Intuitive user feedback

## 🧪 Development

To run the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React and TypeScript communities for their excellent documentation
- Vite team for the amazing build tool
- Netlify for hosting the application
- All contributors who have helped improve this project
