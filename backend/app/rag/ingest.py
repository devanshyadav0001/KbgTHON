from .loader import load_documents
from .chunker import chunk_documents
from .embeddings import get_embedding
from .vector_store import collection
import time

docs = load_documents()
chunks = chunk_documents(docs)

for i, chunk in enumerate(chunks):
    success = False
    while not success:
        try:
            embedding = get_embedding(chunk.page_content)
            collection.add(
                ids=[str(i)],
                embeddings=[embedding],
                documents=[chunk.page_content],
                metadatas=[chunk.metadata]
            )
            success = True
        except Exception as e:
            print(f"Error: {e}. Retrying in 5s...")
            time.sleep(5)
    time.sleep(1.5)

print(f"Stored {len(chunks)} chunks!")