# GramVidya - Rural Education Platform

## 📚 Overview

**GramVidya** is a comprehensive offline-first educational platform designed specifically for rural communities with limited internet connectivity. The platform empowers students and teachers in underserved areas with simple, reliable digital learning tools that work on low-end devices.

### 🎯 Mission Statement
> "Empowering Rural Education Through Digital Learning - Bringing quality education to every student, regardless of location or connectivity."

### 📱 Device-Friendly
- **Low-End Optimized**: Works on older devices and low specifications
- **Responsive Design**: Adapts to various screen sizes
- **Easy Mode**: Larger UI elements for users with literacy challenges

### 👥 Dual User Experience
- **Student Dashboard**: Interactive learning with progress tracking
- **Teacher Portal**: Content creation and student management tools

## 🏗️ Architecture & Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No frameworks for maximum compatibility
- **Bootstrap 5.3.3**: UI framework for responsive design
- **Chart.js**: Data visualization for progress tracking
- **Bootstrap Icons**: Comprehensive icon library

### Progressive Web App (PWA) Features
- **Service Worker**: Offline caching and background sync
- **Manifest**: App-like installation experience
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
Hackspiree/
├── codebase/
│   ├── assets/
│   │   └── hero.jpg                 # Landing page hero image
│   ├── resources/                   # Educational content
│   │   ├── alphabet-letters.txt     # Alphabet learning material
│   │   ├── numbers-basics.txt       # Basic number concepts
│   │   └── plants-guide.txt         # Science content
│   ├── index.html                   # Landing page
│   ├── welcome.html                 # Student onboarding
│   ├── student.html                 # Student dashboard
│   ├── teacher.html                 # Teacher portal
│   ├── schemes.html                 # Government schemes
│   ├── events.html                  # Educational events
│   ├── resources.html               # Resource library
│   ├── links.html                   # Tutorial links
│   ├── quiz.html                    # Interactive quizzes
│   ├── profile.html                 # User profile management
│   ├── myapps.html                  # Application tracking
│   ├── help.html                    # Help & support
│   ├── style.css                    # Main stylesheet
│   ├── script.js                    # Core functionality
│   ├── student.js                   # Student-specific features
│   ├── teacher.js                   # Teacher-specific features
│   ├── resources.js                 # Resource management
│   ├── links.js                     # Link management
│   ├── quiz.js                      # Quiz functionality
│   └── sw.js                        # Service worker
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)
- No additional dependencies required

### Installation & Setup

1. **Clone or Download**
   ```bash
   git clone [repository-url]
   cd Hackspiree
   ```

2. **Serve Locally**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access Application**
   - Open browser to `http://localhost:8000/codebase/`
   - The app will automatically register the service worker
   - Works offline after initial load

## 👨‍🎓 User Roles & Features

### Student Experience

#### 🏠 Dashboard Features
- **Progress Visualization**: Interactive charts showing learning progress
- **Subject Performance**: Bar charts for different subjects
- **Recent Activity**: Timeline of completed activities
- **Easy Mode Toggle**: Larger UI for accessibility

#### 📚 Learning Resources
- **Resource Library**: Curated educational content
- **Audio Playback**: Text-to-speech for accessibility
- **Download Options**: Offline content storage
- **Bookmarking System**: Save favorite resources

#### 🎯 Interactive Quizzes
- **Multiple Subjects**: Math, Science, English, Computer basics
- **Immediate Feedback**: Instant scoring and results
- **Progress Tracking**: Scores saved locally
- **Teacher-Created Quizzes**: Custom content from educators

#### 🔗 Tutorial Links
- **YouTube Integration**: Curated educational videos
- **Subject Filtering**: Organized by academic subjects
- **Search Functionality**: Find specific topics

### Teacher Experience

#### 📊 Student Management
- **Student List**: View enrolled students
- **Performance Monitoring**: Track student progress
- **Grade Analytics**: Average scores and submissions

#### 📝 Content Creation
- **Quiz Authoring**: Create custom quizzes with multiple choice questions
- **Resource Posting**: Add educational materials
- **Link Sharing**: Post tutorial links for students

#### 📈 Analytics Dashboard
- **Submission Tracking**: Monitor quiz completions
- **Grade Summary**: Overall class performance
- **Export/Import**: Share quizzes between teachers

## 🎨 Design System

### Color Palette
- **Primary Navy**: `#0b3d91` - Academic blue for trust and stability
- **Accent Gold**: `#f4b400` - Scholastic gold for highlights
- **Success Green**: `#1e7f5a` - Growth and knowledge
- **Text Ink**: `#0f172a` - High contrast for readability

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Fallback**: System UI fonts for performance
- **Accessibility**: High contrast ratios and readable sizes

### UI Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Gradient backgrounds with hover effects
- **Navigation**: Sticky header with backdrop blur
- **Forms**: Accessible inputs with proper labeling

## 🔧 Technical Implementation

