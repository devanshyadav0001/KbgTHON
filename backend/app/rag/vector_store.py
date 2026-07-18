import os
import shutil
import chromadb
from pathlib import Path

# Vercel serverless environment has a read-only filesystem (except /tmp).
# We copy our vector database to /tmp so ChromaDB can acquire locks and write WAL files.
db_path = Path("/tmp/vector_db")

# Source path resolution
possible_paths = [
    Path(__file__).parent.parent.parent / "vector_db",
    Path(__file__).parent.parent / "vector_db",
    Path("backend/vector_db"),
    Path("vector_db"),
]

src_path = None
for p in possible_paths:
    if p.exists() and (p / "chroma.sqlite3").exists():
        src_path = p
        break

if src_path:
    if db_path.exists():
        try:
            shutil.rmtree(db_path)
        except Exception:
            pass
    shutil.copytree(src_path, db_path)
    client = chromadb.PersistentClient(path=str(db_path))
else:
    # Fallback to local path if not on Vercel
    client = chromadb.PersistentClient(path="vector_db")

collection = client.get_or_create_collection(
    name="antibiotic_documents"
)