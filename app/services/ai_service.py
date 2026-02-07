"""
BizForge AI Service
Centralized Groq Cloud integration for all AI-powered features.
"""

from groq import Groq
from app.config import get_settings
from app.prompts.templates import (
    SYSTEM_PROMPT,
    BRAND_NAME_PROMPT,
    MARKETING_CONTENT_PROMPT,
    CHAT_SYSTEM_PROMPT,
    SENTIMENT_ANALYSIS_PROMPT,
    DESIGN_PALETTE_PROMPT,
    LOGO_PROMPT_GENERATION
)


class GroqAIService:
    """
    Centralized AI service for BizForge using Groq Cloud.
    All AI interactions are handled through this service.
    """
    
    def __init__(self):
        """Initialize the AI client."""
        self.settings = get_settings()
        self.provider = "groq"
        
        # Initialize Groq
        if self.settings.groq_api_key:
            self.groq_client = Groq(api_key=self.settings.groq_api_key)
            self.model = self.settings.model_name
        
        # Initialize Google Gemini if key exists
        if self.settings.google_api_key:
            import google.generativeai as genai
            genai.configure(api_key=self.settings.google_api_key)
            self.provider = "google"
            # Use Gemini 2.0 Flash (or latest stable flash)
            self.gemini_model = genai.GenerativeModel('gemini-2.0-flash-exp') 

    def _generate(self, system_prompt: str, user_prompt: str, temperature: float = 0.7) -> str:
        """
        Core generation method using configured provider.
        """
        try:
            if self.provider == "google":
                # Google Gemini Generation
                combined_prompt = f"{system_prompt}\n\nUser Request: {user_prompt}"
                response = self.gemini_model.generate_content(
                    combined_prompt,
                    generation_config={"temperature": temperature}
                )
                return response.text
            else:
                # Groq Generation (Default)
                response = self.groq_client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=temperature,
                    max_tokens=2048
                )
                return response.choices[0].message.content
        except Exception as e:
            # Fallback to Groq if Google fails
            if self.provider == "google" and self.settings.groq_api_key:
                print(f"Gemini failed, falling back to Groq: {e}")
                self.provider = "groq"
                return self._generate(system_prompt, user_prompt, temperature)
            raise Exception(f"AI generation failed: {str(e)}")
    
    def _chat_generate(self, messages: list, temperature: float = 0.7) -> str:
        """
        Chat generation with conversation history.
        """
        try:
            if self.provider == "google":
                # Convert OpenAI-format messages to Gemini format
                gemini_history = []
                system_instruction = ""
                
                for msg in messages:
                    role = msg["role"]
                    content = msg["content"]
                    if role == "system":
                        system_instruction += content + "\n"
                    elif role == "user":
                        gemini_history.append({"role": "user", "parts": [content]})
                    elif role == "assistant":
                        gemini_history.append({"role": "model", "parts": [content]})
                
                # Create chat session
                chat = self.gemini_model.start_chat(history=gemini_history[:-1])
                last_user_msg = gemini_history[-1]["parts"][0]
                
                # Add system instruction awareness (Gemini doesn't support system role in chat history directly in all versions)
                # We prepend it to the last message or use system_instruction arg if available in model init
                # For simplicity here, we rely on the context being passed
                
                response = chat.send_message(
                    last_user_msg,
                    generation_config={"temperature": temperature}
                )
                return response.text
            else:
                # Groq Generation
                response = self.groq_client.chat.completions.create(
                    model=self.model,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=2048
                )
                return response.choices[0].message.content
        except Exception as e:
             # Fallback to Groq if Google fails
            if self.provider == "google" and self.settings.groq_api_key:
                print(f"Gemini failed, falling back to Groq: {e}")
                self.provider = "groq"
                return self._chat_generate(messages, temperature)
            raise Exception(f"Chat generation failed: {str(e)}")
    
    def generate_brand_names(
        self,
        industry: str,
        keywords: list,
        style: str = "modern",
        target_audience: str = "general",
        context: str = ""
    ) -> str:
        """
        Generate creative brand name suggestions.
        
        Args:
            industry: Industry or niche
            keywords: List of keywords/themes
            style: Naming style preference
            target_audience: Target audience description
            context: Additional context
            
        Returns:
            Generated brand name suggestions
        """
        user_prompt = BRAND_NAME_PROMPT.format(
            industry=industry,
            keywords=", ".join(keywords),
            style=style,
            target_audience=target_audience,
            context=context if context else "None specified"
        )
        return self._generate(SYSTEM_PROMPT, user_prompt, temperature=0.8)
    
    def generate_marketing_content(
        self,
        brand_name: str,
        brand_description: str,
        content_type: str,
        target_audience: str,
        tone: str = "professional",
        key_message: str = "",
        cta: str = ""
    ) -> str:
        """
        Generate marketing content for various channels.
        
        Args:
            brand_name: Brand name
            brand_description: Brief brand description
            content_type: Type of content to generate
            target_audience: Target audience
            tone: Tone of voice
            key_message: Key message to convey
            cta: Call to action
            
        Returns:
            Generated marketing content
        """
        user_prompt = MARKETING_CONTENT_PROMPT.format(
            brand_name=brand_name,
            brand_description=brand_description,
            content_type=content_type,
            target_audience=target_audience,
            tone=tone,
            key_message=key_message if key_message else "Not specified",
            cta=cta if cta else "Not specified"
        )
        return self._generate(SYSTEM_PROMPT, user_prompt, temperature=0.7)
    
    def chat(
        self,
        message: str,
        conversation_history: list = None,
        business_context: str = ""
    ) -> str:
        """
        Branding consultant chatbot interaction.
        
        Args:
            message: User's current message
            conversation_history: Previous messages in conversation
            business_context: Optional business context
            
        Returns:
            AI consultant response
        """
        messages = [{"role": "system", "content": CHAT_SYSTEM_PROMPT}]
        
        # Add business context if provided
        if business_context:
            messages.append({
                "role": "system",
                "content": f"Business Context: {business_context}"
            })
        
        # Add conversation history
        if conversation_history:
            for msg in conversation_history:
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })
        
        # Add current message
        messages.append({"role": "user", "content": message})
        
        return self._chat_generate(messages, temperature=0.7)
    
    def analyze_sentiment(self, text: str, context: str = "general brand feedback") -> str:
        """
        Analyze sentiment of text for brand insights.
        
        Args:
            text: Text to analyze
            context: Context for analysis
            
        Returns:
            Sentiment analysis results
        """
        user_prompt = SENTIMENT_ANALYSIS_PROMPT.format(
            text=text,
            context=context
        )
        return self._generate(SYSTEM_PROMPT, user_prompt, temperature=0.3)
    
    def generate_color_palette(
        self,
        brand_name: str,
        industry: str,
        brand_personality: str,
        target_audience: str,
        mood: str = "professional",
        existing_colors: str = ""
    ) -> str:
        """
        Generate color palette and design system recommendations.
        
        Args:
            brand_name: Brand name
            industry: Industry or niche
            brand_personality: Brand personality traits
            target_audience: Target audience
            mood: Desired mood/feeling
            existing_colors: Any existing brand colors
            
        Returns:
            Design system recommendations
        """
        user_prompt = DESIGN_PALETTE_PROMPT.format(
            brand_name=brand_name,
            industry=industry,
            brand_personality=brand_personality,
            target_audience=target_audience,
            mood=mood,
            existing_colors=existing_colors if existing_colors else "None specified"
        )
        return self._generate(SYSTEM_PROMPT, user_prompt, temperature=0.6)
    
    def generate_logo_prompt(
        self,
        brand_name: str,
        industry: str,
        brand_values: str,
        style: str = "modern minimalist",
        icon_preferences: str = "",
        colors: str = ""
    ) -> str:
        """
        Generate text-to-image prompts for logo design.
        
        Args:
            brand_name: Brand name
            industry: Industry or niche
            brand_values: Core brand values
            style: Logo style preference
            icon_preferences: Preferred icons or symbols
            colors: Preferred colors
            
        Returns:
            Logo design prompts for AI image generators
        """
        user_prompt = LOGO_PROMPT_GENERATION.format(
            brand_name=brand_name,
            industry=industry,
            brand_values=brand_values,
            style=style,
            icon_preferences=icon_preferences if icon_preferences else "Open to suggestions",
            colors=colors if colors else "Open to suggestions"
        )
        return self._generate(SYSTEM_PROMPT, user_prompt, temperature=0.8)


# Singleton instance
_ai_service = None


def get_ai_service() -> GroqAIService:
    """Get or create the AI service singleton."""
    global _ai_service
    if _ai_service is None:
        _ai_service = GroqAIService()
    return _ai_service