### Service Worker Strategy
```javascript
// Cache-first approach for offline functionality
const CACHE_NAME = "gramvidya-v1";
const ASSETS_TO_CACHE = [
  "/", "/index.html", "/student.html", "/teacher.html",
  "/style.css", "/script.js", "/resources/*"
];
```

### Local Storage Schema
```javascript
// User session data
localStorage.setItem("gv_userName", "Student Name");
localStorage.setItem("gv_userEmail", "email@example.com");
localStorage.setItem("gv_userRole", "student|teacher");

// Quiz submissions
localStorage.setItem("gv_quiz_grades", JSON.stringify(submissions));

// Teacher content
localStorage.setItem("gv_teacher_quizzes", JSON.stringify(quizzes));
localStorage.setItem("gv_links", JSON.stringify(links));
```

### Accessibility Features
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Readable color combinations
- **Text-to-Speech**: Built-in speech synthesis
- **Easy Mode**: Larger UI elements

## 📊 Content Management

### Educational Resources
- **Alphabet Learning**: Letter recognition with examples
- **Number Basics**: Counting 1-10 with visual aids
- **Science Content**: Plant biology fundamentals
- **Extensible System**: Easy addition of new content

### Quiz System
- **Built-in Quizzes**: 10 pre-made quizzes across subjects
- **Teacher Creation**: Custom quiz authoring tools
- **Multiple Choice**: Standardized question format
- **Progress Tracking**: Individual and class analytics

## 🌐 Government Integration

### Schemes Page
- **Educational Programs**: Government scholarship information
- **Application Tracking**: Local storage of applications
- **Dynamic Content**: 10 different educational schemes
- **Visual Indicators**: Progress bars and status badges

### Events Page
- **Workshop Listings**: Educational events and workshops
- **RSVP System**: Event registration tracking
- **Mixed Sources**: Government and private events
- **Date Management**: Chronological event organization

## 🔒 Data Privacy & Security

### Local-First Approach
- **No Server Required**: All data stored locally
- **User Control**: Complete data ownership
- **Privacy Focused**: No external data transmission
- **Offline Capable**: Works without internet

### Data Storage
- **Browser Storage**: localStorage for persistence
- **Session Management**: Simple login/logout system
- **Content Caching**: Service worker for offline access

## 🚀 Deployment Options

### Static Hosting
- **GitHub Pages**: Free hosting for open source
- **Netlify**: Easy deployment with form handling
- **Vercel**: Fast global CDN
- **Firebase Hosting**: Google's hosting platform

### Self-Hosted
- **Apache/Nginx**: Traditional web server
- **Docker**: Containerized deployment
- **CDN Integration**: Global content delivery

## 🛠️ Development & Customization

### Adding New Content
1. **Resources**: Add files to `/resources/` directory
2. **Quizzes**: Extend the `quizzes` array in `quiz.js`
3. **Links**: Update the `data` object in `links.js`
4. **Styling**: Modify CSS custom properties in `style.css`

### Extending Functionality
- **New Pages**: Follow existing HTML structure
- **JavaScript Modules**: Use IIFE pattern for encapsulation
- **Service Worker**: Update cache list for new assets
- **Local Storage**: Extend schema for new data types

## 📱 Browser Compatibility

### Supported Browsers
- **Chrome**: 60+ (Full PWA support)
- **Firefox**: 55+ (Service worker support)
- **Safari**: 11+ (Limited PWA features)
- **Edge**: 79+ (Full support)

### Feature Detection
- **Service Worker**: Graceful degradation if unsupported
- **Local Storage**: Fallback to session storage
- **Speech Synthesis**: Optional feature with fallbacks

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow existing patterns
2. **Accessibility**: Maintain ARIA compliance
3. **Performance**: Optimize for low-end devices
4. **Testing**: Test on various devices and browsers

### Content Contributions
- **Educational Materials**: Age-appropriate content
- **Multilingual Support**: Consider local languages
- **Cultural Sensitivity**: Respect local customs
- **Quality Assurance**: Review for accuracy

## 📄 License

This project is designed for educational use in rural communities. Please ensure compliance with local educational regulations and content guidelines.

## 🆘 Support & Contact

### Technical Support
- **Email**: hello@gramvidya.org
- **Phone**: +91 98765 43210
- **Documentation**: This README file

### Community
- **Issues**: Report bugs and feature requests
- **Discussions**: Community support and ideas
- **Contributions**: Pull requests welcome

## 🎯 Future Roadmap

### Planned Features
- **Multilingual Support**: Local language content
- **Advanced Analytics**: Detailed learning insights
- **Parent Portal**: Family engagement features
- **Mobile App**: Native mobile application
- **Cloud Sync**: Optional online backup

### Technical Improvements
- **Performance Optimization**: Faster loading times
- **Enhanced PWA**: Better offline experience
- **Accessibility**: Improved screen reader support
- **Content Management**: Admin panel for educators

---

**GramVidya** - Empowering rural education through simple, reliable digital learning solutions. 🌱📚