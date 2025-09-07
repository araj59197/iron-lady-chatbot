const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI (optional - for bonus feature)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}) : null;

// FAQ Data
const faqData = {
    "programs": {
        question: "What programs does Iron Lady offer?",
        answer: "Iron Lady offers comprehensive leadership development programs including: Executive Leadership Bootcamp, Women in Leadership Certification, Strategic Management Course, and Entrepreneurship Acceleration Program. Each program is designed to empower women leaders across various industries."
    },
    "duration": {
        question: "What is the program duration?",
        answer: "Program durations vary: Executive Leadership Bootcamp (6 weeks), Women in Leadership Certification (12 weeks), Strategic Management Course (8 weeks), and Entrepreneurship Acceleration Program (16 weeks). All programs include flexible scheduling options."
    },
    "format": {
        question: "Is the program online or offline?",
        answer: "Iron Lady offers hybrid learning experiences. Most programs combine online interactive sessions with in-person workshops and networking events. We also provide fully online options for international participants."
    },
    "certificates": {
        question: "Are certificates provided?",
        answer: "Yes! All participants receive industry-recognized certificates upon successful completion. Our certificates are endorsed by leading business organizations and can enhance your professional portfolio."
    },
    "mentors": {
        question: "Who are the mentors/coaches?",
        answer: "Our mentors are accomplished women leaders including Fortune 500 executives, successful entrepreneurs, industry experts, and thought leaders. Each participant gets paired with a mentor who matches their industry and career goals."
    }
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

app.get('/api/faqs', (req, res) => {
    res.json(faqData);
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Enhanced keyword matching for FAQs
        const lowerMessage = message.toLowerCase();
        let response = null;

        // Check for programs
        if (lowerMessage.includes('program') && (lowerMessage.includes('offer') || lowerMessage.includes('what') || lowerMessage.includes('available'))) {
            response = faqData.programs.answer;
        } 
        // Check for duration
        else if (lowerMessage.includes('duration') || lowerMessage.includes('long') || lowerMessage.includes('time') || lowerMessage.includes('week') || lowerMessage.includes('month')) {
            response = faqData.duration.answer;
        } 
        // Check for format
        else if (lowerMessage.includes('online') || lowerMessage.includes('offline') || lowerMessage.includes('format') || lowerMessage.includes('virtual') || lowerMessage.includes('person')) {
            response = faqData.format.answer;
        } 
        // Check for certificates
        else if (lowerMessage.includes('certificate') || lowerMessage.includes('certification') || lowerMessage.includes('diploma')) {
            response = faqData.certificates.answer;
        } 
        // Check for mentors
        else if (lowerMessage.includes('mentor') || lowerMessage.includes('coach') || lowerMessage.includes('teacher') || lowerMessage.includes('instructor')) {
            response = faqData.mentors.answer;
        }
        // Greetings and casual responses
        else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            response = "Hello! Welcome to Iron Lady! I'm here to help you learn about our leadership programs. You can ask me about our programs, duration, format, certificates, or mentors. What would you like to know?";
        }
        else if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you do')) {
            response = "I'm doing great, thank you for asking! I'm excited to help you learn about Iron Lady's leadership programs. What would you like to know about our programs?";
        }
        else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            response = "You're very welcome! Is there anything else you'd like to know about Iron Lady's leadership programs?";
        }
        else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            response = "Thank you for your interest in Iron Lady! Feel free to come back anytime if you have more questions about our leadership programs. Have a great day!";
        }
        // General questions
        else if (lowerMessage.includes('anything') || lowerMessage.includes('something') || lowerMessage.includes('tell me')) {
            response = "I'd be happy to tell you about Iron Lady's leadership programs! Here's what I can help you with:\n\n• Programs we offer\n• Program duration\n• Online vs offline format\n• Certificates provided\n• Our mentors and coaches\n\nWhat interests you most?";
        }
        // Leadership-related questions
        else if (lowerMessage.includes('leadership') || lowerMessage.includes('leader')) {
            response = "Leadership is at the heart of everything we do at Iron Lady! Our programs are designed to develop strong, confident women leaders who can make a real impact in their industries. We focus on practical leadership skills, strategic thinking, and building the confidence needed to succeed in leadership roles.";
        }
        else if (lowerMessage.includes('women') || lowerMessage.includes('female')) {
            response = "Iron Lady is specifically designed to empower women in leadership! We understand the unique challenges women face in professional environments and provide targeted support, mentorship, and skills development to help women excel in their careers and leadership roles.";
        }
        else if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
            response = "Our programs are designed to accelerate your career growth! Whether you're looking to advance in your current role, transition to leadership, or start your own business, Iron Lady provides the skills, network, and confidence you need to succeed.";
        }
        else if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('training')) {
            response = "At Iron Lady, you'll develop essential leadership skills including strategic thinking, communication, team management, decision-making, and emotional intelligence. Our hands-on approach ensures you can immediately apply what you learn to your professional life.";
        }
        else if (lowerMessage.includes('business') || lowerMessage.includes('entrepreneur') || lowerMessage.includes('startup')) {
            response = "Iron Lady's Entrepreneurship Acceleration Program is perfect for aspiring business leaders! We provide comprehensive training in business strategy, funding, marketing, and leadership skills needed to build and scale successful businesses.";
        }
        else if (lowerMessage.includes('network') || lowerMessage.includes('community') || lowerMessage.includes('connect')) {
            response = "Building a strong professional network is crucial for leadership success! Iron Lady provides access to a vibrant community of accomplished women leaders, mentors, and peers who can support your journey and open doors to new opportunities.";
        }
        else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee')) {
            response = "Iron Lady offers competitive pricing for our leadership programs. Costs vary by program, and we provide flexible payment options. We also offer scholarships and early-bird discounts. Contact us for detailed pricing information based on your chosen program.";
        }
        else if (lowerMessage.includes('apply') || lowerMessage.includes('join') || lowerMessage.includes('enroll')) {
            response = "Ready to join Iron Lady? The application process is straightforward! Simply fill out our online application, schedule a brief consultation call, and once approved, you can select your program and start date. We're here to guide you through every step!";
        }
        else if (openai) {
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-4o-mini", // Latest and most efficient GPT-4 model
                    messages: [
                        {
                            role: "system",
                            content: "You are a knowledgeable and friendly assistant for Iron Lady leadership programs. You specialize in women's leadership development, empowerment, and professional growth. Provide helpful, encouraging, and professional responses. Always relate answers back to leadership development and empowerment when possible. Keep responses concise but informative."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    max_tokens: 200,
                    temperature: 0.7 // Slightly creative but focused responses
                });
                response = completion.choices[0].message.content;
            } catch (error) {
                console.error('OpenAI error:', error);
                response = "I'm sorry, I couldn't process that request right now. Please try asking about our programs, duration, format, certificates, or mentors, and I'll be happy to help!";
            }
        } else {
            response = "I can help you with questions about Iron Lady's programs, duration, format (online/offline), certificates, and mentors. What would you like to know?";
        }

        res.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
