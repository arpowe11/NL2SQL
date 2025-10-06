

from pathlib import Path

# Testing
DEBUG = True
HOST = "127.0.0.1"
PORT = 5000

# Security
CORS_ORIGINS = ("http://localhost:3000", "http://localhost:3001")

# Extra
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_PATH = BASE_DIR / "app/prompts/prompt.txt"
AI_MODEL = "gpt-4-turbo"
