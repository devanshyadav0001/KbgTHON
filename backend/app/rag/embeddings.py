import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Load the client
client = genai.Client()

def get_embedding(text: str):
    response = client.models.embed_content(
        model='gemini-embedding-2',
        contents=text
    )
    return response.embeddings[0].values