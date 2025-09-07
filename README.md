# 🦸‍♀️ Iron Lady Chatbot

An advanced AI-powered chatbot for Iron Lady's leadership programs with comprehensive FAQ responses and intelligent conversation capabilities.

## ✨ Key Features

### 🤖 **Intelligent Conversational AI**
- **Smart FAQ Responses**: Answers all questions about Iron Lady programs
- **OpenAI GPT-4o Integration**: Provides intelligent responses beyond predefined FAQs
- **Contextual Understanding**: Recognizes intent and provides relevant guidance
- **Leadership & Career Guidance**: Covers leadership development, women empowerment, career growth, and business advice

### 🎨 **Premium User Experience**
- **Modern Chat Interface**: Sleek bubble design with professional styling
- **Dark/Light Theme Toggle**: Customizable visual experience
- **Typing Indicators**: Real-time visual feedback during conversations
- **Message Reactions**: Like/unlike messages for feedback
- **Chat Statistics**: Track conversation metrics and engagement

### 📱 **Advanced Functionality**
- **Chat Persistence**: Automatic save/restore of conversation history
- **Export Conversations**: Download chat history as text files
- **Quick Questions**: Pre-defined prompts for common inquiries
- **Mobile Responsive**: Optimized for all device sizes
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with Material-UI 5.14.0
- **Backend**: Node.js/Express with RESTful API
- **AI Integration**: OpenAI GPT-4o-mini model
- **Storage**: LocalStorage for chat persistence
- **Styling**: CSS3 with animations and responsive design
- **Development**: Modern ES6+ JavaScript with component architecture

## 💡 Topics Covered

### 📚 **Iron Lady Programs**
- Program details and duration
- Application process and requirements
- Certification information
- Mentor and coach profiles
- Online/offline availability
- Fees and scholarships

### 🌟 **Leadership Development**
- Leadership styles and techniques
- Skill building strategies
- Team management
- Decision-making frameworks
- Communication skills

### 👩‍💼 **Women Empowerment**
- Career advancement strategies
- Workplace challenges
- Work-life balance
- Confidence building
- Networking for women

### 💼 **Career & Business**
- Interview preparation
- Professional development
- Entrepreneurship guidance
- Financial literacy
- Business strategy basics

## 🚀 How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- OpenAI API key (for AI responses)

### Environment Setup
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd iron-lady-chatbot
   ```

2. **Set up environment variables**:
   Create a `.env` file in the `backend` directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

### Backend Setup
```bash
cd backend
npm install
npm start
```
Server will run on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Application will open at `http://localhost:3000`

## 📱 Usage Guide

### 🎯 **Getting Started**
1. Open the chatbot at `http://localhost:3000`
2. Choose from quick questions or type your own
3. Toggle between light/dark themes using the theme button
4. Like messages that are helpful to you

### 💬 **Sample Questions to Try**
- "Tell me about the Iron Lady Leadership Program"
- "How can I become a better leader?"
- "What are some tips for women in business?"
- "Help me with my career development"
- "How do I apply for the program?"
- "What leadership style should I develop?"

### 🔧 **Features to Explore**
- **Export Chat**: Download your conversation history
- **Message Reactions**: Like/unlike bot responses
- **Theme Toggle**: Switch between light and dark modes
- **Chat Statistics**: View conversation metrics in the sidebar
- **Persistent Chats**: Your conversations are automatically saved

## 📸 Screenshots & Demo

### 🎬 **Demo Video**
![Demo Video](./viedo.mp4.mp4)

*A complete walkthrough of the Iron Lady Chatbot showcasing all features*

### 🖼️ **Application Screenshots**

#### 💬 **Main Chat Interface**
![Chat Interface](./screenshots/chat-interface.png)
*Modern chat bubble interface with typing indicators and message reactions*

#### 🌙 **Dark Theme Mode**
![Dark Theme](./screenshots/dark-theme.png)
*Professional dark mode for comfortable viewing*

#### 📊 **Chat Statistics & Features**
![Features](./screenshots/features-panel.png)
*Export functionality, message statistics, and quick questions*

#### 📱 **Mobile Responsive Design**
![Mobile View](./screenshots/mobile-responsive.png)
*Optimized interface for mobile devices*

#### 🤖 **AI-Powered Responses**
![AI Responses](./screenshots/ai-responses.png)
*Intelligent responses beyond FAQ using OpenAI integration*

> **Note**: Screenshots showcase the modern UI design, dark/light themes, and comprehensive features of the Iron Lady Chatbot.

## 🏗️ Project Structure

```
iron-lady-chatbot/
├── backend/
│   ├── server.js          # Express server with AI integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styling and animations
│   │   └── index.js      # React entry point
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
└── README.md             # Project documentation
```

## 🌟 Features Implemented

### ✅ **Core Functionality**
- Interactive FAQ chatbot with comprehensive Iron Lady program information
- OpenAI GPT-4o integration for intelligent, context-aware responses
- Modern chat bubble interface with professional design
- Real-time message exchange with typing indicators

### ✅ **Enhanced User Experience**
- Dark/Light theme toggle with smooth transitions
- Message reaction system (like/unlike functionality)
- Chat conversation persistence using localStorage
- Export chat history functionality
- Quick question suggestions for easy interaction
- Comprehensive chat statistics tracking

### ✅ **Performance & Responsiveness**
- Mobile-first responsive design for all devices
- Optimized loading states and smooth animations
- Efficient API calls with error handling
- Fast initial load times with performance optimizations

### ✅ **AI-Powered Enhancements**
- Contextual understanding beyond strict FAQ matching
- Leadership and career development guidance
- Women empowerment and business advice
- Professional tone consistent with Iron Lady brand
- Intelligent keyword recognition and response matching

## 🎯 Assignment Objectives Met

✅ **Simple Functional Applications**: Fully functional chatbot with modern UI  
✅ **AI-Powered Enhancements**: OpenAI integration for intelligent responses  
✅ **Creativity & Problem-Solving**: Advanced features like themes, persistence, reactions  
✅ **Code Quality**: Clean, well-structured React and Node.js code  
✅ **User Experience**: Professional design with excellent usability  

## 🔧 Technical Highlights

- **Component Architecture**: Modular React components with hooks
- **State Management**: Efficient local state with localStorage persistence  
- **API Integration**: RESTful backend with OpenAI API integration
- **Responsive Design**: CSS Grid and Flexbox for optimal layouts
- **Performance**: Debounced saves, optimized re-renders, efficient DOM updates
- **Error Handling**: Comprehensive error states and user feedback

## 📝 Demo & Documentation

- **Live Demo**: `http://localhost:3000` (after setup)
- **API Endpoint**: `http://localhost:5000/api/chat`
- **Documentation**: Comprehensive inline code comments
- **Features**: All premium chatbot features implemented and tested

---

**Created for Iron Lady Leadership Programs Assignment**  
*Showcasing modern web development with AI integration*
