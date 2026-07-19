import os
from dotenv import load_dotenv
load_dotenv()
from google import genai

client = genai.Client()

result = client.models.embed_content(
    model='text-embedding-004',
    contents='Hello world'
)
print(type(result.embeddings[0].values))
print(len(result.embeddings[0].values))
