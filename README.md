# BizForge Backend

GenAI-powered branding and business analytics platform for startups, creators, and small businesses.

## Features

- **Brand Name Generator** - Generate creative, memorable brand names
- **Marketing Content Creator** - Create taglines, social posts, emails, and ad copy
- **Branding Chatbot** - AI consultant for brand strategy and business analytics
- **Sentiment Analysis** - Analyze customer feedback and social mentions
- **Design System Generator** - Get color palettes and typography recommendations
- **Logo Prompt Generator** - Generate prompts for AI logo design tools

## Tech Stack

- **Framework**: FastAPI
- **AI Engine**: Groq Cloud (LLaMA-3.3-70b)
- **Validation**: Pydantic

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

### 3. Run the Server

```bash
uvicorn app.main:app --reload --port 8000
```

### 4. Access API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/brand/generate-name` | POST | Generate brand names |
| `/api/content/generate` | POST | Create marketing content |
| `/api/chat` | POST | Branding consultant chat |
| `/api/sentiment/analyze` | POST | Analyze text sentiment |
| `/api/design/palette` | POST | Generate color palette |
| `/api/logo/prompt` | POST | Generate logo prompts |
| `/health` | GET | Health check |

## Project Structure

```
app/
├── main.py           # FastAPI entry point
├── config.py         # Environment configuration
├── services/
│   └── ai_service.py # Groq AI integration
├── routers/          # API endpoints
├── schemas/          # Pydantic models
└── prompts/          # AI prompt templates
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GROQ_API_KEY` | Groq Cloud API key | Required |
| `MODEL_NAME` | LLM model name | llama-3.3-70b-versatile |
| `PORT` | Server port | 8000 |

## License

MIT License
