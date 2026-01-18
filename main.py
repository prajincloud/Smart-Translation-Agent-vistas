from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deep_translator import GoogleTranslator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)    

class TranslationRequest(BaseModel):
    text: str
    target_language: str

@app.post("/translate")
def translate_text(req: TranslationRequest):
    translated_text = GoogleTranslator(
        source="auto",
        target=req.target_language
    ).translate(req.text)

    return {
        "translated_text": translated_text
    }
