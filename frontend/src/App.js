import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  CircularProgress,
  IconButton
} from '@mui/material';
import { Send as SendIcon, SmartToy as BotIcon, Person as PersonIcon, 
         Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon,
         Delete as ClearIcon, GetApp as ExportIcon, ThumbUp as LikeIcon,
         ThumbDown as DislikeIcon } from '@mui/icons-material';
import axios from 'axios';
import './App.css';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Load chat history from localStorage
  const loadChatHistory = () => {
    try {
      const savedMessages = localStorage.getItem('ironLadyChatHistory');
      if (savedMessages) {
        const messages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        return messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
      return [
        {
          id: 1,
          text: "Hello! I'm the Iron Lady assistant. I can help you with questions about our leadership programs. Feel free to ask about our programs, duration, format, certificates, or mentors!",
          sender: 'bot',
          timestamp: new Date(),
          liked: null
        }
      ];
    } catch (error) {
      return [
        {
          id: 1,
          text: "Hello! I'm the Iron Lady assistant. I can help you with questions about our leadership programs. Feel free to ask about our programs, duration, format, certificates, or mentors!",
          sender: 'bot',
          timestamp: new Date(),
          liked: null
        }
      ];
    }
  };

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('ironLadyTheme');
    return savedTheme === 'dark';
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize chat history on component mount
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const history = loadChatHistory();
        setMessages(history);
      } catch (error) {
        console.error('Error loading chat history:', error);
        setMessages([{
          id: 1,
          text: "Hello! I'm the Iron Lady assistant. I can help you with questions about our leadership programs. Feel free to ask about our programs, duration, format, certificates, or mentors!",
          sender: 'bot',
          timestamp: new Date(),
          liked: null
        }]);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, []);

  // Save chat history to localStorage whenever messages change (debounced)
  useEffect(() => {
    if (!isInitializing && messages.length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('ironLadyChatHistory', JSON.stringify(messages));
      }, 500); // Debounce saves to improve performance
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isInitializing]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('ironLadyTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What programs does Iron Lady offer?",
    "What is the program duration?",
    "Is the program online or offline?",
    "Are certificates provided?",
    "Who are the mentors/coaches?",
    "How can Iron Lady help my career?",
    "What leadership skills will I learn?",
    "Tell me about women in leadership",
    "How do I apply to join?",
    "What about networking opportunities?"
  ];

  // Calculate chat statistics
  const totalMessages = messages.length;
  const userMessages = messages.filter(m => m.sender === 'user').length;
  const botMessages = messages.filter(m => m.sender === 'bot').length;
  const likedMessages = messages.filter(m => m.liked === true).length;

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <Container 
        maxWidth="md" 
        sx={{ 
          py: 4, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: darkMode ? '#121212' : 'transparent'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            🦸‍♀️ Iron Lady Chatbot
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Loading your conversation...
          </Typography>
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      </Container>
    );
  }

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      liked: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate typing delay for better UX
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
          message: message
        });

        // Add another small delay to show typing indicator
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: response.data.response,
            sender: 'bot',
            timestamp: new Date(),
            liked: null
          };

          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, 800);

      } catch (error) {
        console.error('Error sending message:', error);
        setTimeout(() => {
          const errorMessage = {
            id: Date.now() + 1,
            text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
            sender: 'bot',
            timestamp: new Date(),
            liked: null
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }, 800);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChatHistory = () => {
    const initialMessage = {
      id: 1,
      text: "Hello! I'm the Iron Lady assistant. I can help you with questions about our leadership programs. Feel free to ask about our programs, duration, format, certificates, or mentors!",
      sender: 'bot',
      timestamp: new Date(),
      liked: null
    };
    setMessages([initialMessage]);
    localStorage.setItem('ironLadyChatHistory', JSON.stringify([initialMessage]));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => {
      const timestamp = msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp);
      return `[${timestamp.toLocaleString()}] ${msg.sender === 'user' ? 'You' : 'Iron Lady'}: ${msg.text}`;
    }).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iron-lady-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReaction = (messageId, reaction) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, liked: msg.liked === reaction ? null : reaction }
          : msg
      )
    );
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: 4, 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: darkMode ? '#121212' : 'transparent'
      }}
    >
      <Paper elevation={3} sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        bgcolor: darkMode ? '#1e1e1e' : 'white',
        color: darkMode ? 'white' : 'inherit'
      }}>
        {/* Header */}
        <Box sx={{ 
          background: darkMode 
            ? 'linear-gradient(135deg, #424242 0%, #616161 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          p: 3, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              🦸‍♀️ Iron Lady Chatbot
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Your Leadership Program Assistant
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                💬 {totalMessages} messages
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                👍 {likedMessages} liked
              </Typography>
              {userMessages > 0 && (
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  🗣️ {userMessages} questions
                </Typography>
              )}
              {botMessages > 0 && (
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  🤖 {botMessages} answers
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={exportChat} 
              sx={{ color: 'white' }}
              title="Export Chat History"
            >
              <ExportIcon />
            </IconButton>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ color: 'white' }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton 
              onClick={clearChatHistory} 
              sx={{ color: 'white' }}
              title="Clear Chat History"
            >
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Quick Questions */}
        <Box sx={{ p: 2, borderBottom: '1px solid #eee', bgcolor: darkMode ? '#2a2a2a' : 'inherit' }}>
          <Typography variant="body2" color={darkMode ? '#ccc' : 'text.secondary'} gutterBottom>
            Quick questions:
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            maxHeight: '120px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: darkMode ? '#666' : '#ccc',
              borderRadius: '2px',
            }
          }}>
            {quickQuestions.map((question, index) => (
              <Chip
                key={index}
                label={question}
                variant="outlined"
                size="small"
                onClick={() => handleSendMessage(question)}
                sx={{ 
                  cursor: 'pointer', 
                  '&:hover': { backgroundColor: darkMode ? '#555' : '#f5f5f5' },
                  color: darkMode ? '#fff' : 'inherit',
                  borderColor: darkMode ? '#666' : 'inherit',
                  fontSize: '0.75rem',
                  height: 'auto',
                  '& .MuiChip-label': {
                    paddingY: '4px',
                    whiteSpace: 'normal',
                    textAlign: 'center'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Messages */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, bgcolor: darkMode ? '#1a1a1a' : 'inherit' }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
                animation: 'slideIn 0.4s ease-out'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  maxWidth: '70%',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: message.sender === 'user' ? '#1976d2' : '#9c27b0',
                    mx: 1,
                    width: 32,
                    height: 32
                  }}
                >
                  {message.sender === 'user' ? <PersonIcon /> : <BotIcon />}
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: message.sender === 'user' 
                      ? (darkMode ? '#1976d2' : '#e3f2fd')
                      : (darkMode ? '#424242' : '#f3e5f5'),
                    color: message.sender === 'user' && darkMode ? 'white' : 'inherit',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {message.timestamp instanceof Date ? message.timestamp.toLocaleTimeString() : new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                    {message.sender === 'bot' && (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleReaction(message.id, true)}
                          sx={{ 
                            color: message.liked === true ? '#4caf50' : (darkMode ? '#ccc' : 'inherit'),
                            '&:hover': { color: '#4caf50' }
                          }}
                        >
                          <LikeIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleReaction(message.id, false)}
                          sx={{ 
                            color: message.liked === false ? '#f44336' : (darkMode ? '#ccc' : 'inherit'),
                            '&:hover': { color: '#f44336' }
                          }}
                        >
                          <DislikeIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>
            </Box>
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#9c27b0', mx: 1, width: 32, height: 32 }}>
                  <BotIcon />
                </Avatar>
                <Paper sx={{ p: 2, bgcolor: '#f3e5f5', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Iron Lady is typing
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: '#9c27b0',
                          animation: 'typing 1.4s ease-in-out infinite',
                          animationDelay: '0s'
                        }}
                      />
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: '#9c27b0',
                          animation: 'typing 1.4s ease-in-out infinite',
                          animationDelay: '0.2s'
                        }}
                      />
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: '#9c27b0',
                          animation: 'typing 1.4s ease-in-out infinite',
                          animationDelay: '0.4s'
                        }}
                      />
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', gap: 1, bgcolor: darkMode ? '#2a2a2a' : 'inherit' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask me about Iron Lady programs..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: darkMode ? '#1a1a1a' : 'white',
                color: darkMode ? 'white' : 'inherit',
                '& fieldset': {
                  borderColor: darkMode ? '#666' : 'inherit',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#888' : 'inherit',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? '#ccc' : 'inherit',
              },
              '& input::placeholder': {
                color: darkMode ? '#aaa' : 'inherit',
                opacity: 1,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            sx={{ minWidth: 'auto', px: 2 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
