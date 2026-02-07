"""
Logo Prompt Generator Router
API endpoint for generating text-to-image prompts for logos.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.models import LogoPromptRequest, LogoPromptResponse, ErrorResponse
from app.services.ai_service import get_ai_service
from app.config import get_settings

router = APIRouter()
settings = get_settings()


import urllib.parse
import base64
import httpx

@router.post(
    "/logo/prompt",
    response_model=LogoPromptResponse,
    responses={500: {"model": ErrorResponse}},
    summary="Generate Logo Prompts",
    description="Generate detailed text-to-image prompts and a preview image."
)
async def generate_logo_prompt(request: LogoPromptRequest):
    """
    Generate logo design prompts and a preview image.
    
    - **brand_name**: Your brand name
    - **industry**: Industry or niche
    - **brand_values**: Core brand values
    - **style**: Logo style preference (minimalist, vintage, geometric, etc.)
    Returns a generated logo preview URL.
    """
    try:
        # Construct image generation prompt
        image_prompt = f"{request.style} logo for {request.brand_name}, vector art, minimal, white background, high quality, professional design"
        
        image_url = ""
        model_used = settings.model_name
        
        # Option A: Google Imagen (Premium/High Quality)
        if settings.google_api_key:
            try:
                import google.generativeai as genai
                from google.generativeai.types import HarmCategory, HarmBlockThreshold
                
                genai.configure(api_key=settings.google_api_key)
                
                # Imagen 3 model config
                # Note: 'imagen-3.0-generate-001' is the model name for Imagen 3
                imagen_model = genai.ImageGenerationModel("imagen-3.0-generate-001")
                
                result = imagen_model.generate_images(
                    prompt=image_prompt,
                    number_of_images=1,
                    aspect_ratio="1:1",
                    safety_filter={
                        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    }
                )
                
                if result.images:
                    # Convert to base64 for frontend display
                    # Imagen returns generic PIL images or bytes
                    # We need to save to bytes buffer then base64 encode
                    import io
                    img = result.images[0]
                    
                    # If it's a PIL Image
                    if hasattr(img, 'save'):
                        buffered = io.BytesIO()
                        img.save(buffered, format="PNG")
                        img_str = base64.b64encode(buffered.getvalue()).decode()
                        image_url = f"data:image/png;base64,{img_str}"
                    # If it has specific bytes access (depends on SDK version)
                    elif hasattr(img, '_image_bytes'):
                         image_url = f"data:image/png;base64,{base64.b64encode(img._image_bytes).decode()}"
                    
                    model_used = "Google Imagen 3"
            except Exception as e:
                print(f"Google Imagen Error: {e}")
                # Fallback continues below
        
        # Option B: Stability AI (SDXL) - High Quality
        if not image_url and settings.stability_api_key:
            try:
                stability_api_url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
                headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": f"Bearer {settings.stability_api_key}",
                }
                payload = {
                    "text_prompts": [{"text": image_prompt}],
                    "cfg_scale": 7,
                    "height": 1024,
                    "width": 1024,
                    "samples": 1,
                    "steps": 30,
                }
                
                async with httpx.AsyncClient() as client:
                    response = await client.post(stability_api_url, headers=headers, json=payload, timeout=45.0)
                    
                    if response.status_code == 200:
                        data = response.json()
                        # Stability returns base64 directly
                        base64_image = data["artifacts"][0]["base64"]
                        image_url = f"data:image/png;base64,{base64_image}"
                        model_used = "Stability AI (SDXL)"
                    else:
                        print(f"Stability AI Error {response.status_code}: {response.text}")
            except Exception as e:
                print(f"Stability AI Exception: {e}")

        # Option C: Hugging Face Inference API (High Quality, requires Token)
        if not image_url and settings.hf_api_token:
            try:
                api_url = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
                headers = {"Authorization": f"Bearer {settings.hf_api_token}"}
                payload = {"inputs": image_prompt}
                
                async with httpx.AsyncClient() as client:
                    response = await client.post(api_url, headers=headers, json=payload, timeout=30.0)
                    
                    if response.status_code == 200:
                        image_bytes = response.content
                        base64_image = base64.b64encode(image_bytes).decode("utf-8")
                        image_url = f"data:image/jpeg;base64,{base64_image}"
                        model_used = "HuggingFace SDXL"
                    else:
                        print(f"HF Error {response.status_code}: {response.text}")
                        # Fallback will happen below if image_url is empty
            except Exception as e:
                print(f"HF Exception: {e}")
                # Fallback
               
        # Option B: Pollinations.AI (Free, Default fallback)
        if not image_url:
            import random
            
            # Use a slightly complex seed range
            seed = random.randint(0, 1000000)
            encoded_prompt = urllib.parse.quote(image_prompt)
            
            # Direct URL construction
            # We explicitly do NOT proxy this server-side anymore
            image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&seed={seed}"
            model_used = "Pollinations.AI (Direct)"
        
        return LogoPromptResponse(
            success=True,
            prompts=None,
            image_url=image_url,
            model_used=model_used
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Logo generation failed: {str(e)}"
        )
