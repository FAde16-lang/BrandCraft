# BizForge - AI-Powered Branding & Analytics Platform

![BizForge Banner](https://via.placeholder.com/1200x400?text=BizForge+AI+Platform)

BizForge is a comprehensive **GenAI-powered platform** designed to empower startups, creators, and small businesses. It automates the creative and analytical aspects of brand building, from generating unique brand identities to providing data-driven business insights.

## 🚀 Key Features

### 🎨 AI Branding Suite
- **Brand Name Generator**: Creates unique, available, and memorable brand names based on industry and values.
- **AI Logo Designer**: Generates professional, vector-style logos using **Stability AI SDXL**.
- **Design System Creator**: Auto-generates cohesive color palettes and typography recommendations.
- **Brand Identity & Voice**: Defines your brand's core values, mission, and tone of voice.

### 📢 Marketing & Content
- **Content Generator**: AI-crafted social media posts, ad copy, emails, and taglines.
- **Social Media Preview**: Visualizes how your content will look on Instagram, Twitter, and LinkedIn.
- **Merchandise Mockups**: Real-time previews of your brand on business cards and signage.

### 📊 Business Intelligence
- **AI Business Consultant**: A conversational AI chatbot for strategy validation and market insights.
- **Sentiment Analysis**: Analyzes customer feedback and text to determine emotional tone.
- **Brand Bible Export**: Exports a comprehensive PDF brand guideline document.

## 🛠️ Technology Stack

- **Backend**: FastAPI (Python 3.10+)
- **AI Models**: 
  - **Text**: LLaMA-3.3-70b (via Groq Cloud) for high-speed inference.
  - **Image**: Stability AI SDXL for premium visual generation.
  - **Chat**: Gemini 2.0 Flash for conversational intelligence.
- **Database**: MongoDB (User data & brand assets).
- **Frontend**: Vanilla JS / HTML5 / CSS3 (Modern, responsive dashboard).
- **Authentication**: Google OAuth 2.0.

## 📦 Installation & Setup

### Prerequisites
- Python 3.10 or higher
- MongoDB (Local or Atlas)
- API Keys: Groq Cloud, Stability AI, Google Cloud Console

### 1. Clone the Repository
```bash
git clone https://github.com/FAde16-lang/BrandCraft.git
cd BrandCraft
```

### 2. Set Up Virtual Environment
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Mac/Linux
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment
Create a `.env` file in the root directory:
```ini
# Core Configuration
GROQ_API_KEY=your_groq_api_key
MODEL_NAME=llama-3.3-70b-versatile
PORT=8000
DEBUG=true

# Database
MONGODB_URI=mongodb://localhost:27017/bizforge

# Image Generation
STABILITY_API_KEY=your_stability_key

# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
```

### 5. Run the Application
```bash
uvicorn app.main:app --reload
```
Visit `http://localhost:8000` to access the platform.

## 📂 Project Structure

```
├── app/
│   ├── main.py            # Application entry point
│   ├── config.py          # Configuration management
│   ├── routers/           # API endpoints (Auth, Brand, Logo, Chat, etc.)
│   ├── services/          # Business logic & AI integrations
│   ├── schemas/           # Pydantic data models
│   └── prompts/           # AI system prompts
├── frontend/              # Static assets (HTML/CSS/JS)
├── .env                   # Environment variables (Git-ignored)
└── requirements.txt       # Python dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
