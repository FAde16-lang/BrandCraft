"""
Logo Prompt Generator Router
API endpoint for generating logos using HuggingFace SDXL or Pollinations.AI.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.models import LogoPromptRequest, LogoPromptResponse, ErrorResponse
from app.services.ai_service import get_ai_service
from app.config import get_settings
import urllib.parse
import base64
import httpx

router = APIRouter()
settings = get_settings()


@router.post(
    "/logo/prompt",
    response_model=LogoPromptResponse,
    responses={500: {"model": ErrorResponse}},
    summary="Generate Logo",
    description="Generate a logo image using AI."
)
async def generate_logo_prompt(request: LogoPromptRequest):
    """
    Generate logo design using AI image generation.
    
    Uses HuggingFace SDXL as primary option, falls back to Pollinations.AI.
    """
    try:
        # Construct image generation prompt
        image_prompt = f"{request.style} logo for {request.brand_name}, vector art, minimal, white background, high quality, professional design"
        
        image_url = ""
        model_used = "unknown"
        
        # Option A: HuggingFace SDXL (requires HF_API_TOKEN)
        if settings.hf_api_token:
            try:
                api_url = f"https://api-inference.huggingface.co/models/{settings.sdxl_model}"
                headers = {"Authorization": f"Bearer {settings.hf_api_token}"}
                payload = {"inputs": image_prompt}
                
                async with httpx.AsyncClient() as client:
                    response = await client.post(api_url, headers=headers, json=payload, timeout=45.0)
                    
                    if response.status_code == 200:
                        image_bytes = response.content
                        base64_image = base64.b64encode(image_bytes).decode("utf-8")
                        image_url = f"data:image/jpeg;base64,{base64_image}"
                        model_used = f"HuggingFace {settings.sdxl_model.split('/')[-1]}"
                    else:
                        print(f"HuggingFace Error {response.status_code}: {response.text[:200]}")
            except Exception as e:
                print(f"HuggingFace Exception: {e}")
        
        # Option B: Stability AI (requires STABILITY_API_KEY)
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
                        base64_image = data["artifacts"][0]["base64"]
                        image_url = f"data:image/png;base64,{base64_image}"
                        model_used = "Stability AI SDXL"
                    else:
                        print(f"Stability AI Error {response.status_code}: {response.text[:200]}")
            except Exception as e:
                print(f"Stability AI Exception: {e}")
        
        # Option C: Pollinations.AI (Free fallback - always works)
        if not image_url:
            import random
            seed = random.randint(0, 1000000)
            encoded_prompt = urllib.parse.quote(image_prompt)
            image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&seed={seed}"
            model_used = "Pollinations.AI"
        
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
